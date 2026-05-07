import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  variant?: 'default' | 'accent' | 'light';
}

export function Pill({ children, variant = 'default' }: Props) {
  const base =
    'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border-1.5 border-ink ' +
    'font-semibold text-[11px] uppercase tracking-[0.06em]';
  const tone =
    variant === 'accent'
      ? 'bg-accent text-white'
      : variant === 'light'
        ? 'bg-cream text-ink'
        : 'bg-transparent text-ink';
  return <span className={`${base} ${tone}`}>{children}</span>;
}
