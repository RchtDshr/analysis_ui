import { useState } from 'react'
import { Sidebar } from './Sidebar'
import { Header } from './Header'

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile sidebar */}
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
        isMobile={true} 
      />

      {/* Desktop sidebar */}
      <Sidebar 
        isOpen={true} 
        onClose={() => {}} 
        isMobile={false} 
      />

      {/* Main content */}
      <div className="lg:pl-64 w-screen lg:w-full">
        {/* Top navigation */}
        <Header onMenuClick={() => setSidebarOpen(true)} />

        {/* Page content */}
        <main className="p-4 sm:p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
