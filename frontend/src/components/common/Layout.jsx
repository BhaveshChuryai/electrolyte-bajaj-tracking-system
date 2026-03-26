import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Sidebar from './Sidebar'

function Layout() {
  return (
    <Box sx={{ display: 'flex', background: '#0a0f1e', minHeight: '100vh' }}>

      {/* Sidebar */}
      <Sidebar />

      {/* Right side */}
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

        {/* Navbar */}
        <Navbar />

        {/* Page content — changes based on route */}
        <Box sx={{
          flexGrow: 1,
          overflow: 'auto',
          p: 3,
          background: '#0a0f1e',
        }}>
          <Outlet />
        </Box>

      </Box>
    </Box>
  )
}

export default Layout
