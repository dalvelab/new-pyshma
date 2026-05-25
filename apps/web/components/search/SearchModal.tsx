'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import type { SearchHit } from '@/lib/types';

const RECENT_KEY = 'ship.search.recent';

const KIND_LABEL: Record<SearchHit['kind'], string> = {
  news: 'новости',
  event: 'афиша',
  sport: 'спорт',
  vacancy: 'вакансии',
};
const KIND_HREF: Record<SearchHit['kind'], (slug: string) => string> = {
  news: (s) => `/news/${s}`,
  event: (s) => `/afisha/${s}`,
  sport: (s) => `/sport/${s}`,
  vacancy: (s) => `/vacancies/${s}`,
};

interface Props {
  open: boolean;
  onClose: () => void;
}

export function SearchModal({ open, onClose }: Props) {
  const [q, setQ] = useState('');
  const [hits, setHits] = useState<SearchHit[]>([]);
  const [loading, setLoading] = useState(false);
  const [recent, setRecent] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    setQ('');
    setHits([]);
    setRecent(JSON.parse(localStorage.getItem(RECENT_KEY) ?? '[]'));
    setTimeout(() => inputRef.current?.focus(), 50);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (!q.trim()) {
      setHits([]);
      return;
    }
    setLoading(true);
    const t = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
        const json = await res.json();
        setHits(json.hits ?? []);
      } catch {
        setHits([]);
      }
      setLoading(false);
    }, 220);
    return () => clearTimeout(t);
  }, [q]);

  const submit = () => {
    if (!q.trim()) return;
    const next = [q, ...recent.filter((r) => r !== q)].slice(0, 5);
    setRecent(next);
    localStorage.setItem(RECENT_KEY, JSON.stringify(next));
    window.location.href = `/search?q=${encodeURIComponent(q)}`;
  };

  if (!open) return null;
  if (typeof document === 'undefined') return null;
  return createPortal(
    <div
      className="fixed inset-0 z-50 bg-ink/60 backdrop-blur-sm flex items-start justify-center p-6 pt-[10vh]"
      onClick={onClose}
    >
      <div
        className="bg-paper border-1.5 border-ink rounded-2xl w-full max-w-[720px] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 p-5 border-b-1.5 border-ink">
          <span className="text-2xl font-bold text-ink-50">⌕</span>
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && submit()}
            placeholder="Поиск…"
            className="flex-1 bg-transparent border-0 outline-none text-lg font-semibold placeholder:text-ink-50"
          />
          <button
            onClick={onClose}
            className="px-3 py-1.5 rounded-md border-1.5 border-ink font-bold text-xs cursor-pointer"
          >
            esc
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto">
          {!q.trim() ? (
            <div className="p-5 flex flex-col gap-5">
              {recent.length > 0 && (
                <div>
                  <div className="text-[11px] uppercase tracking-[0.1em] text-ink-50 font-bold mb-2">
                    недавние
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {recent.map((r) => (
                      <button
                        key={r}
                        onClick={() => setQ(r)}
                        className="px-3 py-1.5 rounded-full border-1.5 border-ink font-semibold text-xs bg-cream"
                      >
                        ↺ {r}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : loading ? (
            <div className="p-10 text-center text-ink-50">ищем…</div>
          ) : hits.length === 0 ? (
            <div className="p-10 text-center">
              <div className="font-extrabold text-2xl">Ничего не нашли</div>
              <div className="mt-2 text-sm text-ink-70">
                Попробуйте переформулировать
              </div>
            </div>
          ) : (
            <ul className="m-0 p-0 list-none">
              {hits.slice(0, 8).map((h, i) => (
                <li key={`${h.kind}-${h.slug}-${i}`}>
                  <a
                    href={KIND_HREF[h.kind](h.slug)}
                    className="block px-5 py-3.5 border-b border-dashed border-ink-20 hover:bg-paper-2"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2 py-0.5 rounded-full bg-accent text-white text-[10px] font-bold uppercase tracking-[0.06em]">
                        {KIND_LABEL[h.kind]}
                      </span>
                      {h.subtitle && <span className="text-xs text-ink-50">{h.subtitle}</span>}
                    </div>
                    <div className="font-bold text-[15px] leading-[1.2]">{h.title}</div>
                    {h.excerpt && (
                      <div className="mt-1 text-xs text-ink-70 line-clamp-2">{h.excerpt}</div>
                    )}
                  </a>
                </li>
              ))}
              {hits.length > 8 && (
                <li className="p-4 text-center">
                  <button onClick={submit} className="font-bold text-sm underline">
                    показать все {hits.length} результатов →
                  </button>
                </li>
              )}
            </ul>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
}
