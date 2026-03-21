import type { KnzPipelineState } from '@/types/pipeline'
import { StageRow } from './StageRow'
import { GateRow } from './GateRow'

interface PipelineStepperProps {
  state: KnzPipelineState
  fileCounts: Record<number, number>  // stageNumber -> file count
  selectedStage: number | null
  onSelectStage: (stageNumber: number) => void
}

export function PipelineStepper({ state, fileCounts, selectedStage, onSelectStage }: PipelineStepperProps) {
  return (
    <div className="space-y-0.5">
      {state.stages.map((stage, idx) => {
        const gate = state.gates.find(g => g.afterStage === stage.number)
        const isLast = idx === state.stages.length - 1
        return (
          <div key={stage.number}>
            <div className="relative">
              {/* Vertical connector line between stages */}
              {!isLast && (
                <div className="absolute left-[1.375rem] top-full w-px h-1.5 bg-gray-200 z-0" />
              )}
              <StageRow
                stage={stage}
                fileCount={fileCounts[stage.number] ?? 0}
                isCurrentStage={stage.number === state.currentStage}
                nextAction={stage.number === state.currentStage ? state.nextAction : null}
                onSelect={onSelectStage}
                isSelected={selectedStage === stage.number}
              />
            </div>
            {gate && <GateRow gate={gate} />}
          </div>
        )
      })}
    </div>
  )
}
