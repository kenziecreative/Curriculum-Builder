import { useState, useEffect } from 'react'
import { listStageFiles, STAGE_DIRS } from '@/lib/workspace-loader'
import { FileExpander } from './FileExpander'

interface DeliverableSectionProps {
  projectName: string
  highlightedStage: number | null  // Scroll-to / highlight from stepper click
}

export function DeliverableSection({ projectName, highlightedStage }: DeliverableSectionProps) {
  const [stageFiles, setStageFiles] = useState<Record<string, string[]>>({})

  useEffect(() => {
    if (!projectName) return
    // Fetch file lists for all stage directories in parallel
    Promise.all(
      STAGE_DIRS.map(async s => {
        const files = await listStageFiles(projectName, s.dir)
        return { dir: s.dir, files }
      })
    ).then(results => {
      const map: Record<string, string[]> = {}
      for (const { dir, files } of results) {
        if (files.length > 0) map[dir] = files
      }
      setStageFiles(map)
    })
  }, [projectName])

  const stagesWithFiles = STAGE_DIRS.filter(s => stageFiles[s.dir]?.length > 0)

  if (stagesWithFiles.length === 0) {
    return (
      <div className="text-sm text-gray-400 p-4">
        No output files generated yet. Run pipeline commands to generate deliverables.
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {stagesWithFiles.map(stageDir => (
        <section
          key={stageDir.dir}
          id={`stage-${stageDir.number}`}
          className={`rounded-xl p-4 ${highlightedStage === stageDir.number ? 'ring-2 ring-blue-300 bg-blue-50/50' : 'bg-gray-50'}`}
        >
          <h3 className="text-sm font-semibold text-gray-700 mb-3">
            Stage {stageDir.number}: {stageDir.name}
          </h3>
          <div className="space-y-2">
            {stageFiles[stageDir.dir].map(filename => (
              <FileExpander
                key={filename}
                filename={filename}
                stagePath={`${projectName}/${stageDir.dir}`}
                projectName={projectName}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
