// The date of the commit being built: the honest "last changed" for the sitemap and page metadata.
import { execSync } from 'node:child_process';

let date;
try { date = execSync('git log -1 --format=%cI', { stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim(); } catch { /* no git in this build */ }
export const buildDate = date ? new Date(date).toISOString() : new Date().toISOString();
