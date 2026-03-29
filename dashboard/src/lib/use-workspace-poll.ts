// src/lib/use-workspace-poll.ts
// Flat workspace — STATE.md lives at workspace/STATE.md
import { useState, useEffect, useCallback } from 'react'
import { loadStateFromUrl } from './state-loader'
import type { KnzPipelineState } from '@/types/pipeline'

export function useWorkspacePoll(intervalMs = 3000) {
  const [state, setState] = useState<KnzPipelineState | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const poll = useCallback(async () => {
    try {
      const result = await loadStateFromUrl('/workspace/STATE.md')
      setState(result)
      setError(null)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Load failed')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    poll()
    const id = setInterval(poll, intervalMs)
    return () => clearInterval(id)
  }, [poll, intervalMs])

  return { state, loading, error }
}
