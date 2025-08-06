import { useState } from 'react'
import {
  ChevronDown,
  ChevronUp,
  Search,
  Filter,
  Download,
  MoreHorizontal,
  Play,
  Pause,
  Eye
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import type { TableData } from '@/data/mockData'

interface CampaignsTableProps {
  data: TableData[]
}

type SortField = keyof TableData
type SortDirection = 'asc' | 'desc'

export function CampaignsTable({ data }: CampaignsTableProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [sortField, setSortField] = useState<SortField>('revenue')
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  // Filter data based on search term
  const filteredData = data.filter(
    (campaign) =>
      campaign.campaign.toLowerCase().includes(searchTerm.toLowerCase()) ||
      campaign.channel.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Sort data
  const sortedData = [...filteredData].sort((a, b) => {
    const aValue = a[sortField]
    const bValue = b[sortField]
    
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortDirection === 'asc' 
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue)
    }
    
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortDirection === 'asc' ? aValue - bValue : bValue - aValue
    }
    
    return 0
  })

  // Paginate data
  const totalPages = Math.ceil(sortedData.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedData = sortedData.slice(startIndex, startIndex + itemsPerPage)

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('desc')
    }
  }

  const getStatusBadge = (status: string) => {
    const baseClasses = "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium"
    switch (status) {
      case 'active':
        return `${baseClasses} bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400`
      case 'paused':
        return `${baseClasses} bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400`
      case 'completed':
        return `${baseClasses} bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400`
      default:
        return `${baseClasses} bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400`
    }
  }

  const SortableHeader = ({ field, children, className }: { field: SortField; children: React.ReactNode; className?: string }) => (
    <TableHead className={className}>
      <Button
        variant="ghost"
        className="h-auto p-0 font-medium hover:bg-transparent"
        onClick={() => handleSort(field)}
      >
        {children}
        {sortField === field && (
          sortDirection === 'asc' ? 
          <ChevronUp className="ml-2 h-4 w-4" /> : 
          <ChevronDown className="ml-2 h-4 w-4" />
        )}
      </Button>
    </TableHead>
  )

  return (
    <Card className="col-span-full">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <CardTitle className="text-lg sm:text-xl">Campaign Performance</CardTitle>
            <CardDescription className="text-sm">Detailed analytics for all marketing campaigns</CardDescription>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
            <Button variant="outline" size="sm" className="w-full sm:w-auto">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
            <Button variant="outline" size="sm" className="w-full sm:w-auto">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search campaigns..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <SortableHeader field="campaign">Campaign</SortableHeader>
                <SortableHeader field="channel">Channel</SortableHeader>
                <SortableHeader field="impressions" className="hidden sm:table-cell">Impressions</SortableHeader>
                <SortableHeader field="clicks">Clicks</SortableHeader>
                <SortableHeader field="ctr" className="hidden md:table-cell">CTR</SortableHeader>
                <SortableHeader field="conversions" className="hidden sm:table-cell">Conversions</SortableHeader>
                <SortableHeader field="revenue">Revenue</SortableHeader>
                <SortableHeader field="status">Status</SortableHeader>
                <TableHead className="w-[70px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.map((campaign) => (
                <TableRow key={campaign.id} className="hover:bg-muted/50">
                  <TableCell className="font-medium min-w-[150px]">{campaign.campaign}</TableCell>
                  <TableCell className="min-w-[120px]">{campaign.channel}</TableCell>
                  <TableCell className="hidden sm:table-cell">{campaign.impressions.toLocaleString()}</TableCell>
                  <TableCell>{campaign.clicks.toLocaleString()}</TableCell>
                  <TableCell className="hidden md:table-cell">{campaign.ctr.toFixed(2)}%</TableCell>
                  <TableCell className="hidden sm:table-cell">{campaign.conversions.toLocaleString()}</TableCell>
                  <TableCell className="font-medium">${campaign.revenue.toLocaleString()}</TableCell>
                  <TableCell>
                    <span className={getStatusBadge(campaign.status)}>
                      {campaign.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          View details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          {campaign.status === 'active' ? (
                            <>
                              <Pause className="mr-2 h-4 w-4" />
                              Pause campaign
                            </>
                          ) : (
                            <>
                              <Play className="mr-2 h-4 w-4" />
                              Resume campaign
                            </>
                          )}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Edit campaign</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          Delete campaign
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        {/* Pagination */}
        <div className="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0 sm:space-x-2 py-4">
          <div className="text-xs sm:text-sm text-muted-foreground order-2 sm:order-1">
            Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, sortedData.length)} of {sortedData.length} results
          </div>
          <div className="flex items-center space-x-1 sm:space-x-2 order-1 sm:order-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-2 sm:px-3"
            >
              Previous
            </Button>
            <div className="hidden sm:flex items-center space-x-1">
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                const page = i + 1
                return (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(page)}
                    className="w-8"
                  >
                    {page}
                  </Button>
                )
              })}
            </div>
            <div className="sm:hidden text-xs text-muted-foreground px-2">
              {currentPage} of {totalPages}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-2 sm:px-3"
            >
              Next
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
