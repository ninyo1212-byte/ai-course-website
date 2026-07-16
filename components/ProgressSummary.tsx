"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Status } from "./LessonStatus";

export function ProgressSummary() {
  const [counts, setCounts] = useState({ completed: 0, inProgress: 0 });
  const [last, setLast] = useState<string | null>(null);
  useEffect(() => { const refresh = () => { let completed = 0; let inProgress = 0; for (let id = 1; id <= 37; id++) { const value = localStorage.getItem(`course:lesson:${String(id).padStart(2, "0")}`) as Status | null; if (value === "completed") completed++; if (value === "in-progress") inProgress++; } setCounts({ completed, inProgress }); setLast(localStorage.getItem("course:last-lesson")); }; refresh(); window.addEventListener("course-progress", refresh); return () => window.removeEventListener("course-progress", refresh); }, []);
  return <><h1>התקדמות אישית</h1><p className="lead">התקדמות זו נשמרת מקומית במכשיר זה.</p><div className="progress-cards"><div><strong>{counts.completed}</strong><span>שיעורים הושלמו</span></div><div><strong>{counts.inProgress}</strong><span>שיעורים בתהליך</span></div><div><strong>{37 - counts.completed - counts.inProgress}</strong><span>שיעורים לא התחילו</span></div></div>{last ? <p>השיעור האחרון: <Link href={`/lesson/${last}`}>שיעור {Number(last)}</Link></p> : <p><Link className="button" href="/course">התחל בשיעור הראשון</Link></p>}</>;
}
