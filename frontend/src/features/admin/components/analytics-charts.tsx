import { motion } from 'motion/react'
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  FunnelChart,
  Funnel,
  LabelList,
} from 'recharts'
import { Card, CardContent, CardHeader, CardTitle, Progress } from '@/lib/ui'
import { TrendingUp, Users, FolderKanban, Target, ArrowDownRight } from 'lucide-react'
import type { AnalyticsData } from '../api/analytics-api'

const LEAD_STATUS_COLORS = {
  new: '#3b82f6',
  contacted: '#6b7280',
  qualified: '#eab308',
  converted: '#22c55e',
  lost: '#ef4444',
}

const PROJECT_STATUS_COLORS = {
  planning: '#8b5cf6',
  in_progress: '#3b82f6',
  on_hold: '#f59e0b',
  completed: '#22c55e',
  cancelled: '#ef4444',
}

interface AnalyticsChartsProps {
  data: AnalyticsData
}

export function LeadFunnelChart({ data }: { data: AnalyticsData['leads'] }) {
  const funnelData = [
    { name: 'New', value: data.byStatus.new, fill: LEAD_STATUS_COLORS.new },
    { name: 'Contacted', value: data.byStatus.contacted, fill: LEAD_STATUS_COLORS.contacted },
    { name: 'Qualified', value: data.byStatus.qualified, fill: LEAD_STATUS_COLORS.qualified },
    { name: 'Converted', value: data.byStatus.converted, fill: LEAD_STATUS_COLORS.converted },
  ].filter(item => item.value > 0)

  if (funnelData.length === 0) {
    return (
      <div className="flex h-[300px] items-center justify-center text-muted-foreground">
        No lead data available
      </div>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <FunnelChart>
        <Tooltip
          contentStyle={{
            backgroundColor: 'hsl(var(--card))',
            border: '1px solid hsl(var(--border))',
            borderRadius: '8px',
          }}
        />
        <Funnel dataKey="value" data={funnelData} isAnimationActive>
          <LabelList position="right" fill="#888" stroke="none" dataKey="name" />
          <LabelList position="center" fill="#fff" stroke="none" dataKey="value" />
        </Funnel>
      </FunnelChart>
    </ResponsiveContainer>
  )
}

export function LeadStatusPieChart({ data }: { data: AnalyticsData['leads'] }) {
  const pieData = Object.entries(data.byStatus)
    .filter(([_, value]) => value > 0)
    .map(([name, value]) => ({
      name: name.charAt(0).toUpperCase() + name.slice(1).replace('_', ' '),
      value,
      fill: LEAD_STATUS_COLORS[name as keyof typeof LEAD_STATUS_COLORS],
    }))

  if (pieData.length === 0) {
    return (
      <div className="flex h-[250px] items-center justify-center text-muted-foreground">
        No lead data available
      </div>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={250}>
      <PieChart>
        <Pie
          data={pieData}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          paddingAngle={5}
          dataKey="value"
        >
          {pieData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.fill} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            backgroundColor: 'hsl(var(--card))',
            border: '1px solid hsl(var(--border))',
            borderRadius: '8px',
          }}
        />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  )
}

export function ProjectStatusBarChart({ data }: { data: AnalyticsData['projects'] }) {
  const barData = Object.entries(data.byStatus)
    .filter(([_, value]) => value > 0)
    .map(([name, value]) => ({
      name: name.charAt(0).toUpperCase() + name.slice(1).replace('_', ' '),
      value,
      fill: PROJECT_STATUS_COLORS[name as keyof typeof PROJECT_STATUS_COLORS],
    }))

  if (barData.length === 0) {
    return (
      <div className="flex h-[250px] items-center justify-center text-muted-foreground">
        No project data available
      </div>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={barData} layout="vertical">
        <XAxis type="number" />
        <YAxis type="category" dataKey="name" width={100} />
        <Tooltip
          contentStyle={{
            backgroundColor: 'hsl(var(--card))',
            border: '1px solid hsl(var(--border))',
            borderRadius: '8px',
          }}
        />
        <Bar dataKey="value" radius={[0, 4, 4, 0]}>
          {barData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.fill} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}

export function StatsOverviewCards({ data }: AnalyticsChartsProps) {
  const cards = [
    {
      title: 'Total Leads',
      value: data.leads.total,
      icon: Users,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
    },
    {
      title: 'Conversion Rate',
      value: `${data.leads.conversionRate}%`,
      icon: TrendingUp,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
    },
    {
      title: 'Active Projects',
      value: data.projects.byStatus.planning + data.projects.byStatus.in_progress,
      icon: FolderKanban,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
    },
    {
      title: 'Completion Rate',
      value: `${data.projects.completionRate}%`,
      icon: Target,
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/10',
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((card, index) => (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ y: -4 }}
        >
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{card.title}</p>
                  <p className="text-2xl font-bold">{card.value}</p>
                </div>
                <div className={`rounded-full p-3 ${card.bgColor}`}>
                  <card.icon className={`h-5 w-5 ${card.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}

export function LeadFunnelProgress({ data }: { data: AnalyticsData['leads'] }) {
  const total = data.total || 1
  const stages = [
    { name: 'New', value: data.byStatus.new, color: 'bg-blue-500' },
    { name: 'Contacted', value: data.byStatus.contacted, color: 'bg-gray-500' },
    { name: 'Qualified', value: data.byStatus.qualified, color: 'bg-yellow-500' },
    { name: 'Converted', value: data.byStatus.converted, color: 'bg-green-500' },
  ]

  return (
    <div className="space-y-4">
      {stages.map((stage, index) => {
        const percentage = Math.round((stage.value / total) * 100)
        return (
          <motion.div
            key={stage.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium">{stage.name}</span>
              <span className="text-sm text-muted-foreground">
                {stage.value} ({percentage}%)
              </span>
            </div>
            <div className="relative h-2 rounded-full bg-muted overflow-hidden">
              <motion.div
                className={`absolute inset-y-0 left-0 ${stage.color}`}
                initial={{ width: 0 }}
                animate={{ width: `${percentage}%` }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              />
            </div>
            {index < stages.length - 1 && (
              <div className="flex justify-center my-2">
                <ArrowDownRight className="h-4 w-4 text-muted-foreground" />
              </div>
            )}
          </motion.div>
        )
      })}
    </div>
  )
}

export function ProjectProgressCards({ data }: { data: AnalyticsData['projects'] }) {
  const statuses = [
    { name: 'Planning', value: data.byStatus.planning, color: 'bg-purple-500', textColor: 'text-purple-500' },
    { name: 'In Progress', value: data.byStatus.in_progress, color: 'bg-blue-500', textColor: 'text-blue-500' },
    { name: 'On Hold', value: data.byStatus.on_hold, color: 'bg-yellow-500', textColor: 'text-yellow-500' },
    { name: 'Completed', value: data.byStatus.completed, color: 'bg-green-500', textColor: 'text-green-500' },
    { name: 'Cancelled', value: data.byStatus.cancelled, color: 'bg-red-500', textColor: 'text-red-500' },
  ]

  const total = data.total || 1

  return (
    <div className="space-y-3">
      {statuses.map((status, index) => {
        const percentage = Math.round((status.value / total) * 100)
        return (
          <motion.div
            key={status.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="flex items-center gap-4"
          >
            <div className={`w-3 h-3 rounded-full ${status.color}`} />
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm">{status.name}</span>
                <span className={`text-sm font-medium ${status.textColor}`}>
                  {status.value}
                </span>
              </div>
              <Progress value={percentage} className="h-1.5" />
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}

export function AnalyticsCharts({ data }: AnalyticsChartsProps) {
  return (
    <div className="space-y-6">
      <StatsOverviewCards data={data} />

      <div className="grid gap-6 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Lead Funnel
              </CardTitle>
            </CardHeader>
            <CardContent>
              <LeadFunnelProgress data={data.leads} />
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Lead Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <LeadStatusPieChart data={data.leads} />
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FolderKanban className="h-5 w-5" />
                Project Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ProjectStatusBarChart data={data.projects} />
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Project Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ProjectProgressCards data={data.projects} />
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
