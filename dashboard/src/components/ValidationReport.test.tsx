// @vitest-environment jsdom
import { render, screen, act, cleanup } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { ValidationReport } from './ValidationReport'

const SCHEMA_REPORT_WITH_FAILURES = `
## Validation Results

| Check ID | Field | Stage | File | Status | Message |
|----------|-------|-------|------|--------|---------|
| T1-01 | transfer_connection | stage-05 | 04-sessions/M-1-S-2/session.md | FAIL | MISSING — field not present |
| T1-02 | reflection_prompt | stage-05 | 04-sessions/M-1-S-1/session.md | PASS | Present |
| T1-03 | formative_check | stage-05 | 04-sessions/M-1-S-3/session.md | FAIL | MISSING — field not present |

## Tier 2 Rubric Scores

| Dimension | Score | Evidence | Recommendation |
|-----------|-------|----------|----------------|
| transfer_realism | 0.72 | Strong transfer context | Keep it up |
| cognitive_load | 0.35 | Too much at once | Break into smaller chunks |
| scaffolding | 0.55 | Moderate scaffolding | Add more |
`

const SCHEMA_REPORT_NO_FAILURES = `
| Check ID | Field | Stage | File | Status | Message |
|----------|-------|-------|------|--------|---------|
| T1-01 | transfer_connection | stage-05 | 04-sessions/M-1-S-1/session.md | PASS | Present |
`

const HUMAN_REVIEW_CHECKLIST = `
- [ ] T3-06 — Verify emotional tone | Location: 04-sessions/ | Review type: quality
- [x] T3-07 — Check timing estimates | Location: 04-sessions/M-1-S-1 | Review type: feasibility
`

function mockFetch(schemaOk: boolean, schemaBody: string, checklistOk = true, checklistBody = '') {
  vi.stubGlobal('fetch', vi.fn().mockImplementation((url: string) => {
    if (url.includes('schema-report.md')) {
      return Promise.resolve({ ok: schemaOk, text: async () => schemaBody, status: schemaOk ? 200 : 404 })
    }
    if (url.includes('human-review-checklist.md')) {
      return Promise.resolve({ ok: checklistOk, text: async () => checklistBody, status: checklistOk ? 200 : 404 })
    }
    return Promise.resolve({ ok: false, status: 404 })
  }))
}

beforeEach(() => {
  vi.restoreAllMocks()
})

afterEach(() => {
  cleanup()
})

describe('ValidationReport', () => {
  it('renders not-yet-run message when schema-report.md returns 404', async () => {
    mockFetch(false, '', false, '')
    await act(async () => {
      render(<ValidationReport projectName="test-program" isVisible={true} />)
    })
    expect(screen.getByText(/Validation not yet run/)).toBeTruthy()
  })

  it('renders loading state while fetches are in flight', async () => {
    // Never-resolving fetch — component stays in loading state
    vi.stubGlobal('fetch', vi.fn().mockReturnValue(new Promise(() => {})))
    render(<ValidationReport projectName="test-program" isVisible={true} />)
    expect(screen.getByText(/Loading validation results/)).toBeTruthy()
  })

  it('renders only FAIL rows, not PASS rows', async () => {
    mockFetch(true, SCHEMA_REPORT_WITH_FAILURES, false, '')
    await act(async () => {
      render(<ValidationReport projectName="test-program" isVisible={true} />)
    })
    // FAIL rows appear
    expect(screen.getByText('transfer_connection')).toBeTruthy()
    expect(screen.getByText('formative_check')).toBeTruthy()
  })

  it('does not render PASS rows in the failure list', async () => {
    mockFetch(true, SCHEMA_REPORT_WITH_FAILURES, false, '')
    await act(async () => {
      render(<ValidationReport projectName="test-program" isVisible={true} />)
    })
    // The PASS row field name should NOT appear
    expect(screen.queryByText('reflection_prompt')).toBeNull()
  })

  it('renders quality scores as N/10 format with correct color classes', async () => {
    mockFetch(true, SCHEMA_REPORT_WITH_FAILURES, false, '')
    await act(async () => {
      render(<ValidationReport projectName="test-program" isVisible={true} />)
    })
    // 0.72 → 7/10 (green)
    const greenScore = screen.getByText('7/10')
    expect(greenScore.className).toContain('text-green-600')
    // 0.35 → 4/10 (red, rounds to 4 from 0.35*10=3.5)
    const redScore = screen.getByText('4/10')
    expect(redScore.className).toContain('text-red-600')
    // 0.55 → 6/10 (yellow)
    const yellowScore = screen.getByText('6/10')
    expect(yellowScore.className).toContain('text-yellow-600')
  })

  it('renders Tier 3 checklist items from human-review-checklist.md', async () => {
    mockFetch(true, SCHEMA_REPORT_NO_FAILURES, true, HUMAN_REVIEW_CHECKLIST)
    await act(async () => {
      render(<ValidationReport projectName="test-program" isVisible={true} />)
    })
    expect(screen.getByText(/Verify emotional tone/)).toBeTruthy()
    expect(screen.getByText(/Check timing estimates/)).toBeTruthy()
  })

  it('returns null when isVisible is false', () => {
    const { container } = render(<ValidationReport projectName="test-program" isVisible={false} />)
    expect(container.firstChild).toBeNull()
  })

  it('does not refetch when already fetched', async () => {
    mockFetch(true, SCHEMA_REPORT_NO_FAILURES, false, '')
    const { rerender } = render(<ValidationReport projectName="test-program" isVisible={false} />)
    await act(async () => {
      rerender(<ValidationReport projectName="test-program" isVisible={true} />)
    })
    await act(async () => {
      rerender(<ValidationReport projectName="test-program" isVisible={true} />)
    })
    // fetch should be called exactly twice (schema + checklist), not 4 times
    const fetchMock = vi.mocked(fetch)
    expect(fetchMock).toHaveBeenCalledTimes(2)
  })
})
