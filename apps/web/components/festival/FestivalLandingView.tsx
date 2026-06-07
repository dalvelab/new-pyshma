import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import type { FestivalLanding, FestivalProgram, PastFestival } from '@/lib/types';
import { FaqItem } from './FaqItem';
import { FestivalCountdown } from './FestivalCountdown';
import { ProgramTabs } from './ProgramTabs';

interface Props {
  data: FestivalLanding;
  pastYears: PastFestival[];
  programs: FestivalProgram[];
}

function pluralDays(n: number): string {
  const abs = n % 100;
  if (abs > 10 && abs < 20) return 'дней';
  const n1 = n % 10;
  if (n1 === 1) return 'день';
  if (n1 >= 2 && n1 <= 4) return 'дня';
  return 'дней';
}

export function FestivalLandingView({ data, pastYears, programs }: Props) {
  const msLeft = new Date(data.startsAt).getTime() - Date.now();
  const daysLeft = msLeft > 0 ? Math.ceil(msLeft / 86_400_000) : 0;

  return (
    <article>
      {/* HERO — editorial poster on dark */}
      <section className="relative bg-ink text-cream overflow-hidden border-b-1.5 border-ink">
        <div className="relative max-w-page mx-auto px-4 md:px-9 pt-12 pb-8 grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-9">
          {/* Left — typography */}
          <div>
            <div className="flex flex-wrap gap-2.5 mb-6">
              <span className="font-bold text-[11px] tracking-[0.22em] uppercase px-3 py-1.5 border-1.5 border-cream rounded-full">
                фестиваль{data.seasonLabel ? ` · ${data.seasonLabel}` : ''}
              </span>
              <span className="font-bold text-[11px] tracking-[0.22em] uppercase text-paper/60 self-center">
                {data.date}
              </span>
            </div>

            <h1 className="m-0 font-extrabold text-[44px] sm:text-[72px] md:text-[156px] leading-[0.86] tracking-tighter2">
              Это
              <br />
              <span className="text-accent">Новая</span>
              <br />
              Пышма
              <span className="font-medium italic text-paper/55 ml-2 md:ml-3.5 inline-block text-[28px] sm:text-[44px] md:text-[96px] tracking-tight">
                fest
              </span>
            </h1>
            <p className="mt-6 max-w-[600px] text-[17px] leading-relaxed text-paper/85">
              {data.intro}
            </p>

            <div className="mt-8 flex gap-3 flex-wrap">
              <Button variant="primary" href="#program">
                программа →
              </Button>
              {pastYears.length > 0 && (
                <a
                  href="#past"
                  className="px-[22px] py-3.5 rounded-lg border-1.5 border-cream bg-transparent text-cream font-bold text-sm tracking-wide cursor-pointer btn-hover"
                >
                  как это было
                </a>
              )}
            </div>
          </div>

          {/* Right — meta card */}
          <div className="flex flex-col gap-3.5 self-end">
            <div className="aspect-[4/5] rounded-xl overflow-hidden border-1.5 border-cream relative">
              <Image
                src={data.poster?.url ?? '/festival-poster.png'}
                alt={data.poster?.alt ?? 'Постер фестиваля'}
                fill
                sizes="(max-width: 1024px) 100vw, 400px"
                className="object-cover"
                priority
              />
            </div>

            <div className="grid grid-cols-2 border-1.5 border-cream rounded-xl overflow-hidden">
              {[
                { l: 'дата', v: data.date, sub: '' },
                { l: 'место', v: 'Площадь', sub: data.city },
                { l: 'вход', v: 'свободный', sub: 'без билетов' },
                {
                  l: 'программа',
                  v: `${programs.length}`,
                  sub: programs.length === 1 ? 'событие' : 'событий',
                },
              ].map((x, i) => (
                <div
                  key={x.l}
                  className={`p-4 ${i % 2 === 0 ? 'border-r border-paper/25' : ''} ${i < 2 ? 'border-b border-paper/25' : ''}`}
                >
                  <div className="font-bold text-[10px] tracking-[0.18em] uppercase text-paper/55">
                    {x.l}
                  </div>
                  <div className="font-extrabold text-[18px] mt-1 text-cream truncate">{x.v}</div>
                  <div className="font-medium text-[11px] mt-0.5 text-paper/60 truncate">
                    {x.sub}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* COUNTDOWN */}
      <FestivalCountdown startsAt={data.startsAt} />

      {/* PROGRAM */}
      {programs.length > 0 && (
        <section id="program" className="px-4 md:px-9 py-12 max-w-page mx-auto">
          <SectionHeader title="Программа" />
          <ProgramTabs items={programs} />
        </section>
      )}

      {/* VENUES — карта площадок */}
      {data.mapImage && (
        <section id="venues" className="py-12 border-t-1.5 border-ink bg-paper-2">
          <div className="max-w-page mx-auto px-4 md:px-9">
            <SectionHeader title="Карта · площадки" />
            <div className="relative aspect-[16/8] border-1.5 border-ink rounded-xl overflow-hidden bg-cream">
              <Image
                src={data.mapImage.url}
                alt={data.mapImage.alt ?? 'Карта фестиваля'}
                fill
                sizes="(max-width: 1280px) 100vw, 1280px"
                className="object-contain"
              />
            </div>
          </div>
        </section>
      )}

      {/* PAST YEARS */}
      {pastYears.length > 0 && (
      <section id="past" className="py-12 border-t-1.5 border-ink bg-cream">
        <div className="max-w-page mx-auto px-4 md:px-9">
          <SectionHeader
            title={`Архив · ${pastYears.length} ${pastYears.length === 1 ? 'сезон' : 'сезона'}`}
          />
          <h2 className="m-0 mb-7 font-extrabold text-[32px] sm:text-[44px] md:text-[64px] leading-[0.95] tracking-tighter2">
            Как это было
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[22px]">
            {pastYears.map((y) => (
              <Card key={y.year} className="flex flex-col h-full overflow-hidden">
                <div className="relative h-[200px] sm:h-[280px] overflow-hidden">
                  <Image
                    src={y.image.url}
                    alt={y.image.alt ?? `${y.year}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                  <div
                    className="absolute left-[18px] top-[18px] font-extrabold text-[64px] sm:text-[96px] leading-[0.85] tracking-tighter2 text-cream z-10"
                    style={{ textShadow: '2px 2px 0 #181412' }}
                  >
                    {y.year}
                  </div>
                  <div className="absolute right-[18px] top-[18px] px-3 py-1.5 rounded-full bg-cream border-1.5 border-ink font-bold text-[11px] tracking-[0.18em] uppercase z-10">
                    сезон
                  </div>
                </div>
                <div className="p-[22px] flex flex-col gap-3.5 flex-1">
                  <div className="font-bold text-[22px] leading-[1.2] text-balance">{y.title}</div>
                  {y.lead && (
                    <div className="font-medium text-sm leading-relaxed text-ink-70">{y.lead}</div>
                  )}
                  {y.stats && y.stats.length > 0 && (
                    <div className="grid grid-cols-3 border-1.5 border-ink rounded-lg overflow-hidden">
                      {y.stats.map((st, i) => (
                        <div
                          key={st.l}
                          className={`px-2 sm:px-3.5 py-2.5 sm:py-3 ${i < y.stats!.length - 1 ? 'border-r border-ink-20' : ''}`}
                        >
                          <div className="font-extrabold text-[20px] sm:text-[26px] tracking-tighter">{st.v}</div>
                          <div className="font-bold text-[9px] sm:text-[10px] text-ink-50 tracking-[0.12em] sm:tracking-[0.16em] uppercase mt-0.5 truncate">
                            {st.l}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="flex gap-2.5 mt-1">
                    <button className="px-3.5 py-2.5 rounded-lg border-1.5 border-ink bg-ink text-cream font-bold text-xs tracking-wide uppercase cursor-pointer btn-hover">
                      фотоальбом →
                    </button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* PARTNERS */}
      {data.partners && data.partners.length > 0 && (
        <section id="partners" className="py-12 border-t-1.5 border-ink bg-cream">
          <div className="max-w-page mx-auto px-4 md:px-9">
            <SectionHeader title="Партнёры" />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-[18px]">
              {data.partners.map((p, i) => {
                const inner = (
                  <div className="relative aspect-[3/2] w-full">
                    <Image
                      src={p.logo.url}
                      alt={p.logo.alt ?? p.name}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-contain p-5"
                    />
                  </div>
                );
                return (
                  <Card key={i} className="overflow-hidden btn-hover">
                    {p.url ? (
                      <a
                        href={p.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={p.name}
                        className="block"
                      >
                        {inner}
                      </a>
                    ) : (
                      inner
                    )}
                  </Card>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* FAQ + CTA */}
      {data.faq && data.faq.length > 0 && (
        <section className="py-12 border-t-1.5 border-ink bg-paper-2">
          <div className="max-w-page mx-auto px-4 md:px-9 grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-9">
            <div>
              <SectionHeader title="Быстрые ответы" />
              <div className="flex flex-col">
                {data.faq.map((f, i) => (
                  <FaqItem key={i} index={i} question={f.q} answer={f.a} first={i === 0} />
                ))}
              </div>
            </div>

            <div className="relative self-start bg-ink text-cream rounded-2xl p-7 flex flex-col gap-5 overflow-hidden">
              <div
                className="absolute inset-0 opacity-70 pointer-events-none"
                style={{
                  background:
                    'radial-gradient(circle at 80% 20%, rgb(250,80,35) 0 70px, transparent 80px)',
                }}
              />
              <div className="relative">
                <div className="font-bold text-[11px] tracking-[0.22em] uppercase text-paper/60 mb-2.5">
                  будь рядом
                </div>
                <div className="font-extrabold text-[36px] leading-[0.98] tracking-tighter2">
                  {daysLeft > 0 ? (
                    <>
                      До&nbsp;фестиваля
                      <br />
                      {daysLeft}&nbsp;{pluralDays(daysLeft)}.
                      <br />
                    </>
                  ) : (
                    <>
                      Фестиваль
                      <br />
                      уже начался.
                      <br />
                    </>
                  )}
                  <span className="text-accent">Не пропустите.</span>
                </div>
                <div className="mt-4 font-medium text-sm leading-relaxed text-paper/70">
                  Подпишитесь, чтобы первыми узнавать про лайн-ап, перенос площадок и другие новости.
                </div>
              </div>
              <div className="relative flex flex-col gap-2.5">
                <a
                  href="https://t.me/shipmedia"
                  className="px-[18px] py-3.5 rounded-lg border-1.5 border-accent bg-accent text-cream font-bold text-sm tracking-wide uppercase cursor-pointer flex justify-between items-center btn-hover"
                >
                  <span>Telegram-канал</span>
                  <span>→</span>
                </a>
                <a
                  href="https://vk.com/shipmedia"
                  className="px-[18px] py-3.5 rounded-lg border-1.5 border-cream bg-transparent text-cream font-bold text-sm tracking-wide uppercase cursor-pointer flex justify-between items-center btn-hover"
                >
                  <span>VK-сообщество</span>
                  <span>→</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      )}
    </article>
  );
}

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-3 mb-7">
      <span className="font-bold text-[11px] tracking-[0.22em] uppercase text-ink-50">{title}</span>
      <span className="flex-1 h-[1.5px] bg-ink-20" />
    </div>
  );
}
