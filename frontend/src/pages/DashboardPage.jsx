import { Box, Typography } from '@mui/material'
import Navbar from '../components/common/Navbar'
import Sidebar from '../components/common/Sidebar'
import KPICards from '../components/dashboard/KPICards'
import Charts from '../components/dashboard/Charts'
import DataTable from '../components/dashboard/DataTable'
import FilterBar from '../components/dashboard/FilterBar'

function DashboardPage() {
  return (
    <Box sx={{ display: 'flex', background: '#0a0f1e', minHeight: '100vh' }}>

      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <Box sx={{ flexGrow: 1, overflow: 'auto' }}>

        {/* Navbar */}
        <Navbar />

        {/* Page content */}
        <Box sx={{ p: 3 }}>

          {/* Page title */}
          <Typography variant="h5" fontWeight="800" mb={3}
            sx={{
              background: 'linear-gradient(135deg, #ffffff, #00b4ff)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
            PCB Data Dashboard
          </Typography>

          {/* KPI Cards */}
          <KPICards />

          {/* Filter Bar */}
          <FilterBar />

          {/* Charts */}
          <Charts />

          {/* Data Table */}
          <DataTable />

        </Box>
      </Box>
    </Box>
  )
}

export default DashboardPage
