# Curriculum Builder

**A guided curriculum development system by [Kenzie Creative](https://www.kenzienotes.com).**

Curriculum Builder walks you through the same design process that professional instructional designers use — from defining what learners need to be able to do, to writing session content, to building the follow-through system that makes the learning stick. The difference is that you're having a conversation, not filling out a form. You talk through your program, your learners, your constraints — and the system builds the curriculum from what's actually true about your context.

The tool handles the structural rigor automatically. Thinking-level distribution, assessment alignment, collaborative learning requirements, transfer design — all enforced behind the scenes so you don't have to know the rules to follow them. What you bring is the domain expertise. What comes out is a complete, pedagogically sound curriculum package ready to deliver.

---

## What It's Built For

The pipeline scales from a single 90-minute workshop to a full semester without any architectural changes. It's been used to design:

- **Accelerator programs** — cohort-based, multi-week, with real-world application built into every session
- **Day-long workshops** — single-day intensives where every hour has to earn its place
- **Multi-week courses** — 4–8 week programs with progressive skill-building and spaced practice
- **Certificate programs** — semester-length with formal assessment and transfer design
- **SME-led training** — subject matter experts who know their domain but need the instructional structure handled for them

If you're designing any program where you want learners to actually be able to do something at the end — not just know something — this is the right tool.

---

## What You Get

**A complete session package** — facilitator guides, participant materials, and slide outlines for every session in your program. Content follows a Theory → Method → Application structure. Pre-work is treated as a structural requirement, not an optional extra.

**Learning objectives that hold up** — program-level goals, module-level outcomes, and session-level objectives with thinking-level distribution enforced automatically. Every objective is paired with an assessment before any content gets written.

**A transfer ecosystem** — the before/during/after system that separates a training event from something that produces lasting behavioral change. Pre-program prework, in-program application tied to real tasks, post-program spaced follow-up, community continuation, and measurement design.

**Enrollment-ready marketing copy** — every claim traces back to a specific learning objective, assessment, or transfer activity. No hollow promises.

**A delivery package** — all facilitator-facing and learner-facing files compiled into a clean `delivery/` folder, with HTML versions of facilitator guides and marketing materials ready to share.

Every deliverable is written in plain language — no instructional design vocabulary, no schema labels, no working notes in the output.

---

## This Is Not a Content Generator

Curriculum Builder does not write slide decks. It does not produce a PowerPoint. It does not generate a course outline you fill in later.

It builds the structural foundation first — what learners need to do, how you'll know they can do it, how the content is sequenced — and then writes complete session content from that foundation. The facilitator guides, participant materials, and slide outlines exist because the design work is done first, not instead of it.

If you want a quick content dump, this isn't the right tool. If you want a curriculum where the sessions, the assessments, and the transfer design actually connect to each other — that's what this builds.

---

## Getting Started

You'll need [Claude Code](https://claude.ai/claude-code) installed first.

**1. Clone the repository**

```bash
git clone https://github.com/kenziecreative/Curriculum-Builder.git
cd Curriculum-Builder
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

## Before You Start

The process works best when you have a few things nearby. You don't need polished answers — just have the raw material accessible so you're not searching mid-session.

- **Who your learners are** — Their role, their experience level, what they struggle with, what they need to be able to do that they can't do now
- **Program constraints** — How long the program runs, how sessions are structured (live, async, hybrid), any delivery requirements
- **Your domain expertise** — The key concepts, the common mistakes learners make, the things that experienced practitioners know that beginners don't
- **Existing materials (if any)** — Facilitator guides, slide decks, participant workbooks, anything that already represents the curriculum. Even rough or outdated stuff is useful

You don't need to prepare a structured outline or write anything up beforehand. The intake conversation draws that out.

---

## Speak Your Answers

The intake conversation works better when you talk rather than type. When you type, you edit yourself. When you speak, you get closer to how you actually think about the subject — and that unfiltered explanation is often closer to what learners need to hear than a polished written version.

Use any dictation tool you have — macOS built-in dictation (Fn key twice), [Wispr Flow](https://wisprflow.ai), [Superwhisper](https://superwhisper.com), or any voice-to-text app. Just talk through your answers.

---

## How It Works

The pipeline runs as a sequence of commands. Each command produces one piece of the curriculum and unlocks the next. You never stare at a blank page — every stage builds on what came before it.

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
/curriculum:approve       Final review gate — assemble delivery package
```

---

## The Pipeline

### Stage 1 — Intake: Tell Claude about your program

```
/curriculum:intake
```

Claude interviews you about your program — who the learners are, what they need to be able to do, how long the program runs, and what the environment looks like. It works conversationally, asking questions in batches rather than firing a long list at you all at once.

At the end, you see a summary of everything captured and get a chance to edit anything before moving on. When you approve it, a `project-brief.md` is written to your workspace — this file drives every subsequent stage.

**If you have existing materials:** At the start of intake, Claude asks whether you're starting fresh or bringing in existing documents. See [Audit mode](#audit-mode) below.

---

### Stage 2 — Outcomes: Generate learning objectives

```
/curriculum:outcomes
```

Claude generates a full set of learning objectives from your project brief — program-level goals, module-level outcomes, and session-level objectives. Thinking-level distribution is checked automatically (making sure you're not only covering recall when you need application). A review gate runs here — you see the full set before anything is saved.

---

### Stage 3 — Assessments: Design how you'll measure learning

```
/curriculum:assessments
```

Every learning objective gets paired with an assessment. Claude makes sure assessments are aligned to the complexity level of each objective and that every module has formative checks built in — not just a final test at the end. A second review gate runs after this stage.

---

### Stage 4 — Modules: Structure your content

```
/curriculum:modules
```

Claude organizes your objectives and assessments into a sequenced module structure. Every module gets a learning arc, and the sequence is validated before you move to session writing. Collaborative activities are required in every module — built into the structure, not optional.

---

### Stage 5 — Sessions: Write full session content

```
/curriculum:sessions
```

This is the heavy-lift stage. Claude dispatches a separate worker for each module in parallel, writing complete session content for every session in the program. Depending on program size this can take a few minutes — Claude shows you progress as each module finishes.

Each session includes: facilitator guide, participant materials, and a slide outline written as production direction — what goes on the slide, why it matters, and what the facilitator should do — not a content inventory.

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

### Stage 9 — Validate and deliver

```
/curriculum:validate
/curriculum:approve
```

A validation agent runs three tiers of checks on the full curriculum package: structural completeness, content quality scoring, and items that need a human eye. Results come back in plain language. The final review gate runs here — when you approve, the delivery package is assembled automatically.

---

## Audit Mode

If you already have curriculum materials — a facilitator guide, slide deck outline, participant workbook, or any combination — you don't have to start from scratch.

When you run `/curriculum:intake`, choose **"I have existing materials to bring in"**. Claude will:

1. Read all your source documents simultaneously
2. Extract every intake field it can find, with a confidence level for each one
3. Show you what it found before asking anything
4. Ask only about genuine gaps — not the full interview
5. Surface any real conflicts between documents as explicit choices you need to make
6. Assign a content-handling mode per stage: leave strong content alone, enrich thin content, generate from scratch where nothing exists

Put your source documents in `workspace/{project-name}/source-material/` before running intake, or pass them as arguments directly:

```
/curriculum:intake facilitator-guide.pdf workshop-slides.md
```

---

## Evaluation Mode

Want to run any curriculum through the quality rubrics without building a full project?

```
/curriculum:evaluate path/to/your-curriculum.md
```

This works on any curriculum document — something you built elsewhere, a vendor program you're evaluating, or materials you inherited. Claude reads the document, runs the full three-tier validation, and writes `evaluation-report.md` to your `source-material/` folder. No pipeline stages required.

---

## Dashboard

The plugin includes a local dashboard for browsing your workspace files as the pipeline runs.

```bash
cd dashboard && npm install && npm run dev
```

Open [http://localhost:3002](http://localhost:3002) in your browser. The dashboard shows pipeline progress and renders generated files inline — it updates as Claude writes new content, no server restart needed.

If your workspace lives somewhere other than the default location:

```bash
WORKSPACE_DIR=/absolute/path/to/your/workspace npm run dev
```

---

## Quick Reference

| Command | What it does | Produces |
|---------|-------------|---------|
| `/curriculum:init` | Create a new project workspace | Folder structure + STATE.md |
| `/curriculum:intake` | Interview + existing materials intake | `project-brief.md`, gap report (audit mode) |
| `/curriculum:outcomes` | Generate learning objectives | `learning-objectives.md` + supporting files |
| `/curriculum:assessments` | Design assessments for every objective | `assessment-map.md` + supporting files |
| `/curriculum:modules` | Structure content into modules | Module specs in `03-modules/` |
| `/curriculum:sessions` | Write full session content | Session files in `04-sessions/` |
| `/curriculum:metaskills` | Map thinking skills to real work | `metaskills-map.md` |
| `/curriculum:transfer` | Design before/during/after system | `transfer-plan.md` |
| `/curriculum:marketing` | Write enrollment copy | `marketing-copy.md` |
| `/curriculum:validate` | Quality check the full package | Validation report |
| `/curriculum:approve` | Final review gate + assemble delivery | `delivery/` folder |
| `/curriculum:evaluate` | Evaluate any curriculum document | `evaluation-report.md` |
| `/curriculum:resume` | Pick up where you left off | Status summary |
| `/curriculum:assemble` | Compile delivery package manually | `delivery/` folder |
| `/curriculum:verify` | Pre-delivery completeness check | Verification report |
