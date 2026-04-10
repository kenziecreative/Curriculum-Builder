# Research Coverage Gaps

Tracks what's been covered and what's still missing across all research phases.

## Phase 1: Diagnosing the Existing Template
- Coverage: Complete
- All 5 research questions answered
- Key finding: 60-65% of template instructions are marketing-oriented; pedagogical gaps are systematic (no sequencing logic, no formative assessment, no scaffolding, no transfer design, no spaced/retrieval practice, no objective-assessment alignment)
- Root causes identified: role framing, step sequencing, instruction density, absent constraints, 4E as brand not logic

## Phase 2: Learning Science Foundations
- Coverage: Complete
- All 6 research questions answered across 4 doctrine components
- TMA validated with 7 recommended refinements (expertise-adaptive sequencing, Bloom's correction, prior knowledge activation, feedback specification, near vs. far transfer distinction, explicit metaskill prompts, Integration phase)
- DCR validated at component level; largest gap is no studies test the integrated sequence
- Metaskills: "full range" claim contradicted; Imagining has no consolidated evidence base
- Flipped: solid evidence but failure conditions (pre-class non-completion, novice resistance, facilitator skill gap) must be encoded
- Remaining gaps: Imagining teachability, corporate/adult-specific flipped RCTs, collaborative metaskills decision

## Phase 3: The AI Curriculum Generation Problem
- Coverage: Complete
- Gap confirmed: no existing tool encodes pedagogical constraints architecturally
- Three key findings encoded: constraints help but don't close the gap, jagged frontier applies to sequencing/assessment, six failure modes documented
- Landscape scan kept focused per user direction — engine design draws from Phases 1-2, not competitor gaps

## Phase 4: Claude Code as a Development Platform
- Coverage: Complete
- Platform confirmed as strong fit — plugin architecture, skills, subagents, hooks, state management all support the pattern
- One constraint: skills can't call skills directly (workaround: subagent composition)
- Enforcement is behavioral not structural — probabilistically robust but not absolute
- Reference implementation: this research project + GSD framework

## Phase 5: Prompt Architecture for Pedagogical Constraint
- Coverage: Complete
- Six mechanisms identified: role framing (register init), schema-enforced output (binding constraints), sequential decomposition (pipeline), rubric-based validation, structured intake, generation order (marketing last)
- Key finding: schema-enforced required fields are the primary constraint mechanism; instructions are advisory
- Generation pipeline defined: intake → understandings → objectives → assessments → modules → activities → validation → marketing
- Structured intake required: prior knowledge baseline, transfer context, success criteria are the highest-value inputs
- Tool shape determined: multi-stage workflow, not single command

## Phase 6: Engagement and Session Design Frameworks
- Coverage: Complete
- All 5 research questions answered
- Kolb cycle: only 6.7% full implementation in studies; Reflection and Abstract Conceptualization most commonly skipped
- 5E meta-analysis: g = 0.82 (science); 7E extension g = 1.23; Elaborate/Evaluate phases weakest in practice
- TMA at session level: valid content arc but needs activation, formative checks, reflection, transfer bookends (COMPLICATED)
- Mezirow: "aha moments" cannot be scripted, only designed for — belief-challenging encounters replace brainstormed aha ideas
- Attention: 10-15 min span is myth (Wilson & Korn, 2007); activity switching is the real mechanism
- Cognitive load: worked examples for novices, open problems for experts (expertise reversal effect)
- Session templates: universal arc = Open-Present-Practice-Close; different session types need different framework emphasis
- Over-prescription warning: Rosenshine and Hunter both show rigid templates reduce effectiveness
- Session schema defined: 8 required fields, 4 recommended fields
- Remaining gaps: No empirical studies directly testing TMA as a named framework at session level (it's always tested as components)

## Phase 7: Metaskills in Curriculum Design
- Coverage: Complete
- All 5 research questions answered
- Key findings: Goals-vs-principles distinction is real and must be encoded separately; IB ATL shows naming-without-enacting failure mode; Visible Thinking Routines are the strongest operationalization model; six metaskills fall on a developability hierarchy; transfer prompts are required in every metaskill-targeted activity
- Metaskill-mapping layer defined: per-module (5 fields) + per-program (3 validations)
- "Full range" gap from Phase 2 now an operationalization problem — tool needs collaborative activity types regardless of taxonomy decision
- Remaining gaps: Imagining as teachable capacity still unresolved (GAP); metaskill-mapping schema is synthesized from multiple frameworks but not empirically validated as an integrated unit; no direct evidence on whether AI-generated thinking routines activate metaskills as effectively as human-designed ones

## Doctrine Refinement: Six Metaskills Framework Gaps (Post-Research Decision)

The following gaps were identified across Phases 2 and 7. These are not tool architecture blockers — the tool can work with the six as-is — but they are doctrine refinement questions to think through after the research completes.

1. **Social/interpersonal dimension missing.** Every comparable framework (SDS, OECD, IB ATL, CCR, P21, ATC21S) includes communication, collaboration, and/or leadership as distinct meta-level capacities. Feeling captures empathy but not the broader social dimension. Options: (a) add a 7th metaskill, or (b) explicitly reframe the six as *intrapersonal* capacities and argue social skills are their applied expressions.
2. **"Full range" claim needs narrowing.** "The full range of human cognitive and emotional capacity" is contradicted by the evidence. Narrowing to "individual" or "intrapersonal" would make it defensible.
3. **Critical thinking not distinctly named.** Multiple frameworks separate it from curiosity/exploration. Exploring partially covers it but reads more as inquiry than structured analytical critique.
4. **Metacognition implicit, not explicit.** CCR treats metacognition as the definition of meta-learning. The six don't name it, though it's arguably present in Exploring and Adapting.
5. **Imagining has no instructional evidence base.** No consolidated research on teaching imagination as a trainable capacity. Adjacent evidence (scenario planning, futures thinking) could build the case but hasn't been synthesized yet.

---

## Phase 8: Adult Learning and Compressed Format Pedagogy
- Coverage: Complete
- All 5 research questions answered across 7 source notes (Sources #14-20)
- Key findings:
  - Doctrine aligns with 4/6 andragogical assumptions; missing Readiness to Learn and Internal Motivation
  - Self-direction is developmental and domain-relative, not a fixed adult trait (Grow SSDL)
  - Andragogy has cultural blind spots (Sandlin 2005, SA TVET 2023) — self-direction as adjustable default, not axiom
  - DCR validated via analogical encoding (d=0.50, Gentner et al.) but needs 3 scaffolding requirements for novices + Validate step
  - **CONTRADICTED:** Doctrine's individual-learner focus designs for the weaker condition (d=0.54-0.78 cooperative vs. individual)
  - Transfer ecosystem (pre/in/post-program) is the architectural response to 7 documented failure modes
  - Transfer rates across compressed formats: <10% (Baldwin & Ford), 40% immediate/70% at 1 year (Saks), 5% in exec ed (Avolio et al.)
  - Open vs. closed skill distinction critical — open skills (doctrine's target) transfer far less reliably
  - CoP formation requires more time than compressed programs allow — design for seeding not completion
  - Implementation intentions (d=0.65) as a transfer mechanism for every module
- Remaining gaps (from the literature itself, not addressable with further research):
  - Optimal collaborative design features for compressed formats specifically (GAP in the literature)
  - Whether cooperative learning effect sizes hold at very compressed durations (1-week vs. 12-week)
  - Empirical minimum time for CoP formation (unexplored variable)
  - No direct studies testing DCR as a named framework in wicked professional domains
  - No research on optimal post-program reinforcement schedules for compressed format graduates
  - Implementation intentions not specifically tested as curriculum design feature in compressed programs

## Phase 9: Competitive Landscape and Gap Analysis
- Coverage: Complete
- All 5 research questions answered across 12+ sources (Source #21)
- Key findings:
  - No existing tool across 3 market categories encodes pedagogical constraints as structural generation requirements (SUPPORTED)
  - Quality gap documented and systematic: 78% lesson plans need adjustment (Hu et al.), 40% fabricated references, 32% assessment diversity reduction, "template-like outputs" (CITE systematic review)
  - Critical adoption-without-impact paradox: 84% tried ChatGPT, 57% use daily, but industry productivity metrics unchanged (Hardman 2024)
  - Differentiator is constraint architecture, not AI model: generic AI = no impact; research-informed workflows = 60-80% efficiency gains
  - "Jagged frontier" maps ID tasks: automate (formatting, brainstorming), constrain with rubric (content, objectives, assessments), keep human (needs analysis, pedagogical judgment)
  - ARCHED framework validates constraint approach: κw = 0.834 when Bloom's taxonomy enforced as generation parameter
  - Claude Code educational design niche genuinely unoccupied (347+ plugins, 1900+ skills, zero for educational design)
  - Three emerging ID+AI frameworks (ADGIE, ARCHED, FRAME) all require human expertise + AI constraint — confirming thesis design pattern
  - Mindsmith is the most pedagogically aware AI-native tool (needs analysis, storyboard review) but still lacks structural constraint enforcement
  - FeedbackFruits is most academically grounded but is an enhancement toolkit, not a generator
- Remaining gaps:
  - Quality Matters white paper (PDF not extractable) — would add QM standards perspective on AI-generated content criteria
  - Synthesia 2024 survey (page not extractable) — specific quantitative adoption data not captured
  - Choi et al. SWOT full text (behind paywall) — only abstract captured; specific SWOT components would add detail
  - No independent comparative evaluation of AI-native tools against each other using standardized criteria exists in the literature (each is evaluated in isolation or by its own vendor)

## Phase 10: Tool Architecture
- Coverage: Complete
- All 5 research questions answered
- Key findings:
  - Architecture: Claude Code plugin with bundled skills (one per stage), subagents (validation + parallel generation), hooks (enforcement gates)
  - Nine-stage pipeline: intake → outcomes → assessments → modules → sessions → metaskills → transfer → marketing → validation
  - Three-layer doctrine encoding: CLAUDE.md (constraint summary), schemas (binding constraints), reference files (design knowledge)
  - Three-tier validation: schema (automated per stage), rubric (automated + human review), transfer ecosystem (human-driven structured prompts)
  - MVP: five stages (intake, outcomes, assessments, modules, validation) demonstrably outperform old template
  - Output format makes pedagogical grounding visible and auditable — every design decision traceable
  - Ten architectural principles derived from Phases 1-9
- Remaining gaps:
  - The integrated nine-stage pipeline is a design proposal, not a tested system (EMERGING)
  - The three-layer doctrine encoding is synthesized from platform assessment + constraint hierarchy findings but not validated as an integrated approach
  - Optimal subagent parallelization strategy (how many modules can be generated in parallel without quality degradation) is untested
  - Schema definitions are specified at the field level but exact field formats (enum values, string patterns, validation rules) need implementation-level specification
  - The MVP's five stages have not been tested against the old template in a controlled comparison

## Phase 11: Validation Criteria
- Coverage: Complete
- All 5 research questions answered across 22+ sources (Source #22)
- Key findings:
  - Existing rubrics (QM, EQuIP, IMET) provide strong structural criteria but transfer design is the least scored element across all major rubrics (SUPPORTED/CONTRADICTED split)
  - No mature, holistic scoring instrument exists for AI-generated curriculum against learning science standards — field is fragmented (CONTRADICTED)
  - Closest instruments: Hu et al. (19 dimensions, IEEE 2024), Aila (19 Likert + 5 boolean, 4,985 lessons), ARCHED (κw = 0.834 for objectives), TALQ (9 scales, alpha 0.77-0.94, 9x mastery likelihood with FPI)
  - Pairwise blind comparison with identical templates and de-identification is the methodological standard (arXiv 2504.05449v1)
  - Tessmer's expert review (congruence, content, design, feasibility sub-analyses) is the canonical short-cycle method
  - Automation-judgment boundary well-mapped: Bloom's classification 94% automatable; scaffolding quality and pedagogical appropriateness require humans
  - LLMs viable for structural screening but show poor intra-rater consistency for qualitative judgment (Manning 2025) — validation agent should produce reports, not pass/fail
  - Phase 10's three-tier validation architecture confirmed by the research
  - 8 testable success criteria defined with automation classification
  - ADGIE survey: 91% of IDs insist on validating AI output quality; only 49% "very ready" to let AI select teaching methods
- Remaining gaps:
  - "FRAME" framework referenced in Phase 9 not found as a named AI-curriculum evaluation framework (GAP — possible misidentification)
  - No published scoring instrument validates a complete curriculum document against full learning science standards holistically
  - The 8 testable success criteria are synthesized from multiple instruments but are not independently validated as an integrated evaluation framework
  - No empirical data on whether the pairwise blind comparison methodology works reliably for full curriculum documents (as opposed to lesson plans)
  - TTEC Learning Wizard's "16 learning science principles" are proprietary and not available for analysis
  - Optimal number of expert evaluators for reliable curriculum quality assessment not established (3-5 is conventional but not empirically optimized)

## Phase 12: Synthesis
- Coverage: Complete
- Three outputs produced: executive summary, full research report with finding tags, tool design recommendations
- Key findings synthesized:
  - Thesis SUPPORTED with qualifications — gap is solvable, it's a structural design flaw, not an inherent AI limitation
  - Constraint architecture is the single differentiating variable (schema > instruction)
  - Six cross-cutting patterns identified: constraint hierarchy, skipped-phase problem, naming-vs-enacting gap, expertise-adaptive design need, social dimension as missing layer, transfer ecosystem
  - MVP defined: 5 stages addressing documented root causes with proven mechanisms
  - Quick win: 3 immediate template changes implementable in 30 minutes
- Remaining unresolvable gaps (require building and testing, not desk research):
  - Integrated nine-stage pipeline not tested as a system
  - Imagining as teachable metaskill — no consolidated evidence (GAP persists)
  - DCR as integrated named sequence — untested (components validated individually)
  - Whether structural completeness translates to better learning outcomes — requires learner testing
  - Composite validation rubric synthesized but not independently validated
  - Cooperative learning effect sizes at very compressed durations unknown
  - Minimum CoP formation time unexplored
