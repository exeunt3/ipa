import Link from "next/link";
import type { Metadata } from "next";
import "./globals.css";
import ThemeToggle from "./components/ThemeToggle";

export const metadata: Metadata = {
  title: "Intensive Protocol Archive",
  description: "A Markdown-first archive for intensive protocols and experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="site-body">
        <div className="site-shell">
          <header className="site-header">
            <Link href="/" className="brand">
              IPA
            </Link>
            <nav className="nav-links">
              <Link className="nav-link" href="/protocols">
                Protocols
              </Link>
              <Link className="nav-link" href="/about">
                About
              </Link>
              <Link className="nav-link" href="/experiences/new">
                Add Experience
              </Link>
              <Link className="nav-link" href="/protocols/new">
                New Protocol
              </Link>
              <ThemeToggle />
            </nav>
          </header>
          <div className="page-shell">{children}</div>
        </div>
      </body>
    </html>
  );
}
