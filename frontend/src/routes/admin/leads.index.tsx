import { createFileRoute } from '@tanstack/react-router'
import { AdminHeader, LeadsTable } from '@/features/admin'

export const Route = createFileRoute('/admin/leads/')({
  component: LeadsPage,
})

function LeadsPage() {
  return (
    <>
      <AdminHeader
        title="Lead Management"
        description="View and manage your leads"
      />
      <div className="p-6">
        <LeadsTable />
      </div>
    </>
  )
}
