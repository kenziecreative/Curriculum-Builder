# Learnings

What we've discovered while doing this work. Not a log of what happened — a record of what we learned that should change how we work going forward.

## How to Use This File

**Write learnings when they're fresh, not later.** If something didn't work the way we expected, capture it now. If we found a better approach, write it down before the session ends.

After each significant session, ask:
1. What surprised us?
2. What would we do differently next time?
3. What approach worked well and should be repeated?
4. What should future sessions watch out for?

---

## Insights

### Discovery interview revealed scope clarity (2026-03-15)

The user's philosophy — "the tool handles the scaffold, the human handles the soul" — is the clearest articulation of the division of labor. This should guide every design decision: if something is structural/administrative, automate it rigorously. If something is a content/context judgment, surface it for human decision. Don't blur the line.

### Transfer ecosystem is non-negotiable (2026-03-15)

The user's entrainment metaphor (from chemistry — trapping suspended particles in solution and carrying them along) perfectly captures why transfer design can't be deferred. Training without transfer mechanisms is teaching, not training. The distinction between teaching (knowledge transfer in a session) and training (behavioral change over time) should inform how we talk about and validate the tool's output.

### Background integration checks catch real bugs (2026-03-25)

A background agent running a cross-phase integration check while we were archiving the v3.0 milestone caught a critical bug: `generate-html.js` required `marked` from a path where Node couldn't resolve it — HTML generation was silently failing on every assemble call. The fix was one line in `assemble.md`. The lesson: run integration checks before milestone close, not just after. The audit-then-gap-closure pattern (Phase 16) works; wiring checks are a complementary layer.

### User-facing language vs. instructional design vocabulary (2026-03-25)

The naming conventions that make sense inside the tool (transfer ecosystem, metaskills, backward design) don't match how marketers and program managers think about the work. When reviewing the marketing output structure against external marketing docs, the gap was immediate: marketers think in terms of promises, hooks, and before/after transformations — not ecosystems and metaskills. The fix isn't renaming the commands (those are legitimate work products tied to the pipeline), it's ensuring the *output* of those commands uses marketer vocabulary. The Promise + What Changes (From/To pairs) addition to the marketing output is a direct result of this insight. Apply this lens to any future output-facing work: ask "what does the person receiving this call it?"
