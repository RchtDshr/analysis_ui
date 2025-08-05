import { ThemeProvider } from '@/contexts/ThemeContext'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { DashboardOverview } from '@/components/dashboard/DashboardOverview'

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="dashboard-ui-theme">
      <DashboardLayout>
        <DashboardOverview />
      </DashboardLayout>
    </ThemeProvider>
  )
}

export default App
