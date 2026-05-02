import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  variant?: 'primary' | 'ghost';
  full?: boolean;
  href?: string;
}

export function Button({ children, variant = 'ghost', full, href }: Props) {
  const cls =
    'inline-flex items-center justify-center px-[18px] py-3 rounded-lg border-1.5 border-ink ' +
    'font-bold text-sm cursor-pointer btn-hover ' +
    (variant === 'primary' ? 'bg-accent text-white ' : 'bg-cream text-ink ') +
    (full ? 'w-full ' : '');
  if (href)
    return (
      <a href={href} className={cls}>
        {children}
      </a>
    );
  return <button className={cls}>{children}</button>;
}
