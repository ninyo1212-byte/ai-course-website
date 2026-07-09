import Link from "next/link";
import { readMarkdown } from "@/lib/course";
import { MarkdownContent } from "@/components/MarkdownContent";

export default function HomePage() {
  return (
    <section className="content-page">
      <div className="hero-actions">
        <Link className="button" href="/course">התחל במפת הקורס</Link>
        <Link className="button button-secondary" href="/progress">הצג התקדמות</Link>
      </div>
      <MarkdownContent content={readMarkdown("START_HERE.md")} />
    </section>
  );
}
