import { Box, Typography, List, ListItem, ListItemIcon, ListItemText, Divider, Chip } from '@mui/material'
import DashboardIcon from '@mui/icons-material/Dashboard'
import AnalyticsIcon from '@mui/icons-material/Analytics'
import TableChartIcon from '@mui/icons-material/TableChart'
import UploadFileIcon from '@mui/icons-material/UploadFile'
import SettingsIcon from '@mui/icons-material/Settings'
import { useNavigate, useLocation } from 'react-router-dom'
import logo from '../../assets/logo.jpeg'

const menuItems = [
  { label: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
  { label: 'Analytics', icon: <AnalyticsIcon />, path: '/analytics' },
  { label: 'Master Table', icon: <TableChartIcon />, path: '/master-table' },
  { label: 'Upload Data', icon: <UploadFileIcon />, path: '/upload' },
]

const bottomItems = [
  { label: 'Settings', icon: <SettingsIcon />, path: '/settings' },
]

function Sidebar() {
  const navigate = useNavigate()
  const location = useLocation()

  const isActive = (path) => location.pathname === path

  return (
    <Box sx={{
      width: 240,
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #0d1424 0%, #0f172a 100%)',
      borderRight: '1px solid rgba(255,255,255,0.06)',
      display: 'flex',
      flexDirection: 'column',
      position: 'sticky',
      top: 0,
      height: '100vh',
    }}>

      {/* Logo section */}
      <Box sx={{
        p: 2.5,
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        display: 'flex',
        alignItems: 'center',
        gap: 1.5,
      }}>
        <Box sx={{
          p: 0.8, borderRadius: 2,
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(255,255,255,0.1)',
        }}>
          <img src={logo} alt="logo"
            style={{ width: 55, borderRadius: 6, display: 'block' }} />
        </Box>
        <Box>
          <Typography fontWeight="800" fontSize="0.85rem"
            sx={{
              background: 'linear-gradient(135deg, #ffffff, #00b4ff)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
            Electrolyte
          </Typography>
          <Typography fontSize="0.62rem"
            sx={{ color: 'rgba(255,255,255,0.3)', letterSpacing: 0.5 }}>
            Bajaj Auto Limited
          </Typography>
        </Box>
      </Box>

      {/* Menu label */}
      <Box sx={{ px: 2.5, pt: 2.5, pb: 1 }}>
        <Typography variant="caption" sx={{
          color: 'rgba(255,255,255,0.2)',
          letterSpacing: 2,
          textTransform: 'uppercase',
          fontSize: '0.65rem',
        }}>
          Main Menu
        </Typography>
      </Box>

      {/* Menu items */}
      <List sx={{ px: 1.5, flexGrow: 1 }}>
        {menuItems.map((item) => (
          <ListItem
            key={item.label}
            onClick={() => navigate(item.path)}
            sx={{
              mb: 0.5, borderRadius: 2,
              cursor: 'pointer',
              background: isActive(item.path)
                ? 'linear-gradient(135deg, rgba(0,180,255,0.15), rgba(0,102,255,0.1))'
                : 'transparent',
              border: isActive(item.path)
                ? '1px solid rgba(0,180,255,0.25)'
                : '1px solid transparent',
              transition: 'all 0.25s',
              '&:hover': {
                background: isActive(item.path)
                  ? 'linear-gradient(135deg, rgba(0,180,255,0.2), rgba(0,102,255,0.15))'
                  : 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(0,180,255,0.15)',
                transform: 'translateX(4px)',
              },
            }}>
            <ListItemIcon sx={{
              color: isActive(item.path) ? '#00b4ff' : 'rgba(255,255,255,0.3)',
              minWidth: 38,
              transition: 'all 0.25s',
            }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText
              primary={item.label}
              primaryTypographyProps={{
                fontSize: '0.85rem',
                fontWeight: isActive(item.path) ? 700 : 400,
                color: isActive(item.path) ? 'white' : 'rgba(255,255,255,0.45)',
              }}
            />
            {isActive(item.path) && (
              <Box sx={{
                width: 4, height: 4, borderRadius: '50%',
                background: '#00b4ff',
                boxShadow: '0 0 6px #00b4ff',
              }} />
            )}
          </ListItem>
        ))}
      </List>

      {/* Divider */}
      <Divider sx={{ borderColor: 'rgba(255,255,255,0.06)', mx: 2 }} />

      {/* Bottom items */}
      <List sx={{ px: 1.5, py: 1 }}>
        {bottomItems.map((item) => (
          <ListItem
            key={item.label}
            onClick={() => navigate(item.path)}
            sx={{
              borderRadius: 2, cursor: 'pointer',
              '&:hover': {
                background: 'rgba(255,255,255,0.04)',
              },
            }}>
            <ListItemIcon sx={{
              color: 'rgba(255,255,255,0.3)', minWidth: 38
            }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText
              primary={item.label}
              primaryTypographyProps={{
                fontSize: '0.85rem',
                color: 'rgba(255,255,255,0.4)',
              }}
            />
          </ListItem>
        ))}
      </List>

      {/* Bottom user info */}
      <Box sx={{
        p: 2,
        borderTop: '1px solid rgba(255,255,255,0.06)',
        background: 'rgba(0,0,0,0.2)',
      }}>
        {/* Status */}
        <Box display="flex" alignItems="center"
          justifyContent="space-between" mb={1}>
          <Chip
            label="● Online"
            size="small"
            sx={{
              background: 'rgba(0,255,136,0.1)',
              border: '1px solid rgba(0,255,136,0.2)',
              color: '#00ff88',
              fontSize: '0.65rem',
              height: 20,
            }}
          />
          <Typography variant="caption"
            sx={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.62rem' }}>
            v1.0.0
          </Typography>
        </Box>
        <Typography variant="caption"
          sx={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.62rem', display: 'block' }}>
          © 2025 Bajaj Auto Limited
        </Typography>
      </Box>

    </Box>
  )
}

export default Sidebar

