import Image from 'next/image';
import Link from 'next/link';
import { SocialIcon } from '@/components/ui/SocialIcon';
import { getFooter } from '@/lib/queries';

export async function SiteFooter() {
  const footer = await getFooter();
  const socials = footer?.socials ?? [];

  return (
    <footer className="border-t-1.5 border-ink bg-ink text-paper">
      <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr_1fr] gap-7 px-4 md:px-9 py-10 max-w-page mx-auto">
        <div className="flex flex-col gap-2.5">
          <Link
            href="/"
            aria-label="Это Новая Пышма"
            className="block h-9 w-14 bg-paper self-start"
            style={{
              WebkitMask: 'url(/logo-stacked.svg) center/contain no-repeat',
              mask: 'url(/logo-stacked.svg) center/contain no-repeat',
            }}
          />
          <div className="text-sm">info@shipmedia.ru</div>
          <a href="https://t.me/shipmedia" className="text-sm underline underline-offset-2">
            Рекламодателям → Telegram
          </a>
          <div className="mt-3 flex flex-col gap-1.5">
            <div className="text-[11px] text-paper/55 uppercase tracking-[0.1em]">при поддержке</div>
            <Image
              src="/elem-logo.png"
              alt="АО «Уралэлектромедь»"
              width={140}
              height={68}
              className="h-auto w-[140px]"
            />
          </div>
          <p className="mt-2 text-[11px] text-paper/55 leading-relaxed">
            ООО «Венский фестиваль» · ИНН 6685060986 · ОГРН 1146685020536
          </p>
        </div>

        {socials.length > 0 && (
          <div className="flex flex-col gap-2.5">
            <div className="text-[11px] text-paper/55 uppercase tracking-[0.1em]">соцсети</div>
            <div className="flex gap-2 flex-wrap">
              {socials.map((s) => (
                <a
                  key={s.platform}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-[38px] h-[38px] rounded-full border-1.5 border-paper/40 inline-flex items-center justify-center text-paper hover:border-paper transition-colors"
                >
                  <SocialIcon platform={s.platform} />
                </a>
              ))}
            </div>
          </div>
        )}

        {footer?.documents.length ? (
          <div className="flex flex-col gap-2">
            <div className="text-[11px] text-paper/55 uppercase tracking-[0.1em]">документы</div>
            {footer.documents.map((d) => (
              <a
                key={d.url}
                href={d.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs md:text-sm text-paper border-b border-paper/40 self-start"
              >
                {d.name}
              </a>
            ))}
          </div>
        ) : null}
      </div>
    </footer>
  );
}
