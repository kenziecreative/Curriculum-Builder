# AI Curriculum Generation Landscape: Research Note

**Date:** 2026-03-14
**Research agent:** Claude Sonnet 4.6
**Purpose:** Foundational competitive and conceptual landscape research for the knz-learner-builder project
**Core thesis under investigation:** Existing AI curriculum tools produce output that is fast and well-formatted but pedagogically thin — they optimize for content coverage and surface coherence rather than learning design integrity.

---

## Question 1: What Do Current AI Curriculum Generation Tools Actually Produce?

### Disco (disco.co)

**Output:** Disco's AI transforms existing content (videos, webinars, PDFs, brief descriptions) into structured course outlines in under five minutes. Output includes: course outlines with modules, multimedia support blocks, quizzes, and assignments. The system auto-generates estimated completion times by analyzing content length and complexity.

**Pedagogical design principles embedded:** Minimal. The generation logic centers on content ingestion and reformatting, not learning design. The platform positions itself around "social learning" and engagement, but AI generation is primarily a content-structuring function, not a pedagogical sequencing function.

**Systematically absent:** Evidence of explicit learning progression logic, formative assessment integration, scaffolding, or transfer design. The platform claims output "reflects unique voice and authenticity" — a marketing framing that obscures the absence of learning science constraints. Assessment (quizzes) appears to be generated as an add-on rather than designed into the learning sequence.

**Sources:** https://www.disco.co/ai, https://whop.com/blog/disco-ai-review/

**Tag: SUPPORTED** — The core thesis holds. Disco optimizes for rapid content packaging, not pedagogical design.

---

### Teachfloor

**Output:** Teachfloor's AI generates full course curricula from a prompt or PDF, producing structured lesson modules with learning objectives, quizzes, and assessment rubrics. The built-in AI editor adjusts tone, translates content, and completes lesson text.

**Pedagogical design principles embedded:** Teachfloor shows more explicit acknowledgment of learning design than most competitors — it generates "learning objectives tailored to the topic" and "assessment rubrics," which suggests some awareness of alignment. Peer review systems and cohort delivery architecture reflect social constructivist assumptions.

**Systematically absent:** The generation of learning objectives appears syntactic rather than substantive (objectives are generated for a topic, not reverse-engineered from desired performance outcomes). No documented sequencing logic, cognitive load management, or deliberate formative feedback loops built into the AI generation layer. Assessment features appear to be generated independently from content rather than designed as integrated learning verification.

**Sources:** https://www.teachfloor.com/blog/ai-curriculum-generator, https://elearningindustry.com/directory/elearning-software/teachfloor/features

**Tag: SUPPORTED** — Assessment and objectives are present in output but appear generated as checklist items rather than designed as a pedagogical system.

---

### LearnWorlds AI

**Output:** LearnWorlds AI produces course titles, section structures, quiz questions (MCQ, true/false, open-ended, matching), ebook content, interactive video elements (subtitles, quizzes, summaries), landing page copy, and email marketing sequences. The platform claims 38 AI functions powered by 200+ education-specific prompts.

**Pedagogical design principles embedded:** The inclusion of education-specific prompt templates represents a meaningful attempt at pedagogical constraint. However, a key signal is that LearnWorlds explicitly co-generates **marketing copy and landing pages** alongside curriculum content — the system architecture treats educational content and promotional content as equivalent output categories. This is evidence of marketing register drift baked into the design.

**Systematically absent:** The 200+ education-specific prompts appear oriented toward content generation efficiency rather than learning design integrity. No documented integration between objective-setting, content sequencing, and assessment design. Quiz generation is framed as an "add questions from scratch or by reading existing activities" — assessment as annotation rather than design.

**Sources:** https://www.learnworlds.com/ai-course-creator/, https://www.learnworlds.com/ai/, https://support.learnworlds.com/support/solutions/articles/12000105890

**Tag: SUPPORTED** — The co-generation of marketing copy and curriculum content in a single system is a structural indicator of pedagogical thinness.

---

### FeedbackFruits

**Output:** FeedbackFruits occupies a different position in the market — it is less a course generator and more a learning activity and feedback infrastructure layer. Its AI companion Acai generates open-ended discussion questions and corresponding answers from study materials. The Learning Design System provides a framework for mixing learning activities.

**Pedagogical design principles embedded:** FeedbackFruits is meaningfully more pedagogically sophisticated than content generators. Its architecture explicitly centers active learning, assessment-feedback loops, peer review, and Universal Design for Learning. The system positions AI as supporting the designer rather than replacing design judgment.

**Systematically absent:** FeedbackFruits is not a curriculum generator — it does not produce course outlines, lesson sequences, or full curriculum artifacts. It is a design support layer. This is a meaningful product category distinction from the other tools in this list.

**Sources:** https://feedbackfruits.com/blog/introducing-the-learning-design-system-feedbackfruitss-approach-for-scalable-learning, https://feedbackfruits.com/blog/ai-and-active-learning

**Tag: COMPLICATED** — FeedbackFruits partially contradicts the core thesis because it functions as a pedagogically-aware design assistant rather than a thin content generator. However, this is precisely because it does not attempt to be a curriculum generator.

---

### Courseau

**Output:** Courseau generates mini-courses from uploaded documents (PDFs, video links, webinar recordings), producing course outlines, interactive quizzes, and key takeaways. The platform uses GPT-3.5 and GPT-4. Courses are consumable as playlists.

**Pedagogical design principles embedded:** Courseau claims models are "trained with stand-out examples of effective learning materials and developed with learning design best practices in mind" — but this claim is marketing language without substantiation. The output format (playlist-style consumption) implies a passive content delivery model rather than an active learning design.

**Systematically absent:** Evidence of scaffolding logic, formative assessment integration, or transfer design. The playlist/mini-course format is structurally incompatible with progressive skill-building curriculum design.

**Sources:** https://courseau.co/, https://training.safetyculture.com/blog/ai-course-generator/

**Tag: SUPPORTED** — "Trained with best practices in mind" is an unverifiable claim that substitutes for actual pedagogical design constraint.

---

### MagicSchool AI

**Output:** MagicSchool AI is K-12 oriented and functions as a teacher productivity tool rather than a full curriculum builder. It produces: lesson plans, multiple choice assessments, rubrics, worksheets, report card comments, standards-aligned quiz questions (MagicQuizzes). The platform claims teachers save 7+ hours per week.

**Pedagogical design principles embedded:** MagicSchool operates at the lesson and activity level rather than curriculum architecture level. Standards alignment is an explicit constraint in quiz generation. The focus is on reducing teacher administrative burden, not on improving learning design quality.

**Systematically absent:** Unit-level or curriculum-level sequencing and coherence. Assessment is generated as a standalone artifact (quiz generator), not as an integrated component of a designed learning progression. No evidence of transfer design or cognitive scaffolding logic.

**Sources:** https://www.magicschool.ai/magic-tools, https://guides.libraries.uc.edu/ai-education/msa

**Tag: SUPPORTED** — MagicSchool optimizes for teacher time savings at the activity level, not learning design integrity at the curriculum level.

---

### Generic ChatGPT/Claude Approaches

**Output:** Both ChatGPT and Claude can generate curriculum outlines, lesson plans, learning objectives, assessments, and full lesson content on request. Claude outputs tend to be "more polished and ready to use"; ChatGPT outputs tend to offer "more creative ideas to build on."

**Pedagogical design principles embedded:** Neither model is trained specifically for instructional design. Both can produce outputs that use correct pedagogical vocabulary (Bloom's taxonomy levels, learning objectives syntax) but without ensuring that vocabulary maps to actual design integrity. Dr. Philippa Hardman's comparative study found that ChatGPT 4o "lacked practical understanding of how to adapt theories to specific learner contexts like class size, resources, or time constraints." Pre-service teacher research confirmed ChatGPT "still could not fully understand a particular group of targeted students and their specific needs."

**Systematically absent:** Contextual adaptation, learner-specific scaffolding, integrated formative assessment design, sequencing logic grounded in cognitive load or prerequisite mapping. Hardman specifically notes that "AI can write objectives that look syntactically correct and follow Bloom's Taxonomy, but they're often generic or fail to align with actual learning needs."

**Sources:** https://drphilippahardman.substack.com/p/how-good-are-claude-chatgpt-and-gemini, https://bccampus.ca/2025/12/16/claude-vs-chatgpt-choosing-the-right-ai-for-the-job/, https://citejournal.org/volume-24/issue-4-24/general/bridging-generative-ai-technology-and-teacher-education-understanding-preservice-teachers-processes-of-unit-design-with-chatgpt/

**Tag: SUPPORTED** — Syntactically correct pedagogical vocabulary is produced; semantically grounded learning design is not.

---

## Question 2: The Practitioner Quality Gap

### Dr. Philippa Hardman's Research Program

Hardman runs a practitioner-research Substack (drphilippahardman.substack.com) focused on AI in instructional design. Key findings across multiple pieces:

**"The State of Instructional Design 2024":** 84% of instructional designers had tried ChatGPT; 57% used it daily — but this had yet to significantly impact productivity. Despite widespread adoption, L&D teams were still completing approximately 12 projects annually (same as pre-AI), with 38% still turning down work due to capacity constraints. This is what Hardman calls "the AI illusion" — the appearance of impact without substantive change.

**"Does GenAI Actually Improve Instructional Design Quality?" / "Accelerating Excellence?":** Hardman ran a comparative quality study using a blind-scoring rubric with 6 categories (instructional strategy, learning objectives, content, activity, feedback & assessment). Results:
- Manual (human-only) designs: average score 2.37/5.00
- ChatGPT-assisted designs: average score 3.22/5.00
- Epiphany AI (specialized tool)-assisted designs: average score 4.08/5.00

Key finding: AI-generated content is "formulaic in tone, has shallow emotional resonance, and inconsistent visual detail." Learning objectives generated by AI "look syntactically correct and follow Bloom's Taxonomy, but they're often generic or fail to align with actual learning needs."

**"How Good Are Claude, ChatGPT & Gemini at Instructional Design?":** This piece directly compares general-purpose LLMs on ID tasks. ChatGPT 4o lacked "practical understanding of how to adapt theories to specific learner contexts." The conclusion: "until we have specialised, fine-tuned AI copilots for instructional design, we should be cautious about relying on general-purpose models and ensure expert oversight in all ID tasks."

**Sources:** https://drphilippahardman.substack.com/p/the-state-of-instructional-design, https://drphilippahardman.substack.com/p/does-genai-actually-improve-instructional, https://drphilippahardman.substack.com/p/ai-in-instructional-design-reflections, https://drphilippahardman.substack.com/p/the-ai-illusion-in-l-and-d

**Tag: SUPPORTED** — Hardman's quality measurement framework provides the most rigorous empirical support for the core thesis available in practitioner literature.

---

### TechTrends/Springer SWOT Analysis (2024)

The paper "Utilizing Generative AI for Instructional Design: Exploring Strengths, Weaknesses, Opportunities, and Threats" (TechTrends, July 2024) used ChatGPT to generate a course map for a makerspace course and conducted SWOT analysis.

Key finding: ChatGPT "shows promise as an efficient and effective tool for creating course maps, yet it still requires the domain knowledge and instructional design expertise to warrant quality and reliability."

This is a carefully hedged finding — efficiency gains are real; quality requires human expertise overlay. The paper does not claim AI produces high-quality curriculum without expert intervention.

**Source:** https://link.springer.com/article/10.1007/s11528-024-00967-w, https://eric.ed.gov/?q=improve+AND+quality&ff1=souTechTrends:+Linking+Research+and+Practice+to+Improve+Learning&id=EJ1433193

**Tag: SUPPORTED**

---

### Frontiers in Education Systematic Review (2025)

"A systematic review of the early impact of artificial intelligence on higher education curriculum, instruction, and assessment" (Frontiers in Education, 2025) reviewed 33 studies published within 9 months of ChatGPT's release. Key finding for this research: "compared to student- or administration-facing AI, little attention has been given to the impact of AI on faculty's perspective or their curriculum, instruction, and assessment (CIA) practices." The absence of CIA-focused research is itself a signal — the ecosystem is building tools faster than it is studying curriculum quality outcomes.

**Source:** https://www.frontiersin.org/journals/education/articles/10.3389/feduc.2025.1522841/full

**Tag: GAP** — Systematic research on AI-generated curriculum quality (as distinct from AI-assisted student learning) is underdeveloped.

---

### CIDDL Practitioner Briefs

CIDDL (Center on Inclusive Design and Innovation for Learning) published a research and practice brief focused on generative AI prompt engineering for educators, with special emphasis on special education contexts. Key finding: "ineffective prompt inputs for GenAI often lead to undesired output" — the quality of AI curriculum output is directly coupled to prompt quality, which in turn requires domain knowledge that most educators lack.

The brief highlights a skills gap: educators need prompt engineering training to extract pedagogically sound output from AI, but this training is currently insufficient.

**Source:** https://ciddl.org/ciddl-research-and-practice-brief-generative-ai-prompt-engineering-for-educators/

**Tag: SUPPORTED**

---

### Quality Matters White Paper (2025)

"From Automation to Transformation: AI Strategies for Personalized, Engaging and Inclusive Online Course Design" (Quality Matters, 2025) provides evidence-based guidance for integrating AI into course design while maintaining quality standards. The paper maintains that human oversight is essential and that AI-generated content requires expert validation. The 2024 CHLOE Report cited in QM materials found that 80% of online learning leaders believe AI will have significant impact on course development within five years — indicating the field anticipates transformation but has not yet achieved it.

**Source:** https://www.qualitymatters.org/sites/default/files/research-docs-pdfs/QM-White-Paper-AI-Strategies-for-Course-Design.pdf

**Tag: SUPPORTED**

---

### The Jagged Frontier in Instructional Design

Dell'Acqua, Mollick, Ransbotham et al.'s field experiment with professional consultants (Harvard Business School, 2024) introduced the "jagged frontier" concept: AI produces reliably strong results for tasks within its capability boundary, but for tasks outside that boundary, "consultants using AI performed 19 percentage points worse than those working without it" — AI actively degraded performance. Hardman applied this framework to instructional design, finding that specialized L&D tasks (needs analysis, goal definition, instructional design decision-making) fall outside the general capability frontier of generic LLMs.

**Source:** https://www.hbs.edu/ris/Publication%20Files/24-013_d9b45b68-9e74-42d6-a1c6-c72fb70c7282.pdf, https://drphilippahardman.substack.com/p/defining-and-navigating-the-jagged

**Tag: SUPPORTED** — The jagged frontier concept provides a rigorous theoretical frame for why generic AI curriculum generators underperform.

---

## Question 3: Can AI Produce Pedagogically Sound Curriculum With Constraints?

### Evidence That Constraints Improve Output

The evidence base here is real but needs careful interpretation.

**Bloom's Taxonomy integration:** Multiple studies examine LLM-generated questions aligned to Bloom's taxonomy levels. A 2024 arxiv paper on automated question generation found that LLMs can produce Bloom's-aligned questions — but with a key failure: "most models struggle to generate high-quality questions at the 'Create' level of Bloom's taxonomy." AI performs well at lower-order Bloom's levels (recall, comprehension, application) but poorly at higher-order ones (analysis, synthesis, creation). This is a systematic capability boundary, not a prompting problem.

**Prompt engineering systematic review (Sage, 2025):** A comprehensive systematic review of prompt engineering in education found that structured prompting (predefined patterns, constraints, evaluation frameworks) improves AI output quality in educational contexts. Constraints and limitations are identified as accounting for 39% of prompt engineering challenges. The implication: constraints help but require expertise to formulate correctly.

**Pedagogical prompting research:** Research on "pedagogical prompting" — designing prompts that specify how AI should teach, not just what content to produce — shows promise. A specific study on student-AI interaction in computer science education found "significant improvements in learners' LLM-based pedagogical help-seeking skills" when structured pedagogical prompts were provided.

**The PROSE model:** Research proposes the PROSE model (Persona, Rubric, Objective, Steps, Examples) as a prompt structure that aligns AI outputs with constructive alignment principles. This is a practitioner-facing framework rather than a validated empirical finding.

**Sources:** https://arxiv.org/html/2408.04394v1, https://journals.sagepub.com/doi/10.1177/07356331251365189, https://arxiv.org/html/2506.19107v2

---

### The IDEA Framework (CIDDL)

The IDEA framework for educational AI prompting: Include essential components, Develop prompts using clear language, Evaluate outcomes and refine prompts, Apply accountability. The "Include" step specifies Persona, Aim, Recipient, Theme, Structure (PARTS). The "Develop" step uses CLEAR (Concise, Logical, Explicit, Adaptive, Restrictive) criteria.

This framework is practitioner-facing guidance rather than a research-validated intervention, but its emphasis on explicit pedagogical constraints (audience specification, learning objectives, structural restrictions) aligns with the broader evidence base.

**Source:** https://ciddl.org/ciddl-research-and-practice-brief-generative-ai-prompt-engineering-for-educators/

---

### Critical Qualification

The evidence for constraint-based AI curriculum generation improving quality is real but bounded:

1. Constraint-based prompting improves output quality **relative to unconstrained prompting** — it does not necessarily produce output that meets expert practitioner standards.
2. Hardman's comparative data shows ChatGPT-assisted designs (with skilled prompting) score 3.22/5 vs. specialized tool designs scoring 4.08/5 — a significant gap remains.
3. The most important constraint finding: specifying named pedagogical frameworks (Bloom's, Merrill's, Gagné's) in prompts produces output that uses correct vocabulary but does not guarantee the underlying design logic is sound. The model pattern-matches to framework language without necessarily implementing framework principles.

**Tag: SUPPORTED with qualification** — Constraints improve AI curriculum output. Constraints alone do not close the quality gap to expert-level pedagogical design.

---

## Question 4: Known Failure Modes of LLM Curriculum Generation

### Failure Mode 1: Topic Coverage Bias (Content Listing vs. Progression Design)

AI curriculum generators systematically produce **lists of topics** rather than **designed learning progressions**. The distinction matters: a topic list is an inventory of content; a learning progression is a sequence of increasingly complex encounters with concepts, designed around prerequisite relationships and cognitive load management.

Evidence: Multiple sources document that AI generates "generic content that cannot be used and implemented directly in practice" and that "AI tools help structure, but don't deeply optimize pedagogical flow." The AI function for generating course outlines is explicitly described in several platforms as producing "a quick list of suggested modules" — the word "list" is telling.

The underlying mechanism: LLMs are trained on text that describes topics, not on the cognitive science of learning sequences. Topic adjacency in training data does not map to pedagogical prerequisite structure.

**Tag: SUPPORTED** — Widely documented in practitioner and research literature.

---

### Failure Mode 2: Syntactically Correct but Semantically Empty Learning Objectives

AI generates learning objectives that pass surface-level inspection (they use action verbs, they reference Bloom's taxonomy) but fail on substantive alignment. Hardman: "AI can write objectives that look syntactically correct and follow Bloom's Taxonomy, but they're often generic or fail to align with actual learning needs."

The Dell'Acqua/Mollick research on consultants found that for tasks outside AI's capability frontier, AI-assisted workers performed worse than non-AI workers. Writing pedagogically grounded learning objectives appears to be such a task — AI produces the surface form without the substance.

**Tag: SUPPORTED**

---

### Failure Mode 3: Assessment as Afterthought

Across all platforms reviewed, assessment generation is structurally separated from content generation. Platforms generate quizzes either (a) as a separate step after content creation, or (b) as an automatic add-on annotation of existing content. Neither approach reflects how assessment functions in intentional curriculum design — where formative assessment is designed before content, as a specification of what demonstrating learning looks like.

A 2023 Frontiers in Education paper specifically identifies this: "existing research predominantly focuses on AI applications for automating grading or providing instant feedback... limited attention has been given to how AI can fundamentally transform the nature and methodology of the assessment itself."

**Tag: SUPPORTED** — The product architecture of AI curriculum generators structurally produces this failure mode.

---

### Failure Mode 4: Marketing Register Drift

LearnWorlds explicitly generates marketing copy and landing pages alongside curriculum content in the same workflow. This is not a peripheral feature — it is a structural signal that the system architecture does not differentiate between promotional language and educational language.

More broadly: AI-generated educational content is documented as "formulaic in tone" (Hardman). The formulas AI pattern-matches most strongly are content marketing formulas, not learning design formulas. Educational platforms using AI text generation import this default register unless they explicitly constrain against it.

This failure mode is less documented in research and more visible in product observation. However, the Hardman finding about "shallow emotional resonance" in AI-generated learning content is consistent with marketing register drift — both reflect optimization for surface persuasion rather than substantive learning design.

**Tag: EMERGING** — Less systematically documented than other failure modes, but consistent with available evidence.

---

### Failure Mode 5: Flattening of Scaffolding

AI-generated curricula tend to flatten cognitive complexity gradients. Research on AI scaffolding in education identifies that "widely used conversational agents are frequently treated as tutors, yet they are not designed with pedagogical guardrails that reliably prevent over-scaffolding or solution disclosure." The inverse failure (under-scaffolding by removing complexity gradients) appears in curriculum generation contexts.

The mechanism: AI learns from training data in which explanations are typically written at a single difficulty level for a given audience. It lacks the model of learner progression over time that would allow it to design content that deliberately increases complexity as competence builds.

Research on preservice teachers using ChatGPT for unit design found that "ChatGPT still could not fully understand a particular group of targeted students and their specific needs" — the absence of learner modeling means scaffolding decisions cannot be grounded in actual learner state.

**Tag: SUPPORTED with qualification** — Over-scaffolding (answer-giving) is more documented than under-scaffolding/flattening. Both mechanisms are present in different contexts.

---

### Failure Mode 6: Hallucination of Learning Sequences

AI generates learning sequences that are internally coherent at the surface level but may not correspond to how humans actually develop competence in a domain. This is distinct from factual hallucination — it is *structural* hallucination: the sequence looks like a legitimate curriculum but is not grounded in how expertise is actually built.

Evidence: The TechTrends SWOT study found ChatGPT-generated course maps "require domain knowledge and instructional design expertise to warrant quality and reliability" — meaning the structure requires expert validation, implying the structure can be wrong in ways that require expert diagnosis to detect.

**Tag: EMERGING** — This is a named concern in practitioner literature but lacks systematic empirical study. It is the most theoretically interesting failure mode for the thesis of this project.

---

### Summary: Failure Mode Taxonomy

| Failure Mode | Evidence Status | Mechanism |
|---|---|---|
| Topic coverage bias | SUPPORTED | LLMs trained on content descriptions, not cognitive science |
| Syntactically correct but empty objectives | SUPPORTED | Surface form pattern-matching without semantic grounding |
| Assessment as afterthought | SUPPORTED | Product architecture separates assessment from content |
| Marketing register drift | EMERGING | AI defaults to persuasive register absent explicit constraint |
| Flattening of scaffolding | SUPPORTED with qualification | Absence of learner progression modeling |
| Hallucination of learning sequences | EMERGING | Structural coherence without pedagogical grounding |

---

## Question 5: Generators vs. Design Assistants

### The Product Category Distinction

A meaningful distinction exists between two AI tool categories in the instructional design space:

**Content Generators:** Tools designed to produce complete curriculum artifacts (outlines, lessons, assessments, full courses) with minimal human intervention. Examples: Disco AI, Teachfloor AI, Courseau, LearnWorlds AI, MagicSchool AI. The product proposition is speed and volume. Quality responsibility is transferred to the user.

**Design Assistants:** Tools designed to augment the instructional designer's judgment rather than replace it. Examples: Articulate AI Assistant (Rise/Storyline), FeedbackFruits, Epiphany AI. The product proposition is accelerated expert work. Quality responsibility remains with the professional user.

This distinction is not fully formalized as a recognized product category in the industry, but it is operationally significant. Articulate explicitly articulates the design assistant philosophy: "The teams getting the most from AI Assistant aren't letting it build courses for them, but rather using it to move faster through mechanics so they can spend more time on structure, narrative, and moments that drive behavior change."

**Source:** https://maestrolearning.com/blogs/articulate-rise-360-ai/, https://www.articulate.com/blog/ai-assistant-is-here/

**Tag: SUPPORTED** — The distinction is real and visible in product design, even if not formalized as a named category.

---

### Epiphany AI: The Specialist Design Assistant Case

Epiphany AI (epiphany.education), developed in collaboration with Hardman, represents the clearest example of a specialized design assistant. Key positioning: "built from the ground up to do one task — instructional design — like a pro." The explicit contrast: "most tools in the space are focused on building faster — Epiphany is focused on building better."

Quality data: Epiphany-assisted designs scored 4.08/5 vs. ChatGPT-assisted 3.22/5 vs. manual 2.37/5. The specialized tool also produced designs 72% faster than ChatGPT-assisted workflows and 368% faster than manual workflows.

This is the strongest available evidence that the generator vs. assistant distinction maps to meaningfully different quality outcomes — and that the assistant approach, when purpose-built for the domain, outperforms both generic generators and human-only design.

**Source:** https://epiphany.education/, https://drphilippahardman.substack.com/p/accelerating-excellence, https://www.oreateai.com/blog/epiphany-ai-the-smartest-copilot-for-designing-learning-that-actually-works/

**Tag: SUPPORTED**

---

### The Role of Human Expert Review

The consensus across practitioner and research literature is that human expert review is non-negotiable in AI-assisted curriculum development. Key formulations:

- "AI can generate course materials quickly, but human oversight is crucial to ensure that those materials meet high teaching standards and truly facilitate learning." (general practitioner consensus)
- "The best outcomes come when instructional designers use AI as a collaborator, not a replacement." (Articulate research)
- Quality Matters: AI must be integrated with "human oversight and prioritizing student fairness and accessibility."
- Hardman's jagged frontier application: specialized ID tasks (needs analysis, goal definition, instructional design decision-making) are outside the general-purpose LLM capability frontier.

**Tag: SUPPORTED** — Unanimous across sources with varying emphasis.

---

### Implications for Product Positioning

The generator vs. assistant distinction suggests that positioning a Claude Code-native curriculum builder as a **design assistant that embeds pedagogical constraints into the generation process** occupies a distinct and underserved position relative to the current market.

Current market poles:
1. Pure generators (Disco, Teachfloor, Courseau) — fast, thin, no expertise required
2. Generic AI (ChatGPT, Claude) — unconstrained, quality depends entirely on user expertise
3. Purpose-built specialist tools (Epiphany) — high quality, not developer-native, requires separate workflow

Gap: A developer-native tool (Claude Code) that functions as a design assistant by encoding pedagogical constraints, sequencing logic, and assessment integration into the generation architecture — allowing expert-quality outputs without requiring the end user to supply all the expertise through prompting.

**Tag: GAP** — This specific product position is not currently occupied.

---

## Cross-Cutting Observations

### The Adoption-Impact Gap

The most striking finding across the literature is what Hardman calls "the AI illusion" — widespread adoption of AI tools in instructional design has not produced proportional improvement in output quality, speed, or capacity. Despite 84% adoption rates among instructional designers, L&D teams were still completing approximately 12 projects/year and turning down work at 2024 rates similar to pre-AI baselines.

The explanation is structural: generic AI tools are being applied to specialized tasks for which they are not optimized, without the expertise overlay required to compensate for their limitations.

### The Expertise Dependency Problem

The research consistently shows that AI curriculum output quality scales with user expertise in both prompt engineering and learning design. This creates a paradox: the users who most need curriculum generation support (those lacking instructional design expertise) get the worst quality outputs, while expert instructional designers can use AI to augment their already-sound practice.

A tool architecture that encodes expertise into generation constraints rather than requiring it from users would break this paradox.

### Measurement Gap

There is no widely adopted, instrument-level quality rubric for AI-generated curriculum design. Hardman's 6-category rubric (instructional strategy, learning objectives, content, activity, feedback & assessment) is the most rigorous available in practitioner literature, but it is not standardized or widely replicated. This measurement gap means the field lacks the infrastructure to systematically evaluate tool improvements.

---

## Source Index

### Primary Sources Consulted

- Dr. Philippa Hardman Substack (drphilippahardman.substack.com): Multiple pieces cited above — primary practitioner research source
- Dell'Acqua, Mollick, Ransbotham et al. "Navigating the Jagged Technological Frontier" (HBS, 2024): https://www.hbs.edu/ris/Publication%20Files/24-013_d9b45b68-9e74-42d6-a1c6-c72fb70c7282.pdf
- TechTrends SWOT (Springer, July 2024): https://link.springer.com/article/10.1007/s11528-024-00967-w
- Frontiers in Education Systematic Review (2025): https://www.frontiersin.org/journals/education/articles/10.3389/feduc.2025.1522841/full
- Quality Matters White Paper (2025): https://www.qualitymatters.org/sites/default/files/research-docs-pdfs/QM-White-Paper-AI-Strategies-for-Course-Design.pdf
- CIDDL Prompt Engineering Brief: https://ciddl.org/ciddl-research-and-practice-brief-generative-ai-prompt-engineering-for-educators/
- Prompt Engineering in Education Systematic Review (Sage, 2025): https://journals.sagepub.com/doi/10.1177/07356331251365189
- CITE Journal preservice teacher ChatGPT unit design study: https://citejournal.org/volume-24/issue-4-24/general/bridging-generative-ai-technology-and-teacher-education-understanding-preservice-teachers-processes-of-unit-design-with-chatgpt/
- Automated Bloom's question generation (arxiv, 2024): https://arxiv.org/html/2408.04394v1
- Articulate AI Assistant documentation: https://www.articulate.com/blog/ai-assistant-is-here/
- Epiphany AI: https://epiphany.education/
- Disco AI: https://www.disco.co/ai
- Teachfloor AI Curriculum Generator review: https://www.teachfloor.com/blog/ai-curriculum-generator
- LearnWorlds AI: https://www.learnworlds.com/ai-course-creator/
- FeedbackFruits Learning Design System: https://feedbackfruits.com/blog/introducing-the-learning-design-system-feedbackfruitss-approach-for-scalable-learning
- MagicSchool AI: https://www.magicschool.ai/magic-tools

---

*Research note compiled 2026-03-14. This note synthesizes web-accessible sources; paywall-gated papers (Springer, Frontiers full text) were accessed via search summaries and ERIC abstracts where direct access was unavailable.*
