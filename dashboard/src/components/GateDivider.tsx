import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { GateStatus } from '@/types/pipeline'

interface GateDividerProps {
  name: string
  status: GateStatus
}

export function GateDivider({ name, status }: GateDividerProps) {
  return (
    <div className="flex items-center gap-2 py-2 px-3">
      <div
        className={cn(
          'h-px flex-1 transition-colors',
          status === 'approved' ? 'bg-olive/40' : 'border-t border-dashed border-walnut-20',
        )}
      />
      <div
        className={cn(
          'flex items-center justify-center size-5 rounded-full text-[9px] font-bold shrink-0 transition-colors',
          status === 'approved' && 'bg-olive text-white',
          status === 'pending' && 'bg-amber text-white',
          status === 'not-reached' && 'border border-dashed border-walnut-20 text-sidebar-foreground/40',
        )}
      >
        {status === 'approved' ? <Check className="size-3" /> : ''}
      </div>
      <span className="text-[9px] uppercase tracking-widest text-sidebar-foreground/40 whitespace-nowrap">
        {name}
      </span>
      <div
        className={cn(
          'h-px flex-1 transition-colors',
          status === 'approved' ? 'bg-olive/40' : 'border-t border-dashed border-walnut-20',
        )}
      />
    </div>
  )
}
