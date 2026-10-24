import type { APIRoute } from 'astro';
import { site as content, projects } from '../data/site';

// Generate from the same corrected content as the pages so old location, credit and profile
// wording cannot survive in a forgotten static copy of this file.
export const GET: APIRoute = ({ site }) => new Response([
  `# ${content.name}`, '', content.description, '', `Website: ${site!.href}`,
  `Contact: ${content.email}`, '', '## About', ...content.about.bio,
  '', '## Work', ...projects.flatMap((project) => [
    `### ${project.title}`, project.summary,
    ...(project.contribution ? [`My part: ${project.contribution}`] : []),
    `Status or result: ${project.proof ?? project.result}`,
    `Case study: ${new URL(`/work/${project.slug}/`, site).href}`,
    ...project.links.map((link) => `${link.label}: ${link.href}`), '',
  ]), '## Roles', ...content.about.roles.map((role) => `${role.title}, ${role.when}: ${role.text}`),
  '', '## Recognition', ...content.about.recognition,
  '', '## Writing', ...content.about.writing.map((article) => `${article.title}: ${article.href}`),
  '', '## Profiles', ...[...content.socials, ...content.otherProfiles].map((link) => `${link.label}: ${link.href}`), '',
].join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
