"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <main>
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="hero-line">Intensive</span>
            <span className="hero-line">Protocol</span>
            <span className="hero-line">Archive</span>
          </h1>
          <p className="hero-subtitle">
            A database for non-pharmacological
            <br />
            technologies of altered states.
          </p>
          <div className="hero-actions">
            <Link className="button" href="/protocols">
              Enter the Archive
            </Link>
            <Link className="button button-outline" href="/protocols/new">
              Publish a Protocol
            </Link>
          </div>
        </div>
      </section>

      <section className="intro-section">
        <h2>What is an Intensive Protocol?</h2>
        <p>
          An intensive protocol is a structured, repeatable practice for
          entering or modulating non-ordinary modes of experience. It specifies
          conditions, roles, constraints, and sequences that shape how an event
          of experience, while refusing appeals to authority, belief, or
          prescribed meaning. Rather than instructing participants what to
          experience, intensive protocols set the conditions under which
          experience can emerge, be felt out, and be collectively negotiated.
        </p>
        <p>
          Being a genre of open protocols, intensive protocols typically arise
          outside formal institutions and are circulated in extitutional
          contexts: scenes, marginalized subcultures, hacker and maker lineages,
          and all those who seek out in their practice the glowing convergence
          of autonomy and necessity. Over time, in passing through the creative
          furnace of the publics, these practices become materially refined and
          memetically compact systems for reliably entering, modulating, or
          sustaining intensive states (whether individual, collective, or
          environmental).
        </p>
        <p>
          The Intensive Protocol Archive documents these open protocols,
          alongside first-person experiential reports of their application.
          Contributors can publish new protocols, adapt existing ones, or share
          phenomenological accounts of what a practice actually feels like from
          the inside. All entries are versioned, remixable, and shared under
          open licenses.
        </p>
        <p className="ethics-note">
          IPA is situated in the underground traditions of high agency,
          participatory, consent-based coordination that values and strives to
          respect the autonomy of all life. If your protocols or experiences do
          not reflect that, please do not post here; if you intend to make use
          of the protocols found here, please take those axioms as a given in
          your practice.
        </p>

        <div className="action-row">
          <Link href="/experiences/new" className="pill link-plain">
            + Add an experience report
          </Link>
        </div>
      </section>

      <style jsx>{`
        .hero {
          position: relative;
          margin: -40px -24px 48px;
          padding: 0;
          min-height: 80vh;
          display: flex;
          align-items: flex-end;
          background:
            linear-gradient(
              to top,
              rgba(0, 0, 0, 0.85) 0%,
              rgba(0, 0, 0, 0.4) 50%,
              rgba(0, 0, 0, 0.2) 100%
            ),
            url("/hero-bg.png") center center / cover no-repeat;
          background-color: #0a0a0a;
        }

        .hero-content {
          padding: 48px 32px;
          width: 100%;
          max-width: 900px;
          margin: 0 auto;
        }

        .hero-title {
          font-family: var(--font-sans);
          font-weight: 400;
          font-size: clamp(48px, 12vw, 120px);
          line-height: 0.9;
          color: white;
          margin-bottom: 24px;
          letter-spacing: -0.02em;
        }

        .hero-line {
          display: block;
        }

        .hero-line:nth-child(2) {
          margin-left: 0.5em;
        }

        .hero-line:nth-child(3) {
          margin-left: 0.2em;
        }

        .hero-subtitle {
          font-family: var(--font-sans);
          font-size: 15px;
          font-weight: 400;
          color: rgba(255, 255, 255, 0.8);
          margin-bottom: 32px;
          line-height: 1.6;
          letter-spacing: 0.02em;
        }

        .hero-actions {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .hero-actions .button {
          background: white;
          color: black;
        }

        .hero-actions .button:hover {
          background: rgba(255, 255, 255, 0.9);
          color: black;
        }

        .hero-actions .button-outline {
          background: transparent;
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.5);
        }

        .hero-actions .button-outline:hover {
          background: white;
          color: black;
          border-color: white;
        }

        .intro-section {
          margin-top: 48px;
          max-width: 680px;
        }

        .intro-section h2 {
          font-size: 24px;
          margin-bottom: 20px;
        }

        .intro-section p {
          margin-bottom: 20px;
          line-height: 1.75;
          color: var(--fg);
        }

        .intro-section .ethics-note {
          margin-top: 32px;
          padding: 20px 24px;
          border: 2px solid var(--fg);
          font-size: 15px;
          line-height: 1.7;
        }

        .action-row {
          margin-top: 32px;
        }

        @media (max-width: 640px) {
          .hero {
            margin: -40px -16px 32px;
            min-height: 70vh;
          }

          .hero-content {
            padding: 32px 20px;
          }

          .hero-title {
            font-size: clamp(36px, 14vw, 72px);
          }

          .hero-line:nth-child(2) {
            margin-left: 0.3em;
          }

          .hero-line:nth-child(3) {
            margin-left: 0.1em;
          }
        }
      `}</style>
    </main>
  );
}
