import { useEffect, useState } from 'react'
import { Bell, DollarSign, Users, Target, AlertTriangle, Activity } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { activityData, type ActivityItem } from '@/data/mockData'

const iconMap = {
  conversion: Target,
  campaign: Activity,
  alert: AlertTriangle,
  user: Users,
  revenue: DollarSign,
}

const colorMap = {
  conversion: 'text-green-500',
  campaign: 'text-blue-500',
  alert: 'text-yellow-500',
  user: 'text-purple-500',
  revenue: 'text-emerald-500',
}

export function ActivityFeed() {
  const [activities, setActivities] = useState<ActivityItem[]>(activityData)

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      const newActivity: ActivityItem = {
        id: Date.now().toString(),
        action: 'New conversion from organic search',
        time: 'Just now',
        type: 'conversion'
      }
      
      setActivities(prev => [newActivity, ...prev.slice(0, 9)]) // Keep only 10 most recent
    }, 30000) // Update every 30 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Bell className="h-5 w-5" />
          <span>Real-time Activity</span>
        </CardTitle>
        <CardDescription>Live updates from your campaigns</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px]">
          <div className="space-y-4">
            {activities.map((activity) => {
              const Icon = iconMap[activity.type]
              const colorClass = colorMap[activity.type]
              
              return (
                <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                  <div className={`flex-shrink-0 ${colorClass}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">
                      {activity.action}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {activity.time}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
