import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  /** Кол-во колонок на больших экранах: 4 (новости/афиша) или 3 (спорт/вакансии). */
  cols?: 4 | 3;
  className?: string;
}

const COLS = {
  4: 'lg:grid-cols-4 gap-5',
  3: 'lg:grid-cols-3 gap-4',
};

/** Сетка карточек: 1 колонка на мобильном, 2 на планшете, 3/4 на десктопе. */
export function CardGrid({ children, cols = 4, className = '' }: Props) {
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 ${COLS[cols]} ${className}`}>{children}</div>
  );
}
