import { createRootRoute, Outlet, useRouterState } from '@tanstack/react-router'
import { MainLayout } from '@/components/layout'

export const Route = createRootRoute({
  component: RootLayout,
})

function RootLayout() {
  const location = useRouterState({ select: (s) => s.location })
  const isAdminRoute = location.pathname.startsWith('/admin')

  // Admin routes have their own layout
  if (isAdminRoute) {
    return <Outlet />
  }

  // Public routes use MainLayout
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  )
}
