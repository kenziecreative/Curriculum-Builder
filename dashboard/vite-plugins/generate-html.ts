// vite-plugins/generate-html.ts
// RUNTIME NODE.JS ONLY — runs at dev server startup, not in browser
import { marked } from 'marked'
import fs from 'fs'
import path from 'path'

export function wrapHtml(title: string, body: string): string {
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

export async function generateHtmlForWorkspace(workspaceDir: string): Promise<void> {
  if (!fs.existsSync(workspaceDir)) return

  const projects = fs.readdirSync(workspaceDir, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => d.name)

  for (const project of projects) {
    const projectDir = path.join(workspaceDir, project)
    const deliveryDir = path.join(projectDir, 'delivery')
    fs.mkdirSync(deliveryDir, { recursive: true })

    const stageDirs = fs.readdirSync(projectDir, { withFileTypes: true })
      .filter(d => d.isDirectory() && /^\d{2}-/.test(d.name))

    for (const stageDir of stageDirs) {
      const stagePath = path.join(projectDir, stageDir.name)
      const entries = fs.readdirSync(stagePath, { withFileTypes: true })

      for (const entry of entries) {
        if (entry.isFile() && entry.name.endsWith('.md')) {
          // Flat file: delivery/{filename}.html
          const raw = fs.readFileSync(path.join(stagePath, entry.name), 'utf-8')
          const content = raw.replace(/^---[\s\S]*?---\n/, '')
          const html = await marked(content)
          const title = path.basename(entry.name, '.md').replace(/-/g, ' ')
          const outputName = entry.name.replace('.md', '.html')
          fs.writeFileSync(path.join(deliveryDir, outputName), wrapHtml(title, html))
        } else if (entry.isDirectory()) {
          // Subdirectory: delivery/{subdirName}/{filename}.html
          const subPath = path.join(stagePath, entry.name)
          const subEntries = fs.readdirSync(subPath).filter(f => f.endsWith('.md'))
          const subDeliveryDir = path.join(deliveryDir, entry.name)
          if (subEntries.length > 0) {
            fs.mkdirSync(subDeliveryDir, { recursive: true })
          }
          for (const mdFile of subEntries) {
            const raw = fs.readFileSync(path.join(subPath, mdFile), 'utf-8')
            const content = raw.replace(/^---[\s\S]*?---\n/, '')
            const html = await marked(content)
            const title = path.basename(mdFile, '.md').replace(/-/g, ' ')
            const outputName = mdFile.replace('.md', '.html')
            fs.writeFileSync(path.join(subDeliveryDir, outputName), wrapHtml(title, html))
          }
        }
      }
    }
  }
}
