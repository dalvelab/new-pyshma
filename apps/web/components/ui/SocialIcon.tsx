import { SiTelegram, SiVk } from 'react-icons/si';
import type { SocialPlatform } from '@/lib/types';

interface Props {
  platform: SocialPlatform;
  className?: string;
}

const LABELS: Record<SocialPlatform, string> = {
  vk: 'ВКонтакте',
  telegram: 'Telegram',
  max: 'Max',
  dzen: 'Дзен',
};

/** Иконки соцсетей. VK/Telegram — из simple-icons (react-icons/si).
 *  Max и Дзен — буквенные значки (нет в simple-icons на момент написания). */
export function SocialIcon({ platform, className = 'w-4 h-4' }: Props) {
  const title = LABELS[platform];
  switch (platform) {
    case 'vk':
      return <SiVk aria-label={title} className={className} />;
    case 'telegram':
      return <SiTelegram aria-label={title} className={className} />;
    case 'max':
      return (
        <span
          aria-label={title}
          className="font-extrabold text-[12px] tracking-tighter leading-none"
        >
          M
        </span>
      );
    case 'dzen':
      return (
        <span
          aria-label={title}
          className="font-extrabold text-[12px] tracking-tighter leading-none"
        >
          Я
        </span>
      );
  }
}
