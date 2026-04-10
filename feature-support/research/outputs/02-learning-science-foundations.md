# Phase 2: Learning Science Foundations — The Doctrine Against the Literature

## Core Finding

The doctrine's four components each have genuine grounding in learning science — this is not a framework built on sand. But the grounding is uneven: some claims are strongly supported, some need qualification, one specific claim is contradicted, and several gaps need to be addressed before the curriculum engine can treat the doctrine as validated constraints. The engine needs to encode not just the doctrine but the conditions under which each component works and fails.

---

## Component-by-Component Assessment

### 1. Theory → Method → Application (Teaching Model)

**Overall verdict: SUPPORTED with important qualifications**

The core intuition — scaffolded progression from conceptual grounding to procedural method to applied practice — is well-supported by multiple independent research traditions:

- **Gradual Release of Responsibility** (Pearson & Gallagher, 1983): "I do it → We do it → You do it" maps directly to Theory → Method → Application. Strong evidence base in literacy, extending to other domains.
- **Cognitive Apprenticeship** (Collins, Brown & Newman, 1989): Modeling → Coaching → Scaffolding is structurally parallel to TMA. Grounded in situated cognition.
- **Worked Example Effect** (Sweller): For novice learners, studying step-by-step methods before independent problem-solving significantly reduces cognitive load and improves learning.
- **Merrill's First Principles**: Activation → Demonstration → Application → Integration aligns closely with TMA, validating the demonstration-to-application arc.

**What the engine must account for:**

| Claim | Status | Implication for the Engine |
|-------|--------|---------------------------|
| TMA works for novice learners | SUPPORTED | Default sequence for new-to-domain learners |
| TMA works for experienced learners | CONTRADICTED | Kapur's productive failure (53 studies, g = 0.36-0.58): struggle-before-instruction outperforms for experienced learners. Engine should adapt sequence to expertise level |
| TMA "maps cleanly onto Bloom's" | COMPLICATED | Bloom's is a classification tool, not a sequencing rule (Anderson & Krathwohl 2001). The engine should reference Bloom's for cognitive level targeting, not as validation of TMA's sequence |
| TMA produces transfer | PARTIALLY SUPPORTED | Near transfer: yes. Far transfer requires spacing, interleaving, varied contexts, and explicit reflection — none of which TMA mandates. Engine must build these in |
| TMA implicitly builds metaskills | COMPLICATED | Explicit metacognitive prompts required (meta-analytic d = 0.48). Implicit structure alone doesn't produce metacognitive development. Engine must embed reflection prompts |

**Gaps TMA doesn't address (that the engine should):**
- **Prior knowledge activation** — Gagné (Event 3) and Merrill (Activation) both emphasize connecting to what learners already know before presenting new theory. TMA's Theory phase starts cold.
- **Feedback mechanisms** — TMA's Application phase doesn't specify feedback. Both Gagné and Merrill treat feedback as integral, not optional.
- **Integration/Transfer phase** — Merrill and UbD both include a phase beyond Application where learners apply to their own novel contexts. TMA stops at curriculum-defined application. A fourth phase may be needed.
- **When to invert the sequence** — No guidance on when Application-first is preferable. The engine needs an expertise-adaptive design option.

[Sources: tma-teaching-model-evidence.md]

---

### 2. Deconstruct → Draw Comparisons → Rebuild (Learning Model)

**Overall verdict: STRONGLY SUPPORTED at the component level; untested as an integrated sequence**

Each step of DCR maps to established cognitive science constructs with strong evidence:

**Deconstruct → Expert problem representation.** Chi, Feltovich & Glaser (1981) showed directly that experts decompose problems into deep structural categories while novices sort by surface features. Teaching decomposition is teaching the expert's actual representational move. **STRONGLY SUPPORTED.**

**Draw Comparisons → Analogical encoding.** This is the best-evidenced step in the entire doctrine. Gentner's structure-mapping theory provides the cognitive mechanism. Alfieri et al.'s meta-analysis: d = 0.50 for comparison-based learning. Gentner, Loewenstein & Thompson (2003): comparing two cases simultaneously produces markedly better transfer than studying them sequentially. **STRONGLY SUPPORTED.**

**Rebuild → Cognitive flexibility and mental model construction.** Spiro et al.'s Cognitive Flexibility Theory is the closest existing theoretical framework — "criss-crossing" the knowledge landscape through multiple perspectives is exactly what Rebuild describes. Johnson-Laird's mental models theory provides the cognitive architecture. **STRONGLY SUPPORTED.**

**Wicked environments premise → Validated.** Hogarth et al. (2015): kind vs. wicked learning environments is a well-established distinction. Macnamara et al. (2014): deliberate practice explains <1% of variance in professional performance. The 10,000-hour critique for wicked domains is empirically sound. **STRONGLY SUPPORTED.**

**What the engine must account for:**

| Claim | Status | Implication for the Engine |
|-------|--------|---------------------------|
| Experts pattern-match across domains | SUPPORTED | But Klein's RPD shows experts *recognize*, not compare — DCR is a *learning* model, not a real-time performance model. Frame it as building toward recognitional expertise |
| Draw Comparisons happens naturally | CONTRADICTED | Learners retrieve surface-similar analogs, not structurally similar ones. The comparison step must be actively scaffolded with designed comparison pairs |
| DCR works for beginners | COMPLICATED | CFT: criss-crossing works best for advanced knowledge acquisition. For complete novices, DCR can overwhelm. Best as a transition strategy (novice → intermediate → expert) |
| Far transfer is achievable | COMPLICATED | Meta-analytic far transfer effect: g = 0.11. Requires sustained, varied, scaffolded practice — not a single pass through DCR |
| Rebuild is a single operation | CONTRADICTED | Chi (2008): three types of conceptual change with different difficulty levels. Belief revision is easy; mental model transformation is hard; categorical shift is very hard. Engine should flag which type a given lesson requires |

**Critical design implication:** The comparison step is where curricula most commonly fail. It needs to be the *most designed* step — with explicit comparison targets, structurally aligned case pairs, and scaffolding that prevents surface-level matching. The engine cannot leave "draw comparisons" as an open prompt.

**Largest gap:** No studies test DCR as an integrated sequence. Each step validates separately, but the combined "practiced orientation" claim is plausible but empirically unvalidated. This is not a fatal gap — the components are individually strong — but it means the engine is encoding a coherent theoretical synthesis, not a validated protocol.

[Sources: dcr-learning-model-evidence.md]

---

### 3. The Six Metaskills

**Overall verdict: Individual capacities mostly SUPPORTED for teachability; the completeness claim is CONTRADICTED**

**Teachability by metaskill:**

| Metaskill | Teachability Evidence | Status |
|-----------|----------------------|--------|
| Exploring (metacognition/curiosity) | Strongest evidence of all six. Hattie: d = 0.69. 48-intervention meta-analysis: g = 0.50-0.63 | SUPPORTED |
| Creating | 70-study meta-analysis: 70% of trained participants outperform controls | SUPPORTED |
| Feeling (EI) | Both Goleman and Mayer-Salovey frameworks support teachability as ability, not fixed trait | SUPPORTED |
| Innovating | Adjacent to creativity research; applied/constrained creativity evidence is thinner | EMERGING |
| Adapting | Trainable, but far transfer and maintenance are weak; mechanism unclear | COMPLICATED |
| Imagining | No consolidated instructional evidence base exists | GAP |

**The completeness claim — "the full range of human cognitive and emotional capacity":**

**CONTRADICTED.** Every comparable framework — SDS (12 sub-skills), OECD Learning Compass, CCR 4D, P21, ATC21S, IB ATL — includes a substantial social/interpersonal dimension (communication, collaboration, leadership) that the doctrine's six entirely omit. The six represent primarily intrapersonal and cognitive capacities.

**What the engine should do:**
- Treat the six as validated *individual cognitive* metaskills, not the complete range
- Either add social/interpersonal metaskills or explicitly scope the framework as "individual cognitive and emotional capacities" with a rationale for why social capacities are excluded
- For Imagining: acknowledge the gap and treat it as a working hypothesis or build a case from adjacent literature (scenario planning, mental simulation, futures thinking)
- Cite Knowles for the adult learner characteristics — the doctrine describes precise Knowles andragogy without attribution

**The compounding claim:**
- "Doesn't become obsolete" — **SUPPORTED.** Strong cross-framework convergence that meta-level capacities have longer half-lives than technical skills.
- "Compounds over time" — **COMPLICATED.** Matthew Effect supports domain-skill compounding. Extension to meta-level capacities is a reasonable extrapolation but unproven at that specificity.

[Sources: metaskills-and-flipped-evidence.md]

---

### 4. The Flipped Classroom (Delivery Architecture)

**Overall verdict: SUPPORTED with well-documented failure conditions the doctrine doesn't acknowledge**

**The "expert attention" argument is the best-evidenced claim in the entire doctrine.** Freeman et al. (2014, PNAS) — 225 studies: active learning produces 0.47 SD improvement in exam scores, 1.5x lower failure rates versus lecture. Redirecting expert time from content delivery to application demonstrably improves outcomes.

**Effect sizes are real and meaningful:**

| Meta-Analysis | Effect Size | Population |
|--------------|-------------|------------|
| Second-order meta-analysis (2025) | g = 0.726 | Aggregated |
| Strelan et al. (2020) | g = 0.48 | Higher education |
| Hew & Lo (2018) | SMD = 0.33 | Health professions (adult) |

**The adult-specific claim:**
- Theoretically well-grounded — the doctrine's adult learner description is precise Knowles andragogy, and the flipped model aligns with all five of Knowles' assumptions. **SUPPORTED** at the theoretical level.
- Empirically thin — head-to-head evidence for adult professional/corporate populations specifically is sparse. **GAP** at the empirical level.

**Failure conditions the doctrine must acknowledge:**

1. **Pre-class non-completion** — The single most documented failure mode. Without accountability mechanisms (quizzes, comprehension checks), learners don't engage with pre-class material and the model collapses.
2. **Novice learner resistance** — 2023 RCT: first-year students showed statistically insignificant achievement gains. Flipped works better with learners who have baseline domain familiarity and self-regulation skills.
3. **Facilitator skill gap** — Facilitation requires different skills than traditional instruction. Teachers with strong content delivery skills don't automatically transfer to Socratic facilitation.
4. **Transition disorientation** — Without explicit explanation of the model and expectations, even motivated learners resist.

**The DCR-to-Flipped mapping is architecturally coherent and research-consistent:**
- Pre-session → Deconstruct (analytical engagement with new material)
- Live session → Compare (Socratic dialogue, case-based discussion) and Rebuild (application, synthesis)
- **BUT** this depends on pre-class work triggering genuine Deconstruct, not passive consumption. The engine must specify comprehension-check mechanisms.

[Sources: metaskills-and-flipped-evidence.md]

---

## Cross-Cutting Findings

### What the engine should encode as hard constraints:

1. **TMA is the default sequence for novice learners; adapt for experienced learners** (expertise-adaptive design)
2. **The Draw Comparisons step must be actively scaffolded** — designed comparison pairs, structural alignment cues, not open-ended "what does this remind you of?"
3. **Every learning objective must have a paired assessment and a transfer task** — the single most consistent gap across all frameworks reviewed
4. **Spaced practice and retrieval practice must be structural requirements** — not optional additions
5. **Explicit metacognitive reflection prompts at each phase** — implicit structure doesn't build metaskills
6. **Flipped delivery must include pre-class accountability mechanisms** — comprehension checks, not just "watch this video"
7. **Feedback must be specified in the Application phase** — not left to the instructor's discretion

### What the doctrine should cite:

| Concept | Citation Needed |
|---------|----------------|
| Adult learner characteristics | Knowles (1984/1990) andragogy |
| Wicked environments | Hogarth et al. (2015); Rittel & Webber (1973) |
| Scaffolded instruction | Vygotsky ZPD; Pearson & Gallagher GRR |
| Analogical transfer | Gentner (1983); Alfieri et al. (2013) |
| Expert problem representation | Chi, Feltovich & Glaser (1981) |
| Cognitive flexibility | Spiro et al. (1992) |
| Active learning advantage | Freeman et al. (2014) |

### What the doctrine should revise:

1. **Narrow the "full range" claim** for the six metaskills — or add social/interpersonal dimension with rationale
2. **Correct the Bloom's mapping** — reference as conceptual alignment, not clean mapping to a sequencing rule
3. **Acknowledge TMA's expertise boundary** — theory-first is for novices; experienced learners may benefit from productive failure sequencing
4. **Specify flipped failure conditions** — the engine must build in safeguards, not assume the model works by default
5. **Add an Integration phase** to TMA — where learners apply to their own contexts, not just curriculum-defined problems

---

*Phase 2 complete. Sources: [tma-teaching-model-evidence.md], [dcr-learning-model-evidence.md], [metaskills-and-flipped-evidence.md], [preliminary-literature-scan.md]*
