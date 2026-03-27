# Curriculum Registry Schema

**File:** `workspace/{project}/curriculum-registry.json`
**Written by:** Every stage on completion (silently)
**Purpose:** Single source of truth for outcome wording, assessment criteria, learner profile, and time allocations across the pipeline. Cross-stage drift is structurally impossible when every downstream stage reads from one authoritative source.

> **Registry wins rule:** If a stage file and the registry contain conflicting data, the registry version is authoritative. Direct edits to stage files do not propagate to the registry automatically — re-running the relevant stage command does.

> **Both workspace modes:** Fresh-build and audit-mode workspaces both get a registry. Audit mode builds it incrementally as each stage finalizes.

---

## JSON Structure

```json
{
  "meta": {
    "project_name": "string — matches workspace/{project} directory name",
    "created": "ISO datetime — set once at intake, never overwritten",
    "schema_version": "1.0"
  },
  "learner_profile": {
    "last_updated": "ISO datetime — updated whenever this section is rewritten",
    "stage_source": 1,
    "data": {
      "target_audience": "string — plain-language description of who attends",
      "expertise_level": "string — novice | intermediate | advanced",
      "self_direction_level": "string — exact Stage 1 enum value",
      "skill_type": "string — open | closed",
      "cultural_orientation": "string — individualist | collectivist | balanced",
      "transfer_context": "string — specific real-work context from intake",
      "contact_hours": "number — total instructional hours",
      "modality": "string — in-person | virtual | blended",
      "success_criteria": "string — observable behavioral outcome statement"
    }
  },
  "outcome_wording": {
    "last_updated": "ISO datetime — updated whenever this section is rewritten",
    "stage_source": 2,
    "program_outcomes": [
      {
        "id": "PO-N — matches outcome_id in learning-objectives.md",
        "statement": "string — full outcome statement",
        "bloom_level": "string — exact enum value from Stage 2 schema"
      }
    ],
    "module_outcomes": [
      {
        "id": "MO-N-N — matches outcome_id in learning-objectives.md",
        "statement": "string — full outcome statement",
        "bloom_level": "string — exact enum value from Stage 2 schema",
        "parent_program_outcome": "PO-N — references a program_outcomes id"
      }
    ],
    "session_outcomes": [
      {
        "id": "SO-N-N-N — matches outcome_id in learning-objectives.md",
        "statement": "string — full outcome statement",
        "bloom_level": "string — exact enum value from Stage 2 schema",
        "parent_module_outcome": "MO-N-N — references a module_outcomes id"
      }
    ]
  },
  "assessment_criteria": {
    "last_updated": "ISO datetime — updated whenever this section is rewritten",
    "stage_source": 3,
    "assessments": [
      {
        "id": "string — FA-N for formative, SA-N for summative",
        "type": "check-in | final — check-in maps to formative, final maps to summative",
        "title": "string — assessment name from Stage 3 output",
        "mapped_outcomes": ["MO-N-N — outcome IDs this assessment covers"],
        "criteria_summary": "string — one sentence describing what success looks like"
      }
    ]
  },
  "time_allocations": {
    "last_updated": "ISO datetime — updated whenever this section is rewritten",
    "stage_source": 4,
    "total_contact_hours": "number — matches contact_hours in learner_profile",
    "modules": [
      {
        "id": "M-N — matches module_id in module specs",
        "name": "string — module name from Stage 4 output",
        "sessions_planned": "number — set at Stage 4",
        "sessions_completed": "number — updated at Stage 5 after file verification",
        "hours_allocated": "number — instructional hours for this module"
      }
    ]
  }
}
```

---

## Section-to-Stage Mapping

| Registry Section | Written by | When written |
|-----------------|------------|--------------|
| `meta` | Stage 1 (intake) | On first registry creation |
| `learner_profile` | Stage 1 (intake) | After project-brief.md is written |
| `outcome_wording` | Stage 2 (outcomes) | After learning-objectives.md is written |
| `assessment_criteria` | Stage 3 (assessments) | After assessment files are written |
| `time_allocations` | Stage 4 (modules) | After module specs are written |
| `time_allocations.modules[].sessions_completed` | Stage 5 (sessions) | After file verification passes |

---

## Per-Section Timestamps

Each section has a `last_updated` ISO datetime field. Downstream stages compare this timestamp against their own `last_updated` to detect stale inputs. If `outcome_wording.last_updated` is more recent than `assessment_criteria.last_updated`, assessments were generated against older outcome wording and may need regeneration.
