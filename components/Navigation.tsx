import Link from "next/link";

export function Navigation() {
  return <header className="site-header"><nav aria-label="ניווט ראשי"><Link className="brand" href="/"><span className="brand-mark">AI</span><span>קורס AI</span></Link><div className="nav-links"><Link href="/course">מפת הקורס</Link><Link href="/project">הפרויקט</Link><Link href="/progress">התקדמות</Link></div></nav></header>;
}
