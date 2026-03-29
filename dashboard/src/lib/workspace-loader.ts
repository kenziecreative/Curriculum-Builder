// src/lib/workspace-loader.ts
// Flat workspace — one project per clone, no project subdirectories

export async function listStageFiles(stage: string): Promise<string[]> {
  try {
    const res = await fetch(`/workspace-files/${stage}`)
    if (!res.ok) return []
    return await res.json()
  } catch {
    return []
  }
}

// Known stage directories (flat workspace, 01-09 numbering)
export const STAGE_DIRS: { number: number; dir: string; name: string }[] = [
  { number: 1, dir: '01-project-brief', name: 'Program Brief' },
  { number: 2, dir: '02-outcomes', name: 'What Learners Will Be Able To Do' },
  { number: 3, dir: '03-assessments', name: "How We'll Know They Got There" },
  { number: 4, dir: '04-modules', name: 'How the Learning Is Organized' },
  { number: 5, dir: '05-sessions', name: 'What Happens In Each Session' },
  { number: 6, dir: '06-metaskills', name: 'How Skills Transfer to Real Work' },
  { number: 7, dir: '07-transfer', name: 'How Learning Continues After Class' },
  { number: 8, dir: '08-marketing', name: 'How We Talk About This Program' },
  { number: 9, dir: '09-validation', name: 'Final Review' },
]
