import { Fragment } from "react";

function inline(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, index) => part.startsWith("**") && part.endsWith("**") ? <strong key={index}>{part.slice(2, -2)}</strong> : <Fragment key={index}>{part}</Fragment>);
}

export function MarkdownContent({ content }: { content: string }) {
  const lines = content.replace(/\r\n/g, "\n").split("\n");
  const elements: React.ReactNode[] = [];
  let index = 0;
  while (index < lines.length) {
    const line = lines[index];
    if (!line.trim()) { index++; continue; }
    if (line.startsWith("```")) { const start = index; const code: string[] = []; index++; while (index < lines.length && !lines[index].startsWith("```")) code.push(lines[index++]); index++; elements.push(<pre key={`code-${start}`}><code>{code.join("\n")}</code></pre>); continue; }
    if (line === "---") { elements.push(<hr key={`divider-${index}`} />); index++; continue; }
    const heading = /^(#{1,3})\s+(.+)$/.exec(line);
    if (heading) {
      const title = heading[2].trim();
      if (heading[1].length === 2 && (title === "מקורות מומלצים לבדיקה לפני כתיבה" || title === "בדיקה לפני סיום כתיבת שיעור")) {
        index++;
        while (index < lines.length && !/^#{1,2}\s+/.test(lines[index])) index++;
        continue;
      }
      const level = heading[1].length;
      const Tag = (`h${level}` as "h1" | "h2" | "h3");
      elements.push(<Tag key={`heading-${index}`}>{inline(title)}</Tag>);
      index++;
      continue;
    }
    if (/^-\s+/.test(line)) { const start = index; const items: string[] = []; while (index < lines.length && /^-\s+/.test(lines[index])) items.push(lines[index++].replace(/^-\s+/, "")); elements.push(<ul key={`list-${start}`}>{items.map((item, itemIndex) => <li key={`list-${start}-item-${itemIndex}`}>{inline(item)}</li>)}</ul>); continue; }
    if (/^\d+\.\s+/.test(line)) { const start = index; const items: string[] = []; while (index < lines.length && /^\d+\.\s+/.test(lines[index])) items.push(lines[index++].replace(/^\d+\.\s+/, "")); elements.push(<ol key={`list-${start}`}>{items.map((item, itemIndex) => <li key={`list-${start}-item-${itemIndex}`}>{inline(item)}</li>)}</ol>); continue; }
    elements.push(<p key={`paragraph-${index}`}>{inline(line.replace(/  $/, ""))}</p>); index++;
  }
  return <article className="markdown-content">{elements}</article>;
}
