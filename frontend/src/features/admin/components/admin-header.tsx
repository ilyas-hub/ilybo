import { useAuthStore } from '@/features/auth'
import { User } from 'lucide-react'

interface AdminHeaderProps {
  title: string
  description?: string
}

export function AdminHeader({ title, description }: AdminHeaderProps) {
  const user = useAuthStore((state) => state.user)

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/95 px-4 py-4 backdrop-blur supports-[backdrop-filter]:bg-background/60 lg:px-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <h1 className="truncate text-lg font-semibold sm:text-xl">{title}</h1>
          {description && (
            <p className="truncate text-xs text-muted-foreground sm:text-sm">{description}</p>
          )}
        </div>

        {/* User info - Hidden on very small screens, compact on mobile */}
        <div className="hidden items-center gap-2 sm:flex sm:gap-3">
          <div className="text-right">
            <p className="text-sm font-medium">{user?.name}</p>
            <p className="hidden text-xs text-muted-foreground lg:block">{user?.email}</p>
          </div>
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 sm:h-9 sm:w-9">
            <User className="h-4 w-4 text-primary" />
          </div>
        </div>
      </div>
    </header>
  )
}
