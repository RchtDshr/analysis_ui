import { DollarSign, Users, Target, TrendingUp, TrendingDown } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { MetricData } from '@/data/mockData'

interface MetricCardProps {
  metric: MetricData
}

const iconMap = {
  DollarSign,
  Users,
  Target,
  TrendingUp,
}

export function MetricCard({ metric }: MetricCardProps) {
  const Icon = iconMap[metric.icon as keyof typeof iconMap] || TrendingUp
  const isPositive = metric.trend === 'up'

  return (
    <Card className="hover:shadow-lg transition-all duration-300 hover:scale-[1.02] border-0 shadow-sm bg-card">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {metric.title}
        </CardTitle>
        <div className="p-2 bg-primary/10 rounded-lg">
          <Icon className="h-4 w-4 text-primary" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground">{metric.value}</div>
        <div className="flex items-center space-x-1 text-xs text-muted-foreground mt-1">
          {isPositive ? (
            <TrendingUp className="h-3 w-3 text-green-600 dark:text-green-400" />
          ) : (
            <TrendingDown className="h-3 w-3 text-red-600 dark:text-red-400" />
          )}
          <span className={isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}>
            {isPositive ? '+' : ''}{metric.change}%
          </span>
          <span>from last month</span>
        </div>
      </CardContent>
    </Card>
  )
}

interface MetricsGridProps {
  metrics: MetricData[]
}

export function MetricsGrid({ metrics }: MetricsGridProps) {
  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric) => (
        <MetricCard key={metric.id} metric={metric} />
      ))}
    </div>
  )
}
