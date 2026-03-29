import { NavLink } from 'react-router-dom'
import {
  ClipboardList,
  Target,
  CheckSquare,
  Layers,
  BookOpen,
  Brain,
  ArrowRightLeft,
  Megaphone,
  ShieldCheck,
  LayoutDashboard,
  Package,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { GateDivider } from '@/components/GateDivider'
import { getStagesByGroup } from '@/lib/stage-utils'
import { usePipelineState } from '@/lib/pipeline-context'
import type { StageStatus, GateStatus } from '@/types/pipeline'

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  ClipboardList,
  Target,
  CheckSquare,
  Layers,
  BookOpen,
  Brain,
  ArrowRightLeft,
  Megaphone,
  ShieldCheck,
}

function StatusDot({ status }: { status: StageStatus }) {
  return (
    <span
      className={cn(
        'size-2.5 rounded-full shrink-0 transition-colors mt-1.5',
        status === 'complete' && 'bg-olive',
        status === 'in-progress' && 'bg-amber ring-2 ring-amber/30',
        status === 'pre-populated' && 'bg-walnut-60 ring-2 ring-walnut-60/30',
        status === 'not-started' && 'bg-walnut-20 dark:bg-walnut-80',
      )}
    />
  )
}

function getGateStatus(gateName: string, state: ReturnType<typeof usePipelineState>['state']): GateStatus {
  if (!state) return 'not-reached'
  const gate = state.gates.find(g => g.name === gateName)
  return gate?.status ?? 'not-reached'
}

export function StageSidebar() {
  const { state } = usePipelineState()

  const design = getStagesByGroup('design')
  const build = getStagesByGroup('build')
  const verify = getStagesByGroup('verify')

  function renderGroup(stages: typeof design, label: string) {
    return (
      <div>
        <p className="mb-1.5 text-[10px] uppercase tracking-widest text-sidebar-foreground/50 font-medium">
          {label}
        </p>
        <ul className="space-y-0.5">
          {stages.map(stage => {
            const Icon = iconMap[stage.icon]
            const stageRecord = state?.stages.find(s => s.number === stage.number)
            const status: StageStatus = stageRecord?.status ?? 'not-started'
            return (
              <li key={stage.number}>
                <NavLink
                  to={`/stage/${stage.number}`}
                  className={({ isActive }) =>
                    cn(
                      'flex gap-3 px-3 py-2 rounded-md text-sm transition-colors items-start',
                      'text-sidebar-foreground/80 hover:text-sidebar-foreground hover:bg-sidebar-accent',
                      isActive && 'bg-sidebar-accent text-sidebar-foreground font-medium',
                    )
                  }
                >
                  {Icon && <Icon className="size-4 shrink-0 mt-0.5" />}
                  <div className="flex-1 min-w-0">
                    <span className="block truncate">{stage.name}</span>
                    <span className="block text-[10px] text-sidebar-foreground/40 truncate leading-tight">
                      {stage.description}
                    </span>
                  </div>
                  <StatusDot status={status} />
                </NavLink>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }

  return (
    <aside className="flex flex-col text-sidebar-foreground h-full w-60">
      {/* Header */}
      <div className="px-3 py-4 border-b border-sidebar-border">
        <h1 className="font-display text-base font-bold tracking-tight flex items-center gap-2">
          <BookOpen className="size-5 shrink-0" />
          Curriculum Pipeline
        </h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-3 px-3 space-y-1">
        {/* Dashboard link */}
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            cn(
              'flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors mb-2',
              'text-sidebar-foreground/80 hover:text-sidebar-foreground hover:bg-sidebar-accent',
              isActive && 'bg-sidebar-accent text-sidebar-foreground font-medium',
            )
          }
        >
          <LayoutDashboard className="size-4 shrink-0" />
          <span>Dashboard</span>
        </NavLink>

        {renderGroup(design, 'Design')}
        <GateDivider name="Post-Intake" status={getGateStatus('Post-Intake', state)} />
        {renderGroup(build, 'Build')}
        <GateDivider name="Post-Assessment" status={getGateStatus('Post-Assessment', state)} />
        {renderGroup(verify, 'Verify')}
        <GateDivider name="Final Validation" status={getGateStatus('Final Validation', state)} />
      </nav>

      {/* Deliverables link */}
      <div className="border-t border-sidebar-border px-3 py-3">
        <NavLink
          to="/output"
          className={({ isActive }) =>
            cn(
              'flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors',
              'text-sidebar-foreground/80 hover:text-sidebar-foreground hover:bg-sidebar-accent',
              isActive && 'bg-sidebar-accent text-sidebar-foreground font-medium',
            )
          }
        >
          <Package className="size-4 shrink-0" />
          <span>Deliverables</span>
        </NavLink>
      </div>
    </aside>
  )
}
