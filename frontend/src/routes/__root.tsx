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
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-secondary focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:font-bold"
      >
        Skip to main content
      </a>
      <MainLayout>
        <Outlet />
      </MainLayout>
    </>
  )
}
