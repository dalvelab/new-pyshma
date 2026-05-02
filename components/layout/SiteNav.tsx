'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const NAV = [
  { href: '/news', label: 'Новости' },
  { href: '/afisha', label: 'Афиша' },
  { href: '/vacancies', label: 'Вакансии' },
  { href: '/sport', label: 'Спорт' },
  { href: '/festival', label: 'Фестиваль' },
];

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      {/* Desktop nav */}
      <nav className="hidden md:flex gap-[22px]">
        {NAV.map((n) => {
          const active = isActive(pathname, n.href);
          return (
            <Link
              key={n.href}
              href={n.href}
              aria-current={active ? 'page' : undefined}
              className={`font-semibold text-sm py-1 border-b-2 text-ink transition-colors hover:border-accent ${
                active ? 'border-accent' : 'border-transparent'
              }`}
            >
              {n.label}
            </Link>
          );
        })}
      </nav>

      {/* Mobile hamburger */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Закрыть меню' : 'Открыть меню'}
        aria-expanded={open}
        aria-controls="mobile-nav"
        className="md:hidden ml-auto w-[38px] h-[38px] flex items-center justify-center rounded-full border-1.5 border-ink bg-transparent cursor-pointer"
      >
        <span aria-hidden className="text-lg font-semibold leading-none">
          {open ? '×' : '≡'}
        </span>
      </button>

      {/* Mobile drawer */}
      {open && (
        <div
          id="mobile-nav"
          className="md:hidden absolute left-0 right-0 top-full bg-paper border-b-1.5 border-ink"
        >
          <nav className="flex flex-col px-4 py-2 max-w-page mx-auto">
            {NAV.map((n) => {
              const active = isActive(pathname, n.href);
              return (
                <Link
                  key={n.href}
                  href={n.href}
                  aria-current={active ? 'page' : undefined}
                  className={`py-3 font-semibold text-base border-b border-dashed border-ink-20 last:border-b-0 ${
                    active ? 'text-accent' : 'text-ink'
                  }`}
                >
                  {n.label}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </>
  );
}
