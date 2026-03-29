import { useState, useEffect } from 'react'
import { useParams, NavLink } from 'react-router-dom'
import { ArrowLeft, ExternalLink } from 'lucide-react'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export function OutputViewer() {
  const params = useParams()
  const filename = params['*'] ?? ''
  const [content, setContent] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  const fileUrl = `/workspace/delivery/${filename}`
  const isHtml = filename.endsWith('.html')

  useEffect(() => {
    setLoading(true)
    setNotFound(false)
    fetch(fileUrl)
      .then(r => {
        if (!r.ok) {
          setNotFound(true)
          setLoading(false)
          return
        }
        return r.text()
      })
      .then(text => {
        if (text !== undefined) setContent(text)
        setLoading(false)
      })
      .catch(() => {
        setNotFound(true)
        setLoading(false)
      })
  }, [fileUrl])

  return (
    <div className="max-w-5xl mx-auto space-y-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <NavLink to="/output">
          <Button variant="ghost" size="icon-sm">
            <ArrowLeft className="size-4" />
          </Button>
        </NavLink>
        <div className="flex-1 min-w-0">
          <h1 className="font-display text-lg font-bold tracking-tight truncate">{filename}</h1>
        </div>
        <Badge variant={isHtml ? 'info' : 'outline'}>{isHtml ? 'HTML' : 'Markdown'}</Badge>
        {isHtml && content && (
          <a href={fileUrl} target="_blank" rel="noopener noreferrer">
            <Button variant="ghost" size="icon-sm">
              <ExternalLink className="size-4" />
            </Button>
          </a>
        )}
      </div>

      {/* Content */}
      {loading && (
        <div className="text-sm text-muted-foreground p-4">Loading...</div>
      )}

      {notFound && (
        <div className="text-center py-16 space-y-3">
          <p className="text-muted-foreground">File not found.</p>
          <p className="text-xs text-muted-foreground/60">
            Run the pipeline to generate deliverables.
          </p>
        </div>
      )}

      {!loading && !notFound && content && isHtml && (
        <iframe
          srcDoc={content}
          title={filename}
          className="w-full bg-white rounded-lg border border-border"
          style={{ minHeight: 'calc(100vh - 12rem)' }}
          sandbox="allow-scripts allow-same-origin"
        />
      )}

      {!loading && !notFound && content && !isHtml && (
        <div className="prose bg-card rounded-lg border border-border p-6">
          <Markdown remarkPlugins={[remarkGfm]}>{content}</Markdown>
        </div>
      )}
    </div>
  )
}
