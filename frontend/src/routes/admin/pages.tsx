import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { motion } from 'motion/react'
import { Plus, FileText } from 'lucide-react'
import { AdminHeader } from '@/features/admin'
import { PagesTable } from '@/features/admin/components/pages-table'
import { PageEditorDialog } from '@/features/admin/components/page-editor-dialog'
import { usePages } from '@/features/admin/hooks/use-pages'
import { Card, CardContent, Button } from '@/lib/ui'
import type { Page } from '@/features/admin/types'

export const Route = createFileRoute('/admin/pages')({
  component: PagesPage,
})

function PagesPage() {
  const [isEditorOpen, setIsEditorOpen] = useState(false)
  const [editingPage, setEditingPage] = useState<Page | null>(null)

  const { data, isLoading, isError } = usePages()
  const pages = data?.data || []

  const handleEdit = (page: Page) => {
    setEditingPage(page)
    setIsEditorOpen(true)
  }

  const handleCreate = () => {
    setEditingPage(null)
    setIsEditorOpen(true)
  }

  const handleCloseEditor = (open: boolean) => {
    setIsEditorOpen(open)
    if (!open) {
      setEditingPage(null)
    }
  }

  return (
    <>
      <AdminHeader
        title="Page Management"
        description="Create and manage dynamic pages"
      />
      <div className="p-4 md:p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card>
            <CardContent className="pt-6">
              <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="flex items-center gap-2 text-lg font-semibold">
                    <FileText className="h-5 w-5" />
                    Pages
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Manage dynamic content pages like Privacy Policy, Terms of Service, etc.
                  </p>
                </div>
                <motion.div whileTap={{ scale: 0.98 }}>
                  <Button onClick={handleCreate}>
                    <Plus className="mr-2 h-4 w-4" />
                    New Page
                  </Button>
                </motion.div>
              </div>

              {isError && (
                <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-center text-destructive">
                  Failed to load pages. Please try again.
                </div>
              )}

              {!isError && (
                <PagesTable
                  pages={pages}
                  onEdit={handleEdit}
                  isLoading={isLoading}
                />
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <PageEditorDialog
        open={isEditorOpen}
        onOpenChange={handleCloseEditor}
        page={editingPage}
      />
    </>
  )
}
