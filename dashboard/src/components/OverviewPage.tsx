import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { BookOpen } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { usePipelineState } from '@/lib/pipeline-context'
import { stages } from '@/lib/stage-utils'
import { listStageFiles } from '@/lib/workspace-loader'
import { cn } from '@/lib/utils'
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

export function OverviewPage() {
  const { state, loading } = usePipelineState()
  const [fileCounts, setFileCounts] = useState<Record<number, number>>({})

  useEffect(() => {
    Promise.all(
      stages.map(async s => {
        const files = await listStageFiles(s.dir)
        return { number: s.number, count: files.length }
      }),
    ).then(results => {
      const counts: Record<number, number> = {}
      for (const { number, count } of results) counts[number] = count
      setFileCounts(counts)
    })
  }, [state])

  if (loading) {
    return <div className="text-sm text-muted-foreground p-4">Loading workspace...</div>
  }

  if (!state) {
    return (
      <div className="max-w-2xl mx-auto text-center py-20 space-y-6">
        <BookOpen className="size-12 text-walnut dark:text-walnut-20 mx-auto" />
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight mb-2">
            Curriculum Dashboard
          </h1>
          <p className="text-muted-foreground leading-relaxed">
            No curriculum project in progress. Run{' '}
            <code className="px-1.5 py-0.5 bg-muted rounded text-foreground text-sm font-mono">
              /curriculum:init
            </code>{' '}
            in Claude Code to begin.
          </p>
        </div>
      </div>
    )
  }

  const completedCount = state.stages.filter(s => s.status === 'complete').length
  const progressPct = Math.round((completedCount / state.stages.length) * 100)

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Title */}
      <div>
        <h1 className="font-display text-2xl font-bold tracking-tight">Curriculum Pipeline</h1>
        <p className="text-muted-foreground/60 text-xs mt-1">
          Currently in Stage {state.currentStage ?? 1} of {state.stages.length}
        </p>
      </div>

      {/* Pipeline progress */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Pipeline Progress</span>
            <span className="text-sm text-muted-foreground">
              {completedCount}/{state.stages.length}
            </span>
          </div>
          <div className="h-2 rounded-full bg-muted overflow-hidden">
            <div
              className="h-full rounded-full bg-olive transition-all duration-500"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Stage grid */}
      <div>
        <h2 className="font-display text-lg font-semibold mb-4">Stages</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {stages.map(stage => {
            const stageRecord = state.stages.find(s => s.number === stage.number)
            const status: StageStatus = stageRecord?.status ?? 'not-started'
            const count = fileCounts[stage.number] ?? 0
            return (
              <NavLink key={stage.number} to={`/stage/${stage.number}`}>
                <Card
                  className={cn(
                    'hover:shadow-md transition-shadow cursor-pointer h-full',
                    status === 'in-progress' && 'ring-2 ring-amber/40',
                  )}
                >
                  <CardHeader className="pb-0">
                    <div className="flex items-center justify-between">
                      <CardDescription className="text-xs">Stage {stage.number}</CardDescription>
                      {statusBadge(status)}
                    </div>
                    <CardTitle className="text-base">{stage.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-3">
                    {count > 0 ? (
                      <p className="text-sm text-muted-foreground">
                        {count} file{count !== 1 ? 's' : ''} generated
                      </p>
                    ) : (
                      <p className="text-sm text-muted-foreground/50 italic">
                        {status === 'not-started' ? 'Not started' : 'In progress'}
                      </p>
                    )}
                  </CardContent>
                </Card>
              </NavLink>
            )
          })}
        </div>
      </div>

      {/* Key Decisions */}
      {state.keyDecisions.length > 0 && (
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-3">
              Key Decisions
            </h3>
            <ul className="space-y-2">
              {state.keyDecisions.map((d, i) => (
                <li key={i} className="text-sm text-foreground pl-3 border-l-2 border-walnut/30">
                  <span className="font-medium">{d.label}:</span> {d.value}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Next Action */}
      {state.nextAction && (
        <Card className="border-dashed border-amber/40">
          <CardContent className="pt-6 text-center py-6">
            <p className="text-sm text-muted-foreground">Next step:</p>
            <p className="text-sm text-foreground font-medium mt-1">{state.nextAction}</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
