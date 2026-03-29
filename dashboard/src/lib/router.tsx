// src/lib/router.tsx
import { createBrowserRouter } from 'react-router-dom'
import { AppLayout } from '@/components/AppLayout'
import { OverviewPage } from '@/components/OverviewPage'
import { StagePage } from '@/components/StagePage'
import { OutputPage } from '@/components/OutputPage'
import { OutputViewer } from '@/components/OutputViewer'

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { index: true, element: <OverviewPage /> },
      { path: 'stage/:number', element: <StagePage /> },
      { path: 'output', element: <OutputPage /> },
      { path: 'output/view/*', element: <OutputViewer /> },
    ],
  },
])
