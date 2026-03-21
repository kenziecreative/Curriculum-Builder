import { describe, it, expect, vi, beforeEach } from 'vitest'
import { discoverActiveProject, listStageFiles } from './workspace-loader'

beforeEach(() => {
  vi.restoreAllMocks()
})

describe('discoverActiveProject', () => {
  it('returns the project with most recent STATE.md mtime', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: async () => [
        { name: 'cash-flow-101', stateMtime: '2026-03-20T12:00:00.000Z' },
        { name: 'old-project', stateMtime: '2026-03-15T08:00:00.000Z' },
      ],
    }))
    const result = await discoverActiveProject()
    expect(result).toBe('cash-flow-101')
  })

  it('returns null when no projects exist', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: async () => [],
    }))
    const result = await discoverActiveProject()
    expect(result).toBeNull()
  })
})

describe('listStageFiles', () => {
  it('returns filenames for a valid stage directory', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ['learning-objectives.md', 'essential-questions.md'],
    }))
    const result = await listStageFiles('test-project', '01-outcomes')
    expect(result).toEqual(['learning-objectives.md', 'essential-questions.md'])
  })

  it('returns empty array for stage with no files', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: async () => [],
    }))
    const result = await listStageFiles('test-project', '03-modules')
    expect(result).toEqual([])
  })
})
