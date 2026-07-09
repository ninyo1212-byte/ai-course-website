"use client";

import { useEffect, useState } from "react";
import type { Status } from "./LessonStatus";

const parts = ["יסודות AI וחשיבה מקצועית", "עבודה נכונה עם כלי AI", "אפיון עסקי ותכנון פתרון AI", "אוטומציות וחיבור מערכות", "נתונים, בסיסי ידע ו-RAG", "סוכני AI ופיתוח פתרונות", "פריסה, ייעוץ ומסירה"];

export function ProjectWorkspace() {
  const [notes, setNotes] = useState<Record<number, string>>({});
  const [checks, setChecks] = useState<Record<number, boolean>>({});
  const [statuses, setStatuses] = useState<Record<number, Status>>({});
  useEffect(() => { setNotes(JSON.parse(localStorage.getItem("course:project-notes") || "{}")); setChecks(JSON.parse(localStorage.getItem("course:project-checks") || "{}")); setStatuses(JSON.parse(localStorage.getItem("course:project-status") || "{}")); }, []);
  function saveNotes(next: Record<number, string>) { setNotes(next); localStorage.setItem("course:project-notes", JSON.stringify(next)); }
  function saveChecks(next: Record<number, boolean>) { setChecks(next); localStorage.setItem("course:project-checks", JSON.stringify(next)); }
  function saveStatus(next: Record<number, Status>) { setStatuses(next); localStorage.setItem("course:project-status", JSON.stringify(next)); }
  return <div className="project-list">{parts.map((part, index) => { const id = index + 1; return <section className="project-part" key={id}><h2>חלק {id}: {part}</h2><label><input type="checkbox" checked={checks[id] || false} onChange={(event) => saveChecks({ ...checks, [id]: event.target.checked })} /> בדקתי מה צריך להיות מוכן בחלק זה</label><label className="project-status">סטטוס <select value={statuses[id] || "not-started"} onChange={(event) => saveStatus({ ...statuses, [id]: event.target.value as Status })}><option value="not-started">לא התחלתי</option><option value="in-progress">בתהליך</option><option value="completed">הושלם</option></select></label><textarea value={notes[id] || ""} onChange={(event) => saveNotes({ ...notes, [id]: event.target.value })} placeholder="רעיונות, אפיון, תיעוד התקדמות והערות אישיות..." rows={5} /></section>; })}</div>;
}
