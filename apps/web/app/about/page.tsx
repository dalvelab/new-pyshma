import type { Metadata } from 'next';
import { getPageIntros } from '@/lib/queries';
import { ABOUT_HISTORY, ABOUT_STORY_MD } from '@/lib/about-content';

import { SiteHeader } from '@/components/layout/SiteHeader';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { Hero } from '@/components/home/Hero';
import { AboutStory } from '@/components/about/AboutStory';
import { AboutHistory } from '@/components/about/AboutHistory';

export const revalidate = 60;

/* Страница пока не в навигации — доступна только по прямой ссылке,
   поэтому не даём её индексировать. */
export const metadata: Metadata = {
  title: 'О проекте — Новая Пышма',
  robots: { index: false, follow: false },
};

export default async function AboutPage() {
  const intros = await getPageIntros();

  return (
    <>
      <SiteHeader />
      <main>
        <Hero intro={intros.heroIntro} />
        <AboutStory
          markdown={ABOUT_STORY_MD}
          image={{ src: '/cover.png', alt: 'Новая Пышма' }}
        />
        <AboutHistory items={ABOUT_HISTORY} />
      </main>
      <SiteFooter />
    </>
  );
}
