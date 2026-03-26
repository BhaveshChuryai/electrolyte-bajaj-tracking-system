import { useState, useMemo } from 'react'
import { Box, Typography, Grid } from '@mui/material'
import KPICards from '../components/dashboard/KPICards'
import Charts from '../components/dashboard/Charts'
import FilterBar from '../components/dashboard/FilterBar'
import DataTable from '../components/dashboard/DataTable'

// Master data — will come from API later
const ALL_DATA = [
  { id: 1, sparePart: 'SP001', component: 'Resistor', status: 'Active', count: 320, total: 1200 },
  { id: 2, sparePart: 'SP002', component: 'Capacitor', status: 'Pending', count: 150, total: 800 },
  { id: 3, sparePart: 'SP003', component: 'Transistor', status: 'Approved', count: 480, total: 2100 },
  { id: 4, sparePart: 'SP004', component: 'Diode', status: 'Inactive', count: 90, total: 450 },
  { id: 5, sparePart: 'SP005', component: 'IC Chip', status: 'Active', count: 560, total: 3200 },
  { id: 6, sparePart: 'SP006', component: 'Relay', status: 'Review', count: 210, total: 950 },
  { id: 7, sparePart: 'SP007', component: 'Fuse', status: 'Approved', count: 340, total: 1800 },
  { id: 8, sparePart: 'SP008', component: 'Transformer', status: 'Pending', count: 75, total: 600 },
  { id: 9, sparePart: 'SP009', component: 'Resistor', status: 'Active', count: 290, total: 1100 },
  { id: 10, sparePart: 'SP010', component: 'IC Chip', status: 'Inactive', count: 180, total: 750 },
  { id: 11, sparePart: 'SP011', component: 'Diode', status: 'Active', count: 410, total: 1900 },
  { id: 12, sparePart: 'SP012', component: 'Capacitor', status: 'Approved', count: 220, total: 980 },
]

function DashboardPage() {
  // Central filter state
  const [filters, setFilters] = useState({
    status: 'All',
    component: 'All',
    search: '',
  })

  // Filtered data — updates whenever filters change
  const filteredData = useMemo(() => {
    return ALL_DATA.filter(row => {
      const matchStatus = filters.status === 'All' || row.status === filters.status
      const matchComponent = filters.component === 'All' || row.component === filters.component
      const matchSearch = filters.search === '' ||
        row.sparePart.toLowerCase().includes(filters.search.toLowerCase()) ||
        row.component.toLowerCase().includes(filters.search.toLowerCase()) ||
        row.status.toLowerCase().includes(filters.search.toLowerCase())
      return matchStatus && matchComponent && matchSearch
    })
  }, [filters])

  // KPI calculations from filtered data
  const kpiData = useMemo(() => ({
    totalEntries: filteredData.length,
    totalCount: filteredData.reduce((sum, r) => sum + r.count, 0),
    totalComponents: [...new Set(filteredData.map(r => r.component))].length,
    statusTypes: [...new Set(filteredData.map(r => r.status))].length,
  }), [filteredData])

  // Chart data from filtered data
  const statusChartData = useMemo(() => {
    const grouped = {}
    filteredData.forEach(row => {
      grouped[row.status] = (grouped[row.status] || 0) + row.count
    })
    return Object.entries(grouped).map(([name, count]) => ({ name, count }))
  }, [filteredData])

  const componentChartData = useMemo(() => {
    const grouped = {}
    filteredData.forEach(row => {
      grouped[row.component] = (grouped[row.component] || 0) + row.count
    })
    return Object.entries(grouped).map(([name, value]) => ({ name, value }))
  }, [filteredData])

  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }))
  }

  const handleReset = () => {
    setFilters({ status: 'All', component: 'All', search: '' })
  }

  return (
    <Box>
      {/* Page Header */}
      <Box display="flex" justifyContent="space-between"
        alignItems="center" mb={3}>
        <Box>
          <Typography variant="h5" fontWeight="800"
            sx={{
              background: 'linear-gradient(135deg, #ffffff, #00b4ff)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
            PCB Data Dashboard
          </Typography>
          <Typography variant="caption"
            sx={{ color: 'rgba(255,255,255,0.35)' }}>
            Showing {filteredData.length} of {ALL_DATA.length} records
          </Typography>
        </Box>
      </Box>

      {/* KPI Cards — receives live calculated data */}
      <KPICards data={kpiData} />

      {/* Filter Bar — controls all filters */}
      <FilterBar
        filters={filters}
        onFilterChange={handleFilterChange}
        onReset={handleReset}
      />

      {/* Charts — receives filtered chart data */}
      <Charts
        statusData={statusChartData}
        componentData={componentChartData}
      />

      {/* Data Table — receives filtered rows */}
      <DataTable
        rows={filteredData}
        search={filters.search}
        onSearchChange={(val) => handleFilterChange({ search: val })}
      />

    </Box>
  )
}

export default DashboardPage

