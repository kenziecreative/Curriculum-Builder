# Backlog: Curriculum Builder

Items captured here are candidates for the next milestone. They are not yet scoped, sized, or sequenced — that happens in `/gsd:new-milestone`.

---

## UX / Language

### Plain language throughout all user-facing output
**Source:** First real-world test (preconference workshop, 2026-03-24)
**Description:** All command output must be readable by a subject matter expert with no instructional design vocabulary. The rigor is built into the structure — it should never surface in the language shown to users.

Specific terms that must be replaced everywhere they appear in user-facing output:

| Insider term | Plain language replacement |
|---|---|
| "enforce schema" | describe what it actually does ("review and fill in the required sections") |
| "verb violations" | "Objectives X, Y use vague action words — rewrite with something observable or measurable" |
| "paired_objective linkage" | "each assessment needs to be connected to a specific learning objective" |
| "transfer context not paired per objective" | "each objective needs a real-world scenario showing where learners would use this skill" |
| "DCR trigger not addressed" | describe what's actually missing in plain terms |
| "pre-work exists but not formally tagged" | "pre-session materials found but not connected to the session structure" |
| "session-level objectives absent" | "missing learning objectives for individual sessions" |
| "schema" | never use — describe the actual requirement instead |
| "linkage" | never use — say what needs to be connected to what |

**Scope:** Affects every command that produces user-facing output — intake confirmation, gap report table, outcomes, assessments, modules, sessions, validation report, approve summary.

---

## Infrastructure

### Release sync script
**Source:** Post-v2.0 repo split (2026-03-24)
**Description:** Add `scripts/release.sh` to automate syncing scrubbed plugin files from `Curriculum-Builder` (dev) to `curriculum-plugin` (public release). Currently manual.

---

*Last updated: 2026-03-24 — initial backlog from first real-world test*
