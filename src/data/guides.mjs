import { howtoGuides } from './guides/howto.mjs';
import { synonymGuides } from './guides/synonyms.mjs';

export const guides = [...howtoGuides, ...synonymGuides];
export const guideUrl = (slug) => `/${slug}/`;
export const guideBySlug = new Map(guides.map((g) => [g.slug, g]));
