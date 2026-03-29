// src/lib/stage-utils.ts
// Stage configuration, grouping, and utilities for the curriculum pipeline

import type { StageConfig, StageGroup } from '@/types/pipeline'

export const stages: StageConfig[] = [
  {
    number: 1,
    name: 'Program Brief',
    shortName: 'Brief',
    dir: '01-project-brief',
    description: 'Define scope, audience, and constraints',
    purpose:
      'The program brief captures everything the pipeline needs to generate aligned curriculum — who the learners are, what they can already do, how long the program runs, and what success looks like. Every downstream stage reads from this brief.',
    icon: 'ClipboardList',
    group: 'design',
    command: 'intake',
  },
  {
    number: 2,
    name: 'Learning Outcomes',
    shortName: 'Outcomes',
    dir: '02-outcomes',
    description: 'What learners will be able to do',
    purpose:
      'Outcomes define the observable behaviors learners will demonstrate after the program. They drive everything that follows — assessments prove the outcomes were met, modules organize around them, sessions build toward them.',
    icon: 'Target',
    group: 'design',
    command: 'outcomes',
  },
  {
    number: 3,
    name: 'Assessment Design',
    shortName: 'Assessments',
    dir: '03-assessments',
    description: "How we'll know they got there",
    purpose:
      'Assessments are designed before content — not after. Each assessment maps to a specific outcome. This backward design ensures every minute of instruction earns its place.',
    icon: 'CheckSquare',
    group: 'design',
    command: 'assessments',
  },
  {
    number: 4,
    name: 'Module Structure',
    shortName: 'Modules',
    dir: '04-modules',
    description: 'How the learning is organized',
    purpose:
      'Modules group related outcomes into teachable units with logical sequencing. Each module has a clear scope, prerequisite chain, and time allocation that fits the program format.',
    icon: 'Layers',
    group: 'build',
    command: 'modules',
  },
  {
    number: 5,
    name: 'Session Content',
    shortName: 'Sessions',
    dir: '05-sessions',
    description: 'What happens in each session',
    purpose:
      'Sessions are the delivery unit — each one follows the Theory → Method → Application arc with pre-work, activities, reflection prompts, and formative checks. This is where the curriculum becomes something a facilitator can actually run.',
    icon: 'BookOpen',
    group: 'build',
    command: 'sessions',
  },
  {
    number: 6,
    name: 'Thinking & Transfer Skills',
    shortName: 'Metaskills',
    dir: '06-metaskills',
    description: 'How skills transfer to real work',
    purpose:
      'Metaskills map the six thinking capabilities (Exploring, Creating, Feeling, Imagining, Innovating, Adapting) onto the curriculum content. This is the layer that turns subject knowledge into transferable capability.',
    icon: 'Brain',
    group: 'build',
    command: 'metaskills',
  },
  {
    number: 7,
    name: 'Transfer Ecosystem',
    shortName: 'Transfer',
    dir: '07-transfer',
    description: 'How learning continues after class',
    purpose:
      'The transfer ecosystem designs what happens before, during, and after the program to make learning stick. Pre-program activities prime retrieval. In-program activities apply to real work. Post-program activities embed behavior change.',
    icon: 'ArrowRightLeft',
    group: 'build',
    command: 'transfer',
  },
  {
    number: 8,
    name: 'Marketing',
    shortName: 'Marketing',
    dir: '08-marketing',
    description: 'How we talk about this program',
    purpose:
      'Marketing copy is derived from the curriculum — not written independently. Every claim traces back to an outcome or assessment. This ensures the program delivers what the marketing promises.',
    icon: 'Megaphone',
    group: 'build',
    command: 'marketing',
  },
  {
    number: 9,
    name: 'Validation',
    shortName: 'Validation',
    dir: '09-validation',
    description: 'Final quality review',
    purpose:
      'Validation runs automated schema checks (required fields, enum values, structural completeness), quality rubric scoring (transfer realism, cognitive load, scaffolding), and surfaces items that need human review.',
    icon: 'ShieldCheck',
    group: 'verify',
    command: 'validate',
  },
]

export function getStage(number: number): StageConfig | undefined {
  return stages.find(s => s.number === number)
}

export function getStagesByGroup(group: StageGroup): StageConfig[] {
  return stages.filter(s => s.group === group)
}
