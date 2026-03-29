import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { Eye, FileText } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { listDeliveryFiles } from '@/lib/workspace-loader'

export function OutputPage() {
  const [files, setFiles] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    listDeliveryFiles().then(f => {
      setFiles(f)
      setLoading(false)
    })
  }, [])

  if (loading) {
    return <div className="text-sm text-muted-foreground p-4">Loading deliverables...</div>
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold tracking-tight">Deliverables</h1>
        <p className="text-muted-foreground text-sm mt-1">
          {files.length > 0
            ? `${files.length} file${files.length !== 1 ? 's' : ''} generated`
            : 'No deliverables generated yet. Complete the pipeline to generate output files.'}
        </p>
      </div>

      {files.length > 0 && (
        <div className="space-y-3">
          {files.map(filename => {
            const isHtml = filename.endsWith('.html')
            return (
              <NavLink key={filename} to={`/output/view/${filename}`}>
                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="pt-4 pb-4">
                    <div className="flex items-center gap-3">
                      <FileText className="size-5 text-muted-foreground shrink-0" />
                      <span className="flex-1 text-sm font-medium text-foreground truncate">
                        {filename}
                      </span>
                      <Badge variant={isHtml ? 'info' : 'outline'}>
                        {isHtml ? 'HTML' : 'MD'}
                      </Badge>
                      <Eye className="size-4 text-muted-foreground shrink-0" />
                    </div>
                  </CardContent>
                </Card>
              </NavLink>
            )
          })}
        </div>
      )}
    </div>
  )
}
