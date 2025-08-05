export interface MetricData {
  id: string
  title: string
  value: string
  change: number
  trend: 'up' | 'down'
  icon: string
}

export interface ChartData {
  name: string
  value?: number
  revenue?: number
  users?: number
  conversions?: number
  date?: string
}

export interface TableData {
  id: string
  campaign: string
  channel: string
  impressions: number
  clicks: number
  conversions: number
  revenue: number
  ctr: number
  status: 'active' | 'paused' | 'completed'
}

// Key Metrics Mock Data
export const keyMetrics: MetricData[] = [
  {
    id: '1',
    title: 'Total Revenue',
    value: '$284,532',
    change: 12.5,
    trend: 'up',
    icon: 'DollarSign'
  },
  {
    id: '2',
    title: 'Active Users',
    value: '18,293',
    change: 8.2,
    trend: 'up',
    icon: 'Users'
  },
  {
    id: '3',
    title: 'Conversions',
    value: '2,847',
    change: -3.1,
    trend: 'down',
    icon: 'Target'
  },
  {
    id: '4',
    title: 'Growth Rate',
    value: '23.8%',
    change: 5.4,
    trend: 'up',
    icon: 'TrendingUp'
  }
]

// Revenue Chart Data (Line Chart)
export const revenueData: ChartData[] = [
  { name: 'Jan', revenue: 45000, users: 2400, conversions: 240 },
  { name: 'Feb', revenue: 52000, users: 1398, conversions: 221 },
  { name: 'Mar', revenue: 48000, users: 9800, conversions: 229 },
  { name: 'Apr', revenue: 61000, users: 3908, conversions: 290 },
  { name: 'May', revenue: 55000, users: 4800, conversions: 281 },
  { name: 'Jun', revenue: 67000, users: 3800, conversions: 350 },
  { name: 'Jul', revenue: 72000, users: 4300, conversions: 380 },
  { name: 'Aug', revenue: 68000, users: 4200, conversions: 365 },
  { name: 'Sep', revenue: 75000, users: 4500, conversions: 395 },
  { name: 'Oct', revenue: 82000, users: 4800, conversions: 425 },
  { name: 'Nov', revenue: 78000, users: 4600, conversions: 410 },
  { name: 'Dec', revenue: 85000, users: 5000, conversions: 450 }
]

// Channel Performance Data (Bar Chart)
export const channelData: ChartData[] = [
  { name: 'Organic Search', value: 45230 },
  { name: 'Paid Search', value: 38120 },
  { name: 'Social Media', value: 28450 },
  { name: 'Email', value: 22100 },
  { name: 'Direct', value: 19800 },
  { name: 'Referral', value: 15600 }
]

// Device Usage Data (Pie Chart)
export const deviceData: ChartData[] = [
  { name: 'Desktop', value: 45 },
  { name: 'Mobile', value: 38 },
  { name: 'Tablet', value: 17 }
]

// Campaigns Table Data
export const campaignData: TableData[] = [
  {
    id: '1',
    campaign: 'Summer Sale 2024',
    channel: 'Google Ads',
    impressions: 125420,
    clicks: 8934,
    conversions: 423,
    revenue: 45230,
    ctr: 7.12,
    status: 'active'
  },
  {
    id: '2',
    campaign: 'Brand Awareness Q4',
    channel: 'Facebook Ads',
    impressions: 98765,
    clicks: 6543,
    conversions: 287,
    revenue: 32150,
    ctr: 6.62,
    status: 'active'
  },
  {
    id: '3',
    campaign: 'Black Friday Promo',
    channel: 'Instagram Ads',
    impressions: 156890,
    clicks: 12456,
    conversions: 678,
    revenue: 68990,
    ctr: 7.94,
    status: 'completed'
  },
  {
    id: '4',
    campaign: 'Holiday Collection',
    channel: 'YouTube Ads',
    impressions: 89012,
    clicks: 5234,
    conversions: 234,
    revenue: 28450,
    ctr: 5.88,
    status: 'active'
  },
  {
    id: '5',
    campaign: 'New Product Launch',
    channel: 'LinkedIn Ads',
    impressions: 45678,
    clicks: 3421,
    conversions: 156,
    revenue: 18900,
    ctr: 7.49,
    status: 'paused'
  },
  {
    id: '6',
    campaign: 'Retargeting Campaign',
    channel: 'Display Network',
    impressions: 234567,
    clicks: 15678,
    conversions: 789,
    revenue: 56780,
    ctr: 6.68,
    status: 'active'
  },
  {
    id: '7',
    campaign: 'Mobile App Install',
    channel: 'TikTok Ads',
    impressions: 345678,
    clicks: 23456,
    conversions: 1234,
    revenue: 89012,
    ctr: 6.78,
    status: 'active'
  },
  {
    id: '8',
    campaign: 'Local Business Promo',
    channel: 'Google Local',
    impressions: 67890,
    clicks: 4567,
    conversions: 234,
    revenue: 23450,
    ctr: 6.73,
    status: 'active'
  }
]

// Real-time activity data
export const activityData: ActivityItem[] = [
  { id: '1', action: 'New conversion from Google Ads', time: '2 minutes ago', type: 'conversion' },
  { id: '2', action: 'Campaign "Summer Sale" paused', time: '5 minutes ago', type: 'campaign' },
  { id: '3', action: 'Budget threshold reached for Facebook Ads', time: '12 minutes ago', type: 'alert' },
  { id: '4', action: 'New user registered via email campaign', time: '18 minutes ago', type: 'user' },
  { id: '5', action: 'High-value transaction detected', time: '23 minutes ago', type: 'revenue' }
]

export interface ActivityItem {
  id: string
  action: string
  time: string
  type: 'conversion' | 'campaign' | 'alert' | 'user' | 'revenue'
}

// Generate random data for real-time updates
export const generateRandomMetric = (baseValue: number, variance: number = 0.1): number => {
  const change = (Math.random() - 0.5) * variance * baseValue
  return Math.round((baseValue + change) * 100) / 100
}

export const getRandomColor = (): string => {
  const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#00ff88', '#ff6b6b']
  return colors[Math.floor(Math.random() * colors.length)]
}
