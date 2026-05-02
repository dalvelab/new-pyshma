import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  accent?: boolean;
  className?: string;
}

export function Card({ children, accent, className = '' }: Props) {
  return (
    <div
      className={`border-1.5 border-ink rounded-xl card-hover overflow-hidden ${accent ? 'bg-accent text-white' : 'bg-cream text-ink'} ${className}`}
    >
      {children}
    </div>
  );
}
