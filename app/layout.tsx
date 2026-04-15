import Link from "next/link";
import type { Metadata } from "next";
import "./globals.css";
import ThemeToggle from "./components/ThemeToggle";

export const metadata: Metadata = {
  title: "Latent Space Museum",
  description: "A permissionless system for mapping experiential geographies.",
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
            <Link href="/" className="brand link-plain">
              LSM
            </Link>
            <nav className="nav-links">
              <Link className="nav-link" href="/submit">
                Submit
              </Link>
              <Link className="nav-link" href="/genres">
                Genres
              </Link>
              <Link className="nav-link" href="/frameworks">
                Frameworks
              </Link>
              <Link className="nav-link" href="/interpretations">
                Interpretations
              </Link>
              <Link className="nav-link" href="/renderings">
                Renderings
              </Link>
              <Link className="nav-link" href="/about">
                About
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
