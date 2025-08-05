import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import type { ChartData } from '@/data/mockData'

interface RevenueChartProps {
  data: ChartData[]
}

export function RevenueChart({ data }: RevenueChartProps) {
  return (
    <Card className="col-span-full lg:col-span-2">
      <CardHeader>
        <CardTitle>Revenue Trend</CardTitle>
        <CardDescription>Monthly revenue and user acquisition</CardDescription>
      </CardHeader>
      <CardContent className="pl-2">
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis
              dataKey="name"
              className="text-sm"
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              className="text-sm"
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="rounded-lg border bg-background p-2 shadow-md">
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex flex-col">
                          <span className="text-[0.70rem] uppercase text-muted-foreground">
                            {label}
                          </span>
                          {payload.map((entry, index) => (
                            <span
                              key={index}
                              className="font-bold"
                              style={{ color: entry.color }}
                            >
                              {entry.name}: {entry.name === 'revenue' ? '$' : ''}{entry.value?.toLocaleString()}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )
                }
                return null
              }}
            />
            <Line
              type="monotone"
              dataKey="revenue"
              strokeWidth={2}
              stroke="#8884d8"
              fill="#8884d8"
              name="Revenue"
            />
            <Line
              type="monotone"
              dataKey="users"
              strokeWidth={2}
              stroke="#82ca9d"
              fill="#82ca9d"
              name="Users"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

interface ChannelChartProps {
  data: ChartData[]
}

export function ChannelChart({ data }: ChannelChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Channel Performance</CardTitle>
        <CardDescription>Revenue by marketing channel</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis
              dataKey="name"
              className="text-sm"
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              className="text-sm"
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="rounded-lg border bg-background p-2 shadow-md">
                      <div className="grid grid-cols-1 gap-2">
                        <span className="text-[0.70rem] uppercase text-muted-foreground">
                          {label}
                        </span>
                        <span className="font-bold" style={{ color: payload[0]?.color }}>
                          Revenue: ${payload[0]?.value?.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  )
                }
                return null
              }}
            />
            <Bar dataKey="value" fill="#8884d8" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

interface DeviceChartProps {
  data: ChartData[]
}

const COLORS = ['#8884d8', '#82ca9d', '#ffc658']

export function DeviceChart({ data }: DeviceChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Device Usage</CardTitle>
        <CardDescription>Traffic distribution by device type</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="rounded-lg border bg-background p-2 shadow-md">
                      <div className="grid grid-cols-1 gap-2">
                        <span className="font-bold" style={{ color: payload[0]?.color }}>
                          {payload[0]?.name}: {payload[0]?.value}%
                        </span>
                      </div>
                    </div>
                  )
                }
                return null
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
