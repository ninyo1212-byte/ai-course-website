"use client";

import { useEffect, useState } from "react";

export type Status = "not-started" | "in-progress" | "completed";
const labels: Record<Status, string> = { "not-started": "לא התחלתי", "in-progress": "בתהליך", completed: "הושלם" };

function readStatus(id: string): Status {
  if (typeof window === "undefined") return "not-started";
  return (localStorage.getItem(`course:lesson:${id}`) as Status) || "not-started";
}

export function LessonStatus({ lessonId, compact = false }: { lessonId: string; compact?: boolean }) {
  const [status, setStatus] = useState<Status>("not-started");
  useEffect(() => { setStatus(readStatus(lessonId)); }, [lessonId]);
  function update(value: Status) { localStorage.setItem(`course:lesson:${lessonId}`, value); localStorage.setItem("course:last-lesson", lessonId); setStatus(value); window.dispatchEvent(new Event("course-progress")); }
  if (compact) return <span className={`status-pill ${status}`}>{labels[status]}</span>;
  return <fieldset className="status-control"><legend>התקדמות בשיעור</legend>{(Object.keys(labels) as Status[]).map((value) => <label key={value}><input type="radio" name={`lesson-${lessonId}`} checked={status === value} onChange={() => update(value)} /> {labels[value]}</label>)}</fieldset>;
}
