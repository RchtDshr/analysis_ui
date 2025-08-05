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
    <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {metric.title}
        </CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{metric.value}</div>
        <div className="flex items-center space-x-1 text-xs text-muted-foreground mt-1">
          {isPositive ? (
            <TrendingUp className="h-3 w-3 text-green-500" />
          ) : (
            <TrendingDown className="h-3 w-3 text-red-500" />
          )}
          <span className={isPositive ? 'text-green-500' : 'text-red-500'}>
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
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric) => (
        <MetricCard key={metric.id} metric={metric} />
      ))}
    </div>
  )
}
