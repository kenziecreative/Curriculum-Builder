export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center min-h-64 text-center p-8">
      <div className="text-4xl mb-4">📋</div>
      <h2 className="text-lg font-semibold text-gray-700 mb-2">No curriculum project found</h2>
      <p className="text-gray-500 text-sm max-w-sm">
        Run <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs font-mono">/knz-init</code> in Claude Code to get started.
      </p>
    </div>
  )
}
