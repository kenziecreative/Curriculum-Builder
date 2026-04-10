# Source & Evidence Standards

Reference standards for processing sources, citing evidence, and assessing credibility.

## Evidence Rules

- Every factual claim must trace to a file in `research/notes/`.
- Use confidence language: "confirmed by multiple sources" vs. "single source suggests" vs. "inferred from available data."
- When sources contradict each other, present both. Do not silently pick a winner.
- Date-stamp all data points. Information goes stale — flag anything older than 2 years as potentially outdated.

## Citation Format

- Inline: `[Source: <note-filename>]`
- All sources must appear in `research/sources/registry.md`.

## Source Credibility Hierarchy

- Academic research (sociology, psychology, economics, relevant domain) — high credibility
- Government data and official surveys (BLS, Census, Pew Research, Gallup) — high credibility
- Original thought pieces with clear arguments — high for framing, moderate for claims
- Industry reports and trend analysis — moderate to high, depending on methodology
- Journalism and long-form reporting — moderate, check for primary sources
- Community and practitioner knowledge — moderate, valuable for ground truth
- Company websites and marketing — low credibility for claims, useful for feature comparison
- AI-generated summaries without sources — not a source, do not use

## Source Processing Rule

Every URL that informs a finding must be processed as a source first.

The workflow is: search finds it → extract full content → structure it into a research note → reference the note in outputs. No shortcuts. Don't cite search snippets directly in outputs — they're discovery tools, not sources.
