# Latent Space Museum — Site Copy

Edit freely. When you send this back, the changes will be reflected on the site.

**Notes:**
- Items marked `[DB]` live in the database (seeded via migration SQL). Changes here will require a database update as well as code changes — flag them and I'll handle both.
- Items marked `[UI]` are hardcoded in the interface (buttons, labels, error messages, etc.).
- The genre and framework *names* can be changed but note that slugs (used in URLs) are separate — flag if you want a slug changed too.

---

## GLOBAL

**Browser tab title:** Latent Space Museum

**Nav logo (top-left):** LSM

**Nav links:** Submit · Genres · Frameworks · Interpretations · Renderings · About

---

## HOMEPAGE (`/`)

### Hero

**Line 1:** Latent
**Line 2:** Space
**Line 3:** Museum

**Subtitle:**
A peer curated archive for recording, mapping and visualizing latent spaces of the underground.

**Button 1:** Submit a report
**Button 2:** Browse genres

---

### What is a Latent Space?

In the sciences, a latent space is a structured domain whose features are not directly observable through ordinary means, but whose structure can be inferred and navigated through patterns in what is observable.

In the context of the LSM, a latent space is a hidden domain that collectives or distributed networks of individuals explore by virtue of radical-empirical means, intuiting structure through signalled consensus in free process. 

**Latent** refers to the fact that these domains of experience may not be directly observable within the framework of dominant perception. Because the well-mapped domain(s) we refer to as "normal experience" correspond to the institutionally reinforced perceptual modes we think of as default, the interest of this exploratory archive is non-ordinary or *weird* experience that requires active manipulation of one's perceptual capacities.

**Space** here refers to the assumed independent reality of these domains: we conceive of them as real physical architectures with pre-existing features, potentially including barriers, traps, escape valves, and occupants. The assumed "independent reality" of a latent space becomes most meaningful in networked contexts, in decentralized empirical communities of practice often referred to as "scenes," "subcultures," or "undergrounds." The informal processes of empirical validation we find over and over again in these communities tell us that, despite the institutional marginalization of these worlds, there is a *there* there.

It is this ***there*** that is the interest of the Latent Space Museum.

---

### What is the LSM?

The Latent Space Museum (LSM) is a research environment and peer-curated archive.  We collect and process experiential reports from groups and individuals to the end of constructing empirically meaningful and visually immersive models of latent spaces. We are guided by an ethos of radical empiricism: nothing in this world is supernatural, ideal, or untouchable, despite the opinions and control prerogatives of the institutions. If we build models, construct maps, or compile phenomenological accounts, it's to the end not of capture or closure, but of more empirical inquiry.

In our effort not only to be open to non-standard or underground empirical modes, but also to replicate the open-endedness and stigmergy of the underground, LSM provides no opinion on methodologies: report frameworks, taxonomies, visualization and modelling logics can be submitted permissionlessly. The community may establish and build meta-frameworks that distinguish the wheat from the chaff, the weird from the square, but the excess will always remain.

All contributions are published under a Creative Commons license — this knowledge belongs to no one and therefore to everyone. As the LSM develops, we intend to build a token economy capable of rewarding contribution, curation, and interpretation outside of any need for copyright or gated information. It's our hope that this incentive design might make the openness of the archive a structural feature rather than a sacrifice.

---

### Four layers (cards)

**Reports**
First-person (individual or collective) accounts, immutable and preserved in original form. Submitted against a genre of experience and an optional intake framework.
*Link label:* Submit →

**Frameworks**
User-created intake schemas; generated as needed for different experience genres or empirical modes. Raw reports can be configured into various schemas as a methodology requires.
*Link label:* Browse →

**Interpretations**
Forkable taxonomies and mappings that organize reports into patterns. Ostensibly, the goal is to construct experience "clusters" that can provide empirically robust data for Renderers.
*Link label:* Explore →

**Renderings**
Visual, spatial, and sensory representations of interpreted data.

*Link label:* View →

---

### Principles

- Reports are append-only and never overwritten.
- All interpretive layers are optional and forkable.
- No canonical map is enforced; convergence emerges from use.
- Competing frameworks coexist without forcing resolution.
- Consent and anonymity are built into the design.

---

## ABOUT (`/about`)

**Page heading:** About the LSM

**Page description:** A peer-curated archive for recording, mapping and visualizing latent spaces of the underground.

---

### What this is

The LSM is an archive and marketplace for phenomenological reports: a permissionless research environment for the collection, processing, and interpretation of first-person accounts of non-ordinary experience, toward the construction of empirically meaningful and visually immersive models of latent spaces.

The LSM starts from the simple empirical commitment that domains explored in underground, subcultural, and institutionally marginalized communities of practice are real. Not metaphorically real, but structurally real, in the way any territory is real. The informal validation that accumulates across scenes takes recognizable forms: convergent reports, shared vocabulary, accumulated technique, recurring failure modes. LSM exists to formalize and extend this distributed empiricism so as to better understand these spaces.

What we call "normal experience" corresponds to institutionally reinforced perceptual modes, selected and normalized over time. The interest of the LSM is the rest: non-ordinary or *weird* experience that requires active manipulation of perceptual capacity to access, and that remains structurally real despite its marginal institutional status.

---

### The four layers

The system has four non-hierarchical layers, each corresponding to a different mode of contribution. No layer overwrites another. Raw reports stay intact regardless of what gets built above them. Frameworks are optional; interpretations are contingent and forkable; renderings are expressive and revisable.

**Reports** *(links to /submit)*
First-person (individual or collective) accounts, immutable and preserved in original form. Submitted against a genre of experience and an optional intake framework. Can be contributed in blind mode (before viewing others) or open mode.

**Frameworks** *(links to /frameworks)*
User-created intake schemas; generate as needed for different experience genres or empirical modes. Raw reports can be configured into various schemas as a methodology requires. Frameworks are forkable and versioned, competing for adoption through use.

**Interpretations** *(links to /interpretations)*
User-generated structures that organize reports into patterns: clusters, taxonomies, proto-places, geographic mappings. Ostensibly, the goal is to construct experience clusters that provide empirically robust data for Renderers. Fully forkable, non-authoritative, and coexistent with competing interpretations. Recurring experiential regions, the sense of "where", emerge at this layer, not from submission.

**Renderings** *(links to /renderings)*
Visual, spatial, or sensory representations of interpreted data. Renderings make latent structures perceptible: to contributors, interpreters, and external audiences. They are both navigational instruments and expressive outputs that can influence future reports.

---

### Call to action buttons

**Button 1:** Submit a report
**Button 2:** Create a framework

---

## GENRES INDEX (`/genres`)

**Page heading:** Genres

**Page description:** Experiential domains. Select one to browse reports or contribute your own.

---

### Seeded genres [DB]

Each genre has a **name** and a **description** shown on the genre card and detail page.

**Psychedelics**
Substance-induced altered states including classic psychedelics, dissociatives, and empathogens.

**BDSM**
Bondage, discipline, dominance, submission, sadism, masochism, and related somatic practices.

**Meditation**
Contemplative and mindfulness-based practices including breathwork and visualization.

**Sensory Deprivation**
Float tanks, darkness retreats, silence practices, and other deprivation environments.

**Lucid Dreaming**
WILD, MILD, DILD, and related techniques for achieving and maintaining lucidity.

**Mathematics**
Pure mathematical practice as an altered or intensive experiential domain.

**Music & Sound**
Concert, ritual, improvisation, and sound bath experiences.

**Embodied Practices**
Somatic, movement, and body-based intensive practices.

**Group Ritual**
Collective ceremonial, theatrical, and community-organized intensive events.

**Technology**
VR, AR, biofeedback, gaming, and other technology-mediated intensive experiences.

---

## GENRE DETAIL (`/genres/[slug]`)

*(Most content is dynamic — genre name and description pulled from DB above.)*

**[UI] Empty state:** No reports yet. Be the first to contribute.

**[UI] Submit button:** Submit a report

**[UI] Back link:** ← Genres

---

## FRAMEWORKS INDEX (`/frameworks`)

**Page heading:** Frameworks

**Page description:** Intake structures for experience reports. Each framework is a set of fields that shapes what can be captured and compared. Choose one when submitting, or create your own.

**[UI] Button:** New framework

---

### System frameworks [DB]

**Open Form**
No structured fields. Pure first-person narrative, completely unconstrained.

**SEI Report**
Subjective Effects Index vocabulary tags plus intensity/valence sliders.

**Contextual Report**
Context-first: setting, group size, duration, sound, movement, plus narrative.

---

## FRAMEWORK DETAIL (`/frameworks/[slug]`)

*(Name and description pulled from DB above.)*

**[UI] Back link:** ← Frameworks

**[UI] Section heading (when fields exist):** Fields preview

**[UI] Note (when no fields):** This framework has no structured fields; pure narrative.

**[UI] Submit button:** Use this framework

**[UI] Section heading (when reports exist):** Reports using this framework

---

## NEW FRAMEWORK (`/frameworks/new`)

**Page heading:** New framework

**Page description:** Design a set of structured fields for capturing experience reports. Frameworks shape what can be captured and compared across reports.

---

## SUBMIT (`/submit`)

**Page heading:** Submit a report

**Page description:** Contribute a first-person account to the museum. Reports are the raw layer: immutable once submitted, available to interpreters and renderers. A useful report traces something: what you were attempting, what resisted, and what changed.

---

### Submit form — Step 1: Genre

**Step label:** Genre

**Step heading:** Choose a genre

**Step description:** Select the experiential domain that best fits your report. You can skip this if your experience doesn't fit any category.

**[UI] Skip button:** Skip genre
**[UI] Continue button:** Continue →

---

### Submit form — Step 2: Framework

**Step label:** Framework

**Step heading:** Choose a framework

**Step description:** Frameworks provide structured fields alongside your narrative. Using a framework helps build comparable data across reports. You can always use Open Form for free-text only.

**Submission mode label:** Submission mode

**Open mode label:** Open
**Open mode description:** You can view other reports before and after submitting.

**Blind mode label:** Blind
**Blind mode description:** Your report is submitted before you can view others. Reduces contamination.

**[UI] Back button:** ← Back
**[UI] Continue button:** Continue →

---

### Submit form — Step 3: Compose

**Step label:** Compose

**Step heading:** Write your report

**Narrative section heading:** Narrative *

**Narrative placeholder:**
Write your first-person account. What were you trying to do? What made it difficult? What changed? Be specific: what you noticed, felt, perceived. What you cannot easily categorize is especially valuable.

**Aftereffects section heading:** Aftereffects / integration

**Aftereffects placeholder:** Optional. What lingered? What changed? Any reflections in the days or weeks after.

**Attribution section heading:** Attribution

**Anonymous label:** Anonymous
**Anonymous description:** No identity attached.

**Pseudonymous label:** Pseudonymous
**Pseudonymous description:** Session identifier only.

**Named label:** Named
**Named description:** Your handle, if set.

**[UI] Back button:** ← Back
**[UI] Submit button:** Submit report

---

### Submit form — Success state

**[UI] Icon:** ✓
**[UI] Heading:** Report submitted.
**[UI] Subtext:** Redirecting…

---

## INTERPRETATIONS INDEX (`/interpretations`)

**Page heading:** Interpretations

**Page description:** User-generated structures that organize reports into patterns: clusters, proto-places, taxonomies. No single interpretation is authoritative; they coexist, fork, and compete.

**[UI] Button:** New interpretation

**[UI] Empty state:** No interpretations yet. Once there are enough reports, you can start organizing them here.

---

## NEW INTERPRETATION (`/interpretations/new`)

**Page heading:** New interpretation

**Page description:** Select reports and describe the pattern, structure, or mapping you see. Interpretations are forkable, non-authoritative, and coexist with competing views.

---

## INTERPRETATION DETAIL (`/interpretations/[slug]`)

*(Name and description pulled from DB.)*

**[UI] Back link:** ← Interpretations

**[UI] Empty state:** No reports attached to this interpretation.

---

## RENDERINGS INDEX (`/renderings`)

**Page heading:** Renderings

**Page description:** Visual, spatial, and sensory representations of interpreted experiential data. Renderings make latent structures perceptible. They compete, fork, and layer.

**[UI] Button:** Submit a rendering

**[UI] Empty state heading:** No renderings yet.

**[UI] Empty state body:** Renderings are expressive outputs (maps, diagrams, spatial installations, audio pieces) that make experiential structures perceptible. Once interpretations exist, renderers can begin here.

---

## NEW RENDERING (`/renderings/new`)

**Page heading:** Submit a rendering

**Page description:** A rendering is a visual, spatial, or sensory representation derived from experiential data. Submit a link to an external work, or describe an in-progress piece.

---
