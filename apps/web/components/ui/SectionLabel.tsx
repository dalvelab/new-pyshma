interface Props {
  num?: string;
  children?: React.ReactNode;
}

export function SectionLabel({ num, children }: Props) {
  return (
    <div className="flex items-center gap-3 mb-[18px] font-bold text-xs uppercase tracking-[0.16em] text-ink-70">
      {num && (
        <span className="inline-flex items-center justify-center w-7 h-7 rounded-full border-1.5 border-ink bg-accent text-white text-xs">
          {num}
        </span>
      )}
      {children && <span>{children}</span>}
      <span className="flex-1 h-px bg-ink" />
    </div>
  );
}
