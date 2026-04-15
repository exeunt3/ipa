import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="page-shell-inner">
      <div className="page-heading">
        <h1>About the LSM</h1>
        <p className="page-desc">
          A peer-curated archive for recording, mapping and visualizing latent spaces of the cultural underground.
        </p>
      </div>

      <article className="about-article">
        <h2>What this is</h2>
        <p>
          The LSM is an archive and marketplace for phenomenological reports: a permissionless
          research environment for the collection, processing, and interpretation of first-person
          accounts of non-ordinary experience, toward the construction of empirically meaningful
          and visually immersive models of latent spaces.
        </p>
        <p>
          The LSM starts from the simple empirical commitment that domains explored in
          underground, subcultural, and institutionally marginalized communities of practice
          are real. Not metaphorically real, but structurally real, in the way any territory
          is real. The informal validation that accumulates across scenes takes recognizable
          forms: convergent reports, shared vocabulary, accumulated technique, recurring
          failure modes. LSM exists to formalize and extend this distributed empiricism so as
          to better understand these spaces.
        </p>
        <p>
          What we call &quot;normal experience&quot; corresponds to institutionally reinforced
          perceptual modes, selected and normalized over time. The interest of the LSM is the
          rest: non-ordinary or <em>weird</em> experience that requires active manipulation of
          perceptual capacity to access, and that remains structurally real despite its marginal
          institutional status.
        </p>

        <h2>The four layers</h2>
        <p>
          The system has four non-hierarchical layers, each corresponding to a different mode
          of contribution. No layer overwrites another. Raw reports stay intact regardless of
          what gets built above them. Frameworks are optional; interpretations are contingent
          and forkable; renderings are expressive and revisable.
        </p>
        <dl className="layers-dl">
          <div className="layer-def">
            <dt><Link href="/submit">Reports</Link></dt>
            <dd>
              First-person (individual or collective) accounts, immutable and preserved in
              original form. Submitted against a genre of experience and an optional intake
              framework. Can be contributed in blind mode (before viewing others) or open mode.
            </dd>
          </div>
          <div className="layer-def">
            <dt><Link href="/frameworks">Frameworks</Link></dt>
            <dd>
              User-created intake schemas; generate as needed for different experience genres
              or empirical modes. Raw reports can be configured into various schemas as a
              methodology requires. Frameworks are forkable and versioned, competing for
              adoption through use.
            </dd>
          </div>
          <div className="layer-def">
            <dt><Link href="/interpretations">Interpretations</Link></dt>
            <dd>
              User-generated structures that organize reports into patterns: clusters, taxonomies,
              proto-places, geographic mappings. Ostensibly, the goal is to construct experience
              clusters that provide empirically robust data for Renderers. Fully forkable,
              non-authoritative, and coexistent with competing interpretations. Recurring
              experiential regions, the sense of &quot;where&quot;, emerge at this layer, not
              from submission.
            </dd>
          </div>
          <div className="layer-def">
            <dt><Link href="/renderings">Renderings</Link></dt>
            <dd>
              Visual, spatial, or sensory representations of interpreted data. Renderings make
              latent structures perceptible: to contributors, interpreters, and external audiences.
              They are both navigational instruments and expressive outputs that can influence
              future reports.
            </dd>
          </div>
        </dl>

      </article>

      <div className="about-actions">
        <Link href="/submit" className="button">Submit a report</Link>
        <Link href="/frameworks/new" className="button button-outline">Create a framework</Link>
      </div>
    </main>
  );
}
