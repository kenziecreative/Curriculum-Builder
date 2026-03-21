// src/lib/workspace-loader.ts
// RUNTIME FETCH ONLY — no import.meta.glob; see CONTEXT.md

import type { ProjectIndex } from '@/types/pipeline'

export async function discoverActiveProject(): Promise<string | null> {
  try {
    const res = await fetch('/workspace-index')
    if (!res.ok) return null
    const projects: ProjectIndex[] = await res.json()
    // Already sorted by stateMtime desc from the server endpoint
    return projects[0]?.name ?? null
  } catch {
    return null
  }
}

export async function listStageFiles(project: string, stage: string): Promise<string[]> {
  try {
    const res = await fetch(`/workspace-files/${project}/${stage}`)
    if (!res.ok) return []
    return await res.json()
  } catch {
    return []
  }
}

// Known stage directories (from Phase 1 workspace scaffold)
export const STAGE_DIRS: { number: number; dir: string; name: string }[] = [
  { number: 1, dir: '00-project-brief', name: 'Program Brief' },
  { number: 2, dir: '01-outcomes', name: 'What Learners Will Be Able To Do' },
  { number: 3, dir: '02-assessments', name: "How We'll Know They Got There" },
  { number: 4, dir: '03-modules', name: 'How the Learning Is Organized' },
  { number: 5, dir: '04-sessions', name: 'What Happens In Each Session' },
  { number: 6, dir: '05-metaskills', name: 'How Skills Transfer to Real Work' },
  { number: 7, dir: '06-transfer', name: 'How Learning Continues After Class' },
  { number: 8, dir: '07-marketing', name: 'How We Talk About This Program' },
  { number: 9, dir: '08-validation', name: 'Final Review' },
]
