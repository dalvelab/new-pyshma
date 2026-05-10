import type { Metadata } from 'next';

interface BuildMetadataInput {
  title: string;
  description?: string;
  imageUrl?: string;
  imageAlt?: string;
  /** Тип Open Graph (по умолчанию 'article' для детальных страниц). */
  type?: 'article' | 'website';
}

/** Собирает Metadata для детальной страницы: title + description + og + twitter card. */
export function buildMetadata({
  title,
  description,
  imageUrl,
  imageAlt,
  type = 'article',
}: BuildMetadataInput): Metadata {
  const desc = description?.slice(0, 200);
  const images = imageUrl ? [{ url: imageUrl, alt: imageAlt ?? title }] : undefined;
  return {
    title,
    description: desc,
    openGraph: {
      title,
      description: desc,
      images,
      type,
    },
    twitter: {
      card: images ? 'summary_large_image' : 'summary',
      title,
      description: desc,
      images: images?.map((i) => i.url),
    },
  };
}
