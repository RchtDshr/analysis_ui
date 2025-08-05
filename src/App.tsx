import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { DashboardOverview } from '@/components/dashboard/DashboardOverview'

// Placeholder components for other routes
function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
      <p className="text-muted-foreground">Advanced analytics and insights coming soon...</p>
    </div>
  )
}

function CampaignsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Campaigns</h1>
      <p className="text-muted-foreground">Campaign management interface coming soon...</p>
    </div>
  )
}

function UsersPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Users</h1>
      <p className="text-muted-foreground">User analytics and management coming soon...</p>
    </div>
  )
}

function RevenuePage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Revenue</h1>
      <p className="text-muted-foreground">Revenue tracking and analysis coming soon...</p>
    </div>
  )
}

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="dashboard-ui-theme">
      <Router>
        <DashboardLayout>
          <Routes>
            <Route path="/" element={<DashboardOverview />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/campaigns" element={<CampaignsPage />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/revenue" element={<RevenuePage />} />
          </Routes>
        </DashboardLayout>
      </Router>
    </ThemeProvider>
  )
}

export default App
