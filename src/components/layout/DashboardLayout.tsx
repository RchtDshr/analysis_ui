import { useState, useCallback } from 'react'
import { 
  BarChart3, 
  Users, 
  DollarSign, 
  TrendingUp, 
  Target,
  Bell,
  Search,
  Menu,
  X
} from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ThemeToggle } from '@/components/ThemeToggle'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface DashboardLayoutProps {
  children: React.ReactNode
}

// Search terms mapped to section IDs
const sectionSearchMap = {
  'channel performance': 'channel-chart',
  // 'channel revenue': 'channel-chart',
  'channel': 'channel-chart',
  'revenue': 'revenue-chart',
  'revenue trend': 'revenue-chart',
  'device': 'device-chart',
  'device usage': 'device-chart',
  'real time': 'activity-feed',
  'activity': 'activity-feed',
  'device performance': 'device-chart',
  'real time activity': 'activity-feed',
  'activity feed': 'activity-feed',
  'recent activity': 'activity-feed',
  'campaign performance': 'campaigns-table',
  'campaign table': 'campaigns-table',
  'campaigns': 'campaigns-table',
  'table': 'campaigns-table',
  'metrics': 'metrics-grid',
  'overview': 'metrics-grid',
  'charts': 'charts-section',
  'analytics': 'charts-section'
}

const navigation = [
  { name: 'Overview', href: '/', icon: BarChart3 },
  { name: 'Analytics', href: '/analytics', icon: TrendingUp },
  { name: 'Campaigns', href: '/campaigns', icon: Target },
  { name: 'Users', href: '/users', icon: Users },
  { name: 'Revenue', href: '/revenue', icon: DollarSign },
]

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const location = useLocation()

  const handleSearch = useCallback((searchValue: string) => {
    if (!searchValue.trim()) return

    const lowerSearchValue = searchValue.toLowerCase()
    
    // Find matching section - prioritize exact matches first, then partial matches
    const exactMatch = Object.entries(sectionSearchMap).find(([searchKey]) => 
      searchKey === lowerSearchValue
    )
    
    const partialMatch = Object.entries(sectionSearchMap).find(([searchKey]) => 
      lowerSearchValue.includes(searchKey) || searchKey.includes(lowerSearchValue)
    )
    
    const matchingSection = exactMatch || partialMatch

    if (matchingSection) {
      const [searchKey, sectionId] = matchingSection
      console.log(`Searching for: "${lowerSearchValue}" -> Found: "${searchKey}" -> Target: "${sectionId}"`)
      
      const element = document.getElementById(sectionId)
      
      if (element) {
        // Calculate offset for navbar (header height + some padding)
        const navbarHeight = 80 // header height + extra space
        const elementTop = element.getBoundingClientRect().top + window.pageYOffset - navbarHeight
        
        // Smooth scroll to the element with proper offset
        window.scrollTo({
          top: elementTop,
          behavior: 'smooth'
        })
        
        // Optional: Add a highlight effect
        element.classList.add('ring-2', 'ring-primary', 'ring-opacity-50')
        setTimeout(() => {
          element.classList.remove('ring-2', 'ring-primary', 'ring-opacity-50')
        }, 2000)
      } else {
        console.log(`Element with ID "${sectionId}" not found`)
      }
    } else {
      console.log(`No match found for: "${lowerSearchValue}"`)
    }
  }, [])

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSearch(searchTerm)
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchTerm(value)
    
    // Optional: Search as you type (with debouncing in real implementation)
    if (value.length > 3) {
      handleSearch(value)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 z-40 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`}>
        <div 
          className="fixed inset-0 bg-black/25 dark:bg-black/50"
          onClick={() => setSidebarOpen(false)}
        />
        <div className="fixed inset-y-0 left-0 z-40 w-64 bg-card border-r border-border shadow-xl">
          <div className="flex h-16 items-center justify-between px-6 border-b border-border">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center shadow-sm">
                <BarChart3 className="w-5 h-5 text-black dark:text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">ADmyBRAND</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(false)}
              className="hover:bg-accent hover:text-accent-foreground"
            >
              <X className="h-6 w-6" />
            </Button>
          </div>
          <nav className="px-4 py-6 space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.href
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`group flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-primary/10 dark:text-primary-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
                  }`}
                >
                  <Icon className={`w-5 h-5 transition-transform group-hover:scale-110 ${
                    isActive ? 'dark:text-primary-foreground' : 'text-muted-foreground group-hover:text-foreground'
                  }`} />
                  <span>{item.name}</span>
                </Link>
              )
            })}
          </nav>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-20 lg:w-64 lg:bg-card lg:border-r lg:border-border lg:flex lg:flex-col lg:shadow-sm">
        <div className="flex h-16 items-center px-6 border-b border-border">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center shadow-sm">
              <BarChart3 className="w-5 h-5 dark:text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">ADmyBRAND</span>
          </div>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.href
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`group flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-primary/10 dark:text-primary-foreground shadow-sm text-black'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
                }`}
              >
                <Icon className={`w-5 h-5 transition-transform group-hover:scale-110 ${
                  isActive ? 'text-black dark:text-primary-foreground' : 'text-muted-foreground group-hover:text-foreground'
                }`} />
                <span>{item.name}</span>
              </Link>
            )
          })}
        </nav>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top navigation */}
        <header className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b w-full lg:w-[calc(100vw-18rem)]">
          <div className="flex h-16 items-center justify-between px-6">
            <div className="flex items-center space-x-2 sm:space-x-4">
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="h-6 w-6" />
              </Button>
              <div className="relative w-48 sm:w-64">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <form onSubmit={handleSearchSubmit}>
                  <Input
                    placeholder="Search: device, channel, revenue, activity, campaigns..."
                    className="pl-10 text-sm"
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                </form>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 sm:space-x-4">
              <Button variant="outline" size="icon" className="relative">
                <Bell className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-destructive rounded-full text-[10px] text-destructive-foreground flex items-center justify-center">
                  3
                </span>
              </Button>
              
              <ThemeToggle />
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="relative h-8 w-8 rounded-full">
                    <div className="h-8 w-8 rounded-full flex items-center justify-center">
                      <span className="text-xs sm:text-sm font-medium dark:text-primary-foreground">JD</span>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">John Doe</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        john@admybrand.com
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuItem>Team</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Log out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 sm:p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
