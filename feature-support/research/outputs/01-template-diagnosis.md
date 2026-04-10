# Phase 1: Diagnosing the Existing Template — Why It Produces Marketing-Heavy Output

## Core Finding

The existing accelerator prompt template is structurally engineered to produce marketing-heavy output. This is not an incidental flaw or a matter of emphasis — it is the predictable consequence of five architectural decisions baked into the template's design: role framing, step sequencing, instruction density allocation, the absence of pedagogical constraint logic, and the conflation of engagement with learning.

---

## 1. The Marketing-to-Pedagogy Ratio Is Not Close

Of the template's 9 present steps (Step 2 is missing — the numbering jumps from 1 to 3, suggesting unaudited editing), the breakdown is:

| Orientation | Steps | Count |
|-------------|-------|-------|
| Marketing/positioning | 1, 3, 4, 5, 9, 10 | 6 |
| Learning design | 6 | 1 |
| Mixed (learning intent, marketing framing) | 7 | 1 |
| Curriculum (shallow learning design) | 8 | 1 |

Approximately **60-65% of the template's explicit instructions** deal with marketing, audience persuasion, positioning, and stakeholder sales. Approximately **20-25%** addresses instructional design. The remaining 10-15% covers logistics and program structure.

Step 5 (Marketing Engage Elements) is the most elaborately specified step in the entire template, with 7 sub-steps and detailed deliverables including "Magic Gifts," "Promised Land" descriptions, hooks, and calls-to-action. Step 6 (Learning Outcomes) — the closest thing to core instructional design — gets one of the shortest treatments with no sub-steps and no guidance on cognitive level distribution or assessment alignment.

**Finding tag: SUPPORTED** — The thesis that the template is marketing-heavy is not an impression; it is measurable in the architecture. [Source: accelerator-prompt-template.md]

---

## 2. The Role Framing Primes for Engagement, Not Rigor

The template opens by casting the AI as "a seasoned workshop facilitator specializing in corporate and professional development" whose expertise includes "creating transformative learning experiences through masterful storytelling, engaging diverse audiences, and simplifying complex ideas."

This framing makes three consequential choices before any content generation begins:

**Facilitator vs. instructional designer.** These are distinct roles with different optimization targets. A facilitator optimizes for group dynamics, real-time engagement, and participant experience. An instructional designer optimizes for learning objectives, activity-outcome alignment, formative assessment, and transfer design. The template selects the facilitator's lens — which is why it consistently produces engagement-heavy, assessment-light output.

**Storytelling as primary competency.** By foregrounding "masterful storytelling," the prompt primes for narrative arc and emotional resonance over cognitive load distribution, prerequisite sequencing, or assessment-outcome alignment. Storytelling is a delivery technique, not a design methodology.

**"Transformative" as experiential target.** The word "transformative" recurs throughout the template but operates as an emotional/experiential target — the feeling of insight — rather than a measurable learning outcome. This is consistent with the "Aha moments" framework in Step 7: the template designs for experiences that feel significant, not outcomes that are demonstrably acquired.

**Finding tag: SUPPORTED** — Role framing in prompts significantly affects output register. The literature on prompt engineering for educational AI confirms that specifying "instructional designer" versus "facilitator" produces meaningfully different structural quality in generated content. [Source: doctrine-how-i-teach-how-i-learn.md, accelerator-prompt-template.md]

---

## 3. The Sequencing Embeds Marketing Before Learning Design

The template's step order reveals where its author believed value-creation happens:

1. Promise/objective (marketing)
2. *(missing)*
3. Audience profile (marketing persona)
4. Scope (positioning)
5. Marketing engage elements (explicit sales copy)
6. Learning outcomes (first pedagogical step — step 6 of 10)
7. Aha moments (mixed)
8. Curriculum (the only substantive instructional design step)
9. Program description (marketing consolidation)
10. Partner focus (sponsorship sales)

Learning outcomes don't appear until Step 6. Curriculum doesn't appear until Step 8. By the time the AI reaches instructional design, it has already generated a promise, a persona, a scope statement, a hook, a "Promised Land" description, "Magic Gifts," and a call-to-action. The AI's context window is loaded with marketing framing before it ever encounters a pedagogical task.

This matters because LLMs are sensitive to priming. The content generated in early steps shapes the register, vocabulary, and optimization target for later steps. A curriculum designed after five steps of marketing copy will read differently — and be structurally different — than a curriculum designed after five steps of learning analysis.

Compare this to backward design (Wiggins & McTighe), which sequences: desired results → assessment evidence → learning experiences. The template inverts this: it defines marketing outcomes first, and positions assessment as an afterthought within Step 8.

**Finding tag: SUPPORTED** — The sequencing is a structural cause of the marketing-heavy output, not just a stylistic choice. [Source: accelerator-prompt-template.md]

---

## 4. The Pedagogical Gaps Are Systematic, Not Incidental

The template is not merely light on pedagogy — it systematically omits the structural elements that distinguish a well-designed curriculum from a well-packaged content outline:

**No learning sequencing logic.** Step 8 asks for content that builds "from foundational to advanced" but provides no framework for determining what counts as foundational, how concept dependencies should be mapped, or how the sequence should respond to learner progress.

**No formative assessment design.** There is no step dedicated to formative assessment. Step 8 mentions "assessment methods" in passing but provides no criteria for what makes an assessment formative or how feedback loops should work.

**No scaffolding.** The template never addresses how cognitive support should be structured for early learners, how to design gradual release of responsibility, or how to calibrate difficulty within or across sessions.

**No transfer task design.** Transfer — applying learning to novel contexts — is the entire point of the researcher's doctrine, but the template never addresses how transfer is engineered into activities. "Real-world application" is mentioned as intent but never as design.

**No objective-activity-assessment alignment.** The template produces learning outcomes (Step 6), activities (Step 8), and a description (Step 9) in separate, non-recursive steps with no alignment-checking mechanism. There is no validation that the activities in Step 8 actually practice the cognitive behaviors specified in Step 6.

**No spaced practice or retrieval practice.** Two of the most robust findings in cognitive science for durable learning are entirely absent. The email/SMS touchpoints in Step 8 could serve as retrieval prompts but are framed as marketing engagement tools.

**References debunked "learning styles."** The template instructs the AI to "accommodate various learning styles" — a framework that has been extensively debunked (Pashler et al., 2008) and is not supported as a basis for instructional design.

**Finding tag: SUPPORTED** — These gaps are not oversights that could be fixed with minor additions. They reflect the template's fundamental orientation: it was built to produce a marketable program description, not a pedagogically complete curriculum document. [Source: accelerator-prompt-template.md]

---

## 5. The 4E Framework Operates as Brand, Not Design Constraint

The 4E framework (Engage, Explore, Experiment, Embed) is referenced 6+ times across the template but is never operationally defined. There is no articulation of:

- What distinguishes each phase cognitively
- How transitions between phases are designed
- What completion of each phase looks like in instructional terms
- How 4E maps to established learning science frameworks

The framework functions as a branded process metaphor — a way to signal design methodology without specifying one. When the template instructs the AI to "align with the 4E approach," it provides no constraints that would actually shape the generated content differently than if the instruction were absent.

This is not a judgment on whether 4E could be a useful framework — it's an observation that in this template, it doesn't function as one. It's a label, not a logic.

**Finding tag: SUPPORTED** — The 4E framework in this template is a branding device, not a pedagogical constraint. [Source: accelerator-prompt-template.md]

---

## 6. What the Template Actually Does Well

The diagnosis should be fair. The template has genuine strengths:

- **Stop-gate architecture** — The sequential STOP checkpoints prevent over-generation and create natural human review moments. This is sound prompt engineering.
- **Audience-before-content sequencing** — Placing audience analysis before curriculum design reflects correct design thinking.
- **Scope definition** — The explicit out-of-scope statement reduces scope creep.
- **Action-verb outcomes** — Step 6's instruction to use action verbs and ensure measurability is sound, even if underspecified.
- **Structured XML inputs** — The XML-tagged context variables are good prompt engineering practice for maintaining consistency across a long workflow.
- **Iterative refinement** — Multiple steps end with "present for review," creating collaborative loops.

These are worth preserving in whatever replaces the template.

---

## Root Cause Summary

The template produces marketing-heavy output because:

1. **The role framing optimizes for engagement over rigor** — "facilitator" and "storyteller" are not instructional design identities
2. **The step sequence loads marketing into context before pedagogy** — by Step 6, the AI is already primed
3. **Marketing steps get 3x the instruction density of learning design steps** — the AI receives detailed guidance on hooks and magic gifts, and minimal guidance on scaffolding and assessment
4. **Pedagogical constraints are absent, not just underweighted** — there is no mechanism to enforce objective-assessment alignment, sequencing logic, or transfer design
5. **The 4E framework provides brand identity without design logic** — it signals methodology without constraining output

The fix is not to "add more pedagogy to the existing template." The fix is to rebuild the architecture with learning design as the structural backbone and marketing as an optional output layer that draws from — rather than precedes — the instructional design.

---

## Implications for the Curriculum Builder

The new tool should:

1. **Reframe the AI's role** as an instructional designer, not a facilitator or storyteller
2. **Sequence learning analysis before any positioning work** — outcomes, assessment, sequencing, then (optionally) marketing
3. **Encode pedagogical constraints as hard requirements** — not style suggestions but structural validators
4. **Build alignment verification into the workflow** — every activity must map to an outcome, every outcome must have an assessment
5. **Preserve the stop-gate architecture** — it works; the content between the gates needs to change
6. **Drop the 4E label** — replace it with the researcher's doctrine (Theory→Method→Application) or with established frameworks that provide actual design logic
7. **Make the absence of spaced practice, retrieval practice, scaffolding, and transfer design structurally impossible** — the tool should not be able to produce a curriculum that lacks these elements

---

*Phase 1 complete. Sources: [accelerator-prompt-template.md], [doctrine-how-i-teach-how-i-learn.md]*
