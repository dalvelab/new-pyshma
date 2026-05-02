/* Reusable list-skeleton placeholder for any listing page (news / events / sport). */

interface Props {
  /** How many cards to render */
  count?: number;
  /** Tailwind grid classes for the wrapping grid */
  grid?: string;
}

export function ListSkeleton({
  count = 8,
  grid = 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
}: Props) {
  return (
    <div className={`grid ${grid} gap-5`} aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="border-1.5 border-ink rounded-xl overflow-hidden">
          <div className="h-40 bg-ink-10 animate-pulse" />
          <div className="p-4 flex flex-col gap-2">
            <div className="flex gap-2">
              <div className="h-5 w-16 rounded-full bg-ink-10 animate-pulse" />
              <div className="h-5 w-12 rounded-full bg-ink-10 animate-pulse" />
            </div>
            <div className="h-4 w-11/12 bg-ink-10 animate-pulse rounded" />
            <div className="h-4 w-7/12 bg-ink-10 animate-pulse rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}
