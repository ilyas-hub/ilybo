import { createFileRoute } from '@tanstack/react-router'
import { AdminHeader, ProjectsTable } from '@/features/admin'

export const Route = createFileRoute('/admin/projects')({
  component: ProjectsPage,
})

function ProjectsPage() {
  return (
    <>
      <AdminHeader
        title="Project Management"
        description="Manage your active and past projects"
      />
      <div className="p-6">
        <ProjectsTable />
      </div>
    </>
  )
}
