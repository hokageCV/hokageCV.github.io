import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function toTitle(slug) {
  return slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

const slug = process.argv[2] || 'blog-template';
const title = toTitle(slug);
const now = new Date();
const date = now.toISOString().slice(0, 10);
const year = String(now.getFullYear());

const templatePath = path.join(__dirname, 'blog-template.md');
const template = fs.readFileSync(templatePath, 'utf-8');

const content = template
  .replaceAll('{{title}}', title)
  .replaceAll('{{slug}}', slug)
  .replaceAll('{{date}}', date);

const blogsDir = path.resolve(__dirname, '..', 'src', 'collections', 'blogs', year);
fs.mkdirSync(blogsDir, { recursive: true });

const filePath = path.join(blogsDir, `${slug}.md`);

if (fs.existsSync(filePath)) {
  console.error(`File already exists: ${filePath}`);
  process.exit(1);
}

fs.writeFileSync(filePath, content);
console.log(`Created: ${filePath}`);

const editor = process.env.EDITOR || process.env.VISUAL;
if (editor) {
  execSync(`${editor} "${filePath}"`, { stdio: 'inherit' });
} else {
  console.log('Set $EDITOR to auto-open files after creation.');
}
