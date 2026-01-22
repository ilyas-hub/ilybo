import type { ReactNode } from 'react'
import { QueryProvider } from './query-provider'
import { ThemeProvider } from '@/lib/design-system/theme/theme-provider'

interface AppProviderProps {
  children: ReactNode
}

export function AppProvider({ children }: AppProviderProps) {
  return (
    <ThemeProvider defaultTheme="system" storageKey="ilybo-ui-theme">
      <QueryProvider>{children}</QueryProvider>
    </ThemeProvider>
  )
}
