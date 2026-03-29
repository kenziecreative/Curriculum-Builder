import { Outlet, NavLink, useParams } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { StageSidebar } from '@/components/StageSidebar'
import { ThemeToggle } from '@/components/ThemeToggle'
import { Button } from '@/components/ui/button'
import { getStage } from '@/lib/stage-utils'
import { useWorkspacePoll } from '@/lib/use-workspace-poll'
import { PipelineProvider } from '@/lib/pipeline-context'
import { cn } from '@/lib/utils'

export function AppLayout() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const params = useParams()
  const stageNumber = params.number !== undefined ? Number(params.number) : undefined
  const currentStage =
    stageNumber !== undefined && stageNumber > 0 ? getStage(stageNumber) : undefined

  const { state, loading, error } = useWorkspacePoll()

  const isOutputViewer = location.pathname.startsWith('/output/view/')
  const viewingFile = isOutputViewer ? location.pathname.split('/output/view/')[1] : undefined

  return (
    <PipelineProvider value={{ state, loading, error }}>
      <div className="flex min-h-screen bg-background">
        {/* Desktop sidebar spacer */}
        <div className="hidden md:block w-60 shrink-0" />
        {/* Desktop sidebar — fixed to viewport */}
        <div className="hidden md:flex fixed inset-y-0 left-0 w-60 z-30 bg-sidebar border-r border-sidebar-border">
          <StageSidebar />
        </div>

        {/* Mobile sidebar overlay */}
        {mobileOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            <div className="absolute inset-0 bg-black/40" onClick={() => setMobileOpen(false)} />
            <div className="relative w-60 h-full">
              <StageSidebar />
            </div>
          </div>
        )}

        {/* Main content */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Header */}
          <header className="sticky top-0 z-40 flex items-center gap-3 border-b border-border bg-background/95 backdrop-blur px-4 h-14">
            <Button
              variant="ghost"
              size="icon-sm"
              className="md:hidden"
              onClick={() => setMobileOpen(true)}
            >
              {mobileOpen ? <X className="size-4" /> : <Menu className="size-4" />}
            </Button>

            {/* Breadcrumb */}
            <nav className="flex items-center gap-1.5 text-sm text-muted-foreground flex-1 min-w-0">
              <NavLink to="/" className="hover:text-foreground transition-colors font-medium">
                Curriculum Dashboard
              </NavLink>
              {currentStage && (
                <>
                  <span className="text-muted-foreground/50">/</span>
                  <span
                    className={cn(
                      'truncate',
                      state?.stages.find(s => s.number === currentStage.number)?.status === 'in-progress' &&
                        'text-foreground font-medium',
                    )}
                  >
                    Stage {currentStage.number}: {currentStage.name}
                  </span>
                </>
              )}
              {location.pathname === '/output' && (
                <>
                  <span className="text-muted-foreground/50">/</span>
                  <span className="text-foreground font-medium">Deliverables</span>
                </>
              )}
              {isOutputViewer && (
                <>
                  <span className="text-muted-foreground/50">/</span>
                  <NavLink to="/output" className="hover:text-foreground transition-colors">
                    Deliverables
                  </NavLink>
                  <span className="text-muted-foreground/50">/</span>
                  <span className="truncate text-foreground font-medium">{viewingFile}</span>
                </>
              )}
            </nav>

            <ThemeToggle />
          </header>

          {/* Page content */}
          <main className="flex-1 p-6 animate-fade-in">
            <Outlet />
          </main>

          {/* Footer */}
          <footer className="border-t border-border px-6 py-3 text-xs text-muted-foreground">
            Curriculum Pipeline System
          </footer>
        </div>
      </div>
    </PipelineProvider>
  )
}
