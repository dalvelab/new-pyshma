import Link from 'next/link';
import { SiteNav } from '@/components/layout/SiteNav';
import { SearchTrigger } from '@/components/search/SearchTrigger';

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-10 bg-paper border-b-1.5 border-ink">
      <div className="relative flex items-center gap-3 md:gap-7 px-4 md:px-9 py-[18px] max-w-page mx-auto">
        <Link
          href="/"
          aria-label="Это Новая Пышма"
          className="block h-[40px] w-[62px] md:h-[46px] md:w-[71px] bg-ink shrink-0"
          style={{
            WebkitMask: 'url(/logo-stacked.svg) center/contain no-repeat',
            mask: 'url(/logo-stacked.svg) center/contain no-repeat',
          }}
        />
        <SiteNav />
        <div className="md:ml-auto">
          <SearchTrigger />
        </div>
      </div>
    </header>
  );
}
