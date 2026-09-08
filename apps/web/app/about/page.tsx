import type { Metadata } from 'next';
import { getAboutPage } from '@/lib/queries';

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
  const about = await getAboutPage();

  return (
    <>
      <SiteHeader />
      <main>
        <Hero intro={about?.heroIntro} />
        {about?.story && <AboutStory markdown={about.story} image={about.image} />}
        {about && about.history.length > 0 && <AboutHistory items={about.history} />}
      </main>
      <SiteFooter />
    </>
  );
}
