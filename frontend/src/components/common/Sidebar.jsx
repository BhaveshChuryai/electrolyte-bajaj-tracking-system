import { Box, Typography, List, ListItem, ListItemIcon, ListItemText } from '@mui/material'
import DashboardIcon from '@mui/icons-material/Dashboard'
import AnalyticsIcon from '@mui/icons-material/Analytics'
import UploadFileIcon from '@mui/icons-material/UploadFile'
import TableChartIcon from '@mui/icons-material/TableChart'
import { useState } from 'react'

function Sidebar() {
  const [active, setActive] = useState('Dashboard')

  const menuItems = [
    { label: 'Dashboard', icon: <DashboardIcon /> },
    { label: 'Analytics', icon: <AnalyticsIcon /> },
    { label: 'Upload Data', icon: <UploadFileIcon /> },
    { label: 'Data Table', icon: <TableChartIcon /> },
  ]

  return (
    <Box sx={{
      width: 220,
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #020617 0%, #0f172a 100%)',
      borderRight: '1px solid rgba(255,255,255,0.06)',
      pt: 3,
    }}>

      <Typography variant="caption" sx={{
        color: 'rgba(255,255,255,0.25)',
        letterSpacing: 2,
        textTransform: 'uppercase',
        px: 2.5,
        mb: 1,
        display: 'block'
      }}>
        Main Menu
      </Typography>

      <List>
        {menuItems.map((item) => (
          <ListItem
            key={item.label}
            onClick={() => setActive(item.label)}
            sx={{
              mb: 0.5, mx: 1, borderRadius: 2,
              width: 'auto', cursor: 'pointer',
              background: active === item.label
                ? 'linear-gradient(135deg, rgba(0,180,255,0.15), rgba(0,102,255,0.1))'
                : 'transparent',
              border: active === item.label
                ? '1px solid rgba(0,180,255,0.2)'
                : '1px solid transparent',
              '&:hover': {
                background: 'rgba(0,180,255,0.08)',
              },
              transition: 'all 0.3s',
            }}>
            <ListItemIcon sx={{
              color: active === item.label ? '#00b4ff' : 'rgba(255,255,255,0.35)',
              minWidth: 36,
            }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText
              primary={item.label}
              primaryTypographyProps={{
                fontSize: '0.85rem',
                fontWeight: active === item.label ? 700 : 400,
                color: active === item.label ? 'white' : 'rgba(255,255,255,0.4)',
              }}
            />
          </ListItem>
        ))}
      </List>

      {/* Bottom info */}
      <Box sx={{
        position: 'absolute', bottom: 20,
        px: 2.5,
      }}>
        <Typography variant="caption"
          sx={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.65rem' }}>
          © 2025 Bajaj Auto Limited
        </Typography>
      </Box>
    </Box>
  )
}

export default Sidebar
