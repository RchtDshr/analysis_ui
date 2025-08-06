import { useState, useEffect } from 'react'
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
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [channelFilter, setChannelFilter] = useState<string>('all')
  const itemsPerPage = 5

  // Get unique values for filters
  const uniqueStatuses = Array.from(new Set(data.map(item => item.status)))
  const uniqueChannels = Array.from(new Set(data.map(item => item.channel)))

  // Reset to first page when search term changes
  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm])

  // Filter data based on search term and filters
  const filteredData = data.filter((campaign) => {
    const matchesSearch = campaign.campaign.toLowerCase().includes(searchTerm.toLowerCase()) ||
      campaign.channel.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || campaign.status === statusFilter
    const matchesChannel = channelFilter === 'all' || campaign.channel === channelFilter
    
    return matchesSearch && matchesStatus && matchesChannel
  })

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

  const handleFilterChange = (type: 'status' | 'channel', value: string, event?: React.MouseEvent) => {
    // Prevent dropdown from closing
    if (event) {
      event.preventDefault()
      event.stopPropagation()
    }
    
    setCurrentPage(1) // Reset to first page when filters change
    if (type === 'status') {
      // If clicking the same filter, deselect it
      setStatusFilter(statusFilter === value ? 'all' : value)
    } else {
      // If clicking the same filter, deselect it
      setChannelFilter(channelFilter === value ? 'all' : value)
    }
  }

  const handleExportCSV = () => {
    const headers = ['Campaign', 'Channel', 'Impressions', 'Clicks', 'CTR', 'Conversions', 'Revenue', 'Status']
    const csvContent = [
      headers.join(','),
      ...filteredData.map(row => [
        `"${row.campaign}"`,
        `"${row.channel}"`,
        row.impressions,
        row.clicks,
        row.ctr.toFixed(2),
        row.conversions,
        row.revenue,
        `"${row.status}"`
      ].join(','))
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `campaigns-${new Date().toISOString().split('T')[0]}.csv`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
  }

  const clearFilters = () => {
    setStatusFilter('all')
    setChannelFilter('all')
    setSearchTerm('')
    setCurrentPage(1)
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
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className={`w-full sm:w-auto ${(statusFilter !== 'all' || channelFilter !== 'all') ? 'border-primary text-primary' : ''}`}
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                  {(statusFilter !== 'all' || channelFilter !== 'all') && (
                    <span className="ml-2 bg-primary text-primary-foreground rounded-full px-1.5 py-0.5 text-xs font-medium">
                      {[statusFilter !== 'all' ? 1 : 0, channelFilter !== 'all' ? 1 : 0].reduce((a, b) => a + b)}
                    </span>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 max-h-80 overflow-y-auto">
                <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                <DropdownMenuItem
                  onSelect={(e) => e.preventDefault()}
                  onClick={(e) => handleFilterChange('status', 'all', e)}
                  className={statusFilter === 'all' ? 'bg-primary/10 text-primary font-medium' : ''}
                >
                  All Statuses
                  {statusFilter === 'all' && <span className="ml-auto">✓</span>}
                </DropdownMenuItem>
                {uniqueStatuses.map((status) => (
                  <DropdownMenuItem
                    key={status}
                    onSelect={(e) => e.preventDefault()}
                    onClick={(e) => handleFilterChange('status', status, e)}
                    className={statusFilter === status ? 'bg-primary/10 text-primary font-medium' : ''}
                  >
                    <span className="capitalize">{status}</span>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuLabel>Filter by Channel</DropdownMenuLabel>
                <DropdownMenuItem
                  onSelect={(e) => e.preventDefault()}
                  onClick={(e) => handleFilterChange('channel', 'all', e)}
                  className={channelFilter === 'all' ? 'bg-primary/10 text-primary font-medium' : ''}
                >
                  All Channels
                </DropdownMenuItem>
                {uniqueChannels.map((channel) => (
                  <DropdownMenuItem
                    key={channel}
                    onSelect={(e) => e.preventDefault()}
                    onClick={(e) => handleFilterChange('channel', channel, e)}
                    className={channelFilter === channel ? 'bg-primary/10 text-primary font-medium' : ''}
                  >
                    {channel}
                  </DropdownMenuItem>
                ))}
                {(statusFilter !== 'all' || channelFilter !== 'all') && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      onClick={clearFilters}
                      className="text-destructive hover:text-destructive"
                    >
                      Clear All Filters
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="outline" size="sm" className="w-full sm:w-auto" onClick={handleExportCSV}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search campaigns..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          {(searchTerm || statusFilter !== 'all' || channelFilter !== 'all') && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>
                {filteredData.length} of {data.length} campaigns
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="h-8 px-2 text-xs"
              >
                Clear all
              </Button>
            </div>
          )}
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
