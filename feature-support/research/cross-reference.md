# Cross-Reference Analysis

Patterns and connections found across processed source notes. Updated after every 5-8 new sources.

---

## Update 1 — After 9 sources (Phases 1-5)

### Pattern: The Constraint Hierarchy
A consistent finding across Phases 1, 2, and 5: the level at which constraints are specified determines whether they're honored. This appears in three distinct contexts:
- **Phase 1 (template diagnosis):** The old template specified pedagogy as style suggestions (level 5-6); it specified marketing as detailed step-by-step instructions (level 1-2). Output followed the stronger constraint.
- **Phase 2 (learning science):** Metacognitive development doesn't happen implicitly through structure — it requires explicit prompts (meta-analytic d = 0.48). Naming metaskills as goals is insufficient; encoding them as required activities works.
- **Phase 5 (prompt architecture):** Schema-enforced required fields are binding; instructional constraints are advisory. The constraint hierarchy runs: schema > template > checklist > inline MUST > framework naming > role framing.

**Implication for engine:** Pedagogical requirements must be encoded at the schema level (required fields), not the instruction level (paragraphs of guidance).

### Pattern: The Sequencing-as-Alignment Mechanism
Backward design (objectives → assessments → content) appears as the correct ordering in three independent evidence streams:
- **Phase 2:** Merrill's First Principles and UbD both sequence assessment evidence before learning experience design
- **Phase 5:** Sequential decomposition prevents the "working memory" failure mode in AI generation — each stage's output constrains the next
- **User decision (Phase 1 discussion):** Marketing derived from curriculum, not curriculum rationalized from marketing

**Implication for engine:** The generation pipeline IS the alignment mechanism. Order of operations is not a convenience — it's what prevents misalignment.

### Pattern: The Expertise-Adaptive Design Need
Multiple sources converge on the finding that learner expertise level should change the instructional approach:
- **Phase 2 (TMA):** Theory-first works for novices; productive failure (struggle-first) outperforms for experienced learners (Kapur, g = 0.36-0.58)
- **Phase 2 (DCR):** Cognitive Flexibility Theory works best for advanced knowledge acquisition; can overwhelm novices
- **Phase 2 (Flipped):** Flipped classroom fails when learners lack baseline domain familiarity and self-regulation
- **Phase 2 (Worked examples):** Expertise reversal effect — explicit guidance helps novices, hinders experts

**Implication for engine:** The structured intake must capture learner expertise level, and the engine should adapt its generation approach accordingly. This is not a nice-to-have — it's a documented variable that changes which instructional approach works.

### Pattern: Validation Must Be Rubric-Based, Not Open-Ended
- **Phase 2:** Metaskills don't develop from implicit structure; explicit prompts and checks required
- **Phase 5:** LLMs cannot self-correct reasoning generically (ICLR 2024); rubric-based self-critique against named criteria works
- **Phase 5:** EduPlanner (IEEE TLT 2025) demonstrates generate → evaluate-against-rubric → revise loop produces better output than single-pass

**Implication for engine:** The validation subagent needs an enumerable checklist, not a "does this look good?" prompt.

---

## Update 2 — After 12 sources (Phase 6)

### Pattern: The Skipped-Phase Problem
A strong convergence across Phase 6 frameworks and Phase 2 findings: the learning phases that produce the deepest outcomes (reflection, transfer, formative assessment) are the phases that practitioners — and AI generators — most commonly skip.
- **Phase 6 (Kolb):** Only 6.7% of studies fully implement all four cycle phases; Reflective Observation and Abstract Conceptualization are most truncated
- **Phase 6 (5E):** Elaborate and Evaluate are weakest in classroom implementation; teachers favor Engage and Explain
- **Phase 2 (Metaskills):** Metacognitive development requires explicit prompts, not implicit structure — yet explicit prompts are what gets dropped
- **Phase 1 (Template):** The old template's curriculum step (Step 8) had the least pedagogical specification of any step

**Implication for engine:** Schema enforcement should apply MOST RIGOROUSLY to the elements that naturally get skipped — reflection prompts, formative checks, transfer tasks. These are the fields where "required" matters most, because human defaults omit them.

### Pattern: TMA is a Content Arc, Not a Complete Session Design
Phase 6 analysis shows TMA maps precisely to the content delivery portion of every major session framework, but every framework adds elements TMA lacks:
- **Phase 6 (Gagné):** Events 1-3 (attention, objectives, prior recall) precede content delivery; Events 8-9 (assessment, transfer) follow it
- **Phase 6 (Merrill):** Activation precedes Demonstration; Integration follows Application
- **Phase 6 (5E):** Engage precedes Explore/Explain; Evaluate is threaded throughout
- **Phase 2 (TMA validation):** TMA maps to Bloom's Taxonomy levels but doesn't include the activation and consolidation phases that Gagné and Merrill require

**Implication for engine:** The curriculum builder should use TMA as the session CONTENT framework (what gets taught and in what order), wrapped inside a session DESIGN framework that includes activation, formative checks, reflection, and transfer. TMA structures the middle; the bookends are equally required.

### Pattern: The Expertise-Adaptive Design Need (Extended)
Phase 6 adds new data points to the Phase 2 pattern:
- **Phase 6 (Cognitive Load):** Expertise reversal effect (Kalyuga & Sweller, 2003) — worked examples help novices but harm experts; open problems help experts but overwhelm novices
- **Phase 6 (Session templates):** Different session types (knowledge transfer, inquiry, problem-solving) need different framework templates
- **Phase 2 (Kapur):** Productive failure outperforms for experienced learners (g = 0.36-0.58)
- **Phase 5 (Structured intake):** Prior knowledge baseline is the highest-value intake field

**Implication for engine:** The expertise-adaptive design need now has three dimensions: (1) instructional strategy (worked examples vs. open problems), (2) session template (Gagné for novices, Merrill/5E for experienced), (3) TMA ordering (Theory-first for novices, Application-first for experts). All three must key off the learner expertise level captured in structured intake.

---

## Update 3 — After 13 sources (Phase 7)

### Pattern: The Naming-vs-Enacting Gap
A strong convergence across Phase 7 (metaskills operationalization), Phase 6 (skipped phases), Phase 2 (explicit prompts), and Phase 5 (constraint hierarchy): across every evidence stream, there is a consistent gap between *naming* a pedagogical element and *enacting* it.
- **Phase 7 (IB ATL):** Teachers embed ATL skills in unit planners but do not consistently make them visible in classroom activities — the planning-level mapping does not produce enactment-level implementation
- **Phase 7 (SDS):** Meta-skills must be "explicitly visible" with structured activities at defined lesson points — naming them is insufficient
- **Phase 2 (Metacognition):** Metacognitive development requires explicit prompts (d = 0.48); implicit structural exposure doesn't work
- **Phase 5 (Constraint hierarchy):** Schema-enforced required fields are binding; instructional constraints are advisory
- **Phase 6 (Skipped phases):** Reflection and transfer — the phases that require explicit enactment — are the ones most commonly skipped

**Implication for engine:** The curriculum builder cannot rely on labeling (tagging modules with metaskill names, listing reflection as a step). It must generate the *specific activity* that enacts each element. For metaskills: the tool generates the thinking routine or design exercise, not just the label. For reflection: the tool generates the specific reflection prompt, not just "include a reflection." For transfer: the tool generates the transfer question, not just "facilitate transfer."

### Pattern: The Dual-Role Architecture for Meta-Level Elements
Phase 7 reveals that meta-skills operate at two distinct levels simultaneously, and this pattern extends beyond metaskills to other doctrine elements:
- **Metaskills as goals vs. design principles:** "Students develop Exploring" (goal) vs. "This activity is structured as inquiry" (design principle)
- **Phase 6 (TMA):** TMA as content arc (design principle) vs. TMA stages as explicit learner-visible structure (goal — learners understand they're in Theory vs. Application)
- **Phase 5 (Backward design):** Backward design as generation sequence (design principle) vs. as visible curriculum structure (goal — learners see the objectives-assessment-content alignment)

**Implication for engine:** The tool must implement meta-level elements at both levels: they shape how content is generated (design constraints on the tool's pipeline) AND they appear explicitly in the output as named, assessable, reflectable elements for learners. These are different implementation concerns — one affects the generation algorithm, the other affects the output schema.

### Pattern: The Developability Hierarchy
Phase 7 establishes that the doctrine's six metaskills are not equally amenable to curriculum-based development, extending Phase 2's evidence on teachability:
- **Exploring (metacognition):** HIGH — d = 0.69, directly teachable through thinking routines and explicit instruction
- **Creating:** HIGH — 70-study meta-analysis supports direct training
- **Feeling:** MODERATE — ability-EI is trainable; trait-EI less so
- **Adapting:** MODERATE-LOW — trainable but far transfer is weak
- **Innovating:** MODERATE-LOW — applied creativity under constraints less studied than open-ended
- **Imagining:** LOW — GAP unresolved from Phase 2; no consolidated instructional evidence

**Implication for engine:** The curriculum builder should not promise equal development of all six through a single program. The metaskill-mapping validation should use different thresholds: high-developability skills (Exploring, Creating) can be required in more modules; low-developability skills (Imagining) should be activated through adjacent practices (scenario planning, futures thinking) with appropriate framing.

---

## Update 4 — After 20 sources (Phase 8)

### Pattern: The Social Dimension as Missing Design Layer
Phase 8 social learning research reveals that the doctrine's individual-learner framing is not just incomplete — it designs for the weaker learning condition. This connects to multiple earlier findings:
- **Phase 8 (Meta-analyses):** Cooperative learning produces d = 0.54-0.78 over individual learning. The U.S. DOE meta-analysis found collaborative instruction at +0.25 and instructor-directed at +0.39, while independent learning was +0.05 (not significant). Social learning is not an enhancement — it is the primary mechanism.
- **Phase 7 (Social dimension gap):** Already flagged that every comparable framework (SDS, OECD, IB ATL, CCR, P21, ATC21S) includes collaboration/communication as meta-level capacities. Phase 8 evidence now shows this is not just a taxonomy gap — it is a structural design gap.
- **Phase 2 (Metaskills):** The "full range" claim was contradicted. Phase 8 evidence specifies what's missing: the entire social learning dimension that Lave & Wenger, Vygotsky, and decades of cooperative learning research say is where most learning happens.
- **Phase 5 (Constraint hierarchy):** If social learning structures are not encoded at the schema level, they will be treated as optional. The builder must require collaborative activity specifications, not suggest them.
- **Phase 6 (Skipped phases):** The social/collaborative dimension follows the skipped-phase pattern — it is the element most likely to be designed as "discuss with a partner" rather than structured with interdependence, accountability, and group processing.

**Implication for engine:** The curriculum builder needs a social learning layer that runs parallel to the content layer. Every module needs: (1) activity type classification (individual/paired/small-group/full-cohort), (2) for collaborative activities: positive interdependence structure, individual accountability mechanism, and group processing prompt, (3) cohort-aware design that adapts activity structure to cohort characteristics captured in intake.

### Pattern: The CoP Formation Tension in Compressed Formats
Phase 8 evidence reveals a fundamental tension for compressed programs:
- **CoP theory says:** Learning IS participation in communities of practice; "a shared repertoire cannot be rushed into existence"
- **Compressed program reality:** 1-12 week programs cannot produce mature CoPs (which require moving through Potential → Coalescing → Active stages)
- **Accelerator research says:** Peer learning is identified as a primary design element alongside curriculum, and cohort composition significantly moderates outcomes
- **Resolution:** Compressed programs should design for CoP *seeding* (shared domain definition, structured practice interactions, legitimate peripheral participation structures) not CoP *completion*. The curriculum builder should include community formation prompts and shared practice problems, designed to persist beyond the program.

**Implication for engine:** The builder should include post-program community continuation design as a program-level field — what structures enable the cohort to continue as a CoP after the compressed program ends?

### Pattern: Reciprocal Scaffolding as the Adult Mechanism (extends Expertise-Adaptive Pattern)
Phase 8 extends the expertise-adaptive pattern from Phases 2 and 6 with a social dimension:
- **Phase 2/6:** Learner expertise level changes which instructional approach works (worked examples vs. open problems, theory-first vs. struggle-first)
- **Phase 8 (ZPD for adults):** Adults don't primarily need expert-to-novice scaffolding. They need reciprocal peer scaffolding where different expertise creates mutual ZPDs. Equal peers can create ZPDs for each other "as their interactions give rise to ideas" (Donato, 1994).
- **Phase 8 (Cohort composition):** Expertise distribution within the cohort becomes a design variable. Heterogeneous experience groups benefit less-experienced members most; homogeneous groups benefit mid-level members.

**Implication for engine:** Activity design for adult professional programs should specify what different expertise/perspectives participants bring and how the activity creates reciprocal scaffolding (not just "work in groups"). The intake process should capture cohort expertise distribution to adapt activity design.

### Pattern: The Transfer Ecosystem — Content Is Necessary but Insufficient
Phase 8 reveals that training design is one of three necessary conditions for durable learning transfer, and the other two are outside the curriculum itself:
- **Phase 8 (Baldwin & Ford 1988):** Transfer requires trainee characteristics + training design + work environment. Less than 10% of training produces behavioral change (estimate, not measured precisely).
- **Phase 8 (Saks 2013):** 40% fail to transfer immediately; 70% within 1 year.
- **Phase 8 (Blume et al. 2010):** "The evidence in support of transfer interventions was not as compelling as either our intuition or prior transfer commentaries would suggest." Open skills transfer far less than closed skills.
- **Phase 8 (Executive ed):** As few as 5% successfully apply learning. 42% of exec ed field lacks ROI methodologies.
- **Phase 8 (Gollwitzer 1999):** Implementation intentions (d = 0.65) bridge intention-behavior gap: "When X, I will Y."
- **Phase 1 (Template):** The old template generated zero transfer support structures — no pre-work, no post-program follow-up, no manager involvement.
- **Phase 5 (Pipeline):** The generation pipeline ends at marketing. It should extend through transfer design.
- **Phase 6 (Skipped phases):** Transfer and reflection are the most commonly skipped phases — confirming that without schema enforcement, they will be omitted.

**Implication for engine:** The curriculum builder must generate a transfer ecosystem as a required output, not optional. Three layers: pre-program (readiness assessment, manager briefing, baseline measurement), in-program (real-work application tasks, implementation intentions, formative assessment), post-program (spaced retrieval at 1/4/12 weeks, peer accountability, manager check-ins, Level 3 measurement). This is the single largest architectural expansion from Phase 8.

### Pattern: Andragogical Assumptions as Adjustable Defaults (extends Expertise-Adaptive Pattern)
Phase 8 establishes that the doctrine's implicit andragogical assumptions should be encoded as adjustable defaults rather than fixed axioms:
- **Phase 8 (Knowles):** Self-direction, experience-leveraging, and problem-centered orientation are strong adult learning defaults — but culturally situated (Sandlin 2005, SA TVET 2023)
- **Phase 8 (Grow SSDL):** Self-direction is developmental and domain-relative. An expert entering an unfamiliar domain is a Stage 1 learner in that domain.
- **Phase 2 (Flipped):** Flipped classroom works for self-directed learners but fails when learners lack baseline domain familiarity
- **Phase 5 (Structured intake):** Prior knowledge baseline is the highest-value intake field — Phase 8 adds self-direction level and cultural context as equally high-value

**Implication for engine:** The structured intake should capture: (1) learner self-direction level for the specific domain (Grow's 4 stages), (2) cultural context (individual vs. collective orientation), (3) skill type (open vs. closed). These inputs should adjust the generated curriculum's balance of directive vs. facilitative instruction, individual vs. collaborative activities, and transfer support intensity.

### Pattern: Making Wicked Domains Kinder for Learning (extends DCR Validation)
Phase 8 reframes the doctrine's wicked-environments claim in a more optimistic direction:
- **Phase 8 (Hogarth):** Kind/wicked describes learning structures, not immutable domain properties. Curriculum can construct kinder learning structures within wicked domains.
- **Phase 8 (Hatano & Inagaki):** Adaptive expertise develops through environmental variability, understanding-oriented culture, and active experimentation — all encodable as curriculum design constraints.
- **Phase 2 (DCR):** Cognitive Flexibility Theory works for advanced knowledge acquisition but can overwhelm novices.
- **Phase 8 (Gentner):** Analogical encoding works (d = 0.50) but novices need explicit scaffolding — progressive alignment from close to distant comparisons.

**Implication for engine:** DCR should be extended to DCR-V (Deconstruct → Compare → Rebuild → Validate). The curriculum builder should compress feedback loops, make causal mechanisms explicit, include cases where intuition fails, and scaffold comparison for novices with structural cues. The tool's framing should shift from "preparing for wicked environments" to "constructing kinder learning structures within wicked domains."

---

## Update 5 — After 21 sources (Phase 9)

### Pattern: The Constraint Architecture as the Differentiator (Convergence of All Prior Findings)
Phase 9's competitive landscape analysis confirms that the single variable distinguishing effective from ineffective AI-assisted instructional design is constraint architecture — not the AI model, not the tool category, not the level of AI adoption. This pattern was building across phases but Phase 9 provides the market-level evidence:
- **Phase 9 (Hardman 2024):** 84% of IDs adopted AI; industry productivity metrics unchanged. "Generic AI models" identified as root cause
- **Phase 9 (Practitioner counter-evidence):** Research-informed AI workflows produce 60-80% efficiency gains "keeping or improving quality" — same AI models, different constraint architecture
- **Phase 9 (ARCHED):** AI-generated objectives match human quality (κw = 0.834) WHEN constrained by Bloom's taxonomy as generation parameter + validated against rubric. Without those constraints, quality degrades
- **Phase 5 (Constraint hierarchy):** Schema > template > checklist > inline MUST > framework naming > role framing
- **Phase 1 (Template diagnosis):** Old template specified pedagogy as style suggestions (weak constraint), marketing as step-by-step instructions (strong constraint). Output followed the stronger constraint
- **Phase 2 (Metacognition):** Explicit prompts (d = 0.48) vs. implicit structural exposure — constraint level determines outcome
- **Phase 7 (Naming-vs-enacting):** IB ATL shows naming metaskills without enacting them produces no development. The naming IS a weak constraint that gets skipped

**Implication for engine:** The entire design thesis reduces to one architectural principle: the curriculum builder's value proposition IS its constraint architecture. The AI model is commodity infrastructure. What differentiates the tool is that it encodes learning science as schema-enforced required fields, validates output against enumerable pedagogical criteria, and structures (not replaces) human judgment at the points the jagged frontier maps as outside the AI's competence.

### Pattern: The Jagged Frontier Maps the Tool's Responsibility Zones
Phase 9 introduces the BCG "jagged technological frontier" framework applied to instructional design, and it maps cleanly onto the tool's architecture:
- **Inside the frontier (automate):** Formatting, structural organization, brainstorming/ideation, technical content generation (MCQs, vocabulary exercises). These are the tool's high-speed components — generate freely, minimal validation needed
- **Danger zone (constrain with rubric):** Content generation, learning objective formulation, assessment design, course outlines, session structures. These appear acceptable but contain systematic quality problems (6% factual errors, 6% irrelevance, 14% wrong difficulty). The tool's PRIMARY value is here — schema-enforced constraints + rubric-based validation
- **Outside the frontier (structure human judgment):** Needs analysis, strategic pedagogical reasoning, contextual adaptation, implementation planning. The tool's structured intake (Phase 5) and human decision points serve this zone
- **Phase 5 (Pipeline):** The generation pipeline's sequential stages map to the frontier zones: intake = outside frontier (human), generation = danger zone (constrained), formatting = inside frontier (automated), validation = danger zone (rubric-checked)
- **Phase 6 (Skipped phases):** Reflection, transfer, and formative assessment are danger-zone elements that get skipped without enforcement — the frontier framework explains WHY they need schema enforcement

**Implication for engine:** The curriculum builder's stage design should be explicitly mapped to frontier zones. Stages inside the frontier run fast with light validation. Stages in the danger zone require schema-enforced output fields + rubric-based validation agents. Stages outside the frontier require structured human input with specific prompts. This is not just a design principle — it's a resource allocation strategy for where the tool invests computational and design effort.

### Pattern: The Four-Category Market Creates a Defensible Position
Phase 9 establishes that the competitive landscape has a genuine structural gap, not just a marketing gap:
- **Category 1 (AI content generators):** Disco, Teachfloor, Coursiv — fast output, no pedagogical logic. Compete on speed and convenience
- **Category 2 (Traditional canvases):** Articulate, Captivate, iSpring — design intelligence in human, tool is a canvas. Compete on authoring power
- **Category 3 (AI-enhanced workflows):** Mindsmith, Easygenerator, 360Learning — AI speeds parts of the process, some design scaffolding. Compete on workflow efficiency
- **Category 4 (AI-constrained design systems):** Unoccupied. AI generation constrained by schema-enforced pedagogical requirements + rubric validation + structured human judgment
- **Phase 3 (Gap confirmation):** No existing tool encodes pedagogical constraints architecturally — Phase 9 extends this from a technology gap to a market category gap
- **Phase 4 (Platform):** Claude Code supports the Category 4 pattern; no one has built it

**Implication for engine:** The tool's market positioning is not "better AI" or "more features" — it is a different category. This matters for how the tool is described, defended, and evaluated. It also means the tool doesn't compete with Articulate or Disco on their terms; it creates new terms. The validation criteria (Phase 11) should be designed to demonstrate Category 4's distinctive value, not to benchmark against Category 1-3 tools on their existing dimensions.

---

## Update 6 — After 22 sources (Phase 11)

### Pattern: The Three-Tier Validation Architecture Is Empirically Grounded
Phase 11 confirms that the automation-judgment boundary identified across Phases 5, 9, and 10 maps precisely to an empirically validated three-tier structure:
- **Phase 10 (Architecture):** Proposed schema validation (automated) → rubric validation (automated + human) → transfer/impact validation (human-driven)
- **Phase 11 (Bloom's automation):** 94% accuracy for Bloom's classification with SVM + augmentation; viable with GPT-4 for structural checks — confirming Tier 1 automation
- **Phase 11 (LLM intra-rater):** Manning (2025) shows LLMs have poor intra-rater consistency for qualitative judgment — confirming Tier 2 requires human confirmation, not AI certification
- **Phase 11 (ADGIE survey):** 91% of IDs insist on validating AI quality; only 49% "very ready" to let AI select methods — empirically mapping where human judgment is non-negotiable (Tier 3)
- **Phase 5 (Constraint hierarchy):** Schema > rubric > instruction — the hierarchy of constraint strength maps to the hierarchy of automation confidence
- **Phase 9 (Jagged frontier):** Inside frontier (automate), danger zone (constrain with rubric), outside frontier (structure human judgment) — the frontier zones map to validation tiers

**Implication for engine:** The validation architecture is not just a design choice — it is the only design that matches the empirical evidence on what can and cannot be reliably automated. The validation agent should produce structured reports with confidence scores per dimension, flag items for human review based on the tier boundary, and explicitly position automated validation as screening (not certification).

### Pattern: Transfer Design as the Unscored Differentiator
Phase 11 reveals that the curriculum builder's strongest claim to differentiation — its transfer ecosystem design — cannot be evaluated using any existing published rubric:
- **Phase 11 (Rubric gap):** Transfer design is the least explicitly scored element across QM, EQuIP, IMET, and EdReports
- **Phase 8 (Transfer failure):** Transfer rates are catastrophically low (<10% Baldwin & Ford, 5% in exec ed Avolio et al.) — this is the most consequential curriculum quality dimension
- **Phase 10 (Stage 7):** An entire pipeline stage devoted to transfer ecosystem design
- **Phase 7 (Naming vs. enacting):** Transfer is the element most commonly "named" (included as a goal) but not "enacted" (encoded as required output)
- **Phase 6 (Skipped phases):** Transfer is among the most commonly skipped learning cycle phases

**Implication for engine:** The tool must construct its own transfer design evaluation criteria because none exist externally. This is simultaneously a gap and an opportunity — the tool can define the standard for a dimension that existing rubrics ignore, creating evaluation criteria that others may eventually adopt. The validation rubric should score transfer design as a first-class required criterion with specific sub-dimensions: pre-program readiness, in-program application tasks, implementation intentions, post-program reinforcement design, and community continuation structure.

### Pattern: The TALQ-to-Schema Bridge
Phase 11 identifies TALQ as the strongest empirical link between instructional design principles and learning outcomes, and its scales map directly to schema-enforceable fields:
- **Phase 11 (TALQ):** 9 scales with alpha 0.77-0.94; 9x mastery likelihood when FPI implemented; the ONLY validated instrument measuring Merrill's FPI implementation
- **Phase 5 (Schema as constraint):** Schema-enforced required fields are the binding constraint mechanism
- **Phase 2 (Merrill's FPI):** Task-centered → Activation → Demonstration → Application → Integration is the most empirically supported instructional sequence
- **Phase 6 (Session design):** Merrill's FPI maps to the session design bookends that wrap TMA content

**Implication for engine:** Each TALQ scale should map to a required field in the session and module schemas. Task/Problem-Centered → required "real-world problem" field. Activation → required "prior knowledge activation" field. Demonstration → required "worked example or modeling" field. Application → required "guided practice with feedback" field. Integration → required "transfer prompt" field. This makes TALQ's empirically validated scales into the curriculum builder's structural requirements — closing the loop between "what research says produces learning" and "what the tool enforces."
