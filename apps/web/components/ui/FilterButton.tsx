import type { ReactNode } from 'react';

interface Props {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
  /** Цвет активного состояния. accent — оранжевый, ink — тёмный. */
  tone?: 'accent' | 'ink';
  /** Размер чипа. md — крупнее (text-sm), sm — компактнее (text-xs). */
  size?: 'sm' | 'md';
  disabled?: boolean;
}

const SIZE = {
  sm: 'px-3.5 py-2 text-xs',
  md: 'px-4 py-2 text-sm',
};

const ACTIVE = {
  accent: 'bg-accent text-white',
  ink: 'bg-ink text-cream',
};

/** Чип-фильтр для listing-страниц. Единый вид + видимый фокус с клавиатуры. */
export function FilterButton({
  active,
  onClick,
  children,
  tone = 'accent',
  size = 'sm',
  disabled,
}: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`rounded-full border-1.5 border-ink font-semibold cursor-pointer btn-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-paper disabled:opacity-60 disabled:cursor-default ${SIZE[size]} ${
        active ? ACTIVE[tone] : 'bg-cream text-ink'
      }`}
    >
      {children}
    </button>
  );
}
