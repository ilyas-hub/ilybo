import { createFileRoute, Outlet, useNavigate, useRouterState } from '@tanstack/react-router'
import { useEffect } from 'react'
import { AdminLayout } from '@/features/admin'
import { useAuthStore } from '@/features/auth'

export const Route = createFileRoute('/admin')({
  component: AdminRouteLayout,
})

function AdminRouteLayout() {
  const navigate = useNavigate()
  const location = useRouterState({ select: (s) => s.location })
  const { isAuthenticated, user, isLoading, checkAuth } = useAuthStore()

  // Check if we're on the login page
  const isLoginPage = location.pathname === '/admin/login'

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  useEffect(() => {
    // Don't redirect if we're already on login page
    if (isLoginPage) return

    if (!isLoading && !isAuthenticated) {
      navigate({ to: '/admin/login' })
    } else if (!isLoading && isAuthenticated && user?.role !== 'admin') {
      navigate({ to: '/admin/login' })
    }
  }, [isLoading, isAuthenticated, user, navigate, isLoginPage])

  // Always render login page without auth check
  if (isLoginPage) {
    return <Outlet />
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    )
  }

  if (!isAuthenticated || user?.role !== 'admin') {
    return null
  }

  return (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  )
}
