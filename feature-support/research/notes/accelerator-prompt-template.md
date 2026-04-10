# Source Note: Accelerator Curriculum Builder Prompt Template

## Metadata
- **Source:** Internal document — existing prompt template for accelerator curriculum generation
- **Type:** Primary source material (artifact being diagnosed)
- **Credibility:** High — this is the actual tool being evaluated and replaced
- **Date Accessed:** 2026-03-14
- **Registry Entry:** #2

## Summary

The Accelerator Curriculum Builder Prompt Template is a multi-step AI prompt designed to guide an LLM through the end-to-end creation of a 12-week professional development accelerator program. The template operates as a sequential workflow with mandatory STOP checkpoints between steps, requiring human confirmation before each subsequent phase executes. It accepts structured XML-tagged inputs for accelerator type, partner organization, audience profile, and desired outcomes, and its stated deliverables include a program description, audience profile, partner sponsorship document, learning objectives, full curriculum with scheduling, "Aha moments," and marketing/engagement elements.

The template is built around a proprietary "4E" framework (Engage, Explore, Experiment, Embed), which functions as the organizing principle for content delivery and is referenced repeatedly across steps. However, the 4E framework is never defined in pedagogical terms — there is no articulation of what distinguishes each phase cognitively, how transitions between phases are designed, or what completion of each phase looks like in instructional terms. The framework reads as a branded process metaphor rather than a learning design system grounded in educational theory.

The template produces outputs that span curriculum design, audience targeting, marketing copy, sponsorship development, and program logistics. This breadth is both its practical strength and its structural liability: by treating all of these as sequential co-equal steps in a single workflow, the template conflates program marketing with instructional design, and the AI is never asked to reason about learning architecture independently of positioning and sales considerations.

## Structural Analysis

### Step 1: Define Accelerator Objective and Craft Promise
- **Produces:** A program objective statement plus five variations of a "promise" for the accelerator; user selects preferred promise
- **Orientation:** Marketing/positioning — the central task is crafting a "promise" aimed at attracting attendees, not defining learning endpoints
- **Pedagogical principles invoked:** None explicitly; the closest analog is outcome-definition, but the framing is entirely in terms of audience appeal rather than instructional alignment

### Step 2: (Missing / Skipped)
- **Produces:** Nothing — Step 2 is absent from the template; the numbering jumps directly from Step 1 to Step 3
- **Note:** This gap suggests the template was developed and edited without a complete structural audit; it creates a silent discontinuity in the workflow that may affect sequencing logic downstream

### Step 3: Create Audience Profile
- **Produces:** A narrative audience persona, background/experience descriptors, attendee goals and concerns, "big win" statement, and belief-shift (before/after) statements
- **Orientation:** Mixed — audience analysis has legitimate instructional uses (prerequisite mapping, challenge identification), but the deliverables here are structured for marketing purposes (personas, belief shifts framed as persuasion outcomes, "big win" language)
- **Pedagogical principles invoked:** Implicitly touches on prior knowledge and learner readiness, but is not operationalized as a prerequisite analysis; belief shifts are framed as transformation outcomes rather than measurable learning changes

### Step 4: Create a Strong Accelerator Scope
- **Produces:** An executive summary, a scope statement using a fill-in template, a core focus statement, and an out-of-scope statement
- **Orientation:** Primarily positioning/scoping for stakeholders and potential participants; the scope statement template ("If you're a [specific audience] struggling with [specific problem], this accelerator will help you...") is a marketing copy format
- **Pedagogical principles invoked:** Out-of-scope definition is useful for instructional focus, but the step does not invoke content sequencing, prerequisite mapping, or alignment logic

### Step 5: Develop Marketing Engage Elements
- **Produces:** Central thesis, hook, program promise, five opening statement options, problem/truth teaser, "Promised Land" description, "Magic Gifts" (key insights framed as gifts), actionable takeaways list, and a call-to-action
- **Orientation:** Explicitly and entirely marketing — this is the most overtly sales-oriented step in the template; the language ("Magic Gifts," "Promised Land," "hook") is drawn from persuasion and content marketing frameworks
- **Pedagogical principles invoked:** None; the "actionable takeaways" sub-step (5.6) superficially resembles learning outcomes but is framed in terms of immediate participant appeal, not instructional measurability

### Step 6: Create Learning Outcomes
- **Produces:** A set of learning outcomes written with action verbs, aligned to the accelerator objective and audience needs
- **Orientation:** Learning design — this is the most pedagogically explicit step in the template
- **Pedagogical principles invoked:** Use of action verbs references Bloom's Taxonomy implicitly; measurability and specificity criteria are invoked; however, the step does not ask for Bloom's level distribution, does not require cognitive complexity progression across the 12 weeks, and does not connect outcomes to assessment methods

### Step 7: Generate "Aha" Ideas for Each Learning Outcome
- **Produces:** 2–3 "Aha" ideas per learning outcome, framed as key concepts, belief shifts, or essential skills; linked loosely to the 4E framework
- **Orientation:** Mixed — the step has genuine instructional intent (identifying insight targets and belief shifts), but the "Aha" framing is experiential/emotional rather than cognitive or behavioral
- **Pedagogical principles invoked:** Loosely relates to conceptual change theory and schema disruption; the alignment to 4E stages is mentioned but not operationalized; no scaffolding logic or transfer design is present

### Step 8: Outline Accelerator Curriculum and Schedule
- **Produces:** A 12-week curriculum mapped to three 4-week courses, with weekly modules including topics, worksheets, exercises, and engagement messages (email/SMS); also a program evaluation section and appendices
- **Orientation:** Learning design, but shallowly — this is the only step that directly constructs instructional content; the criteria listed emphasize logical sequencing and variety of methods, but do not invoke specific design principles
- **Pedagogical principles invoked:** Progressive sequencing (foundational to advanced), varied instructional methods, and accommodation of learning styles are mentioned; however, assessment design, spaced practice, retrieval integration, and formative feedback loops are absent from the criteria; "learning styles" as a criterion reflects a debunked framework

### Step 9: Craft Comprehensive Final Accelerator Description
- **Produces:** A long-form and condensed program description suitable for participants, partners, and stakeholders; includes hook, value proposition, curriculum overview, logistics, social proof, and call-to-action
- **Orientation:** Marketing/positioning — this step is explicitly a sales and communications document; it consolidates outputs from all prior steps into a promotional artifact
- **Pedagogical principles invoked:** None; learning outcomes are referenced but as selling points, not as instructional commitments

### Step 10: Develop Partner Focus
- **Produces:** A sponsorship pitch document with 4–5 reasons for sponsorship, benefit articulation for the sponsoring organization, lead generation framing, and a closing call-to-action
- **Orientation:** Entirely business development / sponsorship sales — no learning design content
- **Pedagogical principles invoked:** None; the 4E approach is referenced as a "unique aspect" to appeal to sponsors, not as an instructional rationale

## Marketing vs. Pedagogy Balance

**Step-level classification:**

| Step | Primary Orientation |
|------|---------------------|
| Step 1 | Marketing/positioning |
| Step 2 | Absent |
| Step 3 | Marketing (audience persona/persuasion) |
| Step 4 | Positioning/scoping |
| Step 5 | Marketing (explicit) |
| Step 6 | Learning design |
| Step 7 | Mixed (learning design with experiential/marketing framing) |
| Step 8 | Learning design (shallow) |
| Step 9 | Marketing/communications |
| Step 10 | Business development |

Of the 9 present steps: **5 are primarily marketing or positioning-oriented** (Steps 1, 3, 4, 5, 9, 10 — with Step 4 being borderline), **1 is explicitly pedagogical** (Step 6), **1 is mixed** (Step 7), and **1 is the only substantive instructional design step** (Step 8).

In terms of word count and instruction density, Step 5 (Marketing Engage Elements) is the most elaborately specified step in the template, with 7 sub-steps and detailed instructions for each deliverable. Step 6 (Learning Outcomes) — the closest analog to core instructional design — receives one of the shortest treatments, with no sub-steps and no guidance on cognitive level distribution or assessment alignment. Step 8 (Curriculum) is substantial in length but its criteria are largely logistical rather than pedagogically principled.

Estimated allocation of explicit instruction: **approximately 60–65% of the template's instructional content is oriented toward marketing, positioning, audience persuasion, or stakeholder sales**; approximately 20–25% addresses instructional design; the remaining 10–15% covers logistics and program structure.

## Pedagogical Gaps

**Learning sequencing logic:** Step 8 calls for "logically sequenced" content that builds "from foundational concepts to advanced strategies," but offers no framework for determining what counts as foundational, how dependencies between concepts should be mapped, or how the sequence should respond to learner progress. There is no concept-mapping or prerequisite-analysis step anywhere in the workflow.

**Formative assessment design:** The template has no step dedicated to formative assessment. Step 8 mentions "assessment methods" in passing and references "weekly tasks, exercises, and projects" as building toward "larger course assessments," but provides no criteria for what makes an assessment formative, how feedback loops should be structured, or how assessment should connect to learning outcomes. The term "assessment" appears to mean summative evaluation rather than embedded checks for understanding.

**Scaffolding:** The template does not address scaffolding at any point. There is no guidance on how to structure cognitive support for early learners, how to design gradual release of responsibility, or how to adjust difficulty within or across sessions. The phrase "balancing comprehensive content with time efficiency" is the closest the template gets to load management, but this is framed as a scheduling concern rather than a cognitive one.

**Transfer task design:** Transfer — the capacity to apply learning to novel contexts — is never addressed. The template's references to "real-world application" (Step 8) and "immediately applied" takeaways (Step 5) describe intent but provide no design guidance for how transfer is engineered into instructional activities.

**Bloom's Taxonomy alignment:** Step 6 implicitly invokes Bloom's through the action-verb requirement, but the template never asks for a distribution of cognitive levels across the 12 weeks, never requires that activities and assessments align to the stated outcome levels, and never checks whether a 12-week accelerator for high-growth entrepreneurs is targeting appropriately advanced cognitive levels (e.g., analyze, evaluate, create) rather than clustering at recall and comprehension.

**Spaced practice:** Spaced repetition — one of the most robust findings in cognitive science for durable learning — is absent from the template entirely. There is no instruction to revisit prior concepts at distributed intervals, to build retrieval opportunities into later sessions, or to structure the three 4-week courses as a spiraling rather than sequential curriculum.

**Retrieval practice:** Similarly absent. No step asks the designer to embed retrieval cues, quizzes, recall exercises, or other retrieval-based learning activities. The email/SMS engagement messages referenced in Step 8 could theoretically serve this function but are framed as engagement/marketing touchpoints, not retrieval prompts.

**Objective-activity-assessment alignment:** The template produces learning outcomes (Step 6), activities (Step 8), and a program description (Step 9) in separate, non-recursive steps with no alignment-checking mechanism. There is no step that asks: do the activities in Step 8 actually practice the cognitive behaviors specified in the outcomes from Step 6? The STOP checkpoints allow human review but do not prompt alignment verification.

**Differentiation and adaptive design:** "Accommodates various learning styles" appears twice in the template (Steps 8 and Task definition). Learning styles theory (VAK, VARK) is not supported by empirical evidence as a basis for instructional design. The template does not substitute or supplement this with evidence-based approaches to cognitive diversity, such as Universal Design for Learning (UDL) or worked-example effects for novice learners.

**Cohort learning and peer learning design:** The template mentions "peer feedback sessions" once in Step 8's method list but provides no design guidance for structuring collaborative learning, productive failure, or peer instruction — all of which have strong evidence bases in professional development contexts.

## What the Template Does Well

**Structured workflow with human checkpoints:** The sequential STOP architecture is operationally sound. It prevents the AI from over-generating in a single pass and creates natural review moments for the human collaborator. This is a legitimate prompt engineering practice that reduces hallucination risk in multi-component outputs.

**Audience analysis before content design:** Placing the audience profile (Step 3) before learning outcomes (Step 6) and curriculum (Step 8) reflects a correct design-thinking sequence. The template does not make the common error of jumping directly from topic to content without considering who is learning.

**Scope definition:** Step 4's explicit out-of-scope statement is a useful instructional design practice. Defining what the program will not cover reduces scope creep and manages learner expectations.

**Actionable outcome language:** Step 6's instruction to use action verbs and ensure outcomes are "specific, actionable, measurable, and achievable" reflects sound instructional design practice. The criteria map reasonably well to standard objectives-writing frameworks even without explicitly naming them.

**Contextual XML tagging:** The use of structured XML-tagged inputs (`<accelerator-type>`, `<audience-profile>`, `<desired_outcomes>`) is good prompt engineering practice — it creates parseable, referenceable context that the AI can pull from consistently across steps, reducing drift in long-session outputs.

**Expert session integration:** The requirement for one external expert session per month (referenced in The Task section) reflects an awareness of social learning and credibility-building in professional development, even if the pedagogical rationale is not articulated.

**Iterative refinement loops:** Multiple steps end with instructions to "present for feedback and selection" or "present for review and refinement," which creates a collaborative design loop rather than a single-pass generation. This is appropriate for a curriculum design workflow.

## Role Framing Analysis

The opening role description establishes the AI as "a seasoned workshop facilitator specializing in corporate and professional development" whose expertise includes "creating transformative learning experiences through masterful storytelling, engaging diverse audiences, and simplifying complex ideas."

This framing makes several consequential decisions before the workflow even begins:

**Storytelling as the primary competency:** By foregrounding "masterful storytelling" as a core expertise, the prompt primes the AI to frame curriculum content as narrative rather than as instructional architecture. Storytelling is a delivery technique; it is not a design methodology. An AI primed as a storyteller will optimize for narrative arc, emotional engagement, and memorable framing — not for cognitive load distribution, prerequisite sequencing, or assessment-outcome alignment.

**Facilitator vs. instructional designer:** "Workshop facilitator" and "instructional designer" are distinct roles with different knowledge bases and optimization targets. A facilitator's expertise centers on group dynamics, real-time engagement, and participant experience. An instructional designer's expertise centers on learning objectives, activity-outcome alignment, formative assessment, and transfer design. The role framing selects the facilitator's lens, which explains why the template consistently produces engagement-heavy and assessment-light outputs.

**"Transformative" as the performance metric:** The word "transformative" appears in the role description and recurs throughout the template. In the context of this role framing, "transformative" operates as an experiential and emotional target — the feeling of insight or inspiration — rather than a measurable learning or behavioral outcome. This is consistent with the "Aha moments" framework in Step 7: the template is designed to produce experiences that feel significant, not outcomes that are demonstrably acquired.

**"4E" approach as the methodological anchor:** Introducing the 4E framework (Engage, Explore, Experiment, Embed) in the role description establishes it as the authoritative design framework for all subsequent steps. Since 4E is a proprietary branded framework rather than an evidence-based instructional design model, this anchoring prevents the AI from drawing on established frameworks (Understanding by Design, Gagné's Nine Events, Merrill's First Principles, etc.) unless explicitly prompted. The 4E framing is never defined with sufficient granularity to function as an actual design constraint — it functions primarily as a brand signal.

**Optimization target:** The combination of storytelling expertise, facilitator identity, and engagement focus primes the AI to optimize for content that is persuasive, emotionally resonant, and experientially compelling — which is precisely what the template's marketing-heavy outputs reflect. The role description does not prime for rigor, measurability, cognitive challenge calibration, or transfer design.

## Research Hooks

**4E Framework vs. established instructional models:** The proprietary 4E framework (Engage, Explore, Experiment, Embed) should be compared against Gagné's Nine Events of Instruction, Merrill's First Principles of Instruction, the ADDIE model, and Backward Design (Wiggins and McTighe). The key question: does 4E map onto any of these frameworks' cognitive or behavioral design principles, or is it primarily a facilitation and engagement metaphor?

**"Transformative learning" as Mezirow vs. marketing language:** The template uses "transformative" as a descriptor throughout, which may invoke Mezirow's transformative learning theory (perspective transformation through critical reflection and disorienting dilemmas). However, the template does not operationalize transformative learning in Mezirow's sense — there is no design for critical reflection, disorienting dilemma construction, or rational discourse. This gap between the term's theoretical meaning and its marketing use in the template is worth examining against the literature.

**Belief shift framing in Step 3:** The "From: [initial belief] To: [transformed belief]" structure in the audience profile step resembles conceptual change pedagogy but is deployed as a marketing device. The literature on conceptual change (Posner et al., Chi) and its application to professional learning contexts is a relevant comparison.

**"Aha moments" as instructional target:** Step 7's "Aha" framework centers the curriculum on insight experiences. This should be compared against the cognitive science literature on insight problem-solving (Ohlsson, Danek et al.) and the research on whether insight experiences reliably correlate with durable learning outcomes.

**Learning styles in Step 8:** The template's repeated instruction to "accommodate various learning styles" should be examined against the extensive literature debunking learning styles as an instructional design principle (Pashler et al., 2008; Rogowsky et al., 2015) and against UDL as an evidence-based alternative.

**Engagement as a proxy for learning:** The template treats engagement (audience attention, emotional interest, willingness to return) as both a design goal and an implicit outcome measure. The relationship between engagement and learning is complex and not linear — this is a well-documented issue in e-learning and professional development research (Caroll's model of school learning, Kirschner on minimal guidance). Research on the engagement-learning relationship in short-format professional development is directly relevant.

**Spaced practice and retrieval in 12-week programs:** The absence of spaced practice and retrieval design from the template should be measured against the literature on optimal spacing and retrieval in adult professional learning contexts (Cepeda et al., Kornell and Bjork, Roediger and Karpicke). The question for this project: what would a 12-week accelerator look like if spaced retrieval were a first-class design constraint?

**Backward Design as an alternative architecture:** Wiggins and McTighe's Understanding by Design (UbD) framework begins with desired results (outcomes), moves to acceptable evidence (assessment), and only then designs learning experiences. The accelerator template inverts this logic in important ways — it defines outcomes (Step 6) after marketing elements (Step 5) and produces assessment only as an afterthought in Step 8. Comparing the template's logic against UbD's Stage 1-2-3 sequence would clarify the structural source of its pedagogical gaps.
