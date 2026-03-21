import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import { join } from 'path'
import { parseStageProgress, parseReviewGates, parseNextAction } from './state-loader'

// Load fixture — same format as workspace/test-program/STATE.md
const fixture = readFileSync(join(__dirname, '../test/fixtures/STATE.md'), 'utf-8')

describe('parseStageProgress', () => {
  it('returns all 9 stages with correct status from fixture', () => {
    const stages = parseStageProgress(fixture)
    expect(stages).toHaveLength(9)
    expect(stages[0]).toEqual({ number: 1, name: 'Intake', status: 'complete', completed: '2026-03-19' })
    expect(stages[3]).toEqual({ number: 4, name: 'Module Structure', status: 'not-started', completed: null })
  })

  it('returns status as not-started | in-progress | complete enum values', () => {
    const stages = parseStageProgress(fixture)
    const validStatuses = ['not-started', 'in-progress', 'complete']
    stages.forEach(s => {
      expect(validStatuses).toContain(s.status)
    })
  })

  it('sets completed to null for - values', () => {
    const stages = parseStageProgress(fixture)
    const notStarted = stages.filter(s => s.status === 'not-started')
    notStarted.forEach(s => {
      expect(s.completed).toBeNull()
    })
  })

  it('sets completed to date string for real dates', () => {
    const stages = parseStageProgress(fixture)
    const complete = stages.filter(s => s.status === 'complete')
    complete.forEach(s => {
      expect(s.completed).toMatch(/^\d{4}-\d{2}-\d{2}$/)
    })
  })
})

describe('parseReviewGates', () => {
  it('returns all 3 gates with correct fields from fixture', () => {
    const gates = parseReviewGates(fixture)
    expect(gates).toHaveLength(3)
    expect(gates[0]).toEqual({ name: 'Post-Intake', afterStage: 1, status: 'approved', approved: '2026-03-19' })
    expect(gates[2]).toEqual({ name: 'Final Validation', afterStage: 9, status: 'not-reached', approved: null })
  })

  it('returns null for - approved field', () => {
    const gates = parseReviewGates(fixture)
    const notReached = gates.filter(g => g.status === 'not-reached')
    notReached.forEach(g => {
      expect(g.approved).toBeNull()
    })
  })
})

describe('parseNextAction', () => {
  it('returns the next action string from Session Continuity section', () => {
    expect(parseNextAction(fixture)).toBe('Run /knz-modules to build module structure')
  })

  it('returns null when Next Action is missing', () => {
    const noAction = fixture.replace(/\*\*Next Action:\*\*.*/, '')
    expect(parseNextAction(noAction)).toBeNull()
  })
})
