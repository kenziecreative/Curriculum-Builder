import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { mkdtempSync, rmSync, mkdirSync, writeFileSync, readFileSync, existsSync } from 'fs'
import { join } from 'path'
import { tmpdir } from 'os'
import { generateHtmlForWorkspace, wrapHtml } from './generate-html'

let tmpDir: string

beforeEach(() => {
  tmpDir = mkdtempSync(join(tmpdir(), 'knz-test-'))
})

afterEach(() => {
  rmSync(tmpDir, { recursive: true, force: true })
})

describe('generateHtmlForWorkspace', () => {
  it('writes an .html file to delivery/ for each .md in stage dirs', async () => {
    const projectDir = join(tmpDir, 'test-project')
    const stageDir = join(projectDir, '01-outcomes')
    mkdirSync(stageDir, { recursive: true })
    writeFileSync(join(stageDir, 'learning-objectives.md'), '# Learning Objectives\n\nContent here.')

    await generateHtmlForWorkspace(tmpDir)

    expect(existsSync(join(projectDir, 'delivery', 'learning-objectives.html'))).toBe(true)
  })

  it('generated HTML contains heading text from source markdown', async () => {
    const projectDir = join(tmpDir, 'test-project')
    const stageDir = join(projectDir, '01-outcomes')
    mkdirSync(stageDir, { recursive: true })
    writeFileSync(join(stageDir, 'objectives.md'), '# Cash Flow Fundamentals\n\nBody text.')

    await generateHtmlForWorkspace(tmpDir)

    const html = readFileSync(join(projectDir, 'delivery', 'objectives.html'), 'utf-8')
    expect(html).toContain('Cash Flow Fundamentals')
    expect(html).toContain('<h1>')
  })

  it('strips YAML frontmatter — delivery HTML does not contain --- delimiters', async () => {
    const projectDir = join(tmpDir, 'test-project')
    const stageDir = join(projectDir, '01-outcomes')
    mkdirSync(stageDir, { recursive: true })
    writeFileSync(join(stageDir, 'doc.md'), '---\ntitle: Test\n---\n# Heading\nBody.')

    await generateHtmlForWorkspace(tmpDir)

    const html = readFileSync(join(projectDir, 'delivery', 'doc.html'), 'utf-8')
    expect(html).not.toContain('---')
    expect(html).toContain('<h1>')
  })

  it('generates HTML for session subdirectory files at delivery/{subdir}/{filename}.html', async () => {
    const projectDir = join(tmpDir, 'test-project')
    const sessionDir = join(projectDir, '04-sessions', 'session-1')
    mkdirSync(sessionDir, { recursive: true })
    writeFileSync(join(sessionDir, 'facilitator-guide.md'), '# Session 1 Guide\n\nContent.')

    await generateHtmlForWorkspace(tmpDir)

    expect(existsSync(join(projectDir, 'delivery', 'session-1', 'facilitator-guide.html'))).toBe(true)
  })
})

describe('wrapHtml', () => {
  it('produces a DOCTYPE html document with embedded style block', () => {
    const result = wrapHtml('Test Title', '<p>Body</p>')
    expect(result).toContain('<!DOCTYPE html>')
    expect(result).toContain('<style>')
    expect(result).toContain('<p>Body</p>')
    expect(result).toContain('Test Title')
  })
})
