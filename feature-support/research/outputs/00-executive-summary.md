# Executive Summary: KNZ Curriculum Builder Research

## The Core Question

Can a Claude Code-native curriculum builder tool — one that encodes pedagogical doctrine as structural constraints rather than style suggestions — produce curricula that are genuinely sound from a learning science perspective? Or is the gap between the existing accelerator template's marketing-heavy output and pedagogically grounded curriculum an inherent limitation of AI-assisted generation?

## The Answer

The gap is solvable. It is a structural flaw in how the existing tool was designed, not an inherent limitation of AI curriculum generation. The evidence across 22 sources and 11 research phases converges on a single finding: **the variable that determines whether AI produces pedagogically sound curriculum is constraint architecture, not model capability.** The same AI model that generates marketing-heavy, assessment-free, transfer-absent output when given the existing template produces structurally complete curriculum when generation is decomposed into sequential stages with schema-enforced required fields and rubric-based validation.

This is not a theoretical claim. The ARCHED framework demonstrated that AI-generated learning objectives match human expert quality (weighted Cohen's Kappa = 0.834) when constrained by Bloom's taxonomy as a generation parameter and validated against an enumerable rubric. Without those constraints, quality degrades in documented, predictable ways. The 2024 Hardman survey found that 84% of instructional designers adopted AI tools with zero measurable impact on their work — but practitioners using research-informed AI workflows reported 60-80% efficiency gains while maintaining or improving quality. The differentiator is the constraint layer, not the AI.

## What the Existing Template Gets Wrong

The existing accelerator template is structurally engineered to produce marketing-heavy output. This is measurable, not impressionistic. Sixty to sixty-five percent of its instructions address marketing, positioning, and audience persuasion. Learning design receives approximately 20-25%. Five root causes produce this imbalance: the role framing primes for engagement over rigor ("facilitator" and "storyteller," not "instructional designer"), the step sequence loads marketing into context before pedagogy, marketing steps receive three times the instruction density of learning design steps, pedagogical constraints are absent rather than underweighted, and the 4E framework provides brand identity without design logic. The template systematically omits formative assessment, scaffolding, transfer design, objective-assessment alignment, and spaced retrieval practice.

## What Learning Science Requires

The doctrine's four frameworks — Theory→Method→Application (TMA), Deconstruct→Compare→Rebuild (DCR), Six Metaskills, and Flipped Classroom — each have genuine grounding in learning science. TMA maps to Gradual Release of Responsibility, Cognitive Apprenticeship, and Merrill's First Principles. DCR's analogical encoding mechanism is supported by a medium effect size (d = 0.50, Alfieri et al.). The Flipped Classroom's active learning advantage is backed by 225 studies showing 0.47 SD improvement (Freeman et al., 2014). The Six Metaskills are individually defensible as teachable capacities, with Exploring (d = 0.69) and Creating (70-study meta-analysis) having the strongest evidence.

But the doctrine has three blind spots the tool must correct. First, TMA is a content arc, not a complete session framework — it lacks prior knowledge activation, formative assessment checkpoints, structured reflection, and explicit transfer design. Second, the Six Metaskills' "full range" claim is contradicted by every comparable framework, all of which include a social/interpersonal dimension the doctrine omits. Third, and most consequentially, the doctrine operates as an individual-learner cognitive model in a field where cooperative learning outperforms individual learning by d = 0.54-0.78. The social learning dimension is not optional — it is the primary mechanism.

## The Market Gap Is Real

No existing tool across three market categories — AI content generators (Disco, Coursiv), traditional authoring canvases (Articulate, Captivate), or AI-enhanced workflows (Mindsmith, 360Learning) — encodes pedagogical constraints as structural generation requirements. The curriculum builder would create and occupy a fourth category: AI-constrained pedagogical design systems. The quality gap is documented and systematic: 78% of AI-generated lesson plans require significant adjustments (Hu et al.), 40% contain fabricated references, and assessment diversity decreases 32% with AI reliance. The Claude Code plugin ecosystem supports this architecture — 347+ plugins and 1,900+ skills, zero for educational design — and reference implementations (GSD framework, Deep Trilogy) prove the multi-stage pipeline pattern works.

## The Architecture

The tool is a Claude Code plugin implementing a nine-stage generation pipeline: structured intake → outcome design → assessment design → module structure → session content → metaskill mapping → transfer ecosystem → marketing derivation → validation. Learning science constraints are encoded as schema-enforced required fields at every stage — not instructions the AI can interpret loosely, but structural requirements the output must satisfy. Three-tier validation (automated schema checks, rubric-based scoring with expert review, human-driven transfer evaluation) enforces quality at the boundary the research identifies: structural completeness is automatable at 94% accuracy; scaffolding quality and pedagogical appropriateness require human judgment.

## The Top Five Design Recommendations

1. **Schema over instruction.** Encode every pedagogical requirement as a required output field, not a generation instruction. The constraint hierarchy — schema > template > checklist > inline directive > framework naming > role framing — is the single most important architectural finding. The existing template operated at levels 5-6; the new tool must operate at levels 1-3.

2. **Backward design as generation sequence.** The order in which the pipeline generates content IS the alignment mechanism. Outcomes before assessments, assessments before content, content before marketing. This sequence prevents the marketing priming that contaminated the original template and implements backward design (Wiggins & McTighe) as an architectural constraint.

3. **Enforce what gets skipped.** Reflection, formative assessment, transfer design, and social learning are the elements that practitioners and AI generators most commonly omit. These must be the most rigorously schema-enforced fields, not the least. The 5E meta-analysis finding is instructive: g = 0.82 for the full cycle, g = 0.42 for the truncated version. The phases that get skipped are the phases that matter most.

4. **Build the transfer ecosystem.** Training design is one of three necessary conditions for durable learning transfer. Less than 10% of training produces behavioral change (Baldwin & Ford). The tool must generate pre-program readiness structures, in-program application tasks with implementation intentions (d = 0.65), and post-program spaced retrieval at 1/4/12 weeks. A curriculum builder that generates only content addresses one condition while ignoring the other two.

5. **Start with the MVP.** Five stages — structured intake, outcome design, assessment design, module generation, and validation — address the existing template's documented root causes using proven constraint mechanisms. If the MVP produces curriculum with complete objective-assessment alignment, Bloom's distribution across four or more levels, transfer design in every module, and a marketing-to-pedagogy ratio under 25%, the thesis is confirmed and the remaining stages are extensions of a proven architecture.

## What Remains Unresolved

Three questions cannot be answered by desk research. First, whether the integrated nine-stage pipeline produces curriculum that is better in practice, not just better in structure — this requires the pairwise blind evaluation protocol with instructional design practitioners. Second, whether Imagining is teachable as a metaskill — the evidence gap from Phase 2 remains unresolved after 11 phases. Third, whether the tool's constraint architecture produces genuine pedagogical quality or merely structural completeness — the distinction between a well-built skeleton and a curriculum that produces learning can only be tested with learners.

The research supports building the tool. The architecture is grounded. The gap is real. What remains is execution.

---

*Synthesis of 22 sources across 11 research phases. All finding tags and evidence citations traceable to individual phase outputs.*
