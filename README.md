# Curriculum Builder

A Claude Code plugin that guides you through building delivery-ready curriculum, step by step. It asks the right questions, enforces design quality automatically, and keeps you from skipping the parts that actually make training work.

Built for program designers and subject matter experts who want to move fast without sacrificing rigor.

---

## How it works

The plugin runs as a pipeline of commands. Each command produces one piece of the curriculum and unlocks the next. You never stare at a blank page — every stage builds on what came before it.

```
/curriculum:init          Set up a new project
/curriculum:intake        Tell Claude about your program and learners
/curriculum:outcomes      Generate learning objectives
/curriculum:assessments   Design how you'll measure learning
/curriculum:modules       Structure your content into modules
/curriculum:sessions      Write full session content for every module
/curriculum:metaskills    Map thinking skills to real-work application
/curriculum:transfer      Design the before/during/after ecosystem
/curriculum:marketing     Generate enrollment-ready program copy
/curriculum:validate      Run a quality check on the full package
```

You can also bring in existing curriculum materials instead of starting from scratch — the tool reads what you have, surfaces gaps, and picks up from there. Or run any external curriculum through the evaluation rubrics without touching the pipeline at all.

---

## Installation

You need [Claude Code](https://claude.ai/claude-code) installed first.

**1. Clone the repository**

```bash
git clone https://github.com/kenziecreative/knz-curriculum-builder.git
cd knz-curriculum-builder
```

**2. Remove the origin remote**

```bash
git remote remove origin
```

This is a required step, not optional. You'll be working inside the repo — your workspace files, project briefs, and generated curriculum all live here. Removing the origin remote prevents you from accidentally pushing those to the source repository.

**3. Open Claude Code in the cloned directory**

```bash
claude .
```

**4. Run `/curriculum:init`**

```
/curriculum:init
```

That's it. No install scripts, no additional setup. Claude creates your workspace inside the repo and immediately begins the intake conversation.

**To update to a newer version**, pull the latest changes: `git pull`.

---

## Dashboard

The plugin includes a local dashboard for browsing your workspace files.

```bash
cd dashboard && npm install && npm run dev
```

Open [http://localhost:3002](http://localhost:3002) in your browser.

If your workspace lives somewhere other than the default location, point the dashboard there with an env var:

```bash
WORKSPACE_DIR=/absolute/path/to/your/workspace npm run dev
```

---

## Starting a project

Open Claude Code in the cloned repo directory and run:

```
/curriculum:init
```

Claude will ask what to call the project, create a workspace folder inside the repo, and immediately roll into the intake conversation.

If you already have a project in progress, run `/curriculum:resume` to pick up where you left off. Claude reads your project state at the start of every session and surfaces where you are automatically.

---

## The pipeline

### Stage 1 — Intake: Tell Claude about your program

```
/curriculum:intake
```

Claude interviews you about your program — who the learners are, what they need to be able to do, how long the program runs, and what the environment looks like. It works conversationally, asking questions in batches rather than firing a long list at you all at once.

At the end, you see a summary of everything captured and get a chance to edit anything before moving on. When you approve it, a `project-brief.md` is written to your workspace — this file drives every subsequent stage.

**If you have existing materials:** At the start of intake, Claude asks whether you're starting fresh or bringing in existing documents. Choose "I have existing materials to bring in" and it will read your files, extract what it can, and only ask about genuine gaps — not the whole interview. See [Audit mode](#audit-mode) below.

---

### Stage 2 — Outcomes: Generate learning objectives

```
/curriculum:outcomes
```

Claude generates a full set of learning objectives from your project brief — program-level goals, module-level outcomes, and session-level objectives. It checks the thinking-level distribution automatically (making sure you're not just covering recall when you need application) and shows you the results before saving anything.

A review gate runs here. When you're satisfied, approve to continue.

---

### Stage 3 — Assessments: Design how you'll measure learning

```
/curriculum:assessments
```

Every learning objective gets paired with an assessment. Claude makes sure assessments are aligned to the complexity level of each objective and that every module has formative checks built in — not just a final test at the end.

A second review gate runs after this stage. Approve to unlock module design.

---

### Stage 4 — Modules: Structure your content

```
/curriculum:modules
```

Claude organizes your objectives and assessments into a sequenced module structure. Every module gets a learning arc, and the sequence is validated before you move to session writing. Collaborative activities are required in every module — they're built into the structure, not optional.

---

### Stage 5 — Sessions: Write full session content

```
/curriculum:sessions
```

This is the heavy-lift stage. Claude dispatches a separate worker for each module in parallel, writing complete session content for every session in the program. Depending on program size this can take a few minutes — Claude shows you progress as each module finishes.

Session content follows a Theory → Method → Application structure. Pre-work is treated as a structural requirement, not an optional extra.

---

### Stage 6 — Metaskills: Map thinking skills to real work

```
/curriculum:metaskills
```

Claude maps the core thinking skills running through your program to specific named activities and real-work connection prompts. The goal is for learners to walk away knowing exactly how to use these skills in their actual jobs — not just inside the training.

---

### Stage 7 — Transfer: Design the before/during/after system

```
/curriculum:transfer
```

Claude designs the full follow-through system: pre-program prework to arrive ready, in-program application tied to real tasks, post-program spaced follow-up activities, community continuation options, and measurement design. This stage is what separates a training event from something that produces lasting behavioral change.

---

### Stage 8 — Marketing: Write enrollment copy

```
/curriculum:marketing
```

Claude generates program marketing copy where every claim traces back to a specific learning objective, assessment, or transfer activity. No hollow promises — everything it writes, the curriculum actually delivers.

---

### Stage 9 — Validate: Run a quality check

```
/curriculum:validate
```

A validation agent runs three tiers of checks on the full curriculum package: structural completeness, content quality scoring, and items that need a human eye. Results come back in plain language — no jargon, no check IDs. You'll see what's strong, what needs work, and specific recommendations for each issue.

The final review gate runs here. Approve to mark the project complete.

---

## Audit mode

If you already have curriculum materials — a facilitator guide, slide deck outline, participant workbook, or any combination — you don't have to start from scratch.

When you run `/curriculum:intake`, choose **"I have existing materials to bring in"**. Claude will:

1. Read all your source documents simultaneously
2. Extract every intake field it can find, with a confidence level for each one
3. Show you what it found before asking anything
4. Ask only about genuine gaps — not the full interview
5. Surface any real conflicts between documents (e.g., the guide says hands-on but the slide count implies lecture-heavy) as explicit choices you need to make
6. Produce your `project-brief.md` plus a gap report showing what exists, what's thin, and what's missing relative to the full pipeline

Put your source documents in `workspace/{project-name}/source-material/` before running intake, or pass them as arguments directly:

```
/curriculum:intake facilitator-guide.pdf workshop-slides.md
```

After intake, your stage files are pre-populated from your existing content. Downstream commands will check your material against schema requirements and surface what needs attention — they don't throw out what you have and regenerate from scratch.

---

## Evaluation mode

Want to run any curriculum through the quality rubrics without building a full project?

```
/curriculum:evaluate path/to/your-curriculum.md
```

This works on any curriculum document — something you built elsewhere, a vendor program you're evaluating, or materials you inherited. You don't need to have run any pipeline stages first.

Claude reads the document, runs the full three-tier validation, and writes `evaluation-report.md` to your `source-material/` folder. The report tells you:

- What the curriculum does well (specific observations, not generic praise)
- Every issue found, in plain language with specific recommendations for fixing it
- Quality scores for key design dimensions
- Items that require a human judgment call

You can pass multiple documents at once:

```
/curriculum:evaluate facilitator-guide.md participant-workbook.md
```

---

## Other commands

**`/curriculum:approve`** — Use this when a review gate is waiting. If you've stepped away and come back, this shows you where you are and walks you through the approval.

**`/curriculum:resume`** — Shows your current position in the pipeline and the next step. Useful if Claude doesn't surface your context automatically or if you switch between projects.

---

## Quick reference

| Command | What it does | Produces |
|---------|-------------|---------|
| `/curriculum:init` | Create a new project workspace | Folder structure + STATE.md |
| `/curriculum:intake` | Interview + existing materials intake | `project-brief.md`, `curriculum-gap-report.md` (audit mode) |
| `/curriculum:outcomes` | Generate learning objectives | `learning-objectives.md` + supporting files |
| `/curriculum:assessments` | Design assessments for every objective | `assessment-map.md` + supporting files |
| `/curriculum:modules` | Structure content into modules | Module specs in `03-modules/` |
| `/curriculum:sessions` | Write full session content | Session files in `04-sessions/` |
| `/curriculum:metaskills` | Map thinking skills to real work | `metaskills-map.md` |
| `/curriculum:transfer` | Design before/during/after system | `transfer-plan.md` |
| `/curriculum:marketing` | Write enrollment copy | `marketing-copy.md` |
| `/curriculum:validate` | Quality check the full package | Validation report |
| `/curriculum:evaluate` | Evaluate any curriculum document | `evaluation-report.md` |
| `/curriculum:approve` | Handle a review gate | Advances pipeline |
| `/curriculum:resume` | Pick up where you left off | Status summary |
