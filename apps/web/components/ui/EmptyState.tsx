import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

/** Пустое состояние listing-страниц: пунктирная рамка с сообщением по центру. */
export function EmptyState({ children }: Props) {
  return (
    <div className="border-1.5 border-dashed border-ink-30 rounded-xl p-10 text-center text-ink-70">
      {children}
    </div>
  );
}
