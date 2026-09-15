import { coreTools } from './tools/core.mjs';
import { editTools } from './tools/edit.mjs';
import { convertTools, upcomingTools } from './tools/convert.mjs';

export const tools = [...coreTools, ...editTools, ...convertTools];
export { upcomingTools };

export const bySlug = new Map(tools.map((t) => [t.slug, t]));
export const toolUrl = (slug) => (slug === '' ? '/' : `/${slug}/`);
export const homeTool = tools.find((t) => t.home);
