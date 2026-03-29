import { Moon, Sun } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'

function getInitialDark() {
  const stored = localStorage.getItem('theme')
  const prefersDark =
    stored === 'dark' || (!stored && window.matchMedia('(prefers-color-scheme: dark)').matches)
  if (prefersDark) document.documentElement.classList.add('dark')
  return prefersDark
}

export function ThemeToggle() {
  const [dark, setDark] = useState(getInitialDark)

  function toggle() {
    const next = !dark
    setDark(next)
    document.documentElement.classList.toggle('dark', next)
    localStorage.setItem('theme', next ? 'dark' : 'light')
  }

  return (
    <Button variant="ghost" size="icon-sm" onClick={toggle} aria-label="Toggle theme">
      {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
    </Button>
  )
}
