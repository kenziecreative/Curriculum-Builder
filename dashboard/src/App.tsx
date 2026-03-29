import { useState, useEffect } from 'react'
import { useWorkspacePoll } from '@/lib/use-workspace-poll'
import { listStageFiles, STAGE_DIRS } from '@/lib/workspace-loader'
import { PipelineStepper } from '@/components/PipelineStepper'
import { DeliverableSection } from '@/components/DeliverableSection'
import { ValidationReport } from '@/components/ValidationReport'

export default function App() {
  const [selectedStage, setSelectedStage] = useState<number | null>(null)
  const [fileCounts, setFileCounts] = useState<Record<number, number>>({})

  // Poll STATE.md every 3 seconds
  const { state, loading } = useWorkspacePoll()

  // Fetch file counts for all stage directories
  useEffect(() => {
    Promise.all(
      STAGE_DIRS.map(async s => {
        const files = await listStageFiles(s.dir)
        return { number: s.number, count: files.length }
      })
    ).then(results => {
      const counts: Record<number, number> = {}
      for (const { number, count } of results) counts[number] = count
      setFileCounts(counts)
    })
  }, [state])

  // Scroll to highlighted stage section when stepper row is clicked
  const handleSelectStage = (stageNumber: number) => {
    setSelectedStage(stageNumber)
    const el = document.getElementById(`stage-${stageNumber}`)
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold text-gray-900">Curriculum Dashboard</h1>
          </div>
          {state && !loading && (
            <span className="text-xs text-gray-400">
              Auto-refreshing every 3s
            </span>
          )}
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-5xl mx-auto px-6 py-6">
        {loading && (
          <div className="text-sm text-gray-400 p-4">Loading workspace...</div>
        )}

        {!loading && state && (
          <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-6 items-start">
            {/* Left column: Pipeline stepper */}
            <aside className="bg-white rounded-xl border border-gray-200 p-4 sticky top-6">
              <h2 className="text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wide">
                Pipeline Status
              </h2>
              <PipelineStepper
                state={state}
                fileCounts={fileCounts}
                selectedStage={selectedStage}
                onSelectStage={handleSelectStage}
              />
            </aside>

            {/* Right column: Deliverable files */}
            <section>
              <h2 className="text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wide">
                Generated Deliverables
              </h2>
              <DeliverableSection
                highlightedStage={selectedStage}
              />
              <ValidationReport
                isVisible={selectedStage === 9}
              />
            </section>
          </div>
        )}

        {!loading && !state && (
          <div className="flex flex-col items-center justify-center min-h-64 text-center p-8">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">Waiting for intake</h2>
            <p className="text-gray-500 text-sm max-w-sm">
              Run <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs font-mono">/curriculum:init</code> in Claude Code to get started. The dashboard will update automatically once intake begins.
            </p>
          </div>
        )}
      </main>
    </div>
  )
}
