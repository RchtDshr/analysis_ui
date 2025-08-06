import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/ThemeToggle'
import { SearchBar } from './SearchBar'
import { UserProfile } from './UserProfile'

interface HeaderProps {
  onMenuClick: () => void
}

export function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b w-screen lg:w-[calc(100vw-18rem)]">
      <div className="flex h-16 items-center justify-between px-2 md:px-6">
        <div className="flex items-center space-x-2 sm:space-x-4">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={onMenuClick}
          >
            <Menu className="h-6 w-6" />
          </Button>
          <SearchBar className="w-48 sm:w-64" />
        </div>
        
        <div className="flex items-center space-x-2 sm:space-x-4">
          <ThemeToggle />
          <UserProfile />
        </div>
      </div>
    </header>
  )
}
