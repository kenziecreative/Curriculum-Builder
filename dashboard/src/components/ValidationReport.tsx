import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'

interface ValidationReportProps {
  isVisible: boolean
}

interface FailRow {
  field: string
  stage: string
  file: string
  message: string
}

interface ScoreRow {
  label: string
  score: number
  recommendation: string
}

interface ChecklistItem {
  checked: boolean
  text: string
}

function parseFailRows(markdown: string): FailRow[] {
  const rows: FailRow[] = []
  for (const line of markdown.split('\n')) {
    const trimmed = line.trim()
    if (!trimmed.startsWith('|') || !trimmed.endsWith('|')) continue
    const cols = trimmed.split('|').map(c => c.trim()).filter((_, i, arr) => i > 0 && i < arr.length - 1)
    if (cols.length < 6) continue
    const status = cols[4]
    if (status !== 'FAIL') continue
    rows.push({
      field: cols[1],
      stage: cols[2],
      file: cols[3],
      message: cols[5],
    })
  }
  return rows
}

const SCORE_LABEL_MAP: Record<string, string> = {
  'Transfer realism': 'Transfer realism',
  'Social learning': 'Social learning',
  'Cognitive load': 'Cognitive load',
  'Scaffolding': 'Scaffolding',
  'Belief-challenging': 'Belief-challenging',
}

function parseTier2Scores(markdown: string): ScoreRow[] {
  const rows: ScoreRow[] = []
  let inSection = false
  for (const line of markdown.split('\n')) {
    const trimmed = line.trim()
    if (/tier 2/i.test(trimmed)) {
      inSection = true
      continue
    }
    if (inSection && trimmed.startsWith('##')) break
    if (!inSection) continue
    if (!trimmed.startsWith('|') || !trimmed.endsWith('|')) continue
    const cols = trimmed.split('|').map(c => c.trim()).filter((_, i, arr) => i > 0 && i < arr.length - 1)
    if (cols.length < 2) continue
    const scoreStr = cols[1]
    const score = parseFloat(scoreStr)
    if (isNaN(score)) continue
    const dimension = cols[0]
    const label = SCORE_LABEL_MAP[dimension] ?? dimension
    const recommendation = cols[3] ?? ''
    rows.push({ label, score, recommendation })
  }
  return rows
}

function parseChecklistItems(markdown: string): ChecklistItem[] {
  const items: ChecklistItem[] = []
  for (const line of markdown.split('\n')) {
    const trimmed = line.trim()
    if (trimmed.startsWith('- [ ]')) {
      items.push({ checked: false, text: trimmed.slice(6) })
    } else if (trimmed.startsWith('- [x]') || trimmed.startsWith('- [X]')) {
      items.push({ checked: true, text: trimmed.slice(6) })
    }
  }
  return items
}

function scoreColor(score: number): string {
  if (score >= 0.7) return 'text-olive'
  if (score < 0.4) return 'text-rust'
  return 'text-amber'
}

export function ValidationReport({ isVisible }: ValidationReportProps) {
  const [schemaReport, setSchemaReport] = useState<string | null>(null)
  const [checklistReport, setChecklistReport] = useState<string | null>(null)
  const [fetched, setFetched] = useState(false)

  useEffect(() => {
    if (!isVisible || fetched) return
    setFetched(true)
    fetch('/workspace/09-validation/schema-report.md')
      .then(r => r.ok ? r.text() : Promise.reject(r.status))
      .then(text => setSchemaReport(text))
      .catch(() => setSchemaReport('not-found'))
    fetch('/workspace/09-validation/human-review-checklist.md')
      .then(r => r.ok ? r.text() : Promise.reject(r.status))
      .then(text => setChecklistReport(text))
      .catch(() => setChecklistReport('not-found'))
  }, [isVisible, fetched])

  if (!isVisible) return null
  if (schemaReport === null) return (
    <div className="text-sm text-muted-foreground p-4">Loading validation results...</div>
  )
  if (schemaReport === 'not-found') return (
    <Card>
      <CardContent className="pt-6">
        <p className="text-sm text-muted-foreground">
          Validation not yet run. Complete Stage 5, then run /curriculum:validate.
        </p>
      </CardContent>
    </Card>
  )

  const failRows = parseFailRows(schemaReport)
  const scores = parseTier2Scores(schemaReport)
  const checklistItems = checklistReport && checklistReport !== 'not-found'
    ? parseChecklistItems(checklistReport)
    : []

  const hasFails = failRows.length > 0

  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        {/* Headline */}
        <div className={`text-sm font-semibold ${hasFails ? 'text-rust' : 'text-olive'}`}>
          {hasFails
            ? `Found ${failRows.length} issue${failRows.length === 1 ? '' : 's'} that need fixing before your curriculum is delivery-ready.`
            : 'Your curriculum passed all required checks.'}
        </div>

        {/* Tier 1 failures */}
        {hasFails && (
          <div>
            <div className="text-xs font-semibold text-muted-foreground mb-2">Missing or invalid fields</div>
            <div className="space-y-1">
              {failRows.map((row, i) => (
                <div key={i} className="text-xs text-foreground">
                  <span className="text-rust font-medium">{row.field}</span>
                  {' — '}{row.message}
                  <span className="text-muted-foreground ml-1">({row.file})</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tier 2 scores */}
        {scores.length > 0 && (
          <div>
            <div className="text-xs font-semibold text-muted-foreground mb-2">Quality ratings</div>
            <div className="space-y-1">
              {scores.map((s, i) => (
                <div key={i} className="flex items-center gap-2 text-xs">
                  <span className="text-muted-foreground w-36">{s.label}</span>
                  <span className={`font-medium ${scoreColor(s.score)}`}>{Math.round(s.score * 10)}/10</span>
                  {s.score < 0.5 && s.recommendation && (
                    <span className="text-muted-foreground/60">{s.recommendation}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tier 3 checklist */}
        {checklistItems.length > 0 && (
          <div>
            <div className="text-xs font-semibold text-muted-foreground mb-2">Human review checklist</div>
            <div className="space-y-1">
              {checklistItems.map((item, i) => (
                <div key={i} className="text-xs text-foreground flex gap-2">
                  <span className="text-muted-foreground flex-shrink-0">{item.checked ? '✓' : '○'}</span>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
