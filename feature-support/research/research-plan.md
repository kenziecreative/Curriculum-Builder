# Research Plan: KNZ Curriculum Builder — Claude Code-Native Tool for Learning-Science-Grounded Curriculum

## The Core Question

Can a Claude Code-native curriculum builder tool — one that encodes the researcher's pedagogical doctrine (Six Metaskills, Theory→Method→Application, Deconstruct→Compare→Rebuild, Flipped Classroom delivery) directly into its prompt architecture and workflow — produce curricula that are structurally sound from a learning science perspective, rather than defaulting to the marketing-polished, pedagogically thin output that characterizes the existing accelerator prompt template? This research must determine whether the gap between the template's current output and the doctrine's pedagogical intent is (a) a structural flaw in how the tool was designed, (b) an inherent limitation of AI curriculum generation, or (c) a solvable problem of prompt architecture and constraint design — and if solvable, what the solution architecture should look like inside Claude Code's extension ecosystem.

## Source Material Location

Primary source documents are in:
`/Users/kelseyruger/Projects/a-emporium-working/knz-learner-builder/knz-builder-research/source-material/`

- `doctrine-how-i-teach-how-i-learn.md` — The researcher's full pedagogical philosophy: Six Metaskills, Theory→Method→Application, Deconstruct→Compare→Rebuild, Flipped Classroom
- `accelerator-prompt-template.md` — The existing 10-step accelerator prompt template (the artifact being diagnosed and replaced)

---

## Phase 1: Diagnosing the Existing Template — Why It Produces Marketing-Heavy Output

**What the thesis claims:** The existing accelerator prompt template is structurally biased toward marketing output because its architecture (steps, stop gates, framing language) foregrounds audience positioning, promises, hooks, and partner value over learning design, sequencing, and pedagogical scaffolding.

**What needs exploration:**

1. What percentage of the 10-step template's explicit instructions are oriented toward marketing/positioning (promise, hook, "magic gifts," partner focus, CTAs) versus learning design (sequencing, scaffolding, assessment, skill transfer)?
2. In Step 8 (Curriculum), what pedagogical design principles does the template invoke? Does it reference learning sequencing theory, scaffolding logic, formative assessment, or transfer design — or does it default to topic coverage?
3. Where does the 4E framework (Engage, Explore, Experiment, Embed) appear in the template, and is it used as a learning design constraint or as a marketing framing device?
4. Which steps in the template include explicit "STOP: await confirmation" gates, and what does this reveal about where the template's author believed value-creation was happening?
5. How does the template's role framing ("seasoned workshop facilitator specializing in corporate and professional development...masterful storytelling") prime the AI's output register — and does this framing suppress pedagogical precision?

**Output:** `01-template-diagnosis.md`

---

## Phase 2: Learning Science Foundations — What Structurally Sound Curriculum Actually Requires

**What the thesis claims:** The researcher's doctrine maps coherently onto established learning science. Theory→Method→Application maps to scaffolded instruction and Bloom's Taxonomy. Deconstruct→Compare→Rebuild maps to analogical reasoning, transfer learning, and cognitive flexibility theory. The Six Metaskills map to meta-cognitive capacity frameworks. The Flipped Classroom has a documented evidence base. These claims need to be verified and grounded in the literature before designing a tool that encodes them.

**What needs exploration:**

1. What does the instructional design literature say about scaffolded progression from conceptual to procedural to applied knowledge? Does Theory→Method→Application have direct analogs in ADDIE, Merrill's First Principles, or Gagné's Nine Events of Instruction?
2. What does cognitive science say about analogical transfer and the "draw comparisons" move — specifically, what conditions need to exist for comparison-based learning to produce durable transfer rather than surface-level mimicry?
3. What is the research consensus on the Flipped Classroom's effectiveness? Under what conditions does it work well, and under what conditions does it fail — particularly for adult learners in compressed, cohort-based formats?
4. How does the learning science literature define and operationalize metacognition and meta-skills? Do the Six Metaskills (Exploring, Creating, Feeling, Imagining, Innovating, Adapting) have defensible grounding in empirical frameworks — or are they more philosophically than empirically derived?
5. What does the research on "wicked learning environments" (Hogarth, Epstein) say about expertise acquisition in domains where feedback is delayed and rules shift — and does this validate the Deconstruct→Compare→Rebuild model as a response to wicked domains?
6. What does evidence-based curriculum design require at the structural level — specifically, what elements must be present in a curriculum document for it to be considered pedagogically complete (learning objectives linked to assessments, sequencing logic, formative checkpoints, transfer tasks)?

**Output:** `02-learning-science-foundations.md`

---

## Phase 3: The AI Curriculum Generation Problem — What Current Tools Do and Miss

**What the thesis claims:** Existing AI curriculum design tools produce output that is fast, well-formatted, and audience-aware, but pedagogically thin. They optimize for content coverage and surface coherence rather than learning design integrity. The gap is structural: these tools weren't built with learning science constraints embedded in their generation logic.

**What needs exploration:**

1. What do current AI curriculum generation tools (Disco, Teachfloor, Coursiv, FeedbackFruits, and generic LLM-based approaches) actually produce? What categories of content appear in their default outputs, and what is systematically absent?
2. What do instructional design practitioners and education researchers say about the quality gap between AI-generated curriculum and expert-designed curriculum — specifically around sequencing logic, formative assessment integration, and transfer design?
3. Is there evidence that AI tools can produce pedagogically sound curriculum when given explicit learning science constraints versus when given only topic and audience prompts? What does the prompt engineering literature say about specifying pedagogical constraints?
4. What are the known failure modes of LLM-based curriculum generation: hallucination of learning progressions, topic coverage bias, marketing register drift, assessment afterthought, flattening of scaffolding? Which of these failure modes appear in the researcher's existing template output?
5. What distinguishes tools that are "curriculum generators" (produce content artifacts) from tools that are "curriculum design assistants" (help a human designer make better structural decisions)? Is there a meaningful product category distinction here?

**Output:** `03-ai-curriculum-generation-landscape.md`

---

## Phase 4: Claude Code as a Development Platform — What Is Actually Buildable

**What the thesis claims:** Claude Code's plugin and slash command architecture makes it a viable platform for a curriculum builder tool — one that can encode complex pedagogical logic into reusable, version-controlled, shareable workflows rather than one-off prompts.

**What needs exploration:**

1. What is the current state of Claude Code's extensibility model — specifically, what can slash commands, skills, plugins, CLAUDE.md context files, and MCP servers each do, and what are the boundaries between them for a content-generation use case?
2. What does a multi-step, stateful workflow look like inside Claude Code? The existing template has 10 sequential steps with stop-gates between them. Can this workflow pattern be replicated in Claude Code's architecture — and can the stop-gates be replaced with validation logic rather than manual confirmation?
3. Can Claude Code persist pedagogical context across a multi-step curriculum generation session — e.g., ensuring that learning objectives defined in step 3 constrain curriculum sequencing decisions in step 8?
4. What does the existing community of Claude Code plugin and command builders suggest about the kinds of complex document-generation workflows that have been successfully built? Are there analogous tools (structured report generators, spec writers, multi-phase document drafters) that could serve as architectural reference points?
5. What are the practical constraints of building a curriculum tool inside Claude Code versus building a standalone tool that calls the Anthropic API directly — in terms of context window management, output persistence, version control integration, and distribution to other users?

**Output:** `04-claude-code-platform-assessment.md`

---

## Phase 5: Prompt Architecture for Pedagogical Constraint — What Makes AI Output Learning-Science-Sound

**What the thesis claims:** The difference between marketing-heavy AI curriculum output and pedagogically grounded curriculum output is primarily a function of how the generating prompt is structured — specifically, whether it encodes learning science constraints as hard requirements rather than style suggestions.

**What needs exploration:**

1. What does the research on prompt engineering for educational AI say about how pedagogical alignment is achieved — specifically, what prompt structures (role framing, constraint specification, output rubrics, chain-of-thought scaffolding) produce better learning design quality?
2. Is there evidence that specifying Bloom's Taxonomy levels, Merrill's First Principles, or other named instructional frameworks in a prompt produces meaningfully better curriculum output than vague "make it educational" instructions?
3. What is the PROSE model (Persona, Rubric, Objective, Steps, Examples) and similar structured prompt frameworks — how do they apply to curriculum generation specifically, and do they address the marketing/pedagogy tension?
4. Can prompt architecture enforce structural completeness in curriculum output — e.g., requiring that every learning objective be paired with a formative assessment and a transfer task before the AI is permitted to proceed to the next module?
5. What does the research on cognitive alignment in educational AI (e.g., the OneClickQuiz case study, CIDDL practitioner briefs) say about the gap between what AI generates and what genuine learning design requires — and how have practitioners closed that gap?

**Output:** `05-prompt-architecture-for-pedagogy.md`

---

## Phase 6: Engagement and Session Design Frameworks — What Works Beyond the 4E

**What the thesis claims:** The existing template used a 4E framework (Engage, Explore, Experiment, Embed) as its session-level engagement framing. That framework is historical context — part of how the previous template operated, not a requirement for the new tool. The real question is: what does the research say about effective session-level engagement design, and how should the new curriculum builder handle within-session structure?

**What needs exploration:**

1. What does the research on experiential learning cycles (Kolb, Honey & Mumford) and phase-based learning progressions (5E, BSCS) say about evidence-based session design — which phases are most commonly skipped or underweighted in real-world curriculum delivery?
2. The old template's "Aha moments" step (Step 7) appears to be a belief-shift mechanism — what does the research on transformative learning (Mezirow) say about the role of perspective transformation in adult education, and is there a way to encode this into curriculum design logic more rigorously than "brainstorm 2-3 aha ideas"?
3. How does Theory→Method→Application function as a session-level design framework — not just a macro-level teaching model? Is it sufficient to structure individual sessions, or does it need a complementary within-session engagement pattern?
4. What does the research on attention, cognitive load, and session pacing say about how to structure learning sessions for adults — and what should the curriculum builder enforce or recommend at the session level?
5. Are there established session design templates from instructional design practice (e.g., Gagné's Nine Events, Merrill's First Principles applied at session level) that the curriculum builder should draw on?

**Output:** `06-session-design-frameworks.md`

---

## Phase 7: Metaskills in Curriculum Design — Operationalizing Foundational Capacities

**What the thesis claims:** The Six Metaskills (Exploring, Creating, Feeling, Imagining, Innovating, Adapting) should not just be a philosophical backdrop to the curriculum builder — they should be active design constraints that shape what activities, assessments, and transfer tasks get generated.

**What needs exploration:**

1. What does the existing literature on meta-skills (Skills Development Scotland framework, OECD Learning Compass, CCR meta-learning frameworks) say about how meta-skills are best developed through curriculum — specifically, what pedagogical moves activate meta-skill development versus simply naming them as goals?
2. Is there a meaningful distinction between meta-skills as curriculum goals (we want learners to develop these capacities) and meta-skills as curriculum design principles (these capacities should shape how we structure the learning experience itself)?
3. What does the research on transfer learning, adaptive expertise, and cognitive flexibility theory say about which of the Six Metaskills are most directly supported by structured curriculum design versus which require extended practice and experience that no curriculum can fully deliver?
4. How have other curriculum design frameworks operationalized meta-cognitive or meta-skill goals — e.g., how do International Baccalaureate's Approaches to Learning, Harvard's Visible Thinking Routines, or design thinking curricula embed meta-skill development into concrete activities?
5. What would it look like to build a metaskill-mapping layer into the curriculum builder — where each module gets tagged with which metaskills it develops, and the tool validates that the full six are activated across the program?

**Output:** `07-metaskills-operationalization.md`

---

## Phase 8: Adult Learning and Compressed Format Pedagogy — Does the Doctrine Fit the Audience?

**What the thesis claims:** The researcher's doctrine is designed for adult learners operating in complex, high-stakes domains. The Flipped Classroom accommodates self-directed adult learners. Deconstruct→Compare→Rebuild is designed for wicked environments. The curriculum builder needs to produce curricula that work across different adult audiences and compressed formats — not just one vertical. These alignments need to be stress-tested against adult learning research.

**What needs exploration:**

1. What does andragogy (Knowles) and self-directed learning theory say about how adult learners differ from students — and does the researcher's doctrine honor those differences, or does it import assumptions from academic education?
2. What is the research on compressed cohort-based learning programs (bootcamps, accelerators, executive education, professional development intensives) — specifically, what structural features differentiate programs that produce durable behavior change from those that produce temporary motivation and no lasting transfer?
3. What does the research say about expertise acquisition in wicked environments broadly — not just entrepreneurship, but professional domains where feedback is delayed and context shifts (management, consulting, creative work, technology)? Does this validate the Deconstruct→Compare→Rebuild model as a general rapid domain-entry framework?
4. What does the research on peer learning, cohort dynamics, and social learning in compressed formats say about where the real learning happens — and does this suggest design implications that a curriculum builder should encode?
5. What are the common failure modes of compressed professional learning programs — where do they tend to lose participants, produce surface-level compliance without real skill development, or fail to generate lasting behavior change? What structural features prevent these failures?

**Output:** `08-adult-learning-compressed-formats.md`

---

## Phase 9: Competitive Landscape and Gap Analysis — What Exists and What's Missing

**What the thesis claims:** No existing curriculum builder tool is Claude Code-native, doctrine-encoded, and pedagogically constrained rather than marketing-oriented. The closest things are either generic AI content generators (not grounded in learning science), traditional instructional design software (not AI-native), or standalone LLM prompt templates (not reusable infrastructure). There is a genuine gap.

**What needs exploration:**

1. What are the most sophisticated AI-native curriculum design tools currently available (Disco, Synthesia, Coursiv, FeedbackFruits, Teachfloor, LearnWorlds AI) — and what pedagogical design principles, if any, are embedded in their generation logic?
2. What do traditional instructional design tools (Articulate 360, Adobe Captivate, iSpring) offer that AI-native tools miss, and vice versa — and is there a hybrid model that captures both?
3. Are there any existing Claude Code plugins or command suites that address content structuring, document generation, or educational design — and what can be learned from their architecture?
4. What does the market research on instructional design software limitations reveal about the most painful gaps practitioners encounter — specifically around pedagogical rigor, AI quality control, and workflow integration?
5. Is there published research or practitioner documentation describing Claude Code or similar AI coding environments being used for non-software document generation workflows (legal documents, policy writing, structured reports) — and what design patterns from those use cases transfer to curriculum generation?

**Output:** `09-competitive-landscape-gap-analysis.md`

---

## Phase 10: Tool Architecture — What the Curriculum Builder Should Actually Be

**What the thesis claims:** The curriculum builder should be a Claude Code plugin (or command suite) that encodes the researcher's full pedagogical doctrine as structural constraints — not style guidelines — and produces output that is provably more pedagogically sound than the existing template by requiring explicit alignment between learning objectives, sequencing logic, assessment design, and transfer tasks.

**What needs exploration:**

1. What is the right architecture for a multi-phase curriculum generation workflow in Claude Code — slash commands, skills, a plugin with bundled subagents, or a CLAUDE.md-based context injection system? What are the tradeoffs?
2. What should the tool's "validation layer" look like — specifically, what checks should be performed on curriculum output before it is accepted, and can these checks be automated within Claude Code's workflow or do they require human review?
3. How should the researcher's doctrine be encoded in the tool: as a system prompt preamble, as a CLAUDE.md context file, as structured constraints within individual command files, or as a skill that is auto-invoked across the curriculum generation workflow?
4. What should the output format of the curriculum builder be — and specifically, how should it differ structurally from the existing template's output to make the pedagogical grounding visible and auditable rather than implicit?
5. What does a minimum viable version of this tool look like — what is the smallest set of commands or components that would demonstrably outperform the existing template on pedagogical quality, and could be built and tested in a single iteration?

**Output:** `10-tool-architecture-proposal.md`

---

## Phase 11: Validation Criteria — How to Know If the Tool Is Working

**What the thesis claims:** The tool will be successful if it produces curricula that are structurally sound by learning science standards — not just if they feel more substantive or less marketing-heavy. Success requires articulable, testable criteria.

**What needs exploration:**

1. What evaluation rubrics exist for assessing the pedagogical quality of curriculum documents — specifically, what criteria do instructional designers use to distinguish well-designed curriculum from well-packaged content?
2. Is there a published instrument or framework for scoring AI-generated curriculum against learning science standards — or would one need to be constructed from first principles using ADDIE, Merrill's First Principles, and backward design criteria?
3. What would a head-to-head comparison between the existing template's output and the new tool's output look like — what dimensions would be scored, by whom, and using what standard?
4. Are there known methods for testing whether curriculum design translates into actual learning outcomes in short-cycle formats (i.e., without waiting for a full 12-week program to complete) — such as expert review protocols, cognitive walkthrough methods, or learner think-aloud studies?
5. What does the research on AI-assisted instructional design quality assurance suggest about the role of human expert review versus automated checking — and how should the tool's workflow integrate review checkpoints?

**Output:** `11-validation-criteria.md`

---

## Phase 12: Synthesis

**Goal:** Integrate all phase findings into a coherent assessment of the thesis — whether the gap between the existing template and a pedagogically grounded curriculum builder is solvable within Claude Code's architecture, and what the solution should look like. Produce specific, actionable recommendations for tool design.

**Outputs:**
- `00-executive-summary.md` — 2-3 page summary of the core finding, the key supporting and complicating evidence, and the top 5 design recommendations
- `12-full-research-report.md` — Complete synthesis across all phases with finding tags (SUPPORTED / COMPLICATED / CONTRADICTED / EMERGING / GAP) applied to each major thesis claim
- `12-tool-design-recommendations.md` — Specific, prioritized recommendations for the curriculum builder's architecture, prompt design, validation logic, and output format — written as a design brief that can be handed directly to a builder

---

## Source Priority

**Highest value sources:**
- Peer-reviewed instructional design and learning science literature (ADDIE research, Merrill's First Principles, Bloom's Taxonomy empirical studies, flipped classroom meta-analyses) — these are the ground truth against which the doctrine's claims must be tested
- Claude Code official documentation and plugin architecture guides — these determine what is actually buildable versus theoretically desirable
- Practitioner documentation from instructional designers who have used AI tools for curriculum generation — they have direct experience with the quality gaps the thesis describes
- The researcher's own source documents (doctrine file and existing template) — the primary artifacts being diagnosed and extended
- Published prompt engineering research specifically applied to educational contexts (CIDDL briefs, MDPI Education papers on AI prompting)

**Be skeptical of:**
- Marketing materials and product pages from AI curriculum generation tools (Disco, Teachfloor, Coursiv, etc.) — they systematically overstate pedagogical grounding and have a commercial interest in appearing learning-science-compliant
- General "AI in education" trend pieces and conference talks from 2023-2024 — these tend toward hype and rarely engage with the specific structural problem of encoding learning science constraints into generation logic
- The existing accelerator template's own framing of the 4E approach as if it were a research-backed framework — the template asserts pedagogical credibility without grounding it; this claim must be independently verified
- Meta-analyses of flipped classroom effectiveness that aggregate across wildly different implementations — the effect size (g ≈ 0.19) is real but modest, and context matters enormously; blanket endorsements hide important moderating conditions
- LLM benchmark papers that claim to evaluate "curriculum quality" using automated metrics — these typically measure surface features (coherence, coverage) rather than deep pedagogical structure
- "Best of" listicles for instructional design tools — these are SEO-optimized content marketing, not independent comparative assessments

---

## Success Criteria

This research is done when:

1. The root cause of the existing template's marketing-heavy output is identified with specificity — not just "it's biased toward marketing" but which structural elements of the template create that bias and why
2. Each of the four doctrine components (Six Metaskills, Theory→Method→Application, Deconstruct→Compare→Rebuild, Flipped Classroom) has been evaluated against the learning science literature with a finding tag and a clear statement of where it is well-supported, where it needs qualification, and where it is underspecified
3. The capabilities and constraints of Claude Code as a platform for this tool are documented precisely enough that an architect could scope a build
4. At least one concrete prompt architecture pattern has been identified that demonstrably produces more pedagogically grounded curriculum output than the existing template's approach
5. A set of articulable, testable validation criteria exists for assessing whether the new tool's output is genuinely more pedagogically sound — not just different or longer
6. The synthesis produces at minimum one clear recommendation that could be acted on immediately (a quick-win architectural change to the existing template) and one that frames the larger tool build
