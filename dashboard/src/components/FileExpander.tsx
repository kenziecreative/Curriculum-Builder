import { useState, useEffect } from 'react'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { ChevronDown, ChevronRight, FileText } from 'lucide-react'

interface FileExpanderProps {
  filename: string      // e.g. "learning-objectives.md"
  stagePath: string     // e.g. "02-outcomes"
}

export function FileExpander({ filename, stagePath }: FileExpanderProps) {
  const [expanded, setExpanded] = useState(false)
  const [content, setContent] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const baseName = filename.replace('.md', '')
  const htmlUrl = `/workspace/delivery/${baseName}.html`
  const mdUrl = `/workspace/${stagePath}/${filename}`

  useEffect(() => {
    if (!expanded || content !== null) return
    setLoading(true)
    // Try HTML first via HEAD request; fall back to markdown
    fetch(htmlUrl, { method: 'HEAD' })
      .then(r => r.ok ? htmlUrl : null)
      .then(url => url ?? mdUrl)
      .then(url => fetch(url).then(r => r.text()))
      .then(text => { setContent(text); setLoading(false) })
      .catch(() => setLoading(false))
  }, [expanded, htmlUrl, mdUrl, content])

  const isHtml = content?.trimStart().startsWith('<!DOCTYPE') || content?.trimStart().startsWith('<html')

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <button
        className="w-full flex items-center gap-2 px-3 py-2 text-sm text-left hover:bg-gray-50 transition-colors"
        onClick={() => setExpanded(e => !e)}
      >
        {expanded ? <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" /> : <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />}
        <FileText className="w-4 h-4 text-gray-400 flex-shrink-0" />
        <span className="font-medium text-gray-700">{filename}</span>
      </button>
      {expanded && (
        <div className="border-t border-gray-200">
          {loading && <div className="text-xs text-gray-400 p-3">Loading...</div>}
          {!loading && content && isHtml && (
            <iframe
              srcDoc={content}
              title={filename}
              className="w-full min-h-96 bg-white"
              sandbox="allow-scripts allow-same-origin"
            />
          )}
          {!loading && content && !isHtml && (
            <div className="prose prose-sm max-w-none p-4 bg-white">
              <Markdown remarkPlugins={[remarkGfm]}>{content}</Markdown>
            </div>
          )}
          {!loading && !content && (
            <div className="text-xs text-gray-400 p-3">Could not load file content.</div>
          )}
        </div>
      )}
    </div>
  )
}
