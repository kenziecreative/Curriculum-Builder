import type { GateRecord, GateStatus } from '@/types/pipeline'

const gateStyles: Record<GateStatus, string> = {
  'approved': 'text-emerald-700',
  'pending': 'text-amber-700',
  'not-reached': 'text-gray-400',
}
const gateLabels: Record<GateStatus, string> = {
  'approved': 'Approved',
  'pending': 'Pending approval',
  'not-reached': 'Not reached',
}

export function GateRow({ gate }: { gate: GateRecord }) {
  return (
    <div className="ml-8 mt-1 mb-2 flex items-center gap-2 text-xs">
      <span className="text-gray-400">└</span>
      <span className="font-medium text-gray-600">Gate: {gate.name}</span>
      <span className={`font-medium ${gateStyles[gate.status]}`}>
        {gateLabels[gate.status]}
        {gate.approved ? ` ${gate.approved}` : ''}
      </span>
    </div>
  )
}
