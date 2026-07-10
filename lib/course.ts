import fs from "node:fs";
import path from "node:path";

const root = process.cwd();

export type Lesson = { id: string; title: string; content: string };

export type CoursePart = {
  id: number;
  title: string;
  lessons: Lesson[];
  exercise: { title: string; content: string };
  checklist: { title: string; content: string };
  projectOutcome: string;
  advancedPractice?: string;
  clientPractice?: string;
  qualityPractice?: string;
};

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

function extractSection(markdown: string, headingPattern: RegExp) {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const start = lines.findIndex((line) => headingPattern.test(line));

  if (start === -1) {
    throw new Error(`Markdown section not found: ${headingPattern.source}`);
  }

  const heading = /^(#{1,3})\s+(.+)$/.exec(lines[start]);
  if (!heading) {
    throw new Error(`Invalid Markdown heading: ${lines[start]}`);
  }

  const level = heading[1].length;
  let end = start + 1;
  while (end < lines.length) {
    const nextHeading = /^(#{1,3})\s+/.exec(lines[end]);
    if (nextHeading && nextHeading[1].length <= level) break;
    end++;
  }

  const contentLines = lines.slice(start + 1, end);
  while (!contentLines[0]?.trim() || contentLines[0]?.trim() === "---") contentLines.shift();
  while (!contentLines.at(-1)?.trim() || contentLines.at(-1)?.trim() === "---") contentLines.pop();

  return { title: heading[2].trim(), content: contentLines.join("\n") };
}

export function getCourseParts(): CoursePart[] {
  const lessons = getLessons();
  const courseIndex = readMarkdown("COURSE_INDEX.md");
  const practicePack = readMarkdown("PRACTICE_PACK_V1_1.md");
  const partChecklists = readMarkdown("PART_CHECKLISTS_V1_1.md");
  const advancedPractice = readMarkdown("ADVANCED_PRACTICE_LAYER.md");
  const lessonRanges = [[1, 5], [6, 10], [11, 15], [16, 21], [22, 26], [27, 32], [33, 36]];

  const advancedWorkflow = extractSection(advancedPractice, /^### תרגול 1:/).content;
  const clientPractice = extractSection(advancedPractice, /^### תרגול 2:/).content;
  const qualityPractice = extractSection(advancedPractice, /^### תרגול 3:/).content;

  return lessonRanges.map(([start, end], index) => {
    const id = index + 1;
    const coursePart = extractSection(courseIndex, new RegExp(`^# חלק ${id}:`));
    const projectOutcome = extractSection(coursePart.content, /^## התקדמות בפרויקט המרכזי$/).content;
    const exercise = extractSection(practicePack, new RegExp(`^## תרגיל ${id} —`));
    const checklist = extractSection(partChecklists, new RegExp(`^## Checklist ${id} —`));

    return {
      id,
      title: coursePart.title.replace(/^חלק \d+:\s*/, ""),
      lessons: lessons.filter((lesson) => Number(lesson.id) >= start && Number(lesson.id) <= end),
      exercise,
      checklist,
      projectOutcome,
      advancedPractice: id === 6 ? advancedWorkflow : undefined,
      clientPractice: id === 7 ? clientPractice : undefined,
      qualityPractice: id === 7 ? qualityPractice : undefined,
    };
  });
}
