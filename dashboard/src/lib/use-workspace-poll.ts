// src/lib/use-workspace-poll.ts
// RUNTIME FETCH ONLY — do not use import.meta.glob; see CONTEXT.md
import { useState, useEffect, useCallback } from 'react'
import { loadStateFromUrl } from './state-loader'
import type { KnzPipelineState } from '@/types/pipeline'

export function useWorkspacePoll(projectName: string | null, intervalMs = 3000) {
  const [state, setState] = useState<KnzPipelineState | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const poll = useCallback(async () => {
    if (!projectName) return
    try {
      const result = await loadStateFromUrl(`/workspace/${projectName}/STATE.md`)
      setState(result)
      setError(null)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Load failed')
    } finally {
      setLoading(false)
    }
  }, [projectName])

  useEffect(() => {
    poll()
    const id = setInterval(poll, intervalMs)
    return () => clearInterval(id)  // CRITICAL: cleanup prevents memory leak
  }, [poll, intervalMs])

  return { state, loading, error }
}
