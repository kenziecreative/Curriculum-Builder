// generate-html.js — Standalone Node.js CJS script for assembly-time HTML generation
// Called by assemble.md via Bash tool: node generate-html.js {workspacePath} {projectName}
// Scoped to facilitator guides (04-sessions/*/) and marketing files (07-marketing/*.md)
// Self-contained — does not import from generate-html.ts

'use strict'

const fs = require('fs')
const path = require('path')
const { marked } = require('marked')

function wrapHtml(title, body) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <style>
    body { font-family: Georgia, 'Times New Roman', serif; max-width: 720px; margin: 2rem auto; padding: 0 1.5rem; line-height: 1.7; color: #1a1a1a; }
    h1 { font-size: 1.75rem; font-weight: 700; margin-top: 2rem; border-bottom: 2px solid #e5e7eb; padding-bottom: 0.5rem; }
    h2 { font-size: 1.35rem; font-weight: 600; margin-top: 1.75rem; }
    h3 { font-size: 1.1rem; font-weight: 600; margin-top: 1.5rem; }
    table { border-collapse: collapse; width: 100%; margin: 1rem 0; }
    th, td { border: 1px solid #d1d5db; padding: 0.5rem 0.75rem; text-align: left; }
    th { background: #f9fafb; font-weight: 600; }
    code { background: #f3f4f6; padding: 0.125rem 0.375rem; border-radius: 3px; font-size: 0.9em; }
    pre { background: #f3f4f6; padding: 1rem; border-radius: 6px; overflow-x: auto; }
    blockquote { border-left: 3px solid #9ca3af; margin-left: 0; padding-left: 1rem; color: #6b7280; }
    @media print { body { margin: 0; } }
  </style>
</head>
<body>
${body}
</body>
</html>`
}

async function generateForProject(projectDir) {
  const deliveryDir = path.join(projectDir, 'delivery')

  // --- 04-sessions: facilitator-guide.md only ---
  const sessionsStageDir = path.join(projectDir, '04-sessions')
  if (fs.existsSync(sessionsStageDir)) {
    const sessionDirs = fs.readdirSync(sessionsStageDir, { withFileTypes: true })
      .filter(d => d.isDirectory())

    for (const sessionDir of sessionDirs) {
      const sessionPath = path.join(sessionsStageDir, sessionDir.name)
      const guideFile = path.join(sessionPath, 'facilitator-guide.md')

      if (!fs.existsSync(guideFile)) continue

      const raw = fs.readFileSync(guideFile, 'utf-8')
      const content = raw.replace(/^---[\s\S]*?---\n/, '')
      const html = await marked(content)
      const title = 'Facilitator Guide'
      const subDeliveryDir = path.join(deliveryDir, sessionDir.name)
      fs.mkdirSync(subDeliveryDir, { recursive: true })
      fs.writeFileSync(path.join(subDeliveryDir, 'facilitator-guide.html'), wrapHtml(title, html))
    }
  }

  // --- 07-marketing: all .md files ---
  const marketingStageDir = path.join(projectDir, '07-marketing')
  if (fs.existsSync(marketingStageDir)) {
    const mdFiles = fs.readdirSync(marketingStageDir)
      .filter(f => f.endsWith('.md'))

    if (mdFiles.length > 0) {
      fs.mkdirSync(deliveryDir, { recursive: true })
    }

    for (const mdFile of mdFiles) {
      const raw = fs.readFileSync(path.join(marketingStageDir, mdFile), 'utf-8')
      const content = raw.replace(/^---[\s\S]*?---\n/, '')
      const html = await marked(content)
      const title = path.basename(mdFile, '.md').replace(/-/g, ' ')
      const outputName = mdFile.replace('.md', '.html')
      fs.writeFileSync(path.join(deliveryDir, outputName), wrapHtml(title, html))
    }
  }
}

async function main() {
  const [,, workspacePath, projectName] = process.argv

  if (!workspacePath || !projectName) {
    process.stderr.write('Usage: node generate-html.js {workspacePath} {projectName}\n')
    process.exit(1)
  }

  const projectDir = path.resolve(workspacePath, projectName)

  if (!fs.existsSync(projectDir)) {
    process.stderr.write(`Project directory not found: ${projectDir}\n`)
    process.exit(1)
  }

  try {
    await generateForProject(projectDir)
  } catch (err) {
    process.stderr.write(`Error generating HTML: ${err.message}\n`)
    process.exit(1)
  }
}

main()
