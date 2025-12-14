import Link from "next/link";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Intensive Protocol Archive",
  description: "A calm, Markdown-first archive for intensive protocols and experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} site-body`}>
        <div className="site-shell">
          <header className="site-header">
            <Link href="/" className="brand">
              IPA
              <small>Intensive Protocol Archive</small>
            </Link>
            <nav className="nav-links">
              <Link className="pill-link" href="/protocols">
                Protocols
              </Link>
              <Link className="pill-link" href="/experiences/new">
                Add experience
              </Link>
              <Link className="pill-link" href="/protocols/new">
                New protocol
              </Link>
            </nav>
          </header>
          <div className="page-shell">{children}</div>
        </div>
      </body>
    </html>
  );
}
