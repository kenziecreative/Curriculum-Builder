# Validation Criteria Evidence — Source Note

## Source Overview

| Field | Value |
|-------|-------|
| Source # | 22 |
| Type | Web research compilation — curriculum evaluation rubrics, AI-generated content scoring frameworks, comparison methodology, short-cycle testing methods, human vs. automated QA |
| Credibility | Mixed — Academic rubrics (QM, EQuIP, IMET, TALQ) High; AI evaluation studies (Hu et al. 2024, Liu 2025, Aila/Oak National) Moderate-High (recent, limited replication); Comparison methodology (arXiv 2504.05449, Brookings RCT) High; Formative evaluation (Tessmer 1993, Dick & Carey) High (canonical); Automated scoring (Li et al. 2022, SVM 94%) Moderate-High |
| Date Accessed | 2026-03-15 |
| Relevance | Directly answers all five Phase 11 research questions |

---

## Part 1: Curriculum Evaluation Rubrics

### Quality Matters (QM) Rubric — 7th Edition
The most widely adopted curriculum quality rubric in higher education. 8 General Standards, 44 Specific Review Standards. Core concept is the **alignment chain**: Learning Objectives (GS2) → Assessment (GS3) → Instructional Materials (GS4) → Learning Activities (GS5) → Course Technology (GS6). Threshold: 85% score with all Essential Standards met for QM Certification.

Key standards for this project:
- GS2.1/2.2: Course-level and module-level objectives must be measurable and consistent (Essential, 3 pts each)
- GS3.1: Assessments must measure stated objectives (Essential, 3 pts) — the alignment standard
- GS3.2: Specific and descriptive criteria provided for evaluating learner work
- GS3.3: Assessment strategies provide opportunities for self-reflection on progress (2 pts)
- GS4.1/5.1: Materials and activities contribute to achievement of stated objectives (alignment standards)

**Variants:** Higher Ed, K-12, K-12 Publisher, Continuing & Professional Education, Higher Ed Publisher.

Sources:
- https://www.qualitymatters.org/qa-resources/rubric-standards
- https://www.qualitymatters.org/qa-resources/rubric-standards/higher-ed-rubric
- https://files.eric.ed.gov/fulltext/EJ1064131.pdf

### EQuIP Rubric (Educators Evaluating Quality of Instructional Products)
Developer: Achieve (grew from Tri-State Rubric collaboration of MA, NY, RI). Evaluates individual lessons and units for standards alignment.

ELA/Math version — 4 Dimensions: (1) Alignment to depth of CCSS, (2) Key shifts in CCSS, (3) Instructional supports, (4) Assessment. Science version (v3.0) — 3 Categories: (1) NGSS 3D Design, (2) NGSS Instructional Supports, (3) Monitoring NGSS Student Progress.

Notable: Category II evaluates equity — differentiation, culturally responsive teaching, supports for ELLs/special ed.

Sources:
- https://www.achieve.org/files/EQuIP%20Quality%20Review-Process%20Dimensions-FINAL.pdf
- https://www.nextgenscience.org/resources/equip-rubric-science

### IMET (Instructional Materials Evaluation Tool)
Developer: Student Achievement Partners. Evaluates comprehensive textbook series. Uses non-negotiable/alignment criteria structure. EdReports.org uses IMET-based rubric for independent reviews with 3-Gateway sequential system: Gateway 1 (Standards Alignment) → Gateway 2 (Building Knowledge) → Gateway 3 (Usability).

EdReports finding: Less than 20% of classroom materials are aligned with standards. Has reviewed ~98% of known comprehensive K-12 math and ELA materials. ELA: 51% meet, 32% partially meet, 17% do not meet.

Sources:
- https://achievethecore.org/page/1946/instructional-materials-evaluation-tool
- https://cdn.edreports.org/reviewtools/ela/2.0/ELA-Grades-6-12-v2.0-Tools_Review-Criteria.pdf

### The "Golden Triangle" / Constructive Alignment
Carnegie Mellon's Eberly Center calls alignment between objectives, content/activities, and assessments the core of instructional quality. Michael Fors (Microsoft) Instructional Design Criteria Checklist: "The objectives should be measurable & observable, content should teach to meet the objectives, tests should measure ability to accomplish the objectives, and the course evaluation should measure how well the course taught the objectives."

Sources:
- https://www.cmu.edu/teaching/assessment/basics/alignment.html
- https://nascsp.org/wp-content/uploads/2018/02/Criteria-Checklist.pdf

### Transfer Design Gap in Existing Rubrics
**Transfer design is the least explicitly scored element across all major rubrics.** Most rubrics emphasize alignment and coherence but treat transfer as an implicit outcome rather than a scorable structural feature. This is directly relevant — the curriculum builder's emphasis on transfer ecosystem design addresses a documented gap in existing evaluation instruments.

---

## Part 2: AI-Generated Curriculum Scoring Instruments

### Finding: No Mature Instrument Exists
No single, widely-adopted published scoring instrument exists specifically for evaluating AI-generated curriculum against learning science standards. The field is fragmented across specific dimensions.

### Closest Published Instruments

**Aila Auto-Evaluation Agent (Oak National Academy, UK):** 19 Likert criteria (1-5 scale) + 5 boolean criteria. Tested on 4,985 lessons. Calibrated against qualified teacher scores. Published at CEUR Workshop Proceedings.
Source: https://ceur-ws.org/Vol-3994/short2.pdf

**Hu et al. (2024) — IEEE Transactions on Learning Technologies:** 9-category, 19-dimension evaluation framework, 8-point Likert scale. Categories: problem chains, teaching activities, knowledge content, teaching methods/strategies, teaching evaluation, interdisciplinarity, practical value, scope, overall. Evaluated 480 teaching plans (GPT-4 vs. human). Found GPT-4 plans performed well on objectives/activities but showed gaps in content depth, complexity, differentiation, interdisciplinary integration.
Source: Hu et al. (2024), IEEE T. Learn. Technol. 17, 1471-1485

**Liu (2025, arXiv):** Evaluated 5 LLMs across 3 prompt frameworks using 4 metrics: readability/linguistic complexity, factual accuracy/hallucination detection, standards alignment, cognitive level of learning objectives.
Source: https://arxiv.org/pdf/2510.19866

**1EdTech AI-Generated Content Best Practices v1.0:** Three-tier risk model (high/medium/low) + GenAI Content Transparency Rating System. Governance framework, not a scoring rubric.
Source: https://www.imsglobal.org/resource/AI-Generated_Content_Best_Practices/v1p0

**EducationQ Benchmark (2025):** 17 scoring dimensions organized by perspective (holistic, teacher-centric, student-centric). Standardized 1-10 scale.
Source: https://arxiv.org/html/2504.14928v1

### ARCHED Evaluation Criteria
5 dimensions scored 1-5: structural completeness (ABCD/SMART), taxonomic alignment (Bloom's), measurability, content clarity, technical accuracy. Validation: 30 ARCHED-generated vs. 30 human-created objectives; Mann-Whitney U showed no significant differences (p > 0.05). Inter-rater agreement: κw = 0.834.
Source: https://arxiv.org/abs/2503.08931

### ADGIE (Evolution of ADDIE)
Process model, not scoring instrument. Evaluation phase is "transversal and continuous." Key survey finding: 91% of IDs insist on validating AI output quality; only 49% "very ready" to let AI select teaching methods.
Source: https://drphilippahardman.substack.com/p/from-addie-to-adgie

### TALQ (Teaching and Learning Quality) — Merrill's First Principles Instrument
Developed by Frick, Chadha, Watson, Wang & Green (2009). 9 scales: ALT, 5 FPI scales (Problem/Task-Centered, Activation, Demonstration, Application, Integration), Student Satisfaction, Perceived Learning, Global Ratings. Cronbach alpha 0.77-0.94. Validated on 140 students across 89 courses. Students 9x more likely to report mastering objectives when FPI used; 4x more likely with FPI + ALT.
Source: https://tedfrick.me/etrd/FrickTALQ2009.pdf

### FRAME Framework
Not found as a named framework in the AI-generated educational content domain. Logged as GAP — may have been misidentified in prior research.

---

## Part 3: Head-to-Head Comparison Methodology

### Leading Study: arXiv 2504.05449v1 (2025)
"Understanding Educator Preferences in GenAI vs. Human-Created Lesson Plans." Compared GPT-4, fine-tuned LLaMA-2-13b, and human curriculum designers.

Methodology:
- Pairwise evaluation design (binary preference on pairs)
- Standardized template across all sources (identical structure)
- Blinded/de-identified presentation
- Mixed methods (quantitative preference + qualitative feedback)
- Bootstrapping for confidence intervals
Source: https://arxiv.org/html/2504.05449v1

### Other Comparison Designs
- **RCT:** Brookings "Choosing Blindly" — randomized students to different curricula, measured learning outcomes. Saxon Math effect size: 0.17 SD.
Source: https://www.brookings.edu/wp-content/uploads/2016/06/0410_curriculum_chingos_whitehurst.pdf
- **ICC comparison:** PMC12453255 — Bland-Altman plots + ICC for AI vs. expert evaluation agreement.
Source: https://pmc.ncbi.nlm.nih.gov/articles/PMC12453255/
- **Across-subject design:** Participants experience both AI and human conditions for different content.

### Inter-Rater Reliability Methods
| Method | Best For | Key Reference |
|--------|----------|---------------|
| Cohen's Kappa | 2 raters, categorical | Cohen, 1960 |
| Fleiss' Kappa | 3+ raters, categorical | Fleiss, 1971 |
| Weighted Kappa | Ordered categorical (rubric levels) | — |
| ICC | Continuous data, 2+ raters | Shrout & Fleiss, 1979; Koo & Li, 2016 |
| Gwet's AC1 | When kappa is paradoxically low despite high agreement | Gwet, 2002 |
| Krippendorff's Alpha | Multiple raters, multiple types | Versatile |

Landis & Koch (1977) benchmarks: 0.00-0.20 slight, 0.21-0.40 fair, 0.41-0.60 moderate, 0.61-0.80 substantial, 0.81-1.00 almost perfect.

---

## Part 4: Short-Cycle Testing Methods

### Tessmer's Four Stages of Formative Evaluation (1993)
Canonical framework:
1. **Expert Review** — SMEs + ID experts evaluate before learners see materials. Sub-analyses: congruence, content, design, feasibility, user analysis.
2. **One-to-One (Clinical)** — Designer works with individual learners. "The material is being evaluated, NOT the learner."
3. **Small Group** — 8-20 representative learners. Performance, attitudes, time on task.
4. **Field Test** — Full implementation with target population.

Source: https://socialsci.libretexts.org/Bookshelves/Education_and_Professional_Development/Design_for_Learning_-_Principles_Processes_and_Praxis_(McDonald_and_West)/01%3A_Instructional_Design_Practice/04%3A_Evaluating/4.03%3A_Instructional_Design_Evaluation

### Dick & Carey Formative Evaluation (Step 8)
Three stages: (1) One-to-One with 3 learners of varying ability, (2) Small Group of 8-20, (3) Field Trial with actual instructor. Data: performance, time on task, attitudes, feasibility.
Source: https://ask.ifas.ufl.edu/publication/WC294

### Cognitive Walkthrough Applied to Curriculum
Adapted from HCI (Polson et al., 1992). Walk through learner's cognitive journey step by step — asking whether objectives are clear, sequence makes sense, activities connect to goals, feedback mechanisms work. Can be done on prototypes without real learners.
Source: https://www.nngroup.com/articles/cognitive-walkthroughs/

### Learner Think-Aloud Protocol
Three variants: Traditional CTA (passive evaluator), Speech-Communication (natural acknowledgments), Active Intervention (probing questions). Medical school study used "modified ethnographic observation with simplified thinking aloud protocol" — yielded comprehensive, actionable recommendations.
Sources: https://theelearningcoach.com/elearning_design/think-aloud-protocol/; https://pmc.ncbi.nlm.nih.gov/articles/PMC1480138/

### Rapid Prototyping in ID
Jones & Richey (2000) — key reference. Tessmer (1994): RP is "a type of formative evaluation that can effectively be used early and repeatedly throughout a project." SAM (Successive Approximation Model) operationalizes this as three phases with iterative evaluation.
Source: https://www.uky.edu/~gmswan3/609/Jones_Richey_2000.pdf

---

## Part 5: Human Expert Review vs. Automated Checking

### What Can Be Automated with High Confidence
- Structural completeness (required components present?)
- Bloom's taxonomy classification of objectives (94% accuracy with SVM + augmentation; Li et al. 2022 BERT-based on 21,380 objectives)
- Objective-assessment alignment mapping (presence/absence, not quality)
- Terminology consistency
- Accessibility compliance
- Surface-level content quality (grammar, formatting, citation completeness)
- Coverage mapping against standards frameworks
Sources: https://educationaldatamining.org/edm2022/proceedings/2022.EDM-short-papers.55/2022.EDM-short-papers.55.pdf; https://arxiv.org/html/2511.10903v1

### What Requires Human Expert Judgment
- Pedagogical appropriateness for specific audience
- Scaffolding quality and progression logic
- Real-world relevance and application authenticity
- When to simplify vs. preserve complexity
- Root cause diagnosis (bad assessment vs. knowledge gap)
- Creative and critical thinking assessment quality
- Cultural sensitivity (AI can flag, humans must decide)

Key quote: "Diagnosing when a learner's struggle signals a poorly designed assessment versus a gap in prerequisite knowledge" requires contextual understanding that AI cannot replicate.
Source: https://aace.org/review/generative-ai-for-instructional-design-changes-chances-challenges/

### The Automation-Judgment Boundary
**Automate:** structural checks, Bloom's classification, alignment mapping, terminology, accessibility, coverage.
**Screen with AI, confirm with human:** content accuracy, cultural sensitivity, difficulty calibration, assessment discrimination.
**Require human:** pedagogical appropriateness, scaffolding quality, real-world relevance, complexity decisions, stakeholder navigation.

### HITL Design Patterns
- **Approval flows:** AI generates, pauses at checkpoints for human review
- **Exception-based review:** AI flags below-confidence items for human attention
- **Sampled review:** Random sampling for periodic audit
- **Tiered review:** Risk/consequence-based oversight levels
Warning: "HITL should always be treated as a quality control mechanism, not a rubber stamp."
Sources: https://www.ibm.com/think/topics/human-in-the-loop; https://parseur.com/blog/hitl-best-practices

### Automated Scoring Reliability Data
| System | Metric | Source |
|--------|--------|--------|
| PEG vs. human | r = .77 | Page (1968) |
| e-rater vs. human | up to r = .97 | Attali & Burstein (2006) |
| IntelliMetric vs. expert | No sig. difference (t = .265) | Wang & Brown (2007) |
| SVM Bloom's classification | 94% accuracy/F1 | 2024 arXiv study |
| GPT-4 Bloom's classification | Viable but below fine-tuned BERT | 2025 Computers & Education: AI |
| ChatGPT-4 consistency | Poor intra-rater consistency | Manning (2025) |

### Key Industry Model: TTEC Learning Wizard Suite
Applies 16 learning science principles to every AI-generated curriculum, producing measurable quality scores. Development time reduced 75-88% while raising quality. Won five industry awards including Brandon Hall Gold. Represents "principles-as-code" approach.
Source: https://www.forbes.com/sites/kevinkruse/2026/03/05/this-companys-ai-instructional-designer-cuts-curriculum-costs-by-88-and-the-training-is-actually-better/

### ADGIE Survey Finding
91% of instructional designers insist on validating quality/relevance of AI-generated content. Only 49% "very ready" to let AI select teaching methods. This empirically maps the trust boundary.
Source: https://drphilippahardman.substack.com/p/from-addie-to-adgie

---

## Key Findings for This Project

1. **Transfer design is the least scored element across all major rubrics** — the curriculum builder's transfer ecosystem emphasis addresses a documented evaluation gap.
2. **No mature AI curriculum scoring instrument exists** — the field is fragmented. The tool must construct its own rubric from first principles, drawing on QM alignment standards + Merrill's FPI + backward design + the Hu et al. dimensions.
3. **The pairwise blind comparison design is the methodological standard** for AI vs. human curriculum comparison. Requires: identical templates, de-identification, mixed methods, bootstrapping.
4. **Tessmer's expert review is the canonical short-cycle method** — specifically the congruence, content, design, and feasibility sub-analyses. Cognitive walkthrough adapted from HCI provides a structured alternative.
5. **The automation-judgment boundary is well-mapped:** structural completeness and Bloom's classification are automatable (94% accuracy); scaffolding quality and pedagogical appropriateness require humans. The tiered HITL model matches Phase 10's three-tier validation architecture.
6. **TALQ is the only validated instrument based on Merrill's First Principles** — 9 scales, alpha 0.77-0.94, with 9x likelihood of objective mastery when FPI implemented. This is the strongest empirical link between design principles and outcomes.
