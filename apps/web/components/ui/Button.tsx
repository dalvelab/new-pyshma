import type { MouseEventHandler, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  variant?: 'primary' | 'ghost';
  full?: boolean;
  href?: string;
  /** Открыть href в новой вкладке. Игнорируется без href. */
  external?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: 'button' | 'submit';
  /** Блокирует кнопку (например, на время загрузки). Игнорируется при href. */
  disabled?: boolean;
}

export function Button({
  children,
  variant = 'ghost',
  full,
  href,
  external,
  onClick,
  type = 'button',
  disabled,
}: Props) {
  const cls =
    'inline-flex items-center justify-center px-[18px] py-3 rounded-lg border-1.5 border-ink ' +
    'font-bold text-sm cursor-pointer btn-hover ' +
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-paper ' +
    'disabled:opacity-60 disabled:cursor-default ' +
    (variant === 'primary' ? 'bg-accent text-white ' : 'bg-cream text-ink ') +
    (full ? 'w-full ' : '');
  if (href)
    return (
      <a
        href={href}
        className={cls}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
      >
        {children}
      </a>
    );
  return (
    <button type={type} className={cls} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}
