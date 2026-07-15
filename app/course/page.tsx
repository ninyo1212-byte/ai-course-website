import Link from "next/link";
import { getCourseParts } from "@/lib/course";
import { MarkdownContent } from "@/components/MarkdownContent";
import { LessonStatus } from "@/components/LessonStatus";

export default function CoursePage() {
  const parts = getCourseParts();

  return (
    <section className="content-page course-page">
      <h1>מפת הקורס</h1>
      <p className="lead">התקדם לפי שבעת חלקי הקורס. לאחר כל חלק מחכה לך תרגיל מסכם קצר ובדיקת מוכנות אופציונלית.</p>

      <div className="course-parts">
        {parts.map((part) => (
          <section className="course-part" key={part.id}>
            <header className="course-part-header">
              <span className="course-part-number">חלק {part.id}</span>
              <h2>{part.title}</h2>
              <span className="course-part-count">{part.lessons.length} שיעורים</span>
            </header>

            <div className="lesson-grid">
              {part.lessons.map((lesson) => (
                <article className="lesson-card" key={lesson.id}>
                  <span>שיעור {lesson.id}</span>
                  <h3><Link href={`/lesson/${lesson.id}`}>{lesson.title}</Link></h3>
                  <LessonStatus lessonId={lesson.id} compact />
                </article>
              ))}
            </div>

            <details className="part-completion">
              <summary>
                <span>
                  <strong>לאחר סיום חלק זה</strong>
                  <small>תרגיל מסכם, Checklist ותוצר לפרויקט המרכזי</small>
                </span>
                <span className="part-completion-toggle" aria-hidden="true">+</span>
              </summary>

              <div className="part-completion-content">
                <p className="completion-intro">בצע את השלב הזה רק אחרי שסיימת את כל שיעורי החלק.</p>

                <section className="completion-block">
                  <span className="completion-label">תרגיל מסכם</span>
                  <h3>{part.exercise.title.replace(/^תרגיל \d+\s+—\s+/, "")}</h3>
                  <p className="completion-summary">כאן מכינים את התוצר המעשי שמסכם את החלק.</p>
                  <MarkdownContent content={part.exercise.content} />
                </section>

                <section className="completion-block">
                  <span className="completion-label">Checklist מוכנות</span>
                  <h3>{part.checklist.title.replace(/^Checklist \d+\s+—\s+/, "")}</h3>
                  <p className="completion-summary">בודקים שהבנת, תרגלת ושאתה מוכן להמשיך.</p>
                  <MarkdownContent content={part.checklist.content} />
                </section>

                <section className="completion-block project-outcome-block">
                  <span className="completion-label">התוצר לפרויקט המרכזי</span>
                  <p className="completion-summary">זה מה שצריך להישאר מתועד בפרויקט בסיום החלק.</p>
                  <MarkdownContent content={part.projectOutcome} />
                  <Link className="button button-secondary" href="/project">לעבודה בפרויקט המרכזי</Link>
                </section>

                {part.advancedPractice && (
                  <section className="completion-block advanced-practice-block">
                    <span className="completion-label">תרגול מתקדם</span>
                    <h3>עבודה מקצועית עם Codex, Claude Code ו־GitHub</h3>
                    <MarkdownContent content={part.advancedPractice} />
                  </section>
                )}

                {part.clientPractice && part.qualityPractice && (
                  <section className="completion-block client-deliverables-block">
                    <span className="completion-label">תוצרי לקוח לסיום הקורס</span>
                    <h3>חבילת מסירה מקצועית</h3>
                    <ul className="client-deliverables">
                      <li>מסמך אפיון קצר</li>
                      <li>דמו או הסבר פתרון</li>
                      <li>הצעת מחיר בסיסית</li>
                      <li>תוכנית מסירה ותחזוקה</li>
                      <li>תיעוד בדיקות</li>
                    </ul>
                    <div className="client-practice-details">
                      <h3>תרגול חבילת תוצר לקוח</h3>
                      <MarkdownContent content={part.clientPractice} />
                      <h3>תרגול בדיקות ואיכות</h3>
                      <MarkdownContent content={part.qualityPractice} />
                    </div>
                  </section>
                )}

                {part.buildLabs.length > 0 && (
                  <section className="build-labs-section">
                    <div className="build-labs-heading">
                      <span className="completion-label">בנייה מעשית · V1.2</span>
                      <p>כאן בונים בפועל את השלב הבא בפרויקט המרכזי.</p>
                    </div>
                    <div className="build-labs-grid">
                      {part.buildLabs.map((lab) => (
                        <section className="completion-block build-lab-block" key={lab.id}>
                          <span className="build-lab-label">מעבדת בנייה מעשית · מעבדה {lab.id}</span>
                          <h3>{lab.title}</h3>
                          <MarkdownContent content={lab.content} />
                        </section>
                      ))}
                    </div>
                  </section>
                )}

                <p className="completion-next-step">לאחר שסיימת את התרגיל, עברת על ה־Checklist ושמרת את התוצר בפרויקט — אפשר להמשיך לחלק הבא.</p>
              </div>
            </details>
          </section>
        ))}
      </div>
    </section>
  );
}
