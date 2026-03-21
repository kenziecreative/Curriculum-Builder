// src/lib/state-loader.ts
// RUNTIME FETCH ONLY — do not use import.meta.glob; see CONTEXT.md
// KEY DIFFERENCE: KNZ STATE.md uses pipe-delimited tables, NOT checkboxes

import type { StageRecord, GateRecord, KnzPipelineState } from '@/types/pipeline'

function extractSection(md: string, heading: string): string {
  const pattern = new RegExp(`## ${heading}\\s*\\n([\\s\\S]*?)(?=\\n## |$)`)
  return md.match(pattern)?.[1]?.trim() ?? ''
}

export function parseStageProgress(md: string): StageRecord[] {
  const section = extractSection(md, 'Stage Progress')
  // Match pipe-delimited table rows starting with a number (skip header and separator rows)
  const rows = section.split('\n').filter(l => /^\|\s*\d+/.test(l))
  return rows.map(row => {
    const cells = row.split('|').map(c => c.trim()).filter(Boolean)
    return {
      number: parseInt(cells[0], 10),
      name: cells[1],
      status: cells[2] as StageRecord['status'],
      completed: cells[3] === '-' ? null : cells[3],
    }
  })
}

export function parseReviewGates(md: string): GateRecord[] {
  const section = extractSection(md, 'Review Gates')
  // Skip header row (contains 'Gate') and separator rows (contain ---)
  const rows = section.split('\n').filter(l =>
    /^\|[^-]/.test(l) && !/Gate.*After/i.test(l) && !/---/.test(l)
  )
  return rows.map(row => {
    const cells = row.split('|').map(c => c.trim()).filter(Boolean)
    return {
      name: cells[0],
      afterStage: parseInt(cells[1], 10),
      status: cells[2] as GateRecord['status'],
      approved: cells[3] === '-' ? null : cells[3],
    }
  })
}

export function parseNextAction(md: string): string | null {
  const match = md.match(/\*\*Next Action:\*\*\s*(.+)/)
  return match?.[1]?.trim() ?? null
}

export function buildPipelineState(md: string): KnzPipelineState {
  const stages = parseStageProgress(md)
  const gates = parseReviewGates(md)
  const nextAction = parseNextAction(md)

  // currentStage: the in-progress stage, or the first not-started stage after any complete stages
  const inProgress = stages.find(s => s.status === 'in-progress')
  const firstNotStarted = stages.find(s => s.status === 'not-started')
  const currentStage = inProgress?.number ?? firstNotStarted?.number ?? null

  return { stages, gates, nextAction, currentStage }
}

export async function loadStateFromUrl(url: string): Promise<KnzPipelineState> {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Failed to load STATE.md: ${res.status}`)
  const md = await res.text()
  return buildPipelineState(md)
}
