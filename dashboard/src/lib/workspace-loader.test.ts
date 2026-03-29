import { describe, it, expect, vi, beforeEach } from 'vitest'
import { listStageFiles } from './workspace-loader'

beforeEach(() => {
  vi.restoreAllMocks()
})

describe('listStageFiles', () => {
  it('returns filenames for a valid stage directory', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ['learning-objectives.md', 'essential-questions.md'],
    }))
    const result = await listStageFiles('02-outcomes')
    expect(result).toEqual(['learning-objectives.md', 'essential-questions.md'])
  })

  it('returns empty array for stage with no files', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: async () => [],
    }))
    const result = await listStageFiles('04-modules')
    expect(result).toEqual([])
  })
})
