import Link from "next/link";
import { notFound } from "next/navigation";
import { MarkdownContent } from "@/components/MarkdownContent";
import { LessonStatus } from "@/components/LessonStatus";
import { getLesson, getLessons } from "@/lib/course";

export function generateStaticParams() {
  return getLessons().map((lesson) => ({ id: lesson.id }));
}

export default async function LessonPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const lesson = getLesson(id);
  if (!lesson) notFound();
  const previous = Number(id) > 1 ? String(Number(id) - 1).padStart(2, "0") : null;
  const next = Number(id) < 37 ? String(Number(id) + 1).padStart(2, "0") : null;

  return (
    <section className="content-page lesson-page">
      <div className="breadcrumb"><Link href="/course">מפת הקורס</Link> / שיעור {lesson.id}</div>
      <LessonStatus lessonId={lesson.id} />
      <MarkdownContent content={lesson.content} />
      <nav className="lesson-nav" aria-label="ניווט בין שיעורים">
        {previous ? <Link className="button button-secondary" href={`/lesson/${previous}`}>לשיעור הקודם</Link> : <span />}
        {next ? <Link className="button" href={`/lesson/${next}`}>לשיעור הבא</Link> : <span />}
      </nav>
    </section>
  );
}
