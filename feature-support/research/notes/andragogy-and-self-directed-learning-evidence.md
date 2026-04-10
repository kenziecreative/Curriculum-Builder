# Research Note: Andragogy, Self-Directed Learning, and Critique

**Date:** 2026-03-15
**Researcher:** Agent research pass
**Purpose:** Evidence base for Phase 8 — stress-testing the doctrine against andragogy (Knowles), self-directed learning theory (Grow, Tough, Merriam), and known critiques of the andragogy framework. Evaluates whether the doctrine honors adult learning differences or imports academic assumptions.
**Status:** First comprehensive evidence pass across three research questions.

---

## How to Read This Note

Each major finding is tagged with one of five markers:
- **SUPPORTED** — evidence directly validates the claim
- **COMPLICATED** — evidence is real but creates conditions, limits, or nuances the doctrine does not acknowledge
- **CONTRADICTED** — evidence runs directly against a specific claim
- **EMERGING** — recent research is directionally supportive but not yet consolidated
- **GAP** — no solid evidence base found; claim is asserted, not established

---

# SECTION 1: KNOWLES' ANDRAGOGY — THE SIX ASSUMPTIONS

## 1.1 — The Six Assumptions of Adult Learning

Malcolm Knowles formalized andragogy as a set of six assumptions about how adults learn, distinguishing them from pedagogical assumptions about children. These six assumptions are the canonical framework in the field:

1. **Need to Know** — Adults need to understand *why* they are learning something before they will invest effort. Unlike children who typically follow instructions without requiring rationale, adults require a clear connection between learning content and its practical utility.

2. **Self-Concept (Self-Direction)** — Adults have a self-concept as autonomous, independent, self-directed beings. They demonstrate a preference for control over their learning objectives, methods, resources, and self-assessment of progress.

3. **Role of Experience** — Adults bring substantial life and professional experience that serves as a rich resource for learning. They integrate personal and professional experience into new learning, connecting new knowledge with existing frameworks. This facilitates deeper understanding and retention.

4. **Readiness to Learn** — Adults gravitate toward learning that is relevant to their current life situations, roles, or problems. Their readiness to learn is strongly correlated with the perceived relevance and immediate applicability of the content.

5. **Orientation to Learning (Problem-Centered)** — Adults orient toward learning that has immediate application rather than deferred future use. They learn best when content is problem-oriented — seeking specific knowledge, skills, or abilities that solve a concrete problem rather than generic content.

6. **Motivation (Internal)** — Adults are most effectively motivated by internal factors (job satisfaction, self-esteem, quality of life, personal growth) rather than external rewards or punishments.

**Sources:**
- Knowles, M. S. (1980). *The Modern Practice of Adult Education: From Pedagogy to Andragogy.*
- Research.com overview: https://research.com/education/the-andragogy-approach
- eLearning Industry overview: https://elearningindustry.com/the-adult-learning-theory-andragogy-of-malcolm-knowles
- Helpful Professor overview: https://helpfulprofessor.com/principles-of-andragogy/

---

## 1.2 — Empirical Application of Andragogy: Team Science Training (PMC 2024)

A 2024 study published in the British Journal of Biomedical Science (PMC11008574) applied Knowles' six principles to evaluate team science training workshops in a biomedical research setting. This is notable as a recent empirical test of andragogy as a *diagnostic framework* for training evaluation.

**Key empirical findings:**
- Using an embedded study design (qualitative primary, quantitative complementary), approximately **85% of qualitative data** from learner responses could be connected to at least one andragogical principle. This is a strong signal that the framework captures real dimensions of adult learning experience.
- **Positive evaluations** were most strongly associated with two principles: *readiness to learn* and *problem-based orientation*. Adults responded most favorably when content matched their current needs and was organized around real problems.
- **Negative evaluations** were most strongly associated with two *different* principles: *role of experience* and *self-direction*. Adults were dissatisfied when training ignored their existing expertise or restricted their autonomy.
- An additional inductive theme emerged that Knowles' framework does not capture: **meeting biological needs** (breaks, comfort, energy management). This suggests the six assumptions, while broadly valid, are not exhaustive.

**Finding [SUPPORTED — for the doctrine's adult learner claim]:** The doctrine asserts that adults are "self-directed, experience-driven, and time-constrained." The empirical evidence confirms that self-direction and experience are the two dimensions most associated with negative learner experience when violated — adults actively resist learning designs that ignore these properties. The 85% coverage rate suggests andragogy is a reasonably comprehensive diagnostic lens.

**Finding [COMPLICATED — for the doctrine's completeness]:** The emergence of "biological needs" as an unmapped dimension suggests that even Knowles' framework — and by extension, any framework that builds on it — underspecifies the full set of adult learner constraints. For compressed-format delivery (the doctrine's use case), this matters: physical and cognitive energy management is a design variable, not a nice-to-have.

**Source:**
- Tripp, B. et al. (2024). "Andragogy in Practice: Applying a Theoretical Framework to Team Science Training in Biomedical Research." *British Journal of Biomedical Science.* PMC11008574. https://pmc.ncbi.nlm.nih.gov/articles/PMC11008574/

---

## 1.3 — Doctrine Alignment with Knowles' Six Assumptions

The doctrine (Source #1) does not cite Knowles but implicitly aligns with multiple andragogical assumptions. Here is a principle-by-principle mapping:

| Knowles Assumption | Doctrine Alignment | Assessment |
|---|---|---|
| Need to Know | TMA begins with Theory ("The Why") — explicitly gives learners the reason before method or application | **Strong alignment** |
| Self-Concept (Self-Direction) | Flipped classroom positions learner as self-directed in pre-work; DCR is explicitly a self-directed learning process | **Strong alignment** |
| Role of Experience | DCR ("Draw Comparisons") explicitly leverages cross-domain analogies from existing experience | **Moderate alignment** — addresses experience as a *reasoning tool* but does not discuss experience as a *resource for group learning* (peer teaching, cohort expertise) |
| Readiness to Learn | Not explicitly addressed in doctrine; assumed implicitly by the wicked-environments framing (learners engage because their environment demands it) | **Implicit only** — no mechanism for assessing or activating readiness |
| Problem-Centered Orientation | TMA Application phase and DCR Rebuild phase are explicitly problem-centered | **Strong alignment** |
| Internal Motivation | Not explicitly addressed; the wicked-environments framing implies intrinsic motivation (survival, relevance) but does not design for motivational support | **Implicit only** — no mechanism for sustaining motivation across a curriculum |

**Finding [SUPPORTED — with qualifications]:** The doctrine naturally aligns with 4 of 6 andragogical assumptions through its structural design (Need to Know, Self-Direction, Experience-as-reasoning, Problem-Centered). However, it has **no explicit mechanism** for two assumptions: Readiness to Learn and Internal Motivation. These are treated as preconditions the learner brings, not as dimensions the curriculum must actively support. For a curriculum *builder* tool, this is a design gap — the tool should prompt curriculum designers to address readiness activation and motivational scaffolding, not assume they exist.

---

# SECTION 2: SELF-DIRECTED LEARNING THEORY

## 2.1 — Grow's Staged Self-Directed Learning (SSDL) Model

Gerald Grow's SSDL model (1991, published in *Adult Education Quarterly*) proposes that learners advance through four stages of increasing self-direction, and that effective teaching requires *matching* the instructional approach to the learner's current stage. The model is adapted from the Hersey-Blanchard Situational Leadership model.

**The four stages:**

| Stage | Learner | Teacher Role | Teaching Style |
|---|---|---|---|
| 1 — Dependent | Low self-direction; needs explicit direction on what to do, how, and when | Authority / Coach | Directive: lectures, drill, immediate feedback |
| 2 — Interested | Moderate self-direction; willing to engage if motivated and guided | Motivator / Guide | Persuading: inspiring lectures, guided discussion |
| 3 — Involved | Intermediate self-direction; will explore topics if facilitated | Facilitator | Participating: seminars, group projects, facilitated discussion |
| 4 — Self-Directed | High self-direction; sets own goals, identifies resources, manages learning autonomously | Consultant / Delegator | Delegating: independent study, dissertations, self-directed work |

**Critical insight — the mismatch problem:** Grow identifies that the most damaging instructional error is a *mismatch* between teacher style and learner stage. A Stage 4 (delegating) teacher with Stage 1 (dependent) learners creates confusion and abandonment. A Stage 1 (directive) teacher with Stage 4 (self-directed) learners creates resentment and stifling. The teacher's job is to diagnose the learner's current stage and then progressively develop them toward greater self-direction.

**Key theoretical principle:** The SSDL model "infuses the assumptions of andragogy through all levels of education and through all methods of teaching — even directive methods, when they are part of a long-term program for developing greater self-direction." This is a critical refinement of Knowles: andragogy is not a *type* of teaching for a *type* of learner, but a *direction* all teaching should move toward.

**Critiques of the SSDL model (from Tennant 1992 and others):**
- Disparagement of certain teaching styles while claiming no style is superior
- The process by which teachers move from expert to guide to facilitator to participant is underspecified
- Difficulty in reliably diagnosing the learner's stage of readiness
- Unresolved tension: is self-direction a *generic trait* (you're self-directed or you're not) or *situation-specific* (self-directed in familiar domains, dependent in unfamiliar ones)?

**Finding [COMPLICATED — for the doctrine's flipped classroom claim]:** The doctrine's flipped classroom model assumes Stage 3-4 learners — people who can engage with pre-work independently and arrive ready for facilitated application. Grow's model reveals this is an *assumption about learner readiness*, not a universal truth about adults. An adult entering a genuinely unfamiliar domain (the doctrine's "wicked environment" scenario) may be functionally a Stage 1 learner in that domain, even if they are Stage 4 in their home domain. The flipped model may need an onboarding ramp — structured, directive scaffolding — before learners can productively engage with self-directed pre-work.

**Finding [SUPPORTED — for the doctrine's TMA scaffolding]:** The SSDL model's progression from dependent to self-directed mirrors TMA's progression from Theory (more structured, conceptual) to Method (guided process) to Application (self-directed problem-solving). TMA can be read as a *within-session* version of Grow's developmental arc: the curriculum progressively releases control to the learner across the three phases.

**Sources:**
- Grow, G. O. (1991). "Teaching Learners to Be Self-Directed." *Adult Education Quarterly, 41*(3), 125-149. https://longleaf.net/wp/articles-teaching/teaching-learners-text/
- Tennant, M. (1992). "The Staged Self-Directed Learning Model." *Adult Education Quarterly, 42*(3), 164-166. https://journals.sagepub.com/doi/abs/10.1177/074171369204200304
- ERIC entry: https://eric.ed.gov/?id=EJ442485

---

## 2.2 — Tough's Learning Projects: The Empirical Base for Self-Directed Learning

Allen Tough's landmark 1971 study *The Adult's Learning Projects* (OISE, Toronto) provided the foundational empirical evidence for self-directed learning as a widespread adult behavior.

**Key empirical findings:**
- The typical adult conducted approximately **8 learning projects per year**, spending approximately **700-800 hours per year** on intentional learning efforts (roughly 90 hours per project).
- Nearly **70% of this learning was self-planned** — adults designed and directed their own learning without formal instruction.
- Subsequent replications across **ten countries** confirmed the basic finding: approximately **90% of adults** conduct at least one intentional learning project annually.
- Self-directed learning is the *norm* for adults, not the exception. Formal instruction represents the minority of adult learning activity.

**Finding [SUPPORTED — for the flipped classroom rationale]:** Tough's data provides strong empirical support for the doctrine's flipped classroom assumption that adults can and do engage in self-directed learning. If 70% of adult learning is already self-planned, pre-session independent work is not an unusual ask — it is aligned with how adults already learn. The flipped model converts what adults already do informally into a structured, purposeful component of the curriculum.

**Finding [COMPLICATED — for the "wicked environments" novice problem]:** Tough studied learning that adults *chose* to pursue, in domains they had some orientation toward. The doctrine's use case — rapid entry into genuinely unfamiliar domains — is a different situation. An adult who has never encountered a domain may lack the orientation needed to self-direct effectively. Tough's 70% figure describes self-direction in domains where the learner has enough context to set goals and identify resources. The doctrine should not assume the same level of self-direction applies to true novices in new domains.

**Sources:**
- Tough, A. (1971). *The Adult's Learning Projects: A Fresh Approach to Theory and Practice in Adult Learning.* OISE, Toronto.
- Hiemstra, R. Overview of SDL research: https://roghiemstra.com/sdlresearch.html
- ERIC historical context: https://files.eric.ed.gov/fulltext/ED490435.pdf

---

## 2.3 — Merriam and the Four Dimensions of Self-Directed Learning

Merriam and colleagues (particularly Merriam & Caffarella, 1999; and subsequent updates) have contributed a more nuanced framework for understanding what "self-directed learning" actually involves, moving beyond the simple binary of "autonomous or not."

**Four dimensions of SDL (synthesis from research):**
1. **Personality characteristics / Readiness** — individual disposition toward taking initiative in learning
2. **Cognitive self-regulation** — the capacity to monitor one's own understanding, set sub-goals, and adjust strategies
3. **Contextual factors** — environmental conditions that moderate whether SDL is possible or likely (time, resources, social support, domain familiarity)
4. **The process itself** — the actual sequence of activities: diagnosing needs, setting goals, identifying resources, implementing strategies, evaluating outcomes

**Key insight:** Merriam's framework reveals that self-direction is not a single trait but a **multi-dimensional construct** that depends on person, cognition, context, and process. A person can be high on readiness (dimension 1) but low on cognitive self-regulation (dimension 2) in a new domain, or high on both personal dimensions but blocked by contextual factors (dimension 3).

**Assessment tools:** The Self-Directed Learning Readiness Scale (SDLRS, Guglielmino) and the Personal Responsibility Orientation to Self-Direction in Learning Scale (PRO-SDLS, Stockdale & Brockett) are the two most-used instruments for measuring SDL readiness. These suggest that readiness *can* be assessed, not just assumed.

**Scaffolding for SDL:** Research confirms that "to foster successful self-directed learning experiences, educators must create supportive environments, provide necessary scaffolding, and gradually introduce self-directed concepts." Developing self-directed learners "requires a scaffolded approach in which more self-paced or teacher-directed activities are introduced early on, during didactic instruction, to help students become more self-regulated in their 'self-directedness.'"

**Finding [COMPLICATED — for the doctrine's assumed self-direction]:** The doctrine treats self-direction as a property adults *have*, not a capacity that requires *scaffolding*. Merriam's multi-dimensional model suggests the curriculum builder should assess or at minimum acknowledge where learners fall on each dimension, and provide graduated release of control rather than assuming full self-direction from the start. This is especially critical for compressed-format delivery where there is less time to recover from a mismatch.

**Finding [SUPPORTED — for DCR as a SDL process]:** Merriam's fourth dimension — the process of SDL — maps remarkably well onto DCR: diagnosing needs (Deconstruct), identifying patterns and resources (Draw Comparisons), and implementing a strategy (Rebuild). DCR can be read as a *domain-specific* SDL process for wicked environments.

**Sources:**
- Merriam, S. B. & Caffarella, R. S. (1999). *Learning in Adulthood: A Comprehensive Guide.* Jossey-Bass.
- EBSCO Research Starters on Self-Directed Learning: https://www.ebsco.com/research-starters/education/self-directed-learning
- Loeng, S. (2020). "Self-Directed Learning: A Core Concept in Adult Education." *Education Research International.* https://onlinelibrary.wiley.com/doi/10.1155/2020/3816132

---

# SECTION 3: CRITIQUE OF ANDRAGOGY

## 3.1 — The Cultural Bias Critique

The most sustained and serious critique of Knowles' andragogy concerns its embedded cultural assumptions. Multiple scholars have documented that the framework reflects specific cultural values that do not generalize universally.

**Sandlin (2005) — "Andragogy and Its Discontents":**
Jennifer Sandlin analyzed andragogy from three critical perspectives — critical theory, feminist theory, and Africentric theory — and identified five core problems:

1. **Political neutrality as ideology:** Andragogy presents itself as value-neutral and apolitical, but this neutrality is itself an ideological position that serves dominant power structures. By refusing to acknowledge power dynamics in the classroom, andragogy reproduces them.

2. **Homogenization of learners:** Andragogy profiles the adult learner as middle-class and white. The "generic adult learner" is not generic at all — it is a specific social position presented as universal.

3. **Individualism against collective orientations:** The assumption that learning is an individual pursuit of rational self-knowledge works against the more collective, emancipatory orientations of adult learners of color, who may situate learning within community, spirituality, and shared struggle rather than individual advancement.

4. **Reproduction of inequality:** By ignoring social context, andragogy "reproduces inequalities, sustains oppressive social structures, and bolsters traditional values in learning."

5. **Separation from social context:** Andragogy "characterises the individual in psychological terms but as being separated from social, political, economic, and historical contexts."

**Source:**
- Sandlin, J. A. (2005). "Andragogy and Its Discontents: An Analysis of Andragogy from Three Critical Perspectives." *PAACE Journal of Lifelong Learning, 14*, 25-42. https://www.researchgate.net/publication/251338021_Andragogy_and_Its_Discontents_An_Analysis_of_Andragogy_fr_om_Thr_ee_Critical_Perspectives

---

## 3.2 — The South African TVET Critique (2023)

A 2023 article in the *Journal of Vocational, Adult and Continuing Education and Training* provides the most current and comprehensive critique, examining andragogy's application in the South African Technical and Vocational Education and Training (TVET) sector.

**Key arguments:**

- Andragogy is "politically and culturally oppressive toward people of colour, women and other marginalised groups, because it is seated in the individualist, white, male, middle-class ideologies of mid-20th century US."

- Knowles' framework carries "hidden sampling bias" — the 36 exemplars in *The Modern Practice of Adult Education* generalize whiteness as a "universal" principle of adult learning.

- **Brookfield's "culture blind" critique:** The theory's key notion of self-directed learning "marginalises people with racial and cultural identities that value the teacher as the source of knowledge and guidance." In many cultural traditions, the teacher-as-authority is not a deficit to be overcome but a respected and effective learning relationship.

- **Gender critique:** Women tend to be sidelined because the "speak freely" and "problem-solving" modalities assume political neutrality in relation to male privilege and domination brought into the learning environment. The assumption that everyone can equally participate in open dialogue ignores power asymmetries.

- **Dantus (2021) and Duff (2019):** Andragogy is "permeated ideologically by the discourse of universality and individualism characteristic of the dominant white male culture of the Global North."

- Andragogy, "in its tacit, historically rooted white male individualism, denies women, black, working-class and immigrant learners their situatedness in the actual hierarchies of everyday social life, as the unspoken assumption is that teaching and learning must happen in a parallel universe to the real world."

- In the South African context specifically, andragogy has a troubling historical association with "fundamental pedagogics" — often described as the official educational theory of apartheid.

**Finding [COMPLICATED — critical for the doctrine]:** The doctrine's assumptions about self-directed, problem-centered, experience-leveraging adult learners map directly onto the Knowlesian profile that critics identify as culturally specific rather than universal. If the curriculum builder is intended for diverse audiences (which a tool should be), it needs to account for learners who may be:
- More comfortable with teacher-directed instruction (not as a deficit but as a cultural value)
- Oriented toward collective rather than individual learning
- Situated in power structures that make "speak freely" unsafe or exclusionary
- From traditions where the authority of the teacher is a feature, not a bug

This does not mean the doctrine is wrong about self-direction — it means self-direction is a *culturally situated value* that should be treated as a design parameter, not an assumption.

**Source:**
- "A critique of andragogy in the South African TVET context." (2023). *Journal of Vocational, Adult and Continuing Education and Training, 6*(1). https://scielo.org.za/scielo.php?script=sci_arttext&pid=S2663-36472023000100009

---

## 3.3 — Andragogy's Theoretical Status: Theory, Model, or Assumptions?

The question of what andragogy actually *is* — a theory, a model, or a set of assumptions — has been debated since Knowles himself revised his position.

**Key findings from the examination literature (ERIC EJ860562, 2009):**

- **Hartree (1984)** suggested Knowles was presenting guidelines for "what the adult learner should be like" in the classroom, not a tested theory of learning. The distinction matters: a *description* of how adults learn (empirical) is different from a *prescription* of how they should learn (normative).

- **Knowles himself (1989)** ultimately conceded that "andragogy is less a theory of adult learning than a model of assumptions about learning or a conceptual framework that serves as a basis for an emergent theory."

- As a result, andragogy "has done little to expand or clarify our understanding of the process of learning nor has it achieved the status of a theory of adult learning."

- Despite these limitations, Houle (1996) argued andragogy is "the most learner-centered of all patterns of adult education programmes" and has given adult educators an alternative to purely directive instruction.

- A practical limitation: "When Knowles designed this model of adult learning he assumed a number of factors such as students' desire to participate and learn; however, in reality lecturers are aware that this is not always the case."

**Loeng (2018) — European vs. American Andragogy:**

Svein Loeng's 2018 article in *Cogent Education* reveals that the American understanding of andragogy (Knowles' version) is only one of several historical conceptions. European andragogy, which predates Knowles by over a century (Alexander Kapp, 1833; Rosenstock-Huessy, 1920s), is broader and more ambiguous. "Comparisons between pedagogy and andragogy are generally based on the traditional understanding of pedagogy and the understanding of andragogy in line with Knowles's theory, which does not give a true picture. Pedagogy is much more than traditional pedagogy, and andragogy is much more than Knowles's andragogy."

**Finding [COMPLICATED — for the doctrine's implicit andragogy]:** The doctrine operates on andragogical assumptions without naming them as such, which means it also inherits andragogy's unsettled theoretical status. The assumptions are *useful design heuristics* but they are not empirically validated laws of adult learning. The curriculum builder should treat them as adjustable parameters — strong defaults that can be modified when the learner population or domain context requires it — rather than as fixed axioms.

**Sources:**
- "Reviewing the Evidence on How Adult Students Learn: An Examination of Knowles' Model of Andragogy." (2009). *Adult Learner: The Irish Journal of Adult and Community Education.* ERIC EJ860562. https://files.eric.ed.gov/fulltext/EJ860562.pdf
- Loeng, S. (2018). "Various ways of understanding the concept of andragogy." *Cogent Education, 5*(1), 1496643. https://www.tandfonline.com/doi/full/10.1080/2331186X.2018.1496643

---

## 3.4 — The Novice-in-Unfamiliar-Domains Problem

A critical gap in andragogy for the doctrine's use case: andragogy assumes adults bring *relevant* experience. But what happens when an adult enters a genuinely unfamiliar domain — the exact scenario the doctrine's "wicked environments" framing targets?

**Pratt (1993) and Wlodowski & Ginsberg (1995)** criticize andragogy for not considering that the linear perspective of Knowles's learning contract "emphasizes western notions of rationality and analysis and does not consider the cultural imperatives and diversity" of learning approaches.

More fundamentally, the SSDL model's Stage 1 (dependent learner) applies to adults who are novices in a specific domain, regardless of their general self-directedness. An experienced executive entering data science is, for that domain, a dependent learner. The andragogical assumption of self-direction must be qualified: **self-direction is domain-relative, not person-absolute.**

**Finding [COMPLICATED — for the doctrine's DCR model]:** DCR (Deconstruct-Compare-Rebuild) is designed for the exact situation where andragogy struggles: adults entering unfamiliar territory. DCR addresses this by leveraging *cross-domain* analogies (Draw Comparisons), which does not require domain-specific experience. This is a genuine strength. However, the Deconstruct phase assumes the learner can identify structural components of an unfamiliar domain — which may require more initial scaffolding (closer to Grow's Stage 1 directive teaching) than the doctrine's flipped model currently provides.

**Finding [SUPPORTED — for DCR as an andragogy-compatible innovation]:** DCR solves a real problem that andragogy leaves open. By providing a structured *process* for leveraging experience across domains (rather than within domains), it extends andragogy's "role of experience" assumption to situations where direct experience is absent. This is a meaningful contribution, not just a restatement of existing theory.

---

# SECTION 4: SYNTHESIS — DOCTRINE VS. ADULT LEARNING SCIENCE

## 4.1 — What the Doctrine Gets Right

The doctrine's structural alignment with andragogy is strong in four of six dimensions (Need to Know, Self-Direction, Experience-as-reasoning, Problem-Centered). The TMA model mirrors Grow's developmental arc within individual sessions. The flipped classroom is empirically supported by Tough's data showing 70% of adult learning is already self-planned. DCR addresses a genuine gap in andragogy — the novice-in-unfamiliar-domain problem — by providing a structured process for cross-domain transfer.

## 4.2 — What the Doctrine Misses or Assumes

1. **Readiness to Learn is not addressed** — no mechanism for activating readiness or assessing it. The curriculum builder should include a readiness activation step.

2. **Internal Motivation is not scaffolded** — treated as a precondition, not a design variable. Compressed formats are especially vulnerable to motivation dropout.

3. **Self-direction is assumed, not developed** — Grow's model shows that self-direction exists on a continuum and must be scaffolded. The flipped model assumes Stage 3-4 learners; Stage 1-2 learners in unfamiliar domains need a ramp.

4. **Cultural context is invisible** — the doctrine inherits andragogy's cultural blind spots. Self-direction, individual problem-solving, and "speak freely" dialogue are culturally situated values, not universal adult learning traits. A curriculum builder for diverse audiences needs these as adjustable parameters.

5. **Andragogy's theoretical status is unsettled** — the doctrine treats andragogical assumptions as natural truths. They are useful heuristics with significant limitations. The tool should encode them as *strong defaults* that can be overridden, not as fixed constraints.

6. **Biological and energy management needs** are unaddressed — the 2024 PMC study found this as a dimension Knowles' framework does not capture, and it matters for compressed-format delivery.

## 4.3 — Implications for the Curriculum Builder Tool

The evidence suggests the curriculum builder should:

- **Include a learner readiness assessment prompt** — ask curriculum designers to identify where their learners fall on Grow's 4-stage continuum for the specific domain being taught
- **Provide a self-direction onboarding ramp** — for domains where learners are likely Stage 1-2, scaffold the first session(s) with more directive structure before transitioning to the flipped model
- **Make cultural context a design input** — include prompts about learner cultural backgrounds, collective vs. individual orientation, and comfort with self-direction
- **Add motivation scaffolding** — require explicit motivational design elements (relevance framing, progress visibility, autonomy support) rather than assuming intrinsic motivation
- **Treat andragogical assumptions as defaults, not axioms** — the tool should encode them as starting points that can be adjusted based on learner population, domain, and cultural context
- **Include energy/pacing management** for compressed formats — session length, break structure, cognitive load distribution

---

# SOURCE LIST

| # | Source | Type | Credibility | URL |
|---|--------|------|-------------|-----|
| A | Tripp et al. (2024). "Andragogy in Practice." *British J. Biomedical Science.* | Peer-reviewed empirical study | High | https://pmc.ncbi.nlm.nih.gov/articles/PMC11008574/ |
| B | Grow, G. O. (1991). "Teaching Learners to Be Self-Directed." *Adult Education Quarterly.* | Peer-reviewed theoretical model | High | https://longleaf.net/wp/articles-teaching/teaching-learners-text/ |
| C | Tough, A. (1971). *The Adult's Learning Projects.* OISE. | Foundational empirical study | High (landmark, widely replicated) | https://roghiemstra.com/sdlresearch.html |
| D | Sandlin, J. A. (2005). "Andragogy and Its Discontents." *PAACE J. Lifelong Learning.* | Peer-reviewed critical analysis | High | https://www.researchgate.net/publication/251338021 |
| E | "A critique of andragogy in the South African TVET context." (2023). *JOVACET.* | Peer-reviewed critical analysis | High | https://scielo.org.za/scielo.php?script=sci_arttext&pid=S2663-36472023000100009 |
| F | "Reviewing the Evidence: An Examination of Knowles' Model." (2009). *Adult Learner.* ERIC EJ860562. | Peer-reviewed literature review | Moderate-High | https://files.eric.ed.gov/fulltext/EJ860562.pdf |
| G | Loeng, S. (2018). "Various ways of understanding andragogy." *Cogent Education.* | Peer-reviewed historical analysis | High | https://www.tandfonline.com/doi/full/10.1080/2331186X.2018.1496643 |
| H | Merriam, S. B. & Caffarella, R. S. (1999). *Learning in Adulthood.* Jossey-Bass. | Academic textbook (canonical) | High | (book; secondary access via EBSCO, Wiley) |
