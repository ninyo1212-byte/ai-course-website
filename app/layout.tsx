import type { Metadata } from "next";
import "./globals.css";
import { Navigation } from "@/components/Navigation";

export const metadata: Metadata = {
  title: "קורס AI",
  description: "סביבת למידה אישית לקורס AI בעברית"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="he" dir="rtl">
      <body>
        <Navigation />
        <main className="page-shell">{children}</main>
      </body>
    </html>
  );
}
