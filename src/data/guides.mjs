import { howtoGuides } from './guides/howto.mjs';
import { synonymGuides } from './guides/synonyms.mjs';
import { articleGuides } from './guides/articles.mjs';

/** Articles first: they are the newest and the broadest entry points. */
export const guides = [...articleGuides, ...howtoGuides, ...synonymGuides];
export const articles = articleGuides;
export const guideUrl = (slug) => `/${slug}/`;
export const guideBySlug = new Map(guides.map((g) => [g.slug, g]));
