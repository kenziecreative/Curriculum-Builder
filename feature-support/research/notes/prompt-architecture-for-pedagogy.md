# Prompt Architecture for Pedagogy
## Research Note — Phase 4

**Question:** How do you structure prompts so the AI actually implements learning science logic, not just uses the vocabulary?

**Date:** 2026-03-15
**Status:** Complete

---

## Summary of Core Finding

The gap between "uses framework vocabulary" and "implements framework logic" cannot be closed by constraints alone. It requires a combination of: (1) role framing that activates structural rather than narrative registers, (2) schema-enforced outputs that make completeness verifiable, (3) sequential decomposition that forces dependencies between generation steps, (4) self-critique against a concrete rubric rather than generic quality checks, and (5) adequate input that gives the system something to reason from rather than pattern-match against. Each of these is independently insufficient; together they shift the output from plausible-sounding curriculum toward structurally coherent curriculum.

---

## Area 1: Role Framing Effects on Output Quality

### What the research shows

Role/persona prompting is the most studied area — and the results are more negative than the prompt engineering industry acknowledges.

**The primary empirical finding is that persona prompts do not reliably improve task performance.** A 2023 study (updated October 2024) tested 162 roles across 6 interpersonal relationship types and 8 expertise domains against 2,410 factual questions on 4 LLM families. The conclusion was reversed from the original: adding personas in system prompts does not improve model performance compared to a no-persona control. The original abstract claimed consistent improvement; the update corrected this.

[TAG: finding-negative] Personas don't improve factual accuracy. The gender, type, and domain of the persona can all influence prediction accuracy, but automatically identifying the best persona for a given task performs no better than random selection.

A companion 2024 paper ("Persona is a Double-Edged Sword") found that "expert" personas are frequently not the best option for tasks requiring their expertise. The benefit of expert role framing is inconsistent and task-dependent.

**However, this research primarily measures factual accuracy on question-answering benchmarks.** The finding may not transfer to structural generation tasks like curriculum design, where the role framing influences *register and format* rather than factual correctness. The evidence that does hold for curriculum use:

- Role framing affects **tone, register, and intent** even when it doesn't affect accuracy. A legal assistant persona produces highly structured, formal output. A travel guide persona produces conversational narrative. This stylistic effect is consistent even when the factual performance effect is nil.
- Assigning a role that implies structure ("instructional designer," "curriculum engineer") activates formatting conventions associated with that role through training data pattern matching — even if the underlying reasoning isn't expert-level.
- The framing effect on register is real and documented even if the framing effect on correctness is not.

[TAG: finding-practical] The implication for curriculum generation: role framing changes *how* the AI writes more reliably than it changes *what* it knows. "Workshop facilitator specializing in masterful storytelling" primes for narrative, engagement language, and participant experience framing. "Instructional designer performing backward design analysis" primes for structured, criterion-referenced, outcome-anchored framing. The role doesn't make the AI more expert; it changes which training data patterns it activates.

### What this means for the engine

- **Replace engagement-priming roles with structure-priming roles.** "Instructional designer" or "curriculum engineer" is better than "workshop facilitator" not because the AI becomes more expert, but because it activates structural register conventions.
- **The role alone is insufficient.** Per the research, it's unreliable as the primary quality mechanism. Treat role framing as register initialization, not quality guarantee.
- **Avoid roles that explicitly prime for audience engagement.** "Storyteller," "facilitator," "coach" all activate narrative conventions that compete with structural rigor. The old template's role was actively working against the desired output type.
- **Specificity matters more than expertise level.** "Instructional designer who builds competency-based curriculum using backward design" is more useful than just "expert instructional designer" because it names the structural conventions to activate.

### Sources
- "When A Helpful Assistant Is Not Really Helpful" — arxiv.org/abs/2311.10054 (updated Oct 2024)
- "Persona is a Double-Edged Sword: Enhancing Zero-shot Reasoning by Ensembling Role-playing and Neutral Prompts" — arxiv.org/html/2408.08631v1
- "LLM Personas: How System Prompts Influence Style, Tone, and Intent" — brimlabs.ai/blog/llm-personas-how-system-prompts-influence-style-tone-and-intent/
- "Role Prompting: Does Adding Personas Really Make a Difference?" — prompthub.us/blog/role-prompting-does-adding-personas-to-your-prompts-really-make-a-difference

---

## Area 2: Constraint Specification — Binding vs. Advisory

### What the research shows

The critical distinction the research surfaces: **constraints embedded in an output schema are binding; constraints stated as instructions are advisory.**

When you tell an LLM "every objective must have an associated assessment," this is an instruction that can be forgotten, overridden by other patterns, or satisfied nominally (the AI adds a one-sentence assessment mention that satisfies the letter but not the logic). When you give the LLM a JSON/YAML schema with required fields, the model must populate every field or it fails schema validation — completeness becomes a structural property of the output, not a requested behavior.

**Key research findings on structured outputs:**

- Defining an explicit output schema is the single most reliable technique for enforcing completeness. "Models don't naturally respect structure unless you tell them exactly what 'correct' looks like." (Lakera prompt engineering guide)
- OpenAI Structured Outputs (JSON schema with strict mode) guarantee that output matches the schema with no missing fields and no deviations. This is categorically stronger than instruction-based constraints.
- Claude specifically "excels in preserving nested hierarchies and attribute completeness, particularly in complex formats such as JSON and YAML." (Lakera)
- Schema-based prompting (expressing tasks through data structures rather than natural language) exploits LLM exposure to code, documentation, and structured data during pre-training. The model infers task requirements from the schema's shape rather than from instruction text.

**On output rubrics vs. framework naming:**

Specifying what a good answer must *contain* (a rubric with required components) is substantially different from *naming a framework* the answer should follow. The research on self-critique (see Area 4) shows that quality degrades when you ask the model to "improve this" generically versus asking it to verify against specific criteria. The same principle applies at the constraint specification level: naming Bloom's Taxonomy produces outputs with Bloom's vocabulary; a schema with `bloom_level: [required, enum: analyze|evaluate|create|...]` produces outputs where every objective is categorized.

**On XML tags for prompt structure:**

Claude's documentation recommends XML tags for structuring prompts. The evidence shows XML tags reduce misinterpretation of which text is instructions vs. context vs. examples. Critically noted: XML is appropriate for *prompt structure* (marking what is instructions, what is context, what is the output template), not for *data interchange in output* where JSON performs better on token efficiency and comprehension accuracy (67.1% for XML vs. higher rates for JSON in structured output benchmarks).

[TAG: finding-practical] The practical hierarchy for constraint binding (strongest to weakest):
1. Schema-enforced output (JSON/YAML with required fields, validated)
2. Structured output template with required sections the AI must fill
3. Output checklist the AI must verify before submitting
4. Inline constraints ("MUST include," "for every X, you MUST provide Y")
5. Framework naming ("use Bloom's taxonomy")
6. Role framing ("as an instructional designer...")

The old template operated primarily at levels 5-6. Moving to levels 1-3 is the mechanism for closing the vocabulary-vs-logic gap.

### What this means for the engine

- **Design a curriculum schema with required fields.** Each learning objective should have required child fields: `bloom_level` (enum), `formative_assessment` (required), `transfer_task` (required), `prerequisite_knowledge` (required). The model cannot omit these; it must generate them.
- **Use XML tags to structure the prompt itself** (separating instructions from context from schema from examples), and JSON/structured markdown for the output format.
- **The output schema IS the constraint specification.** Stop writing instruction paragraphs about what must be included. Put it in the schema.
- **Inline constraints ("MUST") have measurable effect but can still be nominally satisfied.** Use them as a secondary layer, not primary.

### Sources
- "Introduction to Schema Based Prompting" — opper.ai/blog/schema-based-prompting
- "Structured Outputs" — platform.openai.com/docs/guides/structured-outputs
- "Prompt Engineering for Structured Data: A Comparative Evaluation of Styles and LLM Performance" — preprints.org/manuscript/202506.1937
- "Use XML tags to structure your prompts" — platform.claude.com/docs/en/build-with-claude/prompt-engineering/use-xml-tags
- Lakera prompt engineering guide — lakera.ai/blog/prompt-engineering-guide
- "Prompt Engineering Best Practices for Structured AI Outputs" — levelup.gitconnected.com/prompt-engineering-best-practices-for-structured-ai-outputs-ee44b7a9c293

---

## Area 3: Sequencing and Decomposition in Prompts

### What the research shows

**Chain-of-thought (CoT) prompting improves complex reasoning by generating intermediate steps** before the final answer. The foundational Wei et al. 2022 paper (Chain-of-Thought Prompting Elicits Reasoning in Large Language Models — arxiv.org/abs/2201.11903) showed gains on arithmetic, commonsense, and symbolic reasoning. The mechanism is that allocating more token generation to intermediate steps produces better final answers.

However, there are critical caveats for curriculum use:

[TAG: finding-caveat] CoT generates a series of intermediate reasoning steps *in a single prompt response*. For curriculum generation, the more important insight is **sequential decomposition across multiple calls** — generating objectives first (with full CoT if needed), then assessments constrained by those objectives, then content constrained by both. This is architecturally different from CoT and addresses the alignment problem at a structural level.

**The case for sequential decomposition:**

The old template tried to generate everything in one pass with stop-gates (prompts that asked the AI to pause and check before proceeding). Research on AI curriculum generation identifies "working memory capacity" as a failure mode: "AI tools lose track of previously generated assessments and other course components, leading to hallucination — the AI fabricates content or information to complete tasks — resulting in instructional materials not properly aligned with earlier assessments." (Neovation, 2024)

Sequential decomposition solves this structurally: when generating content in Step 3, the previously generated objectives and assessments are injected as context, not held in the AI's working memory. The constraints are architectural, not mnemonic.

**Backward design as generation sequence:**

The literature on backward design (Wiggins & McTighe's Understanding by Design) is directly applicable. Backward design reverses the traditional forward/content-centered approach:
- Traditional: Select content → Build activities → Create assessments → (maybe) Craft objectives
- Backward: Identify desired results → Determine acceptable evidence (assessments) → Plan learning experiences

Research shows backward design specifically prevents the "busy work" problem where activities exist for their own sake rather than to serve learning outcomes. The same logic applies to AI generation: if you generate content first, it becomes the anchor and objectives are retrofitted. If you generate objectives first, content must serve them.

[TAG: finding-research-gap] The specific question of whether generating assessments before content in an AI pipeline produces better alignment than generating both together has not been directly tested in the published literature as of this writing. The backward design evidence is from human curriculum design practice. However, the structural argument is strong: assessment-first generation forces the content generation step to operate under a constraint that wouldn't exist otherwise.

**The Bloom's taxonomy sequencing research:**

A 2024 paper on automated educational question generation at different Bloom's levels (arxiv.org/html/2408.04394v1) found that augmenting prompts with explicit definitions of Bloom's taxonomy levels improved output quality. More specifically: "Prompts can be augmented with Chain-of-Thought instructions to make LLMs think sequentially about how to proceed." This confirms that when you force the model to reason about cognitive level explicitly before generating, the output better reflects that level.

### What this means for the engine

- **Use sequential multi-call generation, not single-pass.** Each stage's output becomes the next stage's input constraint, not just context.
  - Stage 1: Generate learning objectives (with Bloom's level required per objective)
  - Stage 2: Generate assessments for each objective (injecting Stage 1 output as constraint)
  - Stage 3: Generate module content (injecting Stages 1+2 as constraint)
  - Stage 4: Generate marketing description (derived from Stage 3, not the other way)
- **The generation order is the alignment mechanism.** Marketing last is not just preference — it forces marketing to be derived from curriculum rather than curriculum rationalized from marketing.
- **Within each stage, use CoT for complex reasoning tasks.** For Stage 1 objective generation, "think through what understanding looks like at this level for this audience, then write the objective" produces better objectives than just "write objectives."
- **Stop-gates within a single prompt are weaker than architectural decomposition.** The old template's approach (generating everything in one call with pause-and-check instructions) doesn't solve the working-memory alignment problem.

### Sources
- "Chain-of-Thought Prompting Elicits Reasoning in Large Language Models" — arxiv.org/abs/2201.11903 (Wei et al., 2022)
- "Automated Educational Question Generation at Different Bloom's Skill Levels using Large Language Models" — arxiv.org/html/2408.04394v1
- "Leveraging generative AI for course learning outcome categorization using Bloom's taxonomy" — ScienceDirect (2025)
- "Backward Design" — Wiggins & McTighe, Understanding by Design (2005)
- "8 practical AI tool uses for your instructional design workflow" — neovation.com/learn/87-8-practical-ai-tool-uses-for-your-instructional-design-workflow
- "Chain of thought in LLMs: elicited reasoning or constrained imitation?" — gregrobison.medium.com

---

## Area 4: Enforcing Structural Completeness

### What the research shows

**The self-validation problem has a specific failure mode:** LLMs asked to "improve" their own output generically perform worse than LLMs checking against a concrete rubric with specific criteria.

The 2023 paper "Large Language Models Cannot Self-Correct Reasoning Yet" (ICLR 2024) established an important baseline: **intrinsic self-correction (without external feedback) does not reliably improve performance and sometimes degrades it.** Specifically, the model is more likely to change a correct answer to an incorrect one than to fix an incorrect one. Without an oracle or external signal, self-correction is unreliable for reasoning tasks.

**However, rubric-based self-critique is a distinct and more promising approach:**

- "The constitution acts as an external reference frame — the model isn't asking a vague 'Is this good?' but a specific 'Does this violate principle X?' This transforms open-ended introspection into constrained verification against a textual rule set." (learnprompting.org/docs/reliability/lm_self_eval)
- "Remove that structured rubric and ask the model to 'improve this' generically, and the quality degrades — the result is shallow, generic feedback that optimizes for blandness rather than correctness." (Vadim's blog on LLM self-correction research)
- Constitutional AI (Anthropic, 2022) demonstrates that self-critique against a stated set of principles produces measurably better outputs than unconstrained revision.

[TAG: finding-practical] The practical implication: a self-validation step is worthwhile **only if it is validating against specific, named criteria** — not against a generic quality request. "Check your response" is useless. "For each learning objective, verify: (1) it specifies a Bloom's level verb, (2) it has a corresponding formative assessment, (3) the formative assessment matches the cognitive level, (4) there is a transfer task" is the difference between decoration and mechanism.

**On structural completeness requirements:**

The EduPlanner system (2025, IEEE Transactions on Learning Technologies) demonstrates a working pattern: an evaluator agent applies a five-dimension rubric (Clarity, Integrity, Depth, Practicality, Pertinence) to curriculum output, and an optimizer agent uses that feedback to revise. The iterative loop between a generation agent and an evaluation agent produces measurably better instructional design quality than single-pass generation.

The "Hierarchical Pedagogical Oversight" multi-agent paper (arXiv 2512.22496, 2025) takes a similar approach with adversarial roles: curriculum designers and specialists that evaluate student understanding and instructional effectiveness through dialectical processes.

[TAG: finding-practical] Even without a full multi-agent system, the pattern is implementable in a single-session workflow: generate → self-evaluate against rubric → revise. The key constraint: the rubric must specify what structural elements are required, not just what quality looks like.

### What this means for the engine

- **Include a validation step as a required stage.** After generating the full curriculum structure, run a second prompt that checks for: (1) every objective has a Bloom's level verb; (2) every objective has a formative assessment at the same cognitive level; (3) every module specifies prerequisites; (4) scaffolding sequence is explicit; (5) no module exists without a stated objective.
- **The validation rubric must be specific and enumerable.** It's not "does this look like good curriculum?" It's a named checklist of structural requirements.
- **Rubric-based validation is categorically stronger than instruction-based constraints.** You get both: schema enforces completeness on generation; rubric enforces correctness on review.
- **Flag but don't always fix in the same step.** The model asked to validate AND revise in one step often revises away the problem without solving it. Separate the critique step from the revision step.
- **Self-correction for reasoning is unreliable; self-correction against a concrete checklist is viable.** Use the latter.

### Sources
- "Large Language Models Cannot Self-Correct Reasoning Yet" — arxiv.org/abs/2310.01798 (ICLR 2024)
- "When Can LLMs Actually Correct Their Own Mistakes?" — direct.mit.edu/tacl/article/doi/10.1162/tacl_a_00713 (TACL 2024)
- "Understanding the Dark Side of LLMs' Intrinsic Self-Correction" — arxiv.org/html/2412.14959v1
- Constitutional AI: Harmlessness from AI Feedback — anthropic.com/research/constitutional-ai-harmlessness-from-ai-feedback
- LLM Self-Evaluation: Improving Reliability with AI Feedback — learnprompting.org/docs/reliability/lm_self_eval
- "EduPlanner: LLM-Based Multi-Agent Systems for Customized and Intelligent Instructional Design" — arxiv.org/abs/2504.05370 (IEEE TLT 2025)
- "Hierarchical Pedagogical Oversight: A Multi-Agent Adversarial Framework" — arxiv.org/pdf/2512.22496

---

## Area 5: The Input Question

### What the research shows

**What an instructional designer needs before designing curriculum** (from ADDIE analysis phase):

The ADDIE model's Analysis phase identifies the following as required inputs before any design work begins:
1. **Learner characteristics** — Who are the learners? What are their backgrounds, ages, prior knowledge levels, existing skills?
2. **Learning objectives** — What must learners know, understand, and be able to do by the end?
3. **Performance gap** — What is the gap between current and desired state? Is instruction even the solution?
4. **Task analysis** — What specific tasks/behaviors must learners perform?
5. **Constraints and resources** — Time available, delivery format, budget, technology, physical environment
6. **Assessment approach** — What standards or competency frameworks apply? How will success be measured?

Backward design (Wiggins & McTighe, UbD) frames Stage 1 input requirements as:
1. **Enduring understandings** — What big ideas should students retain long after the course?
2. **Essential questions** — What debatable, inquiry-generative questions guide the curriculum?
3. **Knowledge and skills** — What specific things should students know and be able to do?
4. **Transfer goals** — Where should students be able to apply this learning?

[TAG: finding-gap] **The gap in existing AI curriculum tools:**

Current AI curriculum generators (based on a review of MiniCourse, Teachable, Junia AI, GravityWrite, AcademyOcean, and others) typically collect:
- Course topic or title
- Target audience (often just "beginners/intermediate/advanced" or age group)
- Sometimes: number of modules/duration

What they consistently miss:
- Prior knowledge specifics (not just "beginner" — what does the learner already know that is relevant?)
- Transfer goals (where will they use this? in what context?)
- Performance gap analysis (why do they need this? what failure are they avoiding?)
- Delivery format constraints beyond "online/in-person"
- Assessment approach preferences
- Content that already exists vs. must be generated
- Relationship to adjacent knowledge (what do learners know that this builds on or challenges?)

The Stanford/Stanford SCALE paper (arxiv.org/abs/2506.11767, "Designing Effective LLM-Assisted Interfaces for Curriculum Development") confirms this empirically: the predefined UI that guided educators through structured input collection ("UI Predefined") significantly outperformed the open-interface ChatGPT interaction in usability and output quality. The key insight: reducing reliance on unguided prompt engineering by structuring what inputs are collected improves outputs more than improving the system prompt.

[TAG: finding-practical] **Minimum viable inputs that produce meaningfully better output:**

Beyond topic + audience level, the following additions produce substantially better curriculum output:
1. **Specific prior knowledge** — not "intermediate" but "learner can do X but cannot yet do Y"
2. **Transfer context** — where/when/how will this learning be applied?
3. **Success criteria** — what does a capable graduate look like in concrete behavioral terms?
4. **Duration and format constraints** — these determine scaffolding granularity
5. **One or two enduring understandings** — the big ideas the curriculum should build toward

The research suggests that inputs 1-3 (prior knowledge, transfer context, success criteria) produce the most improvement per unit of input effort. These are what most tools completely miss.

### What this means for the engine

- **Build a structured intake form, not a free-text prompt.** The Stanford paper's finding that a structured UI significantly outperforms an open interface applies directly here.
- **Required fields before generation:** topic, specific audience knowledge baseline, transfer context, success criteria (behavioral), duration, and at least one enduring understanding.
- **"Beginner/intermediate/advanced" is not sufficient audience specification.** The system needs to ask: "What does your learner already know that is relevant? What can they do? What gap are you closing?"
- **Transfer goals are the most underspecified input in existing tools.** They are also the most directly useful for generating content that isn't generic.
- **The input form IS part of the prompt architecture.** Collecting structured inputs allows the prompt to inject them into a schema with named fields, rather than treating them as a paragraph of context.

### Sources
- "Designing Effective LLM-Assisted Interfaces for Curriculum Development" — arxiv.org/abs/2506.11767 (Stanford SCALE, 2025)
- ADDIE Model documentation — instructionaldesign.org/models/addie/ and devlinpeck.com/content/addie-instructional-design
- Understanding by Design — Wiggins & McTighe (2005); files.ascd.org/staticfiles/ascd/pdf/siteASCD/publications/UbD_WhitePaper0312.pdf
- "Backward Design" — teaching.uic.edu/cate-teaching-guides/syllabus-course-design/backward-design/
- AI curriculum generator reviews — graphy.com/blog/ai-curriculum-generator/, teachfloor.com/blog/ai-curriculum-generator

---

## Area 6: The Generation Order Question

### What the research shows

**The correct order of operations in instructional design practice:**

Traditional (forward) design begins with content selection and ends with objectives. This produces curriculum where objectives rationalize content choices rather than driving them.

Backward design (Wiggins & McTighe) reverses this:
1. Identify desired results (objectives, enduring understandings, essential questions)
2. Determine acceptable evidence (assessment design)
3. Plan learning experiences and instruction (content and activities)

The research on alignment is definitive: "Assessment is designed before lesson planning, so that instruction is crafted to best facilitate student learning — students are not completing learning activities just for the sake of doing them." (UIC Teaching and Learning)

"When a teacher aligns objectives, activities, and assessment, they are practicing curriculum alignment, which ensures that all components of the educational experience are connected and support each other effectively." (Studocu/academic literature)

**On assessment-before-content in AI generation:**

No published study has directly compared AI curriculum generation with assessment-first vs. content-first ordering. However, the structural logic is supported by:

1. The alignment literature: "Opportunity to learn is increased for students when there is a match between the content and cognitive processes of course objectives and classroom assessments." (PMC 2025)
2. The working memory problem in AI generation: generating assessments first forces them into context when content is generated, preventing the documented problem of AI losing track of assessment requirements (Neovation case study)
3. The backward design principle extended to AI: if you generate content before assessments, the content becomes the constraint and assessments are retrofitted — the same problem backward design solves in human curriculum design

[TAG: finding-practical] **Why marketing must be last:**

The old template generated marketing language first (transformation promises, outcome claims) and then designed curriculum to match those claims. This is the equivalent of forward design's content-first problem, but worse: it anchors the curriculum to persuasion goals rather than learning goals. Marketing language optimized for appeal tends to overpromise specificity (everyone will master X), compress timelines (in just Y hours), and flatten prerequisite complexity (no prior knowledge required).

Generating marketing last, derived from the completed curriculum structure, inverts this: marketing claims are constrained by what the curriculum actually does. This isn't just a sequencing preference — it's the mechanism for preventing marketing priming from contaminating instructional design decisions.

**The correct generation sequence for this engine:**

Based on the combined evidence from backward design, structured generation research, and AI curriculum generation failure modes:

1. **Input collection** — structured intake (audience, prior knowledge, transfer goals, constraints)
2. **Enduring understandings and essential questions** — the "why does this matter" layer
3. **Learning objectives** — with required Bloom's levels; these constrain everything downstream
4. **Assessment design** — one formative + one summative per objective; constrains content
5. **Module structure and sequencing** — scaffolded content constrained by objectives + assessments
6. **Activities and learning experiences** — implementation of the module structure
7. **Validation step** — rubric check against structural completeness requirements
8. **Marketing and positioning** — derived from the completed curriculum, not the other way

### Sources
- Backward Design principle — Wiggins & McTighe, Understanding by Design (2005)
- "Backward Design: The Basics" — cultofpedagogy.com/backward-design-basics/
- "Alignment analysis of teaching-learning-assessment within the classroom" — diser.springeropen.com/articles/10.1186/s43031-023-00078-1
- "Determining the alignment of assessment items with curriculum goals" — PMC 2025 (pmc.ncbi.nlm.nih.gov/articles/PMC11806761/)
- "Impact of Curriculum Misalignment and Assessment Practices on Student Learning Outcomes" — ResearchGate (2025)
- "Using AI to Assist With Course Design" — teaching-resources.delta.ncsu.edu/ai-course-design/

---

## Synthesis: The Architecture

The six areas converge on a practical architecture. The core insight is that each mechanism addresses a different failure mode:

| Failure Mode | Mechanism | Implementation |
|---|---|---|
| Wrong register (narrative vs. structural) | Role framing | Structure-activating role + specific methodology reference |
| Vocabulary without logic | Schema enforcement | Required fields, not instructions |
| Misalignment between components | Sequential decomposition | Multi-call pipeline with outputs as constraints |
| Generic quality without structural rigor | Rubric-based self-critique | Named checklist, not "improve this" |
| Pattern-matched framework terms | Few-shot examples | Show the structure, not just name it |
| Output not derivable from inputs | Structured intake | Required input fields before generation begins |
| Marketing contaminating pedagogy | Generation order | Marketing derived last, not first |

**The key reframe for the engine design:**

The old architecture tried to generate curriculum quality through a single, complex prompt with many instructions. The research suggests this approach has a ceiling: instruction density doesn't scale past the point where the AI pattern-matches the instruction vocabulary the same way it pattern-matches framework vocabulary.

The new architecture should treat curriculum generation as a **pipeline** where:
- Each stage has a constrained input (previous stage outputs + structured user inputs)
- Each stage has a schema with required fields that enforce completeness
- The schema is the constraint, not the instructions
- A validation stage with a concrete rubric checks structural completeness before finalization
- Marketing is generated last as a derivative output, not a primary output

**On the limit of prompting:**

The research is honest about this: "Constraints in prompts measurably improve AI output but don't close the gap to expert quality — AI pattern-matches framework vocabulary without necessarily implementing framework logic." (Phase 3 finding, consistent with published literature)

The pipeline architecture described above gets closer to expert quality not by making the AI smarter about curriculum design, but by **building the structural requirements into the architecture itself** — so the AI can't skip steps, can't omit fields, can't generate marketing before curriculum, and must check its output against specific criteria before it's complete.

---

## Appendix: Key Papers and Resources

### High-priority (directly applicable)
- arxiv.org/abs/2311.10054 — "When A Helpful Assistant Is Not Really Helpful" (persona performance, 2023/2024)
- arxiv.org/abs/2506.11767 — "Designing Effective LLM-Assisted Interfaces for Curriculum Development" (Stanford SCALE, 2025)
- arxiv.org/abs/2504.05370 — "EduPlanner: LLM-Based Multi-Agent Systems" (adversarial evaluator-optimizer, 2025)
- arxiv.org/abs/2310.01798 — "Large Language Models Cannot Self-Correct Reasoning Yet" (ICLR 2024)
- arxiv.org/abs/2201.11903 — "Chain-of-Thought Prompting Elicits Reasoning" (Wei et al., 2022)
- arxiv.org/html/2408.08631v1 — "Persona is a Double-Edged Sword" (2024)
- arxiv.org/html/2408.04394v1 — "Automated Educational Question Generation at Different Bloom's Levels" (2024)

### Supporting
- andymatuschak.org/files/papers/Wiggins,%20McTighe%20-%202005%20-%20Understanding%20by%20design.pdf
- opper.ai/blog/schema-based-prompting
- learnprompting.org/docs/reliability/lm_self_eval
- platform.claude.com/docs/en/build-with-claude/prompt-engineering/use-xml-tags
- pmc.ncbi.nlm.nih.gov/articles/PMC11806761/ (curriculum alignment, 2025)
- arxiv.org/pdf/2512.22496 — "Hierarchical Pedagogical Oversight" multi-agent (2025)
