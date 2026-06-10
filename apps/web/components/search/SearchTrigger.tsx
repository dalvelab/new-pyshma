'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Модалка тяжёлая (портал, listeners, localStorage) и не нужна на первом рендере —
// грузим её только при первом открытии поиска.
const SearchModal = dynamic(() => import('./SearchModal').then((m) => m.SearchModal), {
  ssr: false,
});

/** Кнопка-открыватель модалки поиска в шапке. Слушает ⌘K / Ctrl+K. */
export function SearchTrigger() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen(true);
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Поиск (Ctrl+K)"
        className="w-[38px] h-[38px] rounded-full border-1.5 border-ink bg-transparent cursor-pointer text-base font-semibold"
      >
        ⌕
      </button>
      {open && <SearchModal open onClose={() => setOpen(false)} />}
    </>
  );
}
