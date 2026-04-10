# Phase 11: Validation Criteria — How to Know If the Tool Is Working

## Core Finding

The curriculum builder can be validated at three levels — structural (automated), pedagogical (expert-reviewed), and impact (learner-tested) — but no single published instrument covers all three. The tool must construct its own validation rubric by adapting the QM alignment chain, Merrill's First Principles (via the TALQ instrument), backward design criteria, and the Hu et al. AI-specific evaluation dimensions. The most actionable comparison methodology is pairwise blind evaluation using identical output templates, scored by instructional design experts on dimensions that map directly to the tool's own design constraints. The automation-judgment boundary is well-mapped: structural completeness and Bloom's classification can be automated at 94% accuracy, but scaffolding quality, pedagogical appropriateness, and transfer design quality require human expert judgment. This boundary aligns precisely with Phase 10's three-tier validation architecture (schema → rubric → human review).

---

## Research Question 1: What Evaluation Rubrics Exist for Curriculum Quality?

### The Landscape Is Rich but None Fit Perfectly

Four major published rubrics evaluate curriculum quality at document level, each with different strengths.

**Quality Matters (QM)** is the most widely adopted. Its 7th Edition defines 8 General Standards with 44 Specific Review Standards, organized around a central concept: the alignment chain. Standards 2 through 6 must work together — learning objectives (GS2) must connect to assessments (GS3), which must connect to materials (GS4), activities (GS5), and technology (GS6). A course earns QM Certification by scoring 85% with all Essential Standards met. The QM model treats alignment as the primary quality signal: if objectives, assessments, and activities are mutually reinforcing, the curriculum is structurally sound; if any link breaks, the whole chain fails. [Source: validation-criteria-evidence.md]

**EQuIP** (Educators Evaluating Quality of Instructional Products) evaluates individual lessons and units across four dimensions: standards alignment, key shifts, instructional supports, and assessment. Its distinctive contribution is the equity evaluation in its Instructional Supports dimension — differentiation, culturally responsive teaching, and supports for English language learners and special education students. This dimension is absent from most other rubrics. [Source: validation-criteria-evidence.md]

**IMET** (Instructional Materials Evaluation Tool) and its derivative EdReports rubric evaluate full textbook series using a gateway system: materials must pass Standards Alignment before being evaluated for Knowledge Building, which must pass before Usability is assessed. EdReports has reviewed approximately 98% of known comprehensive K-12 math and ELA materials. The results are sobering: only 51% of ELA and 44% of math materials meet alignment standards. Less than 20% of classroom materials are fully aligned. This establishes a baseline: most existing curriculum fails even basic quality checks. [Source: validation-criteria-evidence.md]

The **"Golden Triangle" / Constructive Alignment** model — objectives, content, assessments must form a coherent triangle — appears across all these rubrics as the foundational quality criterion. Carnegie Mellon's Eberly Center states it simply: when these three are misaligned, "it can undermine both student motivation and learning." Michael Fors's Instructional Design Criteria Checklist operationalizes this as a sequential test: "The objectives should be measurable & observable, content should teach to meet the objectives, tests should measure ability to accomplish the objectives, and the course evaluation should measure how well the course taught the objectives." [Source: validation-criteria-evidence.md]

### The Critical Gap: Transfer Design

Transfer design is the least explicitly scored element across all major rubrics. QM addresses it implicitly through the alignment chain but does not name transfer as a scorable standard. EQuIP evaluates assessment authenticity and real-world connections but categorizes them as supplemental. IMET places transfer-relevant criteria in the Indicators of Quality section — a supplemental evaluation that does not gate course approval.

This matters directly for the curriculum builder. Phase 8 identified transfer as the architectural response to compressed format failure modes (transfer rates: <10% per Baldwin & Ford, 40% immediate per Saks, 5% in executive education per Avolio et al.). Phase 10 designed an entire pipeline stage for transfer ecosystem design. Yet no existing rubric would evaluate this stage's output as a first-class quality dimension. The tool's validation rubric must score transfer design as a required criterion, not a supplemental one — filling a gap the existing rubric landscape leaves open. [Source: validation-criteria-evidence.md]

---

## Research Question 2: Can AI-Generated Curriculum Be Scored Against Learning Science Standards?

### No Mature Instrument — But Strong Building Blocks

No single, widely-adopted scoring instrument exists specifically for evaluating AI-generated curriculum against learning science standards as a holistic package. The field is fragmented: instruments evaluate specific dimensions (objectives, lesson plans, assessments) but none score a complete curriculum document against the full range of learning science criteria.

The closest instruments, in order of comprehensiveness:

**Hu et al. (2024)** developed a 9-category, 19-dimension framework for scoring AI-generated teaching plans, using an 8-point Likert scale. The categories span problem chains, teaching activities, knowledge content, methods/strategies, evaluation, interdisciplinarity, practical value, scope, and an overall score. Applied to 480 teaching plans (GPT-4 vs. human), the framework found that AI plans performed well on objectives and activities but showed gaps in content depth, complexity, differentiated materials, and interdisciplinary integration. This is the most comprehensive operationalized evaluation of AI-generated curriculum quality published to date. [Source: validation-criteria-evidence.md]

**The Aila Auto-Evaluation Agent** (Oak National Academy, UK) uses 19 Likert criteria plus 5 boolean criteria to evaluate AI-generated lessons. Tested on 4,985 lessons, it was calibrated against qualified teacher scores. This is the most operationally mature automated scoring system, but it evaluates individual lessons, not full curricula. [Source: validation-criteria-evidence.md]

**ARCHED** evaluated learning objectives across 5 dimensions (structural completeness, taxonomic alignment, measurability, content clarity, technical accuracy) and achieved inter-rater agreement of κw = 0.834 between its AI evaluator and human experts — the strongest reliability figure in the AI curriculum evaluation literature. However, it scores only objectives, not curriculum documents. [Source: validation-criteria-evidence.md]

**TALQ** (Teaching and Learning Quality) is the only validated instrument built on Merrill's First Principles of Instruction. Its 9 scales (Cronbach alpha 0.77-0.94, validated on 140 students across 89 courses) measure whether instruction is task-centered, activates prior knowledge, demonstrates new knowledge, applies with coaching, and integrates into the learner's world. The empirical finding is striking: students were approximately 9 times more likely to report mastering course objectives when First Principles were implemented, and approximately 4 times more likely when both FPI and Academic Learning Time were present. TALQ is not designed for document evaluation — it measures implemented instruction — but its scales map directly to scorable curriculum design features. A curriculum document that requires task-centered framing, activation prompts, demonstration segments, guided application, and integration activities in every module is encoding TALQ's criteria as structural requirements. [Source: validation-criteria-evidence.md]

**EducationQ Benchmark (2025)** proposes 17 scoring dimensions organized by perspective: holistic (assessment effectiveness, questioning effectiveness, feedback effectiveness), teacher-centric (questioning quality, assessment quality, feedback quality), and student-centric (metacognitive reflection, knowledge dimension). Uses a standardized 1-10 scale. [Source: validation-criteria-evidence.md]

### What the Tool's Rubric Must Score

Synthesizing across all instruments, the dimensions that appear consistently and map to the curriculum builder's design constraints are:

| Dimension | Appears In | Maps to Pipeline Stage |
|-----------|-----------|----------------------|
| Objective-assessment alignment | QM, EQuIP, IMET, ARCHED, Hu et al. | Stages 2-3 (outcomes, assessments) |
| Bloom's level appropriateness | ARCHED, CITE Journal, EducationQ | Stage 2 (outcomes) |
| Content accuracy | Aila, Hu et al., 1EdTech, Liu | Stage 4 (modules) |
| Scaffolding/sequencing logic | Hu et al., EdReports, Penn GSE | Stage 4 (modules) |
| Assessment diversity/quality | Hu et al., ARCHED, QM | Stage 3 (assessments) |
| Structural completeness | ARCHED, Hu et al., Aila | All stages (schema validation) |
| Differentiation/inclusivity | EQuIP, Hu et al., 1EdTech | Stage 5 (sessions) |
| Transfer design | UbD, Merrill/TALQ (integration) | Stage 7 (transfer) |
| Practical/real-world value | Hu et al., Merrill (task-centered) | Stages 1, 4 (intake, modules) |
| Metacognitive activation | EducationQ, TALQ (activation) | Stage 6 (metaskills) |

The "FRAME" framework referenced in Phase 9 findings was not found as a named framework in the AI-generated educational content domain. This appears to have been misidentified in prior research and is logged as a gap. [Source: validation-criteria-evidence.md]

---

## Research Question 3: What Would a Head-to-Head Comparison Look Like?

### The Methodological Standard: Pairwise Blind Evaluation

The leading study on comparing AI-generated and human-designed curriculum (arXiv 2504.05449v1, 2025) established what has become the methodological standard: pairwise blind evaluation by domain experts.

The design works as follows. Lesson plans from three sources — in the study's case, customized GPT-4, fine-tuned LLaMA-2-13b, and human curriculum designers — are standardized to an identical template (title, learning objectives, materials, warm-up, main tasks, cool-down). Plans are presented in de-identified pairs. Experienced educators make binary preference judgments on each pair across specified dimensions. Quantitative preference tallies are combined with qualitative open-ended feedback. Bootstrapping analysis calculates confidence intervals on preference rates. [Source: validation-criteria-evidence.md]

This design has four properties that make it the right model for evaluating the curriculum builder against the existing template.

First, identical templates eliminate format bias. If the new tool's output looks different from the template's output, evaluators might prefer whichever format they find more readable, independent of pedagogical quality. Standardizing both outputs to the same structure forces evaluation on content, not presentation.

Second, blinding prevents source attribution effects. Research shows that evaluators rate content differently when they know it was AI-generated versus human-created. Students become more critical of AI-scored work after learning the source, even when they cannot distinguish AI from human scoring in blind conditions. De-identification removes this confound. [Source: validation-criteria-evidence.md]

Third, pairwise comparison is cognitively easier than absolute scoring. Asking "which of these two is better on dimension X?" produces more reliable judgments than asking "rate this on a 1-5 scale for dimension X." The study used bootstrapping rather than parametric statistics, appropriate given the small samples typical of expert evaluations.

Fourth, mixed methods capture what quantitative scores miss. The qualitative feedback in the arXiv study revealed specific pedagogical strengths and weaknesses that aggregate scores obscured — exactly the kind of diagnostic information a tool developer needs.

### The Comparison Dimensions

For the curriculum builder specifically, the head-to-head comparison should score these dimensions, drawn from the research and mapped to the tool's design claims:

1. **Objective-assessment alignment** — Does every learning objective have a corresponding assessment that would provide evidence of mastery? (QM GS3.1; the tool's backward design requirement)
2. **Scaffolding logic** — Is content sequenced to build progressively, or does it list topics without developmental logic? (EdReports Criterion 2.2; the tool's TMA encoding)
3. **Transfer design** — Are there explicit mechanisms for applying learning beyond the program? (The tool's Stage 7; absent from the existing template)
4. **Formative assessment integration** — Are there learning checkpoints embedded within sessions, or only summative assessments at the end? (QM GS3.3; Phase 6 session schema)
5. **Metaskill activation** — Are metacognitive and meta-skill capacities activated through specific activities, or only named as goals? (Phase 7 findings; the tool's Stage 6)
6. **Marketing-to-pedagogy ratio** — What proportion of the document's content is oriented toward audience positioning versus learning design? (Phase 1 diagnosis: 60-65% marketing in current template)
7. **Cognitive level distribution** — Do activities span Bloom's taxonomy, or cluster at lower levels? (ARCHED criterion; CITE Journal finding that AI plans cluster at Remember/Understand)
8. **Learner engagement design** — Do sessions include varied activity types, or default to presentation-heavy formats? (Phase 6 session design findings)

### Inter-Rater Reliability

The comparison requires a reliability protocol. For ordered categorical data (rubric levels), weighted kappa is recommended — linear weighting for equally-spaced categories, quadratic when adjacent disagreements should be penalized less than distant ones. For continuous scores, ICC (Intraclass Correlation Coefficient) is preferred over Pearson's r because ICC captures both consistency and absolute agreement, not just linear association. The standard interpretation benchmarks (Koo & Li, 2016): below 0.50 is poor, 0.50-0.75 moderate, 0.75-0.90 good, above 0.90 excellent.

A practical warning: if most ratings cluster in one category (e.g., both outputs score "partially meets" on most dimensions), the "kappa paradox" can produce a paradoxically low kappa despite high percent agreement. Gwet's AC1 is the recommended alternative when this occurs. [Source: validation-criteria-evidence.md]

### Evaluator Selection

The evaluators should be instructional design practitioners — not the tool's designer, not subject matter experts without ID training, not learners. The QM model uses trained peer reviewers. The ADGIE survey finding is relevant: 91% of instructional designers insist on validating quality and relevance of AI-generated content, and only 49% feel "very ready" to let AI select teaching methods. Instructional designers are the appropriate judges because they can distinguish structural pedagogical quality from surface content quality. A minimum of three evaluators is standard for calculating inter-rater reliability with Fleiss' kappa. [Source: validation-criteria-evidence.md]

---

## Research Question 4: Can Quality Be Tested Without Full Program Delivery?

### Tessmer's Expert Review Is the Canonical Short-Cycle Method

Tessmer's four-stage formative evaluation model (1993) is the canonical framework for testing curriculum quality before full delivery. The first stage — expert review — is the most relevant for the curriculum builder because it evaluates documents, not delivered instruction.

Expert review includes four sub-analyses, each answering a different question about the curriculum:

**Congruence analysis** asks whether objectives, assessments, and activities align. This maps directly to the tool's alignment chain and can be partially automated (the schema validation in the tool's Stage 9).

**Content analysis** asks whether the content is accurate and complete. This requires human judgment for accuracy but can be partially automated for completeness (are all required schema fields present and non-empty?).

**Design analysis** asks whether the instructional strategy is sound — whether the sequencing, scaffolding, and activity design will produce learning. This is the dimension that most requires expert judgment and most directly evaluates the tool's contribution.

**Feasibility analysis** asks whether the curriculum can be implemented as designed — whether the time allocations are realistic, materials are available, and facilitator skills required are reasonable. This is a practical constraint that no amount of pedagogical soundness can override.

These four sub-analyses provide a structured protocol for evaluating the curriculum builder's output without waiting for a full program to run. [Source: validation-criteria-evidence.md]

### Cognitive Walkthrough Adapted for Curriculum

Cognitive walkthrough, adapted from HCI (Polson et al., 1992), provides a complementary method. The evaluator walks through the learner's cognitive journey step by step, asking at each transition: Will the learner understand what they are supposed to do? Will they see how this connects to the previous activity? Will they recognize progress toward the learning objectives?

The adaptation for curriculum evaluation is straightforward. Instead of walking through a user interface, the evaluator walks through a learning sequence. At each activity, they ask: Does the learner have the prerequisite knowledge for this activity? Is the cognitive demand appropriate (not too high, not too low)? Does the activity build toward the stated objective? Is there a feedback mechanism that tells the learner whether they are on track?

This method can be performed on curriculum documents before any learner interaction. Its limitation is that it depends on the evaluator's ability to simulate the learner's cognitive state — expert evaluators are better at this than novice evaluators. [Source: validation-criteria-evidence.md]

### Learner Think-Aloud for Rapid Validation

Think-aloud studies ask participants to verbalize their thoughts while working through materials. Three protocol variants exist: traditional Concurrent Think-Aloud (evaluator listens passively), Speech-Communication (evaluator gives natural acknowledgments), and Active Intervention (evaluator asks probing questions). The traditional and SC protocols yield similar numbers of identified problems. The AI method generates more "enhancement" findings but takes significantly more time and can alter participant behavior.

For the curriculum builder, a think-aloud study with 3-5 participants from the target audience working through a single module's session plan would provide rapid feedback on clarity, engagement, and cognitive load — without waiting for a full program delivery. A medical school study demonstrated that "modified ethnographic observation with simplified thinking aloud protocol" yielded comprehensive and actionable recommendations. [Source: validation-criteria-evidence.md]

### Dick & Carey's Progressive Testing Model

Dick and Carey prescribe three stages of progressive testing: one-to-one evaluation with 3 learners of varying ability, small group evaluation with 8-20 learners, and field trial with actual instructor. Each stage produces data on performance, time on task, and attitudes. The key design principle is that each stage catches different classes of problems: one-to-one catches gross errors and unclear directions; small group catches scalability and diversity issues; field trial catches implementation and context issues.

For the curriculum builder, the one-to-one stage is the most accessible short-cycle method. Running three learners through a single module — one novice, one intermediate, one expert in the domain — would reveal whether the tool's scaffolding and cognitive load management work across the ability range. [Source: validation-criteria-evidence.md]

### Rapid Prototyping as Continuous Validation

Jones and Richey (2000) established rapid prototyping as a formative evaluation method for instructional design. Tessmer (1994) observed that RP is "a type of formative evaluation that can effectively be used early and repeatedly throughout a project." The SAM (Successive Approximation Model) operationalizes this as three phases with iterative evaluation.

For the curriculum builder, rapid prototyping means generating a single module (not a full curriculum), evaluating it using the expert review protocol, revising the tool's prompts and schemas based on findings, and repeating until the module passes all rubric criteria. Only then does the tool generate a full curriculum. This is faster than generating complete curricula and evaluating them whole. [Source: validation-criteria-evidence.md]

---

## Research Question 5: Human Expert Review vs. Automated Checking

### The Boundary Is Well-Mapped

The research converges on a clear three-tier division that aligns precisely with Phase 10's validation architecture.

**Tier 1: Automate with high confidence.** Structural completeness checks (are all required schema fields present?), Bloom's taxonomy classification of learning objectives (94% accuracy with SVM + augmentation; BERT-based systems trained on 21,380 objectives at an Australian university), objective-assessment alignment mapping (presence/absence, not quality), terminology consistency, accessibility compliance, and coverage mapping against standards frameworks. These checks are mechanical: they verify that required components exist and that explicit structural relationships hold. [Source: validation-criteria-evidence.md]

**Tier 2: Screen with AI, confirm with human.** Content accuracy and factual correctness (AI can flag but hallucination rates require human verification), cultural sensitivity (AI can flag potentially insensitive content but cannot make inclusion judgments), difficulty calibration (AI can classify Bloom's levels but cannot judge whether a specific level is appropriate for a specific audience), and assessment discrimination quality (whether assessment items distinguish between learners who have mastered the objective and those who have not). These checks require AI to narrow the review scope so human experts spend time on flagged items rather than reviewing everything. [Source: validation-criteria-evidence.md]

**Tier 3: Require human expert judgment.** Pedagogical appropriateness for the specific target audience, scaffolding quality and progression logic, real-world relevance and application authenticity, when to simplify versus when complexity is the point, root cause diagnosis ("Diagnosing when a learner's struggle signals a poorly designed assessment versus a gap in prerequisite knowledge"), creative and critical thinking assessment quality, and stakeholder and contextual navigation. These judgments require the kind of contextual understanding, professional experience, and situational awareness that no current AI system possesses. [Source: validation-criteria-evidence.md]

### The ADGIE Survey Confirms the Trust Boundary

The ADGIE survey finding maps the trust boundary empirically: 91% of instructional designers insist on their role in validating quality and relevance of AI-generated content. Only 49% felt "very ready" to let AI select teaching methods. This means the tool should not present its automated validation as a quality guarantee — it should present it as a quality screening that produces a dashboard for expert review. The automated tier catches structural defects; the human tier evaluates whether the structure produces good learning. [Source: validation-criteria-evidence.md]

### Automated Scoring Reliability

The reliability data for automated scoring is mixed but informative:

Bloom's taxonomy classification achieves the highest automated reliability — 94% accuracy/F1 with SVM + augmentation, and viable (though slightly lower) performance with GPT-4 using domain-specific prompt engineering. Most misclassifications occur at adjacent cognitive levels (confusing Apply with Analyze), reflecting the taxonomy's inherent fuzziness at boundaries rather than system failures.

Automated essay scoring shows correlations with human scoring from r = .77 (PEG, 1968) to r = .97 (e-rater, Attali & Burstein 2006). IntelliMetric showed no significant difference from expert mean scores. However, these systems are "more form-focused" — strong on grammar, structure, and vocabulary but weak on content, creativity, and argumentation. A critical finding: ChatGPT-4, despite being more advanced than earlier AES systems, showed "significantly lower values, indicating poor consistency even within its own evaluations" (Manning, 2025). LLMs are not reliable intra-raters. [Source: validation-criteria-evidence.md]

This has a direct implication for the tool: using an LLM as the validation agent (as Phase 10 proposed) is viable for structural checks but unreliable for qualitative judgments. The validation agent should produce a structured report with confidence scores, not a pass/fail determination.

### HITL Design Patterns for the Tool

Four human-in-the-loop patterns from the research apply to the curriculum builder:

**Approval flows** — the tool generates content, pauses at predefined checkpoints for human review before proceeding. This is already encoded in Phase 10's pipeline design: each stage produces output, the validation agent checks it, and the user reviews before the next stage begins.

**Exception-based review** — the tool flags items that fall below confidence thresholds for human attention; high-confidence items pass through. For the curriculum builder, this means the validation agent should mark each rubric criterion as "passes," "review recommended," or "fails" — with "review recommended" being the actionable tier for expert attention.

**Tiered review** — different levels of human oversight based on risk and consequence. Content accuracy in professional education (where bad content could lead to bad professional practice) warrants more scrutiny than activity formatting. The tool should signal risk levels, not just quality scores.

**Automation bias warning** — "Human reviewers should feel empowered to question AI results and flag inconsistencies. HITL should always be treated as a quality control mechanism, not a rubber stamp." The tool's documentation and output format must explicitly position automated validation as a first pass, not a quality certification. [Source: validation-criteria-evidence.md]

### The TTEC Precedent

TTEC's Learning Wizard Suite applies 16 learning science principles to every AI-generated curriculum, producing measurable quality scores. Development time reduced 75-88% while "raising quality across every measure tracked." This is the most direct precedent for the curriculum builder's approach: principles encoded as code, applied as automated checks, with human oversight for judgment calls. The difference is that TTEC is a proprietary, closed system; the curriculum builder would be open, auditable, and doctrine-specific. [Source: validation-criteria-evidence.md]

---

## Synthesis: The Validation Architecture

### Three Validation Tiers (Confirming Phase 10)

The research confirms Phase 10's three-tier validation architecture and provides the specific instruments and criteria to populate each tier.

**Tier 1: Schema validation (fully automated, per stage).** Every pipeline stage's output is validated against its schema. Required fields must be present and non-empty. Bloom's levels must be classified and distributed. Objective-assessment mapping must be complete (every objective paired with at least one assessment). Module sequencing must show progressive cognitive demand. Session schemas must include all 8 required fields from Phase 6. Metaskill mapping must cover all six across the program. These are structural checks — they verify the curriculum's skeleton, not its quality.

**Tier 2: Rubric validation (automated scoring + expert review).** A rubric drawn from QM alignment standards, Merrill's First Principles (TALQ scales), backward design criteria, and the Hu et al. AI evaluation dimensions scores the curriculum across the 10 dimensions identified in Research Question 2. The validation agent produces a structured report with per-dimension scores and confidence levels. Items marked "review recommended" get routed to expert review. This tier evaluates whether the skeleton has been filled with sound pedagogical content.

**Tier 3: Transfer and impact validation (human-driven).** The transfer ecosystem's pre-program, in-program, and post-program components are reviewed by an expert using Tessmer's feasibility analysis (Can this actually be implemented? Are the time allocations realistic? Are the facilitator skill requirements reasonable?). A cognitive walkthrough simulates the learner's journey through at least one full module. If possible, a think-aloud with 3-5 target learners validates the experience. This tier evaluates whether the curriculum will work in practice, not just on paper.

### The Head-to-Head Comparison Protocol

To demonstrate that the tool outperforms the existing template, the following protocol is recommended:

1. Select a single topic and audience (e.g., "Product Management for Technical Leaders, 8-week cohort program")
2. Generate a curriculum using the existing accelerator template
3. Generate a curriculum for the same topic and audience using the new tool
4. Standardize both outputs to an identical presentation template (same sections, same formatting)
5. De-identify the sources (remove all tool-specific language)
6. Recruit 3-5 instructional design practitioners as evaluators
7. Present pairs on each of the 8 comparison dimensions from Research Question 3
8. Collect binary preferences and qualitative commentary
9. Calculate inter-rater reliability using weighted kappa (for ordered categories) or ICC (for continuous scores)
10. Analyze qualitative feedback for specific pedagogical strengths and weaknesses

The prediction, based on the Phase 1 diagnosis: the new tool's output will be preferred on dimensions 1-5 and 7 (alignment, scaffolding, transfer, formative assessment, metaskills, cognitive levels). The existing template may be preferred on surface readability and marketing appeal. The marketing-to-pedagogy ratio (dimension 6) should show the starkest contrast — from 60-65% marketing to a target of under 25%.

### What "Success" Looks Like — Testable Criteria

The tool succeeds if:

1. **Schema completion rate > 95%** — Automated validation finds fewer than 5% of required fields empty or malformed across a generated curriculum. This is a mechanical test of the pipeline's structural integrity.

2. **Objective-assessment alignment: 100%** — Every learning objective maps to at least one assessment. The existing template produces objectives with no corresponding assessments. This should be a hard zero-tolerance criterion.

3. **Bloom's level distribution spans ≥ 4 levels** — Activities should not cluster at Remember/Understand. The CITE Journal study found AI-generated lesson plans systematically under-represent Apply, Analyze, Evaluate, and Create. The tool's output should show distribution across at least four taxonomy levels.

4. **Transfer design present in every module** — Each module includes at least one explicit transfer mechanism (implementation intention, real-world application task, near/far transfer prompt). This criterion is unique to this tool — no existing rubric scores it, but Phase 8 established it as the most critical missing element in compressed format pedagogy.

5. **Expert evaluators prefer tool output on ≥ 6 of 8 dimensions** — In blind pairwise comparison against the existing template's output, instructional design practitioners should prefer the tool's output on at least 6 of the 8 comparison dimensions.

6. **Marketing-to-pedagogy ratio < 25%** — The Phase 1 diagnosis found 60-65% of the existing template's output is marketing-oriented. The tool should invert this ratio.

7. **Metaskill coverage: all 6 activated** — The metaskill mapping layer should show all six metaskills activated across the program, with at least one activity per metaskill that includes a transfer prompt (Phase 7 requirement).

8. **Expert congruence analysis passes** — An instructional design expert performing Tessmer's congruence analysis should find no broken links in the objective-assessment-activity alignment chain.

Criteria 1-4 and 6-7 are automatable. Criterion 5 requires the comparison protocol. Criterion 8 requires expert review. The tool can self-validate on the automatable criteria; the human criteria require external evaluation. A tool that passes the automated criteria but fails the human criteria has structural integrity without pedagogical quality — a well-built skeleton without substance. A tool that passes both has achieved the thesis objective.

---

## Finding Tags

| Claim | Tag | Evidence |
|-------|-----|----------|
| Existing rubrics (QM, EQuIP, IMET) provide adequate criteria for evaluating curriculum quality | **SUPPORTED** | All three are validated, widely adopted, and score the structural elements the tool encodes |
| A published instrument exists for scoring AI-generated curriculum holistically | **CONTRADICTED** | No mature instrument exists; field is fragmented across specific dimensions |
| Transfer design is well-served by existing evaluation rubrics | **CONTRADICTED** | Transfer is the least explicitly scored element across all major rubrics |
| The tool's three-tier validation architecture is well-designed | **SUPPORTED** | Research confirms the automation-judgment boundary maps precisely to the three tiers |
| Pairwise blind comparison is the right methodology for evaluating the tool | **SUPPORTED** | arXiv 2504.05449v1 establishes this as the methodological standard |
| Automated Bloom's classification is reliable enough for schema validation | **SUPPORTED** | 94% accuracy with SVM; viable with GPT-4 using domain-specific prompts |
| LLMs can serve as reliable qualitative rubric scorers | **COMPLICATED** | Strong structural checking but poor intra-rater consistency (Manning 2025); viable for screening, not certification |
| Tessmer's expert review provides adequate short-cycle validation | **SUPPORTED** | Canonical framework; four sub-analyses cover congruence, content, design, feasibility |
| The tool needs to construct its own rubric | **SUPPORTED** | No existing instrument combines QM alignment + Merrill FPI + backward design + transfer + metaskill activation |
| TALQ (Merrill's FPI instrument) is the strongest empirical link between design principles and outcomes | **SUPPORTED** | 9 scales, alpha 0.77-0.94, 9x mastery likelihood with FPI; the only validated instrument directly measuring FPI implementation |
