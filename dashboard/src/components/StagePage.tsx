import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getStage } from '@/lib/stage-utils'
import { usePipelineState } from '@/lib/pipeline-context'
import { listStageFiles } from '@/lib/workspace-loader'
import { EmptyState } from '@/components/EmptyState'
import { NextStageButton } from '@/components/NextStageButton'
import { FileContentSection } from '@/components/StageContent'
import { ValidationReport } from '@/components/ValidationReport'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import type { StageStatus } from '@/types/pipeline'

function statusBadge(status: StageStatus) {
  switch (status) {
    case 'complete':
      return <Badge variant="success">Complete</Badge>
    case 'in-progress':
      return <Badge variant="warning">In Progress</Badge>
    case 'pre-populated':
      return <Badge variant="info">Pre-populated</Badge>
    case 'not-started':
      return <Badge variant="outline">Not Started</Badge>
  }
}

export function StagePage() {
  const { number } = useParams()
  const stageNumber = Number(number)
  const { state } = usePipelineState()
  const [files, setFiles] = useState<string[]>([])

  const config = getStage(stageNumber)
  const stageRecord = state?.stages.find(s => s.number === stageNumber)
  const status: StageStatus = stageRecord?.status ?? 'not-started'

  useEffect(() => {
    if (!config) return
    listStageFiles(config.dir).then(setFiles)
  }, [config, state])

  if (!config) {
    return <div className="text-center py-16 text-muted-foreground">Stage not found.</div>
  }

  if (status === 'not-started') {
    return (
      <EmptyState
        command={config.command}
        stageNumber={stageNumber}
        stageName={config.name}
      />
    )
  }

  // Find gate that follows this stage
  const gate = state?.gates.find(g => g.afterStage === stageNumber)

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Stage header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">
            Stage {stageNumber}
          </p>
          <h1 className="font-display text-2xl font-bold tracking-tight">{config.name}</h1>
        </div>
        {statusBadge(status)}
      </div>

      {/* Purpose */}
      <p className="text-sm text-muted-foreground leading-relaxed">{config.purpose}</p>

      <div className="space-y-4">
        {/* Gate status */}
        {gate && (
          <Card>
            <CardContent className="pt-4 pb-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{gate.name} Gate</span>
                <Badge
                  variant={
                    gate.status === 'approved'
                      ? 'success'
                      : gate.status === 'pending'
                        ? 'warning'
                        : 'outline'
                  }
                >
                  {gate.status === 'approved'
                    ? 'Approved'
                    : gate.status === 'pending'
                      ? 'Pending'
                      : 'Not Reached'}
                </Badge>
              </div>
              {gate.approved && (
                <p className="text-xs text-muted-foreground mt-1">Approved {gate.approved}</p>
              )}
            </CardContent>
          </Card>
        )}

        {/* File listing */}
        {files.length > 0 ? (
          files.map(filename => (
            <FileContentSection
              key={filename}
              filename={filename}
              stagePath={config.dir}
            />
          ))
        ) : (
          <div className="text-sm text-muted-foreground/50 italic p-4">
            No files generated yet for this stage.
          </div>
        )}

        {/* Validation report for stage 9 */}
        {stageNumber === 9 && <ValidationReport isVisible={true} />}

        {/* In-progress prompt */}
        {status === 'in-progress' && (
          <Card className="border-dashed border-amber/40">
            <CardContent className="pt-6 text-center py-8">
              <p className="text-sm text-muted-foreground">
                Stage in progress. Continue in Claude Code.
              </p>
              <p className="text-xs text-muted-foreground/60 mt-1">
                Run{' '}
                <code className="px-1 py-0.5 bg-muted rounded font-mono">
                  /curriculum:{config.command}
                </code>{' '}
                to continue.
              </p>
            </CardContent>
          </Card>
        )}

        {/* Next stage button */}
        {status === 'complete' && (
          <div className="flex justify-end pt-4">
            <NextStageButton currentStage={stageNumber} />
          </div>
        )}
      </div>
    </div>
  )
}
