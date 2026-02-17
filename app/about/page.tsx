import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="section-grid">
      <div className="page-heading">
        <h1>About the Intensive Protocol Archive</h1>
      </div>

      <article className="about-content">
        <section style={{ marginBottom: 32 }}>
          <p>
            The Intensive Protocol Archive (IPA) is a public repository for
            documenting, sharing, and studying{" "}
            <strong>intensive protocols</strong>: practices designed to engage
            real, processual features of the material world as they are lived,
            sensed, and collectively organized through experience.
          </p>
          <p>
            The term <strong>intensive</strong> derives from the philosophical
            tradition of <strong>radical empiricism</strong>, associated with
            thinkers like William James, Henri Bergson, Gilles Deleuze, and more
            recently Brian Massumi. Their work takes a critical lens on
            institutional regimes of knowledge, arguing that they tend to
            overindex on <strong>extensive</strong> properties - quantity,
            stability, classification, and boundary. Alongside and underneath
            this surface, these process philosophers argue,{" "}
            <strong>intensive structures</strong> of affect, potential,
            emergence, and becoming exert influence upon the extensive dynamics
            we find familiar. These structures are not abstractions or
            metaphors, nor are they reducible to human experience: they are
            real, autonomous material dynamics that shape how groups cohere, how
            meaning propagates, and how transformation becomes possible.
          </p>
          <p>
            Extitutional theory has argued that anywhere one finds immanent
            social organization - informal, horizontal events of human
            coordination that depend on emergence and stigmergy to set their
            tone and structure (rather than doctrine, bureaucracy, or regimes of
            legitimate violence) - experimental epistemologies are not far off.
            These experiments often take on an animist or pantheistic character,
            making reference to personified forces or autonomous vibes in order
            to zero in on subtle dimensions of reality that don't fall into the
            individualist or humanist categories of the extensive order. Perhaps
            most of interest for IPA is how this experimental epistemology
            converges with maker culture in the form of an empirically grounded{" "}
            <em>maker metaphysics</em>, personifying systems and building
            entanglements of chance, affect, or hypersensory perception with
            material assemblages. This is also true of social engineers, who, no
            matter how instrumental their training, find themselves resorting to
            the radical empiricist tactic of <em>feeling it out</em>.
          </p>
          <p>
            It's in the{" "}
            <a
              href="https://www.openmutualism.xyz/exeunt/Sketches-Toward-a-Theory-of-the-Protocol-Underground"
              target="_blank"
              rel="noopener noreferrer"
            >
              underground tradition
            </a>{" "}
            of mystics, psychonauts, scene guardians, anti-artists and other
            guerrilla empiricists who have put their engineering capacities
            toward developing technologies with no end but experience itself,
            and who have found that so-called "pure experience" to be
            charismatic, nuanced, and full of dimension and depth even as it is
            immeasurable that the Intensive Protocol Archive operates. We see
            how churches, nationalist projects, corporate cults and other
            institutional forms have cynically mobilized the intensive as a tool
            of control, relegating it to a place of mystery and fear (along with
            sex and death). Instead, we seek to demystify, engage, and explore
            this obscured realm of experience, democratizing access through the
            longstanding underground power of open protocolization.
          </p>
        </section>

        <section className="card" style={{ marginBottom: 32 }}>
          <h2 style={{ marginTop: 0 }}>What IPA Is</h2>
          <p>
            The Intensive Protocol Archive is an{" "}
            <strong>experience-first archive</strong>, inspired by projects like{" "}
            <a
              href="https://erowid.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              <strong>Erowid</strong>
            </a>
            , whose decades of careful, community-driven documentation
            established a gold standard for experiential sharing and
            protocolization of extitutional knowledge. IPA is deeply indebted to
            that lineage and approaches it with respect and gratitude.
          </p>
          <p>
            Where Erowid (and others, in particular{" "}
            <a
              href="https://psychonautwiki.org/wiki/Main_Page"
              target="_blank"
              rel="noopener noreferrer"
            >
              PsychonautWiki
            </a>
            ) have done essential work documenting pharmacological substances
            and their effects, IPA focuses primarily on{" "}
            <strong>non-pharmacological</strong> domains of intensive
            experience. Additionally, while IPA includes individual-focused
            protocols like meditation or breathwork within its purview, the
            archive foregrounds <strong>open social protocols</strong>, cultural
            and intersubjective strategies that depend on the emergent effects
            of relation while prioritizing the autonomy and consent of all
            involved.
          </p>
          <p style={{ marginBottom: 16 }}>Examples include:</p>
          <ul style={{ marginBottom: 0 }}>
            <li>Musical and performance ensembles</li>
            <li>Gaming, VR/AR and other web-based practices</li>
            <li>BDSM and other sexual or somatic practices</li>
            <li>Group meditation, ritual, and contemplative techniques</li>
            <li>Psychogeographic and spatial interventions</li>
            <li>Collective play, endurance, and ordeal formats</li>
          </ul>
          <p style={{ marginTop: 16, marginBottom: 0 }}>
            If many of these practices appear in other archives in partial form,
            IPA's intended contribution is to treat them explicitly as{" "}
            <strong>protocols</strong>: transmissible, remixable, and open to
            empirical refinement.
          </p>
        </section>

        <section style={{ marginBottom: 32 }}>
          <h2>How the Archive Works</h2>
          <p>IPA accepts two primary kinds of contributions:</p>

          <h3>Protocols</h3>
          <p>
            Protocols are structured descriptions of practices. They specify
            conditions, roles, constraints, materials, and sequences, with an
            emphasis on reproducibility and adaptation. The constraints of a
            text-based medium require a high level of standardization in order
            to optimize for reproducibility; however, it should be noted that in
            their native environment of the open and ownerless discourse of the
            publics, open protocols tend to travel in more amorphous form,
            suspended in a superposition until a host finds the right situation
            to unfold the knowledge in unique form.
          </p>
          <p>
            In their spirit of open discourse, all protocols are published as
            Markdown files using a <a href="https://yaml.org" target="_blank" rel="noopener noreferrer">YAML-based standard</a> designed
            for maximal interoperability and machine readability. This allows
            protocols to be indexed, queried, forked, and recombined across
            tools and platforms. By publishing a protocol on IPA, contributors
            retain copyright while licensing their work under a Creative Commons
            license, permitting reuse, adaptation, and redistribution under the
            terms of that license.
          </p>

          <h3>Experiences</h3>
          <p>
            Experiences are phenomenological reports submitted by participants.
            As Erowid showed, this is where the virtues of web-based mediums
            really shine through, the sum of experiences in their volume
            providing a nuanced and holistic view of a protocol that would be
            logistically impossible to replicate in the wild.
          </p>
          <p>
            Contributors can write in free narrative form, use structured
            taxonomies, or combine both. If structured taxonomies are frequently
            used, admins will do their best to introduce them as native features
            of the Experience interface. For now, IPA uses the{" "}
            <a
              href="https://www.effectindex.com/effects"
              target="_blank"
              rel="noopener noreferrer"
            >
              Subjective Effects Index (SEI)
            </a>{" "}
            to support taxonomical reporting of non-ordinary experiences.
          </p>
          <p>Ditto on the Creative Commons status of Experiences.</p>
        </section>

        <section style={{ marginBottom: 32 }}>
          <h2>What IPA Is Interested In</h2>
          <p>IPA is especially interested in practices that:</p>
          <ul>
            <li>Work through relation, rhythm, attention, and constraint</li>
            <li>Generate shared or transpersonal effects</li>
            <li>Function outside formal institutions</li>
            <li>Evolve through iteration rather than doctrine</li>
          </ul>
          <p>
            The archive holds space for diverse traditions, from underground
            music scenes and rope bondage lineages to situationist dérives and
            contemplative disciplines. These are treated as practical
            technologies rather than symbolic expressions or belief systems.
          </p>
        </section>

        <section style={{ marginBottom: 32 }}>
          <h2>Technology, Research, and the Near Future</h2>
          <p>
            IPA exists at a moment when experiential data is becoming newly
            legible. Advances in AI, neurophenomenology, and sensor technology
            make it possible to study qualitative experience without flattening
            it into crude metrics. At the same time, these technologies present
            frontiers of subjectification and cognitive reconfiguration that may
            change what it means to participate in social and material
            relationships. By building a framework for protocolizing familiar
            strategies of intensive experience, IPA hopes to create a container
            where exotic technologies of non-normal experience can be understood
            in a coherent lineage. If new technologies push at the limits of the
            human, the Intensive Protocol Archive is here to say: <em>We</em>{" "}
            (the underground, the{" "}
            <a
              href="https://dn790006.ca.archive.org/0/items/pdfy-CVSFsGW3fYSFP1wM/McKenna%2C%20Terence%20-%20The%20Archaic%20Revival.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              archaic
            </a>
            , the uncivilized) <em>have always been posthuman.</em>
          </p>
        </section>

        <section style={{ marginBottom: 32 }}>
          <h2>What You Can Do</h2>
          <div className="grid-two">
            <div className="card-light" style={{ padding: 24 }}>
              <h3 style={{ marginTop: 0 }}>Document Protocols</h3>
              <p style={{ marginBottom: 0 }}>
                Specify, combine, and fork intensive protocols. Each protocol is
                stored as human-readable Markdown, making them
                version-controllable and easy to share.
              </p>
            </div>
            <div className="card-light" style={{ padding: 24 }}>
              <h3 style={{ marginTop: 0 }}>Contribute Experiences</h3>
              <p style={{ marginBottom: 0 }}>
                Submit phenomenological attestations—first-person accounts of
                what happens when you engage with a protocol. These reports
                build collective knowledge.
              </p>
            </div>
            <div className="card-light" style={{ padding: 24 }}>
              <h3 style={{ marginTop: 0 }}>Build Community</h3>
              <p style={{ marginBottom: 0 }}>
                Develop research communities around intensive practices. Connect
                with others exploring similar territories of experience.
              </p>
            </div>
            <div className="card-light" style={{ padding: 24 }}>
              <h3 style={{ marginTop: 0 }}>Preserve Knowledge</h3>
              <p style={{ marginBottom: 0 }}>
                Archive practices that might otherwise remain undocumented. Many
                protocols exist only in oral traditions or scattered across
                communities.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2>Get Started</h2>
          <p>Ready to explore or contribute? Here are some ways to begin:</p>
          <div
            style={{
              display: "flex",
              gap: 16,
              flexWrap: "wrap",
              marginTop: 20,
            }}
          >
            <Link href="/protocols" className="button">
              Browse Protocols
            </Link>
            <Link href="/protocols/new" className="button button-outline">
              Document a Protocol
            </Link>
            <Link href="/experiences/new" className="button button-outline">
              Share an Experience
            </Link>
          </div>
        </section>
      </article>
    </main>
  );
}
