import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import fs from 'fs'
import { generateHtmlForWorkspace } from './vite-plugins/generate-html'

// WORKSPACE_DIR: defaults to ../workspace (relative to dashboard/)
// Override: WORKSPACE_DIR=/absolute/path npm run dev
// RUNTIME FETCH ONLY — do not use import.meta.glob; see CONTEXT.md
const WORKSPACE_DIR = process.env.WORKSPACE_DIR
  ? path.resolve(process.env.WORKSPACE_DIR)
  : path.resolve(__dirname, '../workspace')

function serveWorkspace(): Plugin {
  return {
    name: 'serve-workspace',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (!req.url) return next()

        // /workspace-index — returns JSON list of projects with STATE.md mtime
        if (req.url === '/workspace-index') {
          if (!fs.existsSync(WORKSPACE_DIR)) {
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify([]))
            return
          }
          const entries = fs.readdirSync(WORKSPACE_DIR, { withFileTypes: true })
            .filter(d => d.isDirectory())
            .map(d => {
              const statePath = path.join(WORKSPACE_DIR, d.name, 'STATE.md')
              return {
                name: d.name,
                stateMtime: fs.existsSync(statePath)
                  ? fs.statSync(statePath).mtime.toISOString()
                  : null,
              }
            })
            .sort((a, b) => (b.stateMtime ?? '').localeCompare(a.stateMtime ?? ''))
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify(entries))
          return
        }

        // /workspace-files/{project}/{stage} — returns JSON array of .md filenames
        const filesMatch = req.url.match(/^\/workspace-files\/([^/]+)\/([^/]+)$/)
        if (filesMatch) {
          const [, project, stage] = filesMatch
          const stageDir = path.join(WORKSPACE_DIR, project, stage)
          if (!fs.existsSync(stageDir)) {
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify([]))
            return
          }
          const files = fs.readdirSync(stageDir)
            .filter(f => f.endsWith('.md'))
            .sort()
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify(files))
          return
        }

        // /workspace/* — serve individual files
        if (!req.url.startsWith('/workspace/') || req.url.includes('?')) return next()
        const relativePath = req.url.slice('/workspace/'.length)
        const filePath = path.resolve(WORKSPACE_DIR, relativePath)
        // Security: ensure resolved path stays within WORKSPACE_DIR
        if (!filePath.startsWith(WORKSPACE_DIR + path.sep) && filePath !== WORKSPACE_DIR) {
          res.statusCode = 403
          res.end('Forbidden')
          return
        }
        if (!fs.existsSync(filePath)) {
          res.statusCode = 404
          res.end('Not found')
          return
        }
        const ext = path.extname(filePath)
        const mime: Record<string, string> = {
          '.html': 'text/html',
          '.md': 'text/plain; charset=utf-8',
          '.css': 'text/css',
          '.json': 'application/json',
        }
        res.setHeader('Content-Type', mime[ext] || 'application/octet-stream')
        fs.createReadStream(filePath).pipe(res)
      })
    },
  }
}

function generateHtml(): Plugin {
  return {
    name: 'generate-html',
    async configureServer() {
      console.log('[generate-html] Generating HTML output files...')
      await generateHtmlForWorkspace(WORKSPACE_DIR)
      console.log('[generate-html] Done.')
    },
    async handleHotUpdate({ file }: { file: string }) {
      if (file.endsWith('.md') && file.startsWith(WORKSPACE_DIR)) {
        await generateHtmlForWorkspace(WORKSPACE_DIR)
        return []
      }
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), serveWorkspace(), generateHtml()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3002,
  },
})
