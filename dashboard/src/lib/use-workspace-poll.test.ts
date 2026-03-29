// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { readFileSync } from 'fs'
import { join } from 'path'
import { useWorkspacePoll } from './use-workspace-poll'

const fixtureContent = readFileSync(
  join(__dirname, '../test/fixtures/STATE.md'),
  'utf-8'
)

beforeEach(() => {
  vi.useFakeTimers()
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
    ok: true,
    text: async () => fixtureContent,
  }))
})

afterEach(() => {
  vi.useRealTimers()
  vi.restoreAllMocks()
})

describe('useWorkspacePoll', () => {
  it('calls fetch on mount and sets loading=false after first fetch', async () => {
    const { result } = renderHook(() => useWorkspacePoll())
    expect(result.current.loading).toBe(true)
    await act(async () => {
      await vi.runAllTicks()
      await Promise.resolve()
    })
    expect(result.current.loading).toBe(false)
    expect(result.current.state).not.toBeNull()
  })

  it('clears interval on unmount — no memory leak', async () => {
    const clearIntervalSpy = vi.spyOn(global, 'clearInterval')
    const { unmount } = renderHook(() => useWorkspacePoll())
    await act(async () => {
      await vi.runAllTicks()
      await Promise.resolve()
    })
    unmount()
    expect(clearIntervalSpy).toHaveBeenCalled()
  })
})
