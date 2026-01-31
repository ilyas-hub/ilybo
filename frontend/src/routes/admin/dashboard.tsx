import { createFileRoute } from '@tanstack/react-router'
import { AdminHeader, StatsCards, LeadsTable } from '@/features/admin'

export const Route = createFileRoute('/admin/dashboard')({
  component: DashboardPage,
})

function DashboardPage() {
  return (
    <>
      <AdminHeader
        title="Dashboard"
        description="Overview of your business metrics"
      />
      <div className="space-y-6 p-6">
        <StatsCards />
        <div>
          <h2 className="mb-4 text-lg font-semibold">Recent Leads</h2>
          <LeadsTable />
        </div>
      </div>
    </>
  )
}
