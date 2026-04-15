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
A permissionless system for mapping
experiential geographies.

**Button 1:** Submit a report
**Button 2:** Browse genres

---

### What is the LSM?

A permissionless research environment for the collection and comparison of experiential knowledge across domains that push or exceed ordinary perception. It supports a form of radical empiricism: the disciplined accumulation and transformation of first-person reports into shared, navigable structures, without prematurely collapsing them into a single explanatory framework.

The LSM treats experience as carrying latent structure rather than as purely private, ineffable content. That structure can be discovered and made legible through collective effort. Many intensive or non-ordinary experiences, across meditation, psychedelics, BDSM, sensory deprivation, lucid dreaming, and mathematics, correspond to recurrent, potentially mappable regions within a broader experiential or cognitive manifold.

Rather than beginning with fixed categories, the LSM allows genres of experience to emerge. Interpreters design competing frameworks; each shapes what can be perceived and compared. Over time, more effective frameworks uncover patterns that had no prior vocabulary.

---

### Four layers (cards)

**Reports**
First-person accounts. Immutable and preserved in original form. Submitted against a genre and an optional intake framework.
*Link label:* Submit →

**Frameworks**
User-created intake schemas. Each framework is an instrument of perception that shapes what can be captured and compared.
*Link label:* Browse →

**Interpretations**
Forkable taxonomies and mappings that organize reports into patterns. No single interpretation is authoritative.
*Link label:* Explore →

**Renderings**
Visual, spatial, and sensory representations of interpreted experiential data. Make latent structures perceptible.
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

**Page description:** Latent Space Museum, a permissionless system for mapping experiential geographies.

---

### What this is

The LSM is an open infrastructure for the collection, comparison, and construction of experiential knowledge across domains that push or exceed ordinary perception. It supports a form of radical empiricism: the disciplined accumulation and transformation of first-person reports into shared, navigable structures, without prematurely collapsing them into a single explanatory framework.

The LSM treats experience as data with latent structure rather than as private, ineffable content. That structure may be discovered, stabilized, and made navigable through collective effort. The working hypothesis is that many intensive or non-ordinary experiences, across meditation, psychedelics, BDSM, sensory deprivation, lucid dreaming, mathematics, and other domains, correspond to real, recurrent, and potentially mappable regions within a broader experiential or cognitive manifold.

---

### What this is not

- Not a social network
- Not a content platform
- Not a fixed ontology
- Not a claim about the ultimate nature of experience
- Not an authority

---

### What makes a useful report

A report does not need to be unusual or dramatic. The empirical signal comes from structure, not intensity. Reports that generate the most comparative value tend to trace:

- What you were trying to do
- What made it difficult
- What changed (or did not)

Pure passive observation ("the light looked different," "it was beautiful") carries less signal than accounts of engagement with a situation: attempts, resistance, adjustment, outcome.

---

### The four layers

The system has four non-hierarchical layers, none of which overwrites another. Raw reports stay intact regardless of what gets built above them. Frameworks are optional; interpretations are contingent and forkable; renderings are expressive and revisable.

**Reports** *(links to /submit)*
First-person accounts of an experience. Immutable. Submitted against an optional genre and an optional intake framework. Can be contributed in blind mode (before viewing others) or open mode.

**Frameworks** *(links to /frameworks)*
User-created schemas for structuring experience reports. Each framework is an instrument of perception: a set of fields that shapes what can be captured, compared, and aggregated across reports. Frameworks are forkable and versioned, competing for adoption through use.

**Interpretations** *(links to /interpretations)*
User-generated structures that organize reports into meaningful patterns: clusters, taxonomies, proto-places, geographic mappings. Fully forkable, non-authoritative, and coexistent with competing interpretations. Recurring experiential regions, the sense of "where", emerge at this layer, not from the submission layer.

**Renderings** *(links to /renderings)*
Visual, spatial, or sensory representations of interpreted data. Renderings make latent structures perceptible: to contributors, interpreters, and external audiences. They are both navigational instruments and expressive outputs that can influence future reports.

---

### Epistemic commitments

The LSM operates in the tension between subjectivity and structure, exploration and convergence, expression and measurement. It seeks to turn that tension into a productive field of inquiry rather than resolving it prematurely.

This position draws from a lineage of thought that includes William James' radical empiricism, which insists that relations and transitions are as real as discrete objects; process philosophy, which treats experience as ontogenetic and continuously forming; and contemporary work on cognitive architectures, which proposes that agents construct and navigate spaces of possibility defined by their sensing, memory, and action capacities. In this view, perception actively probes a structured space rather than passively recording a pre-given world.

The LSM extends this idea into cultural and technical practices, treating protocols (meditative, somatic, chemical, computational) as interfaces into distinct regions of a shared but unevenly accessible space. Rather than committing to any single ontology of these spaces, it hosts competing instruments of access and interpretation.

---

### Underground knowledge

The LSM also draws from traditions of underground and extitutional knowledge production: domains where formal institutions have limited reach and experiential rigor develops through informal, distributed practices. Knowledge in these contexts is frequently tacit, embodied, difficult to formalize, and resistant to capture.

The LSM aims to make such knowledge legible without flattening it, providing tools for structured input, aggregation, and transformation while preserving the irreducible richness of first-person accounts.

---

### Success criteria

The system is working if:

- Multiple independent reports show unexpected convergence
- Interpretations produce coherent clusters ("regions")
- Renderings feel uncannily accurate or navigable
- Contributors return to refine and re-map experiences
- New frameworks reveal patterns that had no prior vocabulary

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
