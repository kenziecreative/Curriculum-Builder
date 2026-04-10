# Competitive Landscape: AI Curriculum Design Tools

## Source Information
- **Sources:** Multiple (12+ URLs) — Hardman Substack (3 articles), CITE Journal systematic review, ARCHED paper (arXiv), Teachfloor blog, FeedbackFruits blog, Disco.co product pages, Mindsmith product + reviews, Claude Code plugin registry, Reddit Claude Code non-coding guide, Adobe eLearning comparison, Colossyan comparison chart, multiple web searches
- **Type:** Web research compilation — tool evaluations, practitioner surveys, systematic reviews, product documentation
- **Credibility:** Mixed — academic reviews (High), practitioner surveys (Moderate-High), product pages (Low for claims, useful for feature comparison), Reddit guide (Moderate — practitioner experience)
- **Date Accessed:** 2026-03-15
- **Phase:** 9

---

## Category 1: AI-Native Curriculum/Course Design Tools

### Disco.co
- **What it claims:** "AI-first platform purpose-built for creating learning experiences that adapt and evolve"
- **What it actually does:** AI generates curriculum components (lessons, quizzes, modules, assignments) from prompts; AI-generated images; video transcription/summarization; community features (channels, threads, events)
- **Pedagogical logic embedded:** None documented. No mention of Bloom's taxonomy, backward design, cognitive load theory, scaffolding, or any named instructional design framework in their AI feature documentation [Source: Disco.co/ai product page extraction]
- **What's missing:** No explanation of how AI handles learning objective specification, assessment alignment, sequencing logic, or scaffolding. No quality gates or human review workflows documented
- **Market position:** Positions as replacement for legacy LMS; heavy community/social learning emphasis
- **Credibility note:** Most search results about Disco were Disco's own blog posts — limited independent evaluation. Their "Top 7 AI Curriculum Design Tools" lists themselves first. Classic vendor content marketing, not independent assessment
- **Finding: SUPPORTED** — Confirms thesis that AI tools prioritize content generation speed over pedagogical grounding

### Teachfloor
- **What it claims:** "AI-powered course outline generation, automated content creation based on learning objectives"
- **What it actually does:** AI course creation from prompt or PDF; AI instructor review for personalized feedback; quiz/assessment automation; customizable lesson sequences; Zoom integration for synchronous delivery
- **Pedagogical logic embedded:** Claims alignment with "learning objectives" but no documentation of how objectives are formulated, validated, or linked to assessments. Supports peer review activities — one of the few tools with a social learning feature
- **Finding: SUPPORTED** — Feature-complete for delivery but pedagogically thin on generation logic

### Mindsmith
- **What it claims:** "AI-native authoring platform that helps organizations create high-quality, instructionally sound e-learning 12x faster"
- **What it actually does:** AI generates storyboards, course outlines, lessons, assessments from prompts + uploaded documents; SCORM/xAPI export; real-time collaboration; built-in needs analysis questions before generation; drag-and-drop editing
- **Pedagogical features:** The MOST pedagogically intentional of the AI-native tools reviewed:
  - Built-in needs analysis questions BEFORE AI generates content (asks about audience, goals, context) [Source: YouTube walkthrough, Mindsmith blog]
  - AI "Recipes" — structured prompts for different course types
  - Storyboard review stage — lets designers see structure before full generation
  - Practice distribution throughout (not just end-of-module quiz)
  - Beta-testing "AI Agent" that suggests "structural and pedagogical enhancements"
- **Pedagogical logic embedded:** Claims "instructionally sound" but no specific frameworks named. The needs analysis and storyboard stages are genuine design features, not just marketing
- **Honest assessment from practitioner:** "Good instructional design requires judgment and context and tradeoffs and decision-making even when you're using AI right now" — Tim Slade, eLearning designer reviewing Mindsmith [Source: YouTube]
- **What's still missing:** No backward design enforcement, no learning objective → assessment alignment validation, no transfer design, no metaskill mapping, no scaffolding logic
- **Funding:** $4.1M seed round (Nov 2025) to "redefine corporate e-learning design with AI-native platform"
- **Finding: COMPLICATED** — Most pedagogically aware of AI-native tools, but still operates at the "needs analysis + content generation" level, not the "structural constraint" level

### FeedbackFruits
- **What it claims:** AI as "thought partner" with "pedagogy-driven" design
- **What it actually does:** Interactive video/document tools; peer review; AI-powered automated feedback (developed with Erasmus University Rotterdam); competency-based assessment modules; team-based learning features
- **Pedagogical logic embedded:** Most academically grounded of all tools reviewed. Developed in collaboration with universities. Automated Feedback Coach promotes metacognitive development. Learning Design System approach
- **What it is NOT:** Not a curriculum generator. It's a learning activity toolkit — enhances existing courses rather than generating new ones from scratch
- **Finding: COMPLICATED** — Genuinely pedagogy-driven but wrong category. It's an enhancement layer, not a generation tool. The thesis's curriculum builder occupies a different niche

### Other AI-Native Tools (Brief)
- **Coursiv:** Course outline and content generation from prompts. No pedagogical framework documentation found
- **schoolAI:** Standards alignment + personalized learning pathways based on performance. Classroom-focused (K-12), not adult professional learning
- **MagicSchool AI:** Standards-aligned lesson plan generation; differentiated instruction; formative assessment creation. K-12 focused
- **SC Training (formerly EdApp):** Microlearning optimization; mobile-first; spaced learning principles. Closest to encoding a specific learning science principle (spaced practice) into generation logic
- **Mini Course Generator:** Rapid outline generation + quizzes. Minimal pedagogical framework
- **Lingio:** Language learning specific; adaptive learning paths

---

## Category 2: Traditional Instructional Design Authoring Tools

### Articulate 360 (Storyline + Rise)
- **What it does:** Interactive course authoring; PowerPoint-like workspace; advanced interactivity and branching logic; content library; SCORM compliance
- **AI features:** AI-assisted drafts, translation, assessment generation (added recently)
- **Pedagogical logic:** Tool provides structure (branching, interactions, assessments) but does NOT generate pedagogical design — human designer makes all sequencing, scaffolding, and alignment decisions
- **Market dominance:** Still dominates eLearning tooling landscape per Synthesia/Hardman 2024 survey
- **Finding:** Powerful authoring tool, but the design intelligence lives entirely in the human designer's head

### Adobe Captivate
- **What it does:** VR content, interactive videos, complex branching scenarios, responsive design
- **AI features:** Generative text/images/avatars, AI voices, captions, transcription
- **Pedagogical logic:** None embedded in tool logic — tool is a canvas, not a design assistant
- **Limitation:** "Steeper learning curve, not as intuitive for beginners"

### iSpring Suite
- **What it does:** PowerPoint-based authoring; quizzes, dialogue simulations, screen recording; 127,000+ item content library
- **AI features:** AI authoring for content generation, translation
- **Pedagogical logic:** Dialogue simulations for soft skills training is a pedagogically informed feature. Otherwise, human-dependent
- **Cost:** Most affordable of the three traditional tools

### Easygenerator
- **What it does:** AI generates course outlines from brief descriptions; quiz suggestions; custom images; courses from existing documents
- **Target:** SMEs creating courses (not instructional designers) — "lowering the barrier to entry"
- **Pedagogical logic:** Minimal — the tool explicitly prioritizes accessibility for non-designers over design rigor
- **Finding:** Democratizes course creation but potentially at the cost of pedagogical quality

### dominKnow
- **What it does:** Layout precision and consistency; xAPI for competency tracking; adaptive learning paths based on prior knowledge
- **Pedagogical logic:** xAPI competency tracking is a genuinely pedagogical feature — connects objectives to skills, adapts based on learner knowledge. The most "assessment-aligned" of the traditional tools
- **Finding:** Closer to encoding design logic than other traditional tools via xAPI/competency mapping

### Elucidat
- **What it does:** Cloud-based collaborative authoring; templates; analytics for learner progress
- **Target:** Large teams managing high-volume training content
- **Pedagogical logic:** Templates encode some structural patterns but human designers control the pedagogy

---

## Category 3: Claude Code Plugin Ecosystem

### Current State of Non-Code Document Generation in Claude Code
- **document-skills plugin** (@anthropics): Excel, Word, PowerPoint, PDF processing — 92.9k downloads. File format manipulation, not content design
- **code-documentation plugin** (@wshobson): Documentation generation from code — not relevant to curriculum
- **The Deep Trilogy** (Pierce Lamb): /deep-project (idea → components), /deep-plan (detailed plans), /deep-implement (TDD implementation). Software-focused but architecturally relevant — demonstrates the multi-stage decomposition pattern
- **compound-engineering** (@EveryInc): 29 agents, 22 commands, 19 skills for workflow automation — demonstrates scale possible in plugin architecture
- **Multi-agent orchestration** (@wshobson): 112 specialized agents, 16 orchestrators — demonstrates that complex multi-agent workflows are buildable in Claude Code
- **GSD framework** (this project's reference implementation): Multi-phase project management with state tracking, verification, parallel execution — proves non-software complex workflows work in Claude Code

### Claude Code for Non-Coding Work (Practitioner Evidence)
- Reddit user (r/ClaudeAI, 2026): Uses Claude Code since early 2025 for personal knowledge base (Obsidian), meeting notes, media tracking, workflow automation
- Setup pattern: CLAUDE.md for project context → Output Styles for behavior → Skills for workflows → Subagents for dedicated tasks
- Key insight: "Claude Code can build you all of the tooling you need to help you run Claude Code for any task" — the platform is self-bootstrapping for non-code workflows
- One user's Obsidian setup: "Custom output style, 10+ skills, multiple subagents for research/analysis/processing, commands for automating repetitive tasks"
- **Finding: SUPPORTED** — Claude Code is already being used for non-software structured document workflows. The curriculum builder would be a more specialized, pedagogically constrained version of patterns already proven in the wild

### Claude File Creation Feature (Sept 2025)
- Anthropic added file-creation and analysis: spreadsheets, Word docs, PowerPoint, PDFs directly in chat
- Enterprise: Claude as Microsoft Office add-in (Excel, PowerPoint context passing)
- File System and Document Processing Skill: "produces verifiable outputs that integrate with databases and workflow engines"
- **Finding: SUPPORTED** — Platform capabilities have expanded beyond code to include structured document generation

---

## Category 4: Research on AI in Instructional Design (Quality Gap Evidence)

### The "Jagged Frontier" in Instructional Design (Hardman, Oct 2025)
Key framework from BCG 2023 study applied to ID:

**Inside the frontier (AI excels):**
- Formatting & structure: 65% reduction in lesson planning time
- Ideation & brainstorming: 47% increase in idea diversity, 40% more design pathways
- Technical execution: 95% reduction in MCQ generation time; 300% increase in assessment volume with expert oversight

**Danger zone (appears acceptable but quality problems):**
- Content generation: "formulaic in tone, shallow emotional resonance, inconsistent visual detail"
- Learning objectives: Syntactically correct but fail to align with actual learning needs or context
- Assessment questions: 6% factual incorrectness, 6% irrelevance, 14% inappropriate difficulty (2025 study)
- Course outlines: Compliance course and graduate seminar receive structurally similar outlines despite fundamentally different pedagogical needs

**Outside the frontier (AI fails):**
- Needs analysis: Cannot read body language or understand organizational power dynamics
- Strategic pedagogical reasoning: "Commercial LLMs do not come preloaded with the depth of pedagogical theory needed to design truly effective activities" (Starkey et al., 2025)
- Pedagogical judgment: Nuanced design decisions require human expertise
- Implementation & human-centered work: Emotional intelligence AI cannot replicate

**The mis-calibration problem:**
- 88% of students use GenAI for assessments, many accepting AI suggestions without adaptation
- "Bad AI has slowed down a process it was hoped to speed up...often fills in gaps with incorrect information" (Taylor & Vinauskaitė, 2025)
- Up to 23% reduction in output quality for misapplied AI use
- 40% of designers accepted AI suggestions without adaptation → less creative lessons

### ARCHED Framework (Wang & Lin, 2025 — arXiv)
- Addresses three critical deficiencies in current AI-assisted ID: opacity, automation-first approach, assessment standardization
- Uses LOGS (Learning Objective Generation System) + OAE (Objective Analysis Engine) cascading from objectives to assessments via Bloom's taxonomy
- Evaluation: κw = 0.834 agreement with expert Bloom's classification; no significant differences from human-created objectives on quality scores
- Key finding: AI-generated objectives can match human quality WHEN constrained by taxonomy and validated against rubric
- **Finding: SUPPORTED** — Confirms Phase 5 finding that schema-enforced constraints (Bloom's levels as required parameters) produce better output than unconstrained generation

### CITE Journal Systematic Review (2025 — 35 studies)
- ChatGPT appeared in 74% of studies (26/35)
- Six AI roles identified: efficiency/automation, multimodal content, personalization, creative ideation, learner support, systematic frameworks
- Central concern: "erosion of design intentionality, learner-centeredness, and pedagogical depth in the pursuit of automation"
- Quality assurance most frequently reported challenge: "factual inaccuracies, lack of depth, and template-like outputs"
- "AI-generated content driving instructional design processes in ways that might neglect contextual, creative, or learner-centered elements"
- Paradigm shift identified: "AI is no longer merely a supplementary tool but is becoming an embedded and cocreative partner"
- Study limitation: "Substantial proportion were theoretical or conceptual rather than empirical"

### 2024: Widespread Adoption, No Impact (Hardman, Dec 2024)
- 2023: Only 5% of learning professionals had tried AI tools
- 2024: 84% tried ChatGPT; 57% use it daily
- DESPITE this adoption, key metrics unchanged:
  - 96% still work on only 2-4 projects at once
  - Majority still turn down projects due to capacity constraints
  - Almost half of all IDs' time still on practical development/implementation
  - IDs still complete ~16 projects annually (about average)
- **Root cause:** "Generic AI models" — without significant expertise in (a) optimal instructional design practices and (b) prompt engineering, "the value we can get from generic AI models and tools like ChatGPT and Claude is severely limited"
- One commenter: "We are not equipping IDs/LXDs/SMEs with the right knowledge about human learning and how to augment that with AI tools...simply 'grabbing' ChatGPT and running with it with your old, preconceived notions of what design is"
- Counter-evidence: "In our AI-enabled design pilots we have been showing consistently 60%-80% less design effort and keeping or improving the quality of design...but we are augmenting research-informed design, not more ppt decks"
- **Finding: SUPPORTED** — The gap between generic AI tools and pedagogically informed AI workflows is precisely the thesis gap. The 60-80% efficiency gains come from augmenting research-informed design, not from better AI models

### McNeill et al. (2024) Survey — 144 Instructional Designers
- 83% leveraging ChatGPT
- 67% achieving moderate-to-significant time savings
- Top benefit: accelerating efficiency
- Key challenges: verifying accuracy, addressing ethical risks, formulating effective prompts, lacking personalization
- Conclusion: "meaningful automation freed up capacity, truly customized innovation still requires human oversight"

### Novice ID + AI Study (Frontiers in Education, 2025)
- AI serves as Auxiliary Tool, Feedback Provider, and Co-Creator
- AI fluctuates between More Knowledgeable Other (MKO) and Less Knowledgeable Other (LKO) depending on task
- What works: Iterative prompt refinement; AI in analysis and design phases; collaborative ideation
- What fails: Over-reliance limiting creative approaches; treating evaluation as formality; insufficient learner feedback incorporation
- NIDs require "prompt engineering skills based on a clear understanding" — technical proficiency insufficient without pedagogical grounding

### Emerging Frameworks for Safe AI Integration
- **ADGIE** (replacing ADDIE's "Development" with AI generation + continuous validation)
- **ARCHED** (AI-assisted, Responsible, Collaborative, Human-centered, Ethical Design)
- **FRAME™** (explicit risk management of hallucination, drift, domain gaps via multi-model checks)
- All share one requirement: maintaining and strengthening human ID expertise. "AI works best when paired with expert human judgment" (Dell'Acqua et al., 2023)

---

## Category 5: Non-Software Document Generation Workflows

### Legal Domain (Most Advanced Non-Software AI Document Generation)
- DWT Prose: AI suggests writing edits based on established attorney work; integrates multiple LLMs + custom models
- AI agents generate first drafts of motions, briefs, legal memoranda with proper citation format and reasoning structure
- Compliance monitoring agents track regulatory changes across jurisdictions
- **Key pattern:** Domain-specific AI document generation requires: (1) domain knowledge base, (2) structural templates/schemas, (3) expert review workflow, (4) citation/evidence requirements
- **Challenge:** Fabricated citations remain a critical risk — parallels AI curriculum tools' fabricated references problem
- **Finding: EMERGING** — Legal AI document generation is the most mature non-software domain. Its architectural patterns (knowledge base + structural constraints + expert review) map directly to curriculum generation needs

### Document Generation in AI Coding Environments
- 64% of software development professionals use AI for writing documentation (Google Cloud DORA 2025)
- Tools exist for code docs (DocuWriter.ai, Mintlify, GitBook) but are code-focused
- Claude's file-creation feature (Sept 2025) enables structured document generation (spreadsheets, Word, PowerPoint, PDF) directly in chat
- Claude as Microsoft Office add-in enables cross-application document workflows
- **Finding: EMERGING** — Non-code document generation in AI coding environments is nascent but rapidly expanding. No established patterns for pedagogically constrained document generation exist yet

---

## Key Findings Summary

### Finding 1: No Existing Tool Encodes Pedagogical Constraints Architecturally [SUPPORTED]
Not a single tool reviewed — across AI-native, traditional, or hybrid categories — encodes learning science constraints as structural requirements in its generation logic. The closest are:
- Mindsmith (needs analysis questions before generation, storyboard review)
- FeedbackFruits (university-developed, pedagogy-driven, but not a generator)
- dominKnow (xAPI competency tracking)
- ARCHED framework (Bloom's taxonomy as generation parameter — research, not product)

All others operate at the "generate from prompt, human reviews" level with no validation against pedagogical standards.

### Finding 2: The Quality Gap Is Documented and Systematic [SUPPORTED]
- 78% of AI-generated lesson plans need "significant adjustments" (Hu et al.)
- 40% fabricated references in AI-generated content
- 32% reduction in unique assessment designs with excessive AI reliance
- "Widespread adoption without any substantive positive impact on speed, volume or quality" (Hardman 2024)
- "Commercial LLMs do not come preloaded with the depth of pedagogical theory" (Starkey et al. 2025)

### Finding 3: The Gap Is Between Generic AI and Research-Informed AI Workflows [SUPPORTED]
- Generic AI tools + generic users = no improvement (Hardman 2024 data)
- Research-informed AI workflows = "60-80% less design effort while keeping or improving quality" (practitioner report)
- ARCHED framework: AI-generated objectives match human quality WHEN constrained by Bloom's taxonomy and validated against rubric (κw = 0.834)
- The differentiator is not the AI model — it's the constraint architecture

### Finding 4: Claude Code Platform Supports the Pattern [SUPPORTED]
- Non-code document workflows already proven (Obsidian management, meeting notes, structured reports)
- Multi-agent orchestration at scale demonstrated (112 agents in one system)
- Multi-stage decomposition patterns established (Deep Trilogy: idea → plan → implementation)
- File generation capabilities expanding (Sept 2025 document creation, Office integration)
- No existing Claude Code plugin addresses educational design specifically — the niche is genuinely unoccupied

### Finding 5: Three Market Categories Exist, All With Gaps [SUPPORTED]
1. **AI-native content generators** (Disco, Teachfloor, Coursiv): Fast content generation, no pedagogical logic
2. **Traditional authoring tools** (Articulate, Captivate, iSpring): Powerful canvases, design intelligence lives in human
3. **Hybrid AI-enhanced tools** (Mindsmith, Easygenerator, 360Learning): AI speeds up workflow, some design scaffolding, but no structural constraint enforcement

The thesis's proposed tool occupies a fourth category: **AI-constrained pedagogical design system** — where learning science is encoded as structural requirements, not suggestions.

### Finding 6: The "Jagged Frontier" Maps the Design Space [EMERGING]
Hardman's jagged frontier framework provides the clearest empirical map of what to automate vs. what to constrain:
- Automate: formatting, structure, brainstorming, technical execution (inside frontier)
- Constrain with rubric: content generation, objectives, assessments (danger zone — requires validation)
- Keep human: needs analysis, strategic pedagogical reasoning, implementation (outside frontier)

The curriculum builder should automate what's inside the frontier, enforce rubric-based validation in the danger zone, and structure human judgment for what's outside it.
