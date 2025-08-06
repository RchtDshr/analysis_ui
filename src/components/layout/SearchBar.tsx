import { useState, useCallback } from 'react'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'

interface SearchBarProps {
  className?: string
}

// Search terms mapped to section IDs
const sectionSearchMap = {
  'channel performance': 'channel-chart',
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

export function SearchBar({ className }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState('')

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
    <div className={`relative ${className}`}>
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
  )
}
