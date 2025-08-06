import { 
  BarChart3, 
  Users, 
  DollarSign, 
  TrendingUp, 
  Target,
  X
} from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/button'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
  isMobile?: boolean
}

const navigation = [
  { name: 'Overview', href: '/', icon: BarChart3 },
  { name: 'Analytics', href: '/analytics', icon: TrendingUp },
  { name: 'Campaigns', href: '/campaigns', icon: Target },
  { name: 'Users', href: '/users', icon: Users },
  { name: 'Revenue', href: '/revenue', icon: DollarSign },
]

export function Sidebar({ isOpen, onClose, isMobile = false }: SidebarProps) {
  const location = useLocation()

  const sidebarContent = (
    <>
      <div className="flex h-16 items-center justify-between px-4 border-b border-border">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center shadow-sm">
            <BarChart3 className="w-5 h-5 text-black dark:text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-foreground">ADmyBRAND</span>
        </div>
        {isMobile && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="hover:bg-accent hover:text-accent-foreground"
          >
            <X className="h-6 w-6" />
          </Button>
        )}
      </div>
      <nav className={`${isMobile ? 'px-4 py-6' : 'flex-1 px-4 py-6'} space-y-1`}>
        {navigation.map((item) => {
          const Icon = item.icon
          const isActive = location.pathname === item.href
          return (
            <Link
              key={item.name}
              to={item.href}
              onClick={isMobile ? onClose : undefined}
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
    </>
  )

  if (isMobile) {
    return (
      <div className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ease-in-out ${
        isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}>
        <div 
          className={`fixed inset-0 bg-black/25 dark:bg-black/50 transition-opacity duration-300 ease-in-out ${
            isOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={onClose}
        />
        <div className={`fixed inset-y-0 left-0 z-40 w-64 bg-card border-r border-border shadow-xl transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
          {sidebarContent}
        </div>
      </div>
    )
  }

  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-20 lg:w-64 lg:bg-card lg:border-r lg:border-border lg:flex lg:flex-col lg:shadow-sm">
      {sidebarContent}
    </div>
  )
}
