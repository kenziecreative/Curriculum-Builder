import type { StageStatus } from '@/types/pipeline'

const styles: Record<StageStatus, string> = {
  'complete': 'bg-emerald-100 text-emerald-800 border border-emerald-200',
  'in-progress': 'bg-amber-100 text-amber-800 border border-amber-200',
  'not-started': 'bg-gray-100 text-gray-500 border border-gray-200',
}
const labels: Record<StageStatus, string> = {
  'complete': 'Done',
  'in-progress': 'In Progress',
  'not-started': 'Not Started',
}

export function StatusBadge({ status }: { status: StageStatus }) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[status]}`}>
      {labels[status]}
    </span>
  )
}
