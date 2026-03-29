import { Terminal } from 'lucide-react'

interface EmptyStateProps {
  command: string
  stageNumber: number
  stageName: string
}

export function EmptyState({ command, stageNumber, stageName }: EmptyStateProps) {
  return (
    <div className="max-w-md mx-auto text-center py-16 space-y-5">
      <div className="mx-auto size-12 rounded-full bg-walnut-10 dark:bg-walnut-80 flex items-center justify-center">
        <Terminal className="size-5 text-walnut dark:text-walnut-20" />
      </div>
      <div>
        <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">
          Stage {stageNumber}
        </p>
        <h2 className="font-display text-xl font-bold tracking-tight">{stageName}</h2>
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed">
        This stage hasn't been started yet. Run the command below in Claude Code to begin.
      </p>
      <div className="inline-block bg-walnut dark:bg-walnut-80 text-cream px-4 py-2 rounded-lg font-mono text-sm">
        /curriculum:{command}
      </div>
    </div>
  )
}
