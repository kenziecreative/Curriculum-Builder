# Phase 3: The AI Curriculum Generation Landscape — Confirming the Gap

## Core Finding

No existing AI curriculum tool encodes pedagogical constraints into its generation architecture. Every tool on the market either generates content artifacts (outlines, topic lists, quiz questions) that require expert review to become real curriculum, or assists with mechanics while leaving all design decisions to the human. The gap this engine aims to fill is real and unoccupied.

---

## The Landscape in Brief

**Generators** (Disco, Teachfloor, LearnWorlds, Courseau, MagicSchool, ChatGPT/Claude prompting): Produce content-structuring artifacts — outlines, topic lists, text blocks, quiz questions. None embed sequencing logic, scaffolding, assessment alignment, or transfer design into their generation process. LearnWorlds co-generates marketing landing pages and curriculum content in the same workflow — structurally treating promotional and educational content as equivalent. This is the exact pattern the old template exhibited.

**Design assistants** (FeedbackFruits, Articulate Rise AI, Epiphany AI): Help human designers move faster through mechanics so they can spend more time on structure and narrative. These avoid the generator pattern precisely because they don't try to replace the designer's judgment. Articulate's philosophy: "using it to move faster through mechanics so they can spend more time on structure, narrative, and moments that drive behavior change."

**The unoccupied position:** A tool that encodes pedagogical constraints into generation architecture — so expert-quality structural decisions are built into the output by default, not supplied by the user through prompting.

---

## Three Findings Worth Encoding

**1. Constraints help but don't close the gap.** Specifying Bloom's levels, naming frameworks, and restricting output structure in prompts measurably improves AI output versus unconstrained prompting. But the improvement is bounded — AI pattern-matches to framework vocabulary without necessarily implementing framework logic. This means the engine can't just reference Merrill's or Gagné's in a prompt and expect structurally sound output. The constraints need to be architectural, not advisory.

**2. The "jagged frontier" applies.** Mollick & Dell'Acqua's research shows that for specialized instructional design tasks — needs analysis, goal definition, sequencing decisions — AI assistance actively degrades performance compared to unaided expert work. The engine must be designed to handle these tasks differently than content generation tasks. Sequencing and assessment alignment are where the engine needs the hardest constraints, not the softest suggestions.

**3. Six documented failure modes exist.** Topic coverage bias, empty objectives, assessment as afterthought, marketing register drift, flattening of scaffolding, hallucinated learning sequences. The engine should be designed to make each of these structurally impossible — not by detecting them after the fact, but by requiring the structural elements that prevent them.

---

## What This Means for the Engine

The landscape confirms the thesis but doesn't drive the design. The design comes from Phases 1 and 2 — what good curriculum structurally requires. Phase 3 confirms that nobody else has built it yet.

The competitive position is clear: not "better AI curriculum generation" but "the first tool that treats learning science constraints as architectural requirements rather than prompt suggestions."

---

*Phase 3 complete. Source: [ai-curriculum-generation-landscape.md]*
