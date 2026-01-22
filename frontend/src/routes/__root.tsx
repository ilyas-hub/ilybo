import { createRootRoute, Outlet } from '@tanstack/react-router'
import { MainLayout } from '@/components/layout'

export const Route = createRootRoute({
  component: () => (
    <MainLayout>
      <Outlet />
    </MainLayout>
  ),
})
