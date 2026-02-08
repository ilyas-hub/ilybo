import { createFileRoute } from '@tanstack/react-router'
import { motion } from 'motion/react'
import { AdminHeader } from '@/features/admin'
import { FAQsTable } from '@/features/admin/components/faqs-table'
import { Card, CardContent } from '@/lib/ui'

export const Route = createFileRoute('/admin/faqs')({
  component: FAQsPage,
})

function FAQsPage() {
  return (
    <>
      <AdminHeader
        title="FAQ Management"
        description="Manage frequently asked questions"
      />
      <div className="p-4 md:p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card>
            <CardContent className="pt-6">
              <FAQsTable />
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </>
  )
}
