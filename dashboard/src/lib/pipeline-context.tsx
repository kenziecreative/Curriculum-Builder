// src/lib/pipeline-context.tsx
// React context for pipeline state — polled once in AppLayout, consumed by all pages

import { createContext, useContext } from 'react'
import type { KnzPipelineState } from '@/types/pipeline'

interface PipelineContextValue {
  state: KnzPipelineState | null
  loading: boolean
  error: string | null
}

const PipelineContext = createContext<PipelineContextValue>({
  state: null,
  loading: true,
  error: null,
})

export const PipelineProvider = PipelineContext.Provider

export function usePipelineState() {
  return useContext(PipelineContext)
}
