import { useState, useEffect } from 'react'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { ChevronDown, ChevronRight, FileText } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/components/ui/collapsible'

interface StageContentProps {
  markdown: string
  title: string
}

export function StageContent({ markdown, title }: StageContentProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-4">
          {title}
        </h3>
        <div className="prose">
          <Markdown remarkPlugins={[remarkGfm]}>{markdown}</Markdown>
        </div>
      </CardContent>
    </Card>
  )
}

interface FileContentSectionProps {
  filename: string
  stagePath: string
}

export function FileContentSection({ filename, stagePath }: FileContentSectionProps) {
  const [open, setOpen] = useState(false)
  const [content, setContent] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const mdUrl = `/workspace/${stagePath}/${filename}`
  const baseName = filename.replace('.md', '')
  const htmlUrl = `/workspace/delivery/${baseName}.html`

  useEffect(() => {
    if (!open || content !== null) return
    setLoading(true)
    // Try HTML first, fall back to markdown
    fetch(htmlUrl, { method: 'HEAD' })
      .then(r => (r.ok ? htmlUrl : null))
      .then(url => url ?? mdUrl)
      .then(url => fetch(url).then(r => r.text()))
      .then(text => {
        setContent(text)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [open, htmlUrl, mdUrl, content])

  const isHtml =
    content?.trimStart().startsWith('<!DOCTYPE') || content?.trimStart().startsWith('<html')

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <Card>
        <CollapsibleTrigger asChild>
          <button className="w-full flex items-center gap-2 px-4 py-3 text-sm text-left hover:bg-muted/50 transition-colors rounded-lg">
            {open ? (
              <ChevronDown className="size-4 text-muted-foreground shrink-0" />
            ) : (
              <ChevronRight className="size-4 text-muted-foreground shrink-0" />
            )}
            <FileText className="size-4 text-muted-foreground shrink-0" />
            <span className="font-medium text-foreground">{filename}</span>
          </button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="border-t border-border">
            {loading && (
              <div className="text-xs text-muted-foreground p-4">Loading...</div>
            )}
            {!loading && content && isHtml && (
              <iframe
                srcDoc={content}
                title={filename}
                className="w-full min-h-96 bg-white"
                sandbox="allow-scripts allow-same-origin"
              />
            )}
            {!loading && content && !isHtml && (
              <div className="prose p-4">
                <Markdown remarkPlugins={[remarkGfm]}>{content}</Markdown>
              </div>
            )}
            {!loading && !content && (
              <div className="text-xs text-muted-foreground p-4">
                Could not load file content.
              </div>
            )}
          </div>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  )
}
