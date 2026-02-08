import { createFileRoute } from '@tanstack/react-router'
import { motion } from 'motion/react'
import { AdminHeader } from '@/features/admin'
import { TestimonialsTable } from '@/features/admin/components/testimonials-table'
import { Card, CardContent } from '@/lib/ui'

export const Route = createFileRoute('/admin/testimonials')({
  component: TestimonialsPage,
})

function TestimonialsPage() {
  return (
    <>
      <AdminHeader
        title="Testimonials Management"
        description="Manage client testimonials"
      />
      <div className="p-4 md:p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card>
            <CardContent className="pt-6">
              <TestimonialsTable />
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </>
  )
}
