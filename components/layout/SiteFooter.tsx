export function SiteFooter() {
  return (
    <footer className="border-t-1.5 border-ink bg-ink text-paper">
      <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr_1fr] gap-7 px-4 md:px-9 py-10 max-w-page mx-auto">
        <div className="flex flex-col gap-2.5">
          <span
            aria-label="Это Новая Пышма"
            className="block h-9 w-20 bg-paper"
            style={{
              WebkitMask: 'url(/logo-stacked.svg) center/contain no-repeat',
              mask: 'url(/logo-stacked.svg) center/contain no-repeat',
            }}
          />
          <div className="text-sm">info@shipmedia.ru</div>
          <a href="https://t.me/shipmedia" className="text-sm underline underline-offset-2">
            Рекламодателям → Telegram
          </a>
          <p className="mt-2 text-[11px] text-paper/55 leading-relaxed">
            ООО «ШИП-Медиа» · ИНН 0000000000 · ОГРН 0000000000000
          </p>
        </div>
        <div className="flex flex-col gap-2.5">
          <div className="text-[11px] text-paper/55 uppercase tracking-[0.1em]">соцсети</div>
          <div className="flex gap-2 flex-wrap">
            {['ВК', 'TG', 'Max', 'Дзен'].map((s) => (
              <a
                key={s}
                href="#"
                className="w-[38px] h-[38px] rounded-full border-1.5 border-paper/40 inline-flex items-center justify-center text-[11px]"
              >
                {s}
              </a>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="text-[11px] text-paper/55 uppercase tracking-[0.1em]">документы</div>
          <a
            href="/legal/terms"
            className="text-xs md:text-base text-paper border-b border-paper/40 self-start"
          >
            Пользовательское соглашение
          </a>
          <a
            href="/legal/privacy"
            className="text-xs md:text-base text-paper border-b border-paper/40 self-start"
          >
            Политика конфиденциальности
          </a>
        </div>
      </div>
    </footer>
  );
}
