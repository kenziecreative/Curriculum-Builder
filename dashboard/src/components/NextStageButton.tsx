import { NavLink } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { getStage } from '@/lib/stage-utils'

interface NextStageButtonProps {
  currentStage: number
}

export function NextStageButton({ currentStage }: NextStageButtonProps) {
  const next = getStage(currentStage + 1)

  if (next) {
    return (
      <NavLink to={`/stage/${next.number}`}>
        <Button variant="accent">
          Stage {next.number}: {next.name}
          <ArrowRight className="size-4 ml-1" />
        </Button>
      </NavLink>
    )
  }

  // After stage 9, link to deliverables
  return (
    <NavLink to="/output">
      <Button variant="accent">
        View Deliverables
        <ArrowRight className="size-4 ml-1" />
      </Button>
    </NavLink>
  )
}
