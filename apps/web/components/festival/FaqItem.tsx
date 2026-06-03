'use client';

import { useState } from 'react';

interface Props {
  index: number;
  question: string;
  answer: string;
  first?: boolean;
}

/** Вопрос из «Быстрых ответов» с плавным раскрытием.
    Анимация высоты через grid-template-rows (0fr → 1fr) —
    работает в обе стороны и не требует фиксированной высоты контента. */
export function FaqItem({ index, question, answer, first }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`py-5 ${first ? 'border-t-1.5 border-ink' : ''} border-b border-dashed border-ink-20`}
    >
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-baseline gap-3.5 font-bold text-[18px] cursor-pointer list-none text-left bg-transparent border-0 p-0"
      >
        <span className="text-accent font-extrabold">
          {String(index + 1).padStart(2, '0')}
        </span>
        <span className="flex-1">{question}</span>
        <span
          className={`text-ink-50 text-[22px] transition-transform ${open ? 'rotate-45' : ''}`}
        >
          +
        </span>
      </button>
      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-out ${
          open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="overflow-hidden">
          <p className="mt-2.5 m-0 pl-7 font-medium text-sm leading-relaxed text-ink-70">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}
