import { MarkdownContent } from "@/components/MarkdownContent";
import { ProjectWorkspace } from "@/components/ProjectWorkspace";
import { readMarkdown } from "@/lib/course";

export default function ProjectPage() {
  return (
    <section className="content-page">
      <h1>הפרויקט המרכזי</h1>
      <p className="lead">רשום את ההתקדמות האישית שלך. המידע נשמר רק במכשיר זה.</p>
      <ProjectWorkspace />
      <details className="source-content">
        <summary>מסמך המעקב המלא</summary>
        <MarkdownContent content={readMarkdown("PROJECT_TRACKER.md")} />
      </details>
    </section>
  );
}
