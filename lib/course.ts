import fs from "node:fs";
import path from "node:path";

const root = process.cwd();

export type Lesson = { id: string; title: string; content: string };

export function readMarkdown(filename: string) {
  return fs.readFileSync(path.join(root, filename), "utf8");
}

export function getLessons(): Lesson[] {
  return Array.from({ length: 36 }, (_, index) => getLesson(String(index + 1).padStart(2, "0"))!).filter(Boolean);
}

export function getLesson(id: string): Lesson | null {
  if (!/^\d{2}$/.test(id) || Number(id) < 1 || Number(id) > 36) return null;
  const content = readMarkdown(`LESSON_${id}.md`);
  const title = /^#\s+שיעור\s+\d+:\s*(.+)$/m.exec(content)?.[1] ?? `שיעור ${Number(id)}`;
  return { id, title, content };
}
