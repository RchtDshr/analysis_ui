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
  conversion: 'text-green-600 dark:text-green-400',
  campaign: 'text-blue-600 dark:text-blue-400',
  alert: 'text-orange-600 dark:text-orange-400',
  user: 'text-purple-600 dark:text-purple-400',
  revenue: 'text-emerald-600 dark:text-emerald-400',
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
    }, 120000) // Update every 2 minutes

    return () => clearInterval(interval)
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-lg sm:text-xl">
          <Bell className="h-4 w-4 sm:h-5 sm:w-5" />
          <span>Real-time Activity</span>
        </CardTitle>
        <CardDescription className="text-sm">Live updates from your campaigns</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[250px] sm:h-[300px]">
          <div className="space-y-1">
            {activities.map((activity) => {
              const Icon = iconMap[activity.type]
              const colorClass = colorMap[activity.type]
              
              return (
                <div key={activity.id} className="flex items-start space-x-2 sm:space-x-3 p-2 sm:p-3 rounded-lg hover:bg-muted/50 transition-colors">
                  <div className={`flex-shrink-0 ${colorClass}`}>
                    <Icon className="h-3 w-3 sm:h-4 sm:w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-sm font-medium text-foreground">
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
