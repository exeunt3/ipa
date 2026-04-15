import Link from "next/link";
import { listGenres } from "@/lib/queries/genres";
import styles from "./page.module.css";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const genres = await listGenres();

  return (
    <main>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            <span className={styles.heroLine}>Latent</span>
            <span className={styles.heroLine}>Space</span>
            <span className={styles.heroLine}>Museum</span>
          </h1>
          <p className={styles.heroSubtitle}>
            A peer curated archive for recording, mapping and visualizing latent spaces of the underground.
          </p>
          <div className={styles.heroActions}>
            <Link className="button" href="/submit">
              Submit a report
            </Link>
            <Link className="button button-outline" href="/genres">
              Browse genres
            </Link>
          </div>
        </div>
        <div className={styles.heroAside}>
          <span>step into</span>
          <span className={styles.heroAsideIndent}>the</span>
          <span>mauve zone</span>
        </div>
      </section>

      <section className={styles.introSection}>
        <h2>What is a Latent Space?</h2>
        <p>
          In the sciences, a latent space is a structured domain whose features are not directly
          observable through ordinary means, but whose structure can be inferred and navigated
          through patterns in what is observable.
        </p>
        <p>
          In the context of the LSM, a latent space is a hidden domain that collectives or
          distributed networks of individuals explore by virtue of radical-empirical means,
          intuiting structure through signalled consensus in free process.
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
        <div className={styles.noteBox}>
          <span className={styles.noteBoxLabel}>Note</span>
          <p className={styles.noteBoxText}>
            Possible Latent Space visualizations include but are not restricted to the
            well-trodden route of visual effects replications for psychedelic trips (although
            these could generally be improved by a report clustering framework). We rather believe
            the most compelling visualizations to come are of non-optical experiences: geometric
            or geographic renderings of tension, release, goal pursuit, passage, communication
            and more that occur in musical practice, in mathematical process, in the bedroom,
            and (yes) on drugs.
          </p>
        </div>
      </section>

      <section className={styles.introSection}>
        <h2>What is the LSM?</h2>
        <p>
          The Latent Space Museum (LSM) is a research environment and peer-curated archive. We
          collect and process experiential reports from groups and individuals to the end of
          constructing empirically meaningful and visually immersive models of latent spaces. We
          are guided by an ethos of radical empiricism: nothing in this world is supernatural,
          ideal, or untouchable, despite the opinions and control prerogatives of the institutions.
          If we build models, construct maps, or compile phenomenological accounts, it&apos;s to
          the end not of capture or closure, but of more empirical inquiry.
        </p>
        <p>
          In our effort not only to be open to non-standard or underground empirical modes, but
          also to replicate the open-endedness and stigmergy of the underground, LSM provides no
          opinion on methodologies: report frameworks, taxonomies, visualization and modelling
          logics can be submitted permissionlessly. The community may establish and build
          meta-frameworks that distinguish the wheat from the chaff, the weird from the square,
          but the excess will always remain.
        </p>
        <p>
          All contributions are published under a Creative Commons license — this knowledge
          belongs to no one and therefore to everyone. As the LSM develops, we intend to build
          a token economy capable of rewarding contribution, curation, and interpretation
          outside of any need for copyright or gated information. It&apos;s our hope that this
          incentive design might make the openness of the archive a structural feature rather
          than a sacrifice.
        </p>
      </section>

      <section className={styles.introSection}>
        <h2>Four layers</h2>
        <p>This website has four basic layers which correspond to different modes of contribution.</p>
        <div className={styles.layersGrid}>
          <div className={styles.layerCard}>
            <Link href="/submit" className="link-plain">
              <h3>Reports</h3>
              <p>
                First-person (individual or collective) accounts, immutable and
                preserved in original form. Submitted against a genre of experience
                and an optional intake framework.
              </p>
              <span className={styles.layerCta}>Submit →</span>
            </Link>
          </div>
          <div className={styles.layerCard}>
            <Link href="/frameworks" className="link-plain">
              <h3>Frameworks</h3>
              <p>
                User-created intake schemas; generate as needed for different
                experience genres or empirical modes. Raw reports can be configured
                into various schemas as a methodology requires.
              </p>
              <span className={styles.layerCta}>Browse →</span>
            </Link>
          </div>
          <div className={styles.layerCard}>
            <Link href="/interpretations" className="link-plain">
              <h3>Interpretations</h3>
              <p>
                Forkable taxonomies and mappings that organize reports into
                patterns. Ostensibly, the goal is to construct experience
                &quot;clusters&quot; that can provide empirically robust data for
                Renderers.
              </p>
              <span className={styles.layerCta}>Explore →</span>
            </Link>
          </div>
          <div className={styles.layerCard}>
            <Link href="/renderings" className="link-plain">
              <h3>Renderings</h3>
              <p>
                Visual, spatial, and sensory representations of interpreted data.
              </p>
              <span className={styles.layerCta}>View →</span>
            </Link>
          </div>
          <div className={`${styles.layerCard} ${styles.layerPrinciplesCard}`}>
            <span className={styles.principlesCardLabel}>Principles</span>
            <ul className={styles.principlesCardList}>
              <li>Reports are append-only and never overwritten.</li>
              <li>All interpretive layers are optional and forkable.</li>
              <li>No canonical map is enforced; convergence emerges from use.</li>
              <li>Competing frameworks coexist without forcing resolution.</li>
              <li>Consent and anonymity are built into the design.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className={`${styles.introSection} ${styles.genresSection}`}>
        <h2>Genres</h2>
        <p>Experiential domains. Select one to browse reports or contribute your own.</p>
        <div className={styles.genreGrid}>
          {genres.map((genre) => (
            <Link key={genre.slug} href={`/genres/${genre.slug}`} className={styles.genreCard}>
              <h3 className={styles.genreName}>{genre.name}</h3>
              <p className={styles.genreDesc}>{genre.description}</p>
              <div className={styles.genreFooter}>
                <span className={styles.genreCount}>
                  {genre.report_count} {genre.report_count === 1 ? "report" : "reports"}
                </span>
                <span className={styles.genreArrow}>→</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
