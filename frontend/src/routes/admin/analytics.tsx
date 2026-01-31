import { createFileRoute } from '@tanstack/react-router'
import { motion } from 'motion/react'
import { AdminHeader } from '@/features/admin'
import { AnalyticsCharts } from '@/features/admin/components/analytics-charts'
import { useAnalytics } from '@/features/admin/hooks/use-analytics'
import { Card, CardContent } from '@/lib/ui'
import { BarChart3 } from 'lucide-react'

export const Route = createFileRoute('/admin/analytics')({
  component: AnalyticsPage,
})

function AnalyticsPage() {
  const { data, isLoading, isError } = useAnalytics()

  return (
    <>
      <AdminHeader
        title="Analytics"
        description="Track your leads and project performance"
      />
      <div className="p-4 md:p-6">
        {isLoading && (
          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {[...Array(4)].map((_, i) => (
                <Card key={i}>
                  <CardContent className="pt-6">
                    <div className="animate-pulse space-y-2">
                      <div className="h-4 w-24 rounded bg-muted" />
                      <div className="h-8 w-16 rounded bg-muted" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="grid gap-6 lg:grid-cols-2">
              {[...Array(4)].map((_, i) => (
                <Card key={i}>
                  <CardContent className="pt-6">
                    <div className="animate-pulse h-64 rounded bg-muted" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {isError && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="border-dashed">
              <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                <BarChart3 className="mb-4 h-12 w-12 text-muted-foreground" />
                <h3 className="text-lg font-semibold">Unable to load analytics</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  There was an error loading the analytics data. Please try again later.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {data?.data && <AnalyticsCharts data={data.data} />}
      </div>
    </>
  )
}
