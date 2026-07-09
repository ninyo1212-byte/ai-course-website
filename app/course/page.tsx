import Link from "next/link";
import { getLessons, readMarkdown } from "@/lib/course";
import { MarkdownContent } from "@/components/MarkdownContent";
import { LessonStatus } from "@/components/LessonStatus";

export default function CoursePage() {
  const lessons = getLessons();
  return (
    <section className="content-page">
      <h1>מפת הקורס</h1>
      <p className="lead">בחר שיעור והתקדם לפי הסדר. סימון ההתקדמות נשמר במכשיר זה בלבד.</p>
      <div className="lesson-grid">
        {lessons.map((lesson) => (
          <article className="lesson-card" key={lesson.id}>
            <span>שיעור {lesson.id}</span>
            <h2><Link href={`/lesson/${lesson.id}`}>{lesson.title}</Link></h2>
            <LessonStatus lessonId={lesson.id} compact />
          </article>
        ))}
      </div>
      <details className="source-content">
        <summary>מפת הקורס המלאה</summary>
        <MarkdownContent content={readMarkdown("COURSE_INDEX.md")} />
      </details>
    </section>
  );
}
