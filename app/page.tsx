"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <main>
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="hero-line">Latent</span>
            <span className="hero-line">Space</span>
            <span className="hero-line">Museum</span>
          </h1>
          <p className="hero-subtitle">
            An archive and marketplace for recording, mapping and visualizing latent spaces.
          </p>
          <div className="hero-actions">
            <Link className="button" href="/submit">
              Submit a report
            </Link>
            <Link className="button button-outline" href="/genres">
              Browse genres
            </Link>
          </div>
        </div>
        <div className="hero-aside">
          <span>step into</span>
          <span className="hero-aside-indent">the</span>
          <span>mauve zone</span>
        </div>
      </section>

      <section className="intro-section">
        <h2>What is a Latent Space?</h2>
        <p>
          A latent space is a structured domain of experience that collectives or distributed
          networks of individuals can explore, in the process pursuing goals and experimenting
          with outcomes.
        </p>
        <p>
          <strong>Latent</strong> refers to the fact that these domains of experience may not
          be directly observable within the framework of dominant perception. Because the
          well-mapped domain(s) we refer to as &quot;normal experience&quot; correspond to the
          institutionally reinforced perceptual modes we think of as default, the interest of
          this exploratory archive is non-ordinary or <em>weird</em> experience that requires
          active manipulation of one&apos;s perceptual capacities.
        </p>
        <p>
          <strong>Space</strong> here refers to the assumed independent reality of these
          domains: we conceive of them as real physical architectures with pre-existing
          features, potentially including barriers, traps, escape valves, and occupants.
          The assumed &quot;independent reality&quot; of a latent space becomes most meaningful
          in networked contexts, in decentralized empirical communities of practice often
          referred to as &quot;scenes,&quot; &quot;subcultures,&quot; or
          &quot;undergrounds.&quot; The informal processes of empirical validation we find over
          and over again in these communities tell us that, despite the institutional
          marginalization of these worlds, there is a <em>there</em> there.
        </p>
        <p>
          It is this <strong><em>there</em></strong> that is the interest of the Latent Space
          Museum.
        </p>
      </section>

      <section className="intro-section">
        <h2>What is the LSM?</h2>
        <p>
          The LSM is a permissionless research environment for the collection and processing of
          phenomenological or experiential reports - from groups and individuals - toward the
          construction of empirically meaningful and visually immersive models of spaces of
          non-ordinary experience. We are guided by an ethos of radical empiricism: nothing in
          this world is supernatural, ideal, or untouchable, despite the opinions and control
          prerogatives of the institutions. If we build models, construct maps, or compile
          phenomenological accounts, it&apos;s to the end not of capture or closure, but of
          more empirical inquiry.
        </p>
        <p>
          In our effort not only to be open to non-standard or underground empirical modes, but
          also to replicate the open-endedness and stigmergy of the underground, we provide no
          opinion on methodologies: report frameworks, taxonomies, visualization and modelling
          logics can be submitted permissionlessly. It is up to the community to establish and
          build meta-frameworks that distinguish the wheat from the chaff, the weird from the
          square, what have you.
        </p>
      </section>

      <section className="intro-section">
        <h2>Four layers</h2>
        <p>This website has four basic layers which correspond to different modes of contribution.</p>
        <div className="layers-grid">
          <div className="layer-card">
            <Link href="/submit" className="link-plain">
              <h3>Reports</h3>
              <p>
                First-person (individual or collective) accounts, immutable and
                preserved in original form. Submitted against a genre of experience
                and an optional intake framework.
              </p>
              <span className="layer-cta">Submit →</span>
            </Link>
          </div>
          <div className="layer-card">
            <Link href="/frameworks" className="link-plain">
              <h3>Frameworks</h3>
              <p>
                User-created intake schemas; generate as needed for different
                experience genres or empirical modes. Raw reports can be configured
                into various schemas as a methodology requires.
              </p>
              <span className="layer-cta">Browse →</span>
            </Link>
          </div>
          <div className="layer-card">
            <Link href="/interpretations" className="link-plain">
              <h3>Interpretations</h3>
              <p>
                Forkable taxonomies and mappings that organize reports into
                patterns. Ostensibly, the goal is to construct experience
                &quot;clusters&quot; that can provide empirically robust data for
                Renderers.
              </p>
              <span className="layer-cta">Explore →</span>
            </Link>
          </div>
          <div className="layer-card">
            <Link href="/renderings" className="link-plain">
              <h3>Renderings</h3>
              <p>
                Visual, spatial, and sensory representations of interpreted
                experiential data. Make latent structures perceptible.
              </p>
              <span className="layer-cta">View →</span>
            </Link>
          </div>
          <div className="layer-card layer-principles-card">
            <span className="principles-card-label">Principles</span>
            <ul className="principles-card-list">
              <li>Reports are append-only and never overwritten.</li>
              <li>All interpretive layers are optional and forkable.</li>
              <li>No canonical map is enforced; convergence emerges from use.</li>
              <li>Competing frameworks coexist without forcing resolution.</li>
              <li>Consent and anonymity are built into the design.</li>
            </ul>
          </div>
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

        .hero-line:nth-child(1) {
          color: #FF7A29;
        }

        .hero-line:nth-child(2) {
          margin-left: 0.5em;
          color: #E0197D;
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

        .hero-actions :global(.button) {
          background: white;
          color: black;
        }

        .hero-actions :global(.button:hover) {
          background: #FF7A29;
          color: white;
        }

        .hero-actions :global(.button-outline) {
          background: transparent;
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.5);
        }

        .hero-actions :global(.button-outline:hover) {
          background: #E0197D;
          color: white;
          border-color: #E0197D;
          border-color: white;
        }

        .hero-aside {
          position: absolute;
          top: 54%;
          right: 18%;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 13px;
        }

        .hero-aside span {
          display: inline-block;
          background: white;
          color: #0a0a0a;
          font-family: var(--font-sans);
          font-size: 13px;
          font-weight: 400;
          line-height: 1;
          padding: 3px 7px;
          letter-spacing: 0.01em;
        }

        .hero-aside-indent {
          margin-left: 2em;
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

        .layers-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 1px;
          border: 1px solid var(--line);
          background: var(--line);
          margin-top: 20px;
        }

        .layer-card {
          background: var(--bg);
          padding: 24px;
        }

        .layer-card :global(a) {
          display: flex;
          flex-direction: column;
          gap: 8px;
          background: none;
          color: inherit;
        }

        .layer-card :global(a:hover) {
          background: none;
          color: inherit;
        }

        .layer-card h3 {
          font-size: 16px;
          margin: 0;
        }

        .layer-card p {
          font-family: var(--font-sans);
          font-size: 13px;
          color: var(--fg-muted);
          line-height: 1.5;
          flex: 1;
          margin: 0;
        }

        .layer-cta {
          font-family: var(--font-sans);
          font-size: 12px;
          font-weight: 600;
          opacity: 0.5;
          margin-top: 4px;
        }

        .layer-card:hover .layer-cta {
          opacity: 1;
        }

        .layer-principles-card {
          grid-column: span 2;
          background: var(--bg-alt);
          cursor: default;
        }

        .principles-card-label {
          display: block;
          font-family: var(--font-sans);
          font-size: 10px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          opacity: 0.35;
          margin-bottom: 14px;
        }

        .principles-card-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 7px 32px;
          font-family: var(--font-sans);
          font-size: 12px;
          color: var(--fg-muted);
          line-height: 1.5;
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

          .hero-aside {
            display: none;
          }
        }
      `}</style>
    </main>
  );
}
