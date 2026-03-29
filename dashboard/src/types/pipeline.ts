// src/types/pipeline.ts
// Data contracts for the KNZ curriculum dashboard
// These types are derived from the STATE.md format established in Phase 1

export type StageStatus = 'not-started' | 'in-progress' | 'pre-populated' | 'complete'
export type GateStatus = 'not-reached' | 'pending' | 'approved'

export interface StageRecord {
  number: number
  name: string
  status: StageStatus
  completed: string | null  // ISO date string or null
}

export interface GateRecord {
  name: string
  afterStage: number
  status: GateStatus
  approved: string | null  // ISO date string or null
}


export type StageGroup = 'design' | 'build' | 'verify'

export interface StageConfig {
  number: number
  name: string
  shortName: string
  dir: string
  description: string
  purpose: string
  icon: string
  group: StageGroup
  command: string
}

export interface KeyDecision {
  label: string
  value: string
}

export interface KnzPipelineState {
  stages: StageRecord[]
  gates: GateRecord[]
  keyDecisions: KeyDecision[]
  nextAction: string | null
  currentStage: number | null  // The in-progress stage number, or highest complete + 1
}
