# Phase 9: Competitive Landscape and Gap Analysis — What Exists and What's Missing

## Executive Summary

The competitive landscape for AI-assisted curriculum design in 2025-2026 is simultaneously crowded and empty. Crowded, because dozens of tools now offer AI-powered course creation, content generation, and learning management. Empty, because not one of them encodes learning science constraints as structural requirements in their generation logic. The thesis's core claim — that no existing tool is Claude Code-native, doctrine-encoded, and pedagogically constrained rather than marketing-oriented — is confirmed by a systematic review of the most prominent tools across three market categories, supplemented by practitioner research documenting the quality gap between AI-generated and expert-designed curriculum.

The most striking finding is not the absence of pedagogically grounded AI tools, but the empirical evidence of what that absence produces. Research from 2024-2025 documents widespread AI adoption among instructional designers (84% have tried ChatGPT, 57% use it daily) with zero measurable impact on the speed, volume, or quality of their work. The gap is not between AI and no-AI — it is between generic AI tools and research-informed AI workflows, a distinction that maps precisely onto the thesis's proposed intervention.

---

## Research Question 1: What Are the Most Sophisticated AI-Native Curriculum Design Tools?

The AI-native curriculum design space divides into three tiers of pedagogical sophistication, though even the highest tier falls substantially short of what learning science requires.

**Tier 1: Content Generators Without Pedagogical Logic.** Disco, Coursiv, Mini Course Generator, and similar platforms generate curriculum components — lessons, quizzes, modules, assignments — from natural language prompts. Disco, the most aggressively marketed of this group, claims to be an "AI-first platform purpose-built for creating learning experiences that adapt and evolve." In practice, its AI feature documentation contains no mention of Bloom's taxonomy, backward design, cognitive load theory, scaffolding, or any named instructional design framework. The AI generates content from prompts without explanation of how it handles learning objective specification, assessment alignment, or sequencing logic. Most of the search results for Disco's pedagogical capabilities led back to Disco's own blog posts — a pattern of vendor content marketing substituting for independent validation that the thesis research plan explicitly warned against. [Source: competitive-landscape-ai-curriculum-tools]

Teachfloor occupies a similar position: it offers "AI-powered course outline generation" and "automated content creation based on learning objectives," but provides no documentation of how objectives are formulated, validated, or linked to assessments. Its peer review feature is a genuine social learning component, but the generation logic itself is a black box. [Source: competitive-landscape-ai-curriculum-tools]

**Tier 2: AI-Enhanced Workflow Tools.** Mindsmith represents the most pedagogically intentional tool in the AI-native category. Unlike Tier 1 generators, Mindsmith incorporates a built-in needs analysis stage before AI generates content — asking about audience, goals, and context — and provides a storyboard review stage where designers can see and modify the course structure before full lesson generation. Practice activities are distributed throughout modules rather than confined to end-of-module quizzes. The tool is beta-testing an "AI Agent" that suggests "structural and pedagogical enhancements," and a practitioner review noted that "good instructional design requires judgment and context and tradeoffs and decision-making even when you're using AI." Mindsmith secured $4.1M in seed funding in November 2025 to "redefine corporate e-learning design." [Source: competitive-landscape-ai-curriculum-tools]

However, even Mindsmith does not enforce backward design, validate learning objective-to-assessment alignment, encode scaffolding logic, implement transfer design, or map metaskills. It is the most design-aware of the AI-native tools, but it operates at the "needs analysis + content generation" level, not the "structural constraint enforcement" level that the thesis proposes. The difference is architectural: Mindsmith adds design-informed steps to the workflow; the thesis proposes encoding design constraints as generation requirements that the AI cannot skip or satisfy superficially. [Source: competitive-landscape-ai-curriculum-tools]

Easygenerator and 360Learning occupy adjacent positions. Easygenerator explicitly targets subject matter experts rather than instructional designers, "lowering the barrier to entry for content creation" — which means prioritizing accessibility over design rigor. 360Learning uses a "Learning Champions" model for peer-driven course creation with AI-assisted first drafts, but its pedagogical logic depends entirely on the human champions' expertise. [Source: competitive-landscape-ai-curriculum-tools]

**Tier 3: Pedagogy-Driven Enhancement Tools.** FeedbackFruits stands apart from the field by being the only commercially available tool developed in explicit collaboration with universities (Erasmus University Rotterdam and Rotterdam University of Applied Sciences) and designed around pedagogical principles rather than content generation speed. Its Automated Feedback Coach promotes metacognitive development by helping students improve their own feedback quality rather than passively receiving corrections. However, FeedbackFruits is not a curriculum generator — it is a learning activity toolkit that enhances existing courses. It occupies a fundamentally different product category from the thesis's proposed tool. [Source: competitive-landscape-ai-curriculum-tools]

SC Training (formerly EdApp) is notable for one specific reason: its microlearning optimization is the closest any commercial tool comes to encoding a specific learning science principle (spaced practice) into its generation logic. This suggests the design pattern is viable, even though SC Training implements it narrowly. [Source: competitive-landscape-ai-curriculum-tools]

---

## Research Question 2: What Do Traditional ID Tools Offer That AI-Native Tools Miss, and Vice Versa?

The traditional-to-AI-native tool comparison reveals a clean division of capabilities with a gap in the middle that neither side occupies.

Traditional authoring tools — Articulate 360, Adobe Captivate, iSpring Suite — are powerful canvases for building interactive learning experiences. Articulate 360 dominates the eLearning market with its user-friendly Storyline workspace and remains the tool of choice according to the 2024 Synthesia/Hardman survey. Adobe Captivate supports VR content, interactive videos, and complex branching scenarios. iSpring Suite leverages the familiar PowerPoint interface for rapid content creation and is the most affordable option. All three are increasingly adding AI features — AI-assisted drafts, translation, assessment generation, generative text and images — but these features accelerate production, not design. [Source: competitive-landscape-ai-curriculum-tools]

The critical distinction is where the design intelligence lives. In traditional tools, all pedagogical decisions — sequencing, scaffolding, assessment alignment, objective formulation — reside entirely in the human designer's head. The tool is a canvas, not a design assistant. It offers no validation that the course is pedagogically sound, no enforcement of alignment between objectives and assessments, no scaffolding logic. The design quality ceiling is high (limited only by the designer's expertise), but the design quality floor is absent (nothing prevents poor design from being beautifully rendered).

In AI-native tools, the AI generates content and structure, but typically without embedded pedagogical logic. The design intelligence lives in the AI's training data — a mix of everything on the internet, including marketing copy, blog posts, and actual instructional design literature, with no mechanism to privilege the latter over the former. This is precisely the "marketing register drift" identified in Phase 3 and the "template-like outputs" documented across multiple studies. [Source: competitive-landscape-ai-curriculum-tools]

dominKnow occupies an interesting middle position. Its use of xAPI to connect learning objectives to specific skills or competencies, with courses adapting based on what a learner already knows, is the most genuinely pedagogical feature in the traditional tool category. It implements something the thesis's tool should take seriously: competency-based progressive design where prior knowledge actually modifies the learning path. [Source: competitive-landscape-ai-curriculum-tools]

The hybrid model the thesis proposes — AI generation power constrained by encoded pedagogical logic, with human judgment structured rather than replaced — is the gap between these two categories. No existing tool occupies this space. Traditional tools leave design to humans (high ceiling, no floor). AI-native tools delegate design to unconstrained AI (fast output, thin pedagogy). The thesis tool would constrain AI generation with schema-enforced design requirements while preserving human judgment at the points where it matters most.

---

## Research Question 3: Are There Existing Claude Code Plugins for Educational Design?

There are no existing Claude Code plugins that address educational design, curriculum generation, or pedagogically constrained content creation. The plugin ecosystem, while rapidly growing (347+ plugins, 1,900+ skills as of early 2026), is almost entirely focused on software development workflows. [Source: competitive-landscape-ai-curriculum-tools]

The closest architectural analogs are:

**The Deep Trilogy** (Pierce Lamb) demonstrates the multi-stage decomposition pattern that the curriculum builder would use: /deep-project transforms vague ideas into components, /deep-plan creates detailed implementation plans, /deep-implement executes with TDD and code review. Replace "software idea" with "curriculum concept" and the pipeline structure is directly transferable — structured intake → decomposition → planning → implementation → validation. [Source: competitive-landscape-ai-curriculum-tools]

**The document-skills plugin** (@anthropics, 92.9k downloads) handles Excel, Word, PowerPoint, and PDF file manipulation — proving that Claude Code can produce non-code structured documents. However, it is a file format tool, not a content design tool. [Source: competitive-landscape-ai-curriculum-tools]

**Multi-agent orchestration systems** demonstrate that Claude Code supports the kind of complexity the curriculum builder would require. One system implements 112 specialized agents, 16 orchestrators, 146 skills, and 79 tools organized into 72 plugins. The curriculum builder's architecture — with specialized agents for intake, objective generation, assessment design, validation, and output formatting — is well within the platform's demonstrated capabilities. [Source: competitive-landscape-ai-curriculum-tools]

**The GSD framework** (this project's own tooling) provides the most directly relevant reference implementation. It manages multi-phase project execution with persistent state, verification loops, parallel agent execution, and quality gates — all patterns the curriculum builder would need. [Source: competitive-landscape-ai-curriculum-tools]

Most significantly, Claude Code is already being used for non-software structured document workflows. A practitioner on r/ClaudeAI documented using Claude Code since early 2025 for personal knowledge management (Obsidian vault), meeting notes processing, and workflow automation — setting up custom output styles, 10+ skills, multiple subagents for research and analysis, and commands for repetitive tasks. The key insight: "Claude Code can build you all of the tooling you need to help you run Claude Code for any task." The curriculum builder would be a more specialized, pedagogically constrained version of patterns already proven in the wild. [Source: competitive-landscape-ai-curriculum-tools]

The niche is genuinely unoccupied. An educational design plugin for Claude Code would be the first of its kind — not because the platform can't support it, but because no one has built it yet.

---

## Research Question 4: What Does Market Research Reveal About ID Software Limitations?

The practitioner research from 2024-2025 reveals a field in a paradoxical state: massive AI adoption with minimal measurable impact, documented quality gaps that practitioners recognize but cannot address with current tools, and an emerging understanding of why generic AI fails at instructional design.

**The Adoption-Without-Impact Paradox.** Dr. Philippa Hardman's analysis of 2024 survey data is the clearest articulation of the problem. In 2023, only 5% of learning professionals had tried AI tools. By 2024, 84% had tried ChatGPT and 57% used it daily. Despite this adoption, industry averages remained unchanged: 96% of instructional designers who use AI still work on only 2-4 projects at once; the majority still turn down projects due to capacity constraints; almost half of all IDs' time is still on practical development and implementation; and designers still complete approximately 16 projects annually. "Generic AI models" are the root cause: "without a user who can bring (a) significant expertise in optimal instructional design practices and (b) understanding of how LLMs work and how to work best with them, the value we can get from generic AI models and tools like ChatGPT and Claude is severely limited." [Source: competitive-landscape-ai-curriculum-tools]

A commenter on Hardman's analysis captured the structural problem: "We are not equipping IDs/LXDs/SMEs with the right knowledge about human learning and how to augment that with AI tools...simply 'grabbing' ChatGPT and running with it with your old, preconceived notions of what design is, with the same approaches, processes, and tools, they are doing more of the same." But one counter-voice reported a dramatically different result: "In our AI-enabled design pilots we have been showing consistently 60-80% less design effort and keeping or improving the quality of design...but we are augmenting research-informed design, not more ppt decks." The difference between no impact and 60-80% efficiency gains is not the AI model — it is whether the workflow encodes research-informed design principles. [Source: competitive-landscape-ai-curriculum-tools]

**The Quality Gap Evidence.** Multiple studies converge on specific, measurable quality failures:

Hu et al. found that 78% of GPT-4-generated math lesson plans required "significant adjustments" to align with local standards and learner backgrounds. Research documents up to 40% fabricated references in AI-generated content. A 2025 study found ChatGPT-generated multiple-choice questions required revision due to 6% factual incorrectness, 6% irrelevance, and 14% inappropriate difficulty. Studies document a 32% reduction in unique assessment designs with excessive AI reliance, as the convenience of AI-generated templates leads to over-standardization. And 40% of designers accepted AI suggestions without adaptation, producing "less creative and less contextually appropriate lessons." [Source: competitive-landscape-ai-curriculum-tools]

The CITE Journal's systematic review of 35 studies identified the central concern as "erosion of design intentionality, learner-centeredness, and pedagogical depth in the pursuit of automation." The most frequently reported challenge was "factual inaccuracies, lack of depth, and template-like outputs" requiring "careful review." [Source: competitive-landscape-ai-curriculum-tools]

**The Jagged Frontier.** Hardman's application of the BCG "jagged technological frontier" framework to instructional design provides the most nuanced map of where AI helps and where it harms. The BCG study found that for tasks inside the frontier, AI users achieved 12.2% higher completion rates and 40% higher-quality outputs — but for tasks outside the frontier, AI users performed 19 percentage points worse. Applied to instructional design:

Inside the frontier (automate freely): formatting and structure (65% time reduction), ideation and brainstorming (47% increase in idea diversity), technical execution like MCQ generation (95% time reduction).

Danger zone (requires validation): content generation ("formulaic in tone, shallow emotional resonance"), learning objectives (syntactically correct but contextually inappropriate), assessment questions (quality issues documented above), course outlines (structurally similar regardless of pedagogical context — "a compliance course and graduate seminar receive structurally similar outlines").

Outside the frontier (keep human): needs analysis ("cannot read body language or understand organizational power dynamics"), strategic pedagogical reasoning ("commercial LLMs do not come preloaded with the depth of pedagogical theory needed to design truly effective activities," Starkey et al., 2025), and implementation and human-centered work. [Source: competitive-landscape-ai-curriculum-tools]

This framework is directly actionable for the thesis's tool design. The curriculum builder should automate what's inside the frontier, enforce rubric-based validation for the danger zone (the Phase 5 finding about schema-enforced constraints), and structure human judgment for tasks outside the frontier (the structured intake identified in Phase 5).

**Emerging Frameworks.** Three frameworks have emerged to address the quality gap: ADGIE (replacing ADDIE's "Development" phase with AI generation plus continuous validation), ARCHED (using specialized AI agents with human final selection), and FRAME (explicit risk management of hallucination, drift, and domain gaps). All three share the same core requirement: maintaining and strengthening human instructional design expertise. The ARCHED framework's evaluation is particularly relevant: its AI-generated learning objectives, constrained by Bloom's taxonomy and validated against rubric, achieved weighted Cohen's Kappa of 0.834 with expert classification and showed no significant quality differences from human-created objectives. This confirms the Phase 5 finding: when AI generation is constrained by specific pedagogical parameters and validated against enumerable criteria, output quality approaches expert level. When it is not, quality degrades in predictable, documented ways. [Source: competitive-landscape-ai-curriculum-tools]

---

## Research Question 5: Are There Non-Software Document Generation Workflows in Claude Code or Similar Environments?

The most mature domain for AI-assisted structured document generation outside software is legal practice. Law firms are using LLMs to generate first drafts of motions, briefs, and legal memoranda with proper citation format and reasoning structure. DWT Prose suggests writing edits based on established attorney work, integrating multiple LLMs alongside custom models. Compliance monitoring agents track regulatory changes across jurisdictions. The architectural pattern is consistent: domain knowledge base + structural templates/schemas + expert review workflow + citation/evidence requirements. This pattern maps directly to curriculum generation, where the knowledge base is learning science, the structural templates are curriculum schemas, the expert review is pedagogical validation, and the citation requirements are evidence-based design justification. [Source: competitive-landscape-ai-curriculum-tools]

The legal domain also demonstrates the primary risk: fabricated citations remain a critical problem, paralleling the 40% fabricated references documented in AI-generated educational content. The architectural response in both domains is the same — structured validation against verifiable sources, not unconstrained generation. [Source: competitive-landscape-ai-curriculum-tools]

Claude's platform capabilities for non-software document generation have expanded significantly. Anthropic added file-creation and analysis in September 2025, enabling generation of spreadsheets, Word documents, PowerPoint presentations, and PDFs directly in chat. Claude now operates as a Microsoft Office add-in with cross-application context passing. The File System and Document Processing Skill "produces verifiable outputs that integrate with databases and workflow engines, making document-heavy operations programmable components inside broader automation systems." [Source: competitive-landscape-ai-curriculum-tools]

Within the Claude Code ecosystem specifically, the practitioner evidence confirms that non-code structured document workflows are viable and already in use. The key design patterns transferable to curriculum generation are: CLAUDE.md for persistent project context (analogous to doctrine encoding), output styles for behavior customization (analogous to pedagogical register), skills for specific workflows (analogous to generation pipeline stages), and subagents for dedicated task focus (analogous to validation and quality-checking agents). [Source: competitive-landscape-ai-curriculum-tools]

---

## Synthesis: The Four-Category Market Map and the Unoccupied Position

The competitive landscape resolves into four categories, only three of which are currently populated:

**Category 1: AI Content Generators** (Disco, Teachfloor, Coursiv, Mini Course Generator). Fast content generation from prompts, no embedded pedagogical logic, output quality dependent entirely on the prompt and the user's design expertise. Optimizes for speed and volume. Marketing-forward positioning.

**Category 2: Traditional Authoring Canvases** (Articulate 360, Adobe Captivate, iSpring Suite). Powerful tools for building interactive learning experiences, with all design intelligence residing in the human designer. High ceiling, no floor. Increasingly adding AI features for acceleration, not design.

**Category 3: AI-Enhanced Design Workflows** (Mindsmith, Easygenerator, 360Learning, FeedbackFruits). AI speeds up parts of the design process, with some tools adding design-aware scaffolding (Mindsmith's needs analysis, FeedbackFruits' pedagogy-driven approach). Better than Category 1 but still lacks structural constraint enforcement.

**Category 4: AI-Constrained Pedagogical Design Systems** (unoccupied). AI generation power constrained by schema-enforced pedagogical requirements, with validation against enumerable learning science criteria, structured human judgment at critical decision points, and output that is auditable against design standards. This is the category the thesis's tool would create and occupy.

The evidence supports this positioning decisively. The quality gap is documented and systematic. The gap between generic and research-informed AI workflows is the precise intervention the thesis proposes. The Claude Code platform supports the architectural pattern. And the market niche is genuinely unoccupied — not because it is unviable, but because it requires the intersection of instructional design expertise, learning science knowledge, and Claude Code platform engineering that no existing team has combined.

---

## Findings Summary

| # | Finding | Tag | Evidence |
|---|---------|-----|----------|
| 1 | No existing tool encodes pedagogical constraints as structural generation requirements | SUPPORTED | Review of 15+ tools across 3 categories; none implement schema-enforced pedagogical validation |
| 2 | The quality gap between AI-generated and expert-designed curriculum is documented and systematic | SUPPORTED | 78% need significant adjustments (Hu et al.); 40% fabricated references; 32% reduction in assessment diversity; "template-like outputs" (CITE review) |
| 3 | Generic AI adoption produces no measurable impact; research-informed AI workflows produce 60-80% efficiency gains | SUPPORTED | Hardman 2024 survey data (unchanged industry metrics despite 84% adoption) vs. practitioner report of 60-80% gains with research-informed design |
| 4 | The "jagged frontier" maps which ID tasks to automate, constrain, or keep human | EMERGING | BCG 2023 framework applied to ID (Hardman 2025); inside/danger/outside frontier taxonomy; ARCHED validation (κw = 0.834 with constraints) |
| 5 | Claude Code supports non-software structured document workflows, and the educational design niche is unoccupied | SUPPORTED | Plugin ecosystem review; practitioner evidence of non-code workflows; no educational design plugins exist among 347+ plugins |
| 6 | Traditional and AI-native tools serve complementary weaknesses, with a hybrid gap neither occupies | SUPPORTED | Traditional: powerful canvas, no design intelligence; AI-native: fast generation, no design constraints; gap = AI-constrained design system |
| 7 | Three emerging frameworks (ADGIE, ARCHED, FRAME) all require maintaining human expertise alongside AI — confirming the thesis's human-in-the-loop design | SUPPORTED | All three frameworks require expert oversight; ARCHED demonstrates AI matching human quality only when constrained by taxonomy + rubric |
