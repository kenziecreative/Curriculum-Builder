import type { StageRecord } from '@/types/pipeline'
import { StatusBadge } from './StatusBadge'

interface StageRowProps {
  stage: StageRecord
  fileCount: number
  isCurrentStage: boolean
  nextAction: string | null
  onSelect: (stageNumber: number) => void
  isSelected: boolean
}

export function StageRow({ stage, fileCount, isCurrentStage, nextAction, onSelect, isSelected }: StageRowProps) {
  return (
    <div
      className={`flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-colors
        ${isSelected ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-50 border border-transparent'}`}
      onClick={() => onSelect(stage.number)}
    >
      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-200 text-gray-600 text-xs flex items-center justify-center font-medium mt-0.5">
        {stage.number}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-medium text-gray-800 text-sm">{stage.name}</span>
          <StatusBadge status={stage.status} />
          {fileCount > 0 && (
            <span className="text-xs text-gray-400">{fileCount} {fileCount === 1 ? 'file' : 'files'}</span>
          )}
          {stage.completed && (
            <span className="text-xs text-gray-400">{stage.completed}</span>
          )}
        </div>
        {isCurrentStage && nextAction && (
          <p className="text-xs text-amber-700 mt-1 font-medium">→ {nextAction}</p>
        )}
      </div>
    </div>
  )
}
