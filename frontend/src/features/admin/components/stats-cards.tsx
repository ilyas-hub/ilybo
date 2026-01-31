import { motion } from 'motion/react'
import { Card, CardContent, CardHeader, CardTitle } from '@/lib/ui'
import { Users, FolderKanban, TrendingUp, CheckCircle } from 'lucide-react'
import { useDashboardStats } from '../hooks'
import { fadeInUp, createStaggerDelay } from '@/lib/animations'

export function StatsCards() {
  const { data, isLoading } = useDashboardStats()

  const stats = data?.data

  const cards = [
    {
      title: 'Total Leads',
      value: stats?.leads.total ?? 0,
      description: `${stats?.leads.new ?? 0} new this month`,
      icon: Users,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
    },
    {
      title: 'Conversion Rate',
      value: `${stats?.leads.conversionRate ?? 0}%`,
      description: `${stats?.leads.converted ?? 0} converted`,
      icon: TrendingUp,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
    },
    {
      title: 'Active Projects',
      value: stats?.projects.active ?? 0,
      description: `${stats?.projects.total ?? 0} total projects`,
      icon: FolderKanban,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
    },
    {
      title: 'Completed',
      value: stats?.projects.completed ?? 0,
      description: 'Projects delivered',
      icon: CheckCircle,
      color: 'text-emerald-500',
      bgColor: 'bg-emerald-500/10',
    },
  ]

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="h-4 w-24 animate-pulse rounded bg-muted" />
              <div className="h-4 w-4 animate-pulse rounded bg-muted" />
            </CardHeader>
            <CardContent>
              <div className="h-8 w-16 animate-pulse rounded bg-muted" />
              <div className="mt-1 h-3 w-32 animate-pulse rounded bg-muted" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((card, index) => (
        <motion.div
          key={card.title}
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.3, ...createStaggerDelay(index, 0, 0.1) }}
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
        >
          <Card className="transition-shadow hover:shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
              <div className={`rounded-full p-2 ${card.bgColor}`}>
                <card.icon className={`h-4 w-4 ${card.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
              <p className="text-xs text-muted-foreground">{card.description}</p>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}
