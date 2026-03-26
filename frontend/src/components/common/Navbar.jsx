import { useState, useEffect } from 'react'
import {
  AppBar, Toolbar, Box, Typography, IconButton,
  Chip, Avatar, Menu, MenuItem, Divider, Badge
} from '@mui/material'
import NotificationsIcon from '@mui/icons-material/Notifications'
import LogoutIcon from '@mui/icons-material/Logout'
import PersonIcon from '@mui/icons-material/Person'
import SettingsIcon from '@mui/icons-material/Settings'
import { useNavigate, useLocation } from 'react-router-dom'
import logo from '../../assets/logo.jpeg'

const pageTitles = {
  '/dashboard': 'Dashboard',
  '/analytics': 'Analytics',
  '/master-table': 'Master Table',
  '/upload': 'Upload Data',
}

function Navbar() {
  const [time, setTime] = useState(new Date())
  const [anchorEl, setAnchorEl] = useState(null)
  const navigate = useNavigate()
  const location = useLocation()

  // Real time clock
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const handleLogout = () => {
    navigate('/login')
  }

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit', minute: '2-digit', second: '2-digit'
    })
  }

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      day: '2-digit', month: 'short', year: 'numeric'
    })
  }

  return (
    <AppBar position="static" elevation={0} sx={{
      background: 'linear-gradient(135deg, #0d1424, #0f172a)',
      borderBottom: '1px solid rgba(255,255,255,0.06)',
      zIndex: 100,
    }}>
      <Toolbar sx={{ justifyContent: 'space-between', px: 3 }}>

        {/* LEFT — Logo + Page Title */}
        <Box display="flex" alignItems="center" gap={2}>
          <img src={logo} alt="logo"
            style={{ width: 75, borderRadius: 6 }} />
          <Box sx={{
            width: '1px', height: 35,
            background: 'rgba(255,255,255,0.1)'
          }} />
          <Box>
            <Typography fontWeight="800" fontSize="1rem"
              sx={{
                background: 'linear-gradient(135deg, #ffffff, #00b4ff)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
              {pageTitles[location.pathname] || 'Dashboard'}
            </Typography>
            <Typography fontSize="0.65rem"
              sx={{ color: 'rgba(255,255,255,0.3)', letterSpacing: 1 }}>
              PCB Data Intelligence Platform
            </Typography>
          </Box>
        </Box>

        {/* RIGHT — Actions */}
        <Box display="flex" alignItems="center" gap={2}>

          {/* Live clock */}
          <Box textAlign="right"
            sx={{ display: { xs: 'none', md: 'block' } }}>
            <Typography fontSize="0.75rem" fontWeight="700"
              sx={{ color: 'white' }}>
              {formatTime(time)}
            </Typography>
            <Typography fontSize="0.62rem"
              sx={{ color: 'rgba(255,255,255,0.3)' }}>
              {formatDate(time)}
            </Typography>
          </Box>

          {/* Divider */}
          <Box sx={{
            width: '1px', height: 30,
            background: 'rgba(255,255,255,0.08)',
            display: { xs: 'none', md: 'block' }
          }} />

          {/* Live badge */}
          <Chip
            label="● Live"
            size="small"
            sx={{
              background: 'rgba(0,255,136,0.1)',
              border: '1px solid rgba(0,255,136,0.3)',
              color: '#00ff88',
              fontSize: '0.7rem',
              fontWeight: 700,
              animation: 'pulse 2s infinite',
              '@keyframes pulse': {
                '0%,100%': { opacity: 1 },
                '50%': { opacity: 0.6 },
              }
            }}
          />

          {/* Notifications */}
          <IconButton sx={{ color: 'rgba(255,255,255,0.5)',
            '&:hover': { color: '#00b4ff' } }}>
            <Badge badgeContent={3} color="error">
              <NotificationsIcon fontSize="small" />
            </Badge>
          </IconButton>

          {/* User Avatar */}
          <Box
            display="flex" alignItems="center" gap={1}
            onClick={(e) => setAnchorEl(e.currentTarget)}
            sx={{
              cursor: 'pointer', p: 0.8, borderRadius: 2,
              border: '1px solid rgba(255,255,255,0.08)',
              background: 'rgba(255,255,255,0.03)',
              transition: 'all 0.3s',
              '&:hover': {
                border: '1px solid rgba(0,180,255,0.3)',
                background: 'rgba(0,180,255,0.05)',
              }
            }}>
            <Avatar sx={{
              width: 30, height: 30,
              background: 'linear-gradient(135deg, #00b4ff, #0066ff)',
              fontSize: '0.8rem', fontWeight: 700,
            }}>
              B
            </Avatar>
            <Box sx={{ display: { xs: 'none', md: 'block' } }}>
              <Typography fontSize="0.78rem" fontWeight="700"
                sx={{ color: 'white' }}>
                Bhavesh
              </Typography>
              <Typography fontSize="0.6rem"
                sx={{ color: 'rgba(255,255,255,0.3)' }}>
                Admin
              </Typography>
            </Box>
          </Box>

          {/* User dropdown menu */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
            PaperProps={{
              sx: {
                background: '#1e293b',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 2,
                mt: 1,
                minWidth: 180,
              }
            }}>
            <MenuItem sx={{ color: 'rgba(255,255,255,0.7)', gap: 1.5,
              '&:hover': { background: 'rgba(0,180,255,0.1)', color: 'white' } }}>
              <PersonIcon fontSize="small" />
              My Profile
            </MenuItem>
            <MenuItem sx={{ color: 'rgba(255,255,255,0.7)', gap: 1.5,
              '&:hover': { background: 'rgba(0,180,255,0.1)', color: 'white' } }}>
              <SettingsIcon fontSize="small" />
              Settings
            </MenuItem>
            <Divider sx={{ borderColor: 'rgba(255,255,255,0.08)' }} />
            <MenuItem onClick={handleLogout}
              sx={{ color: '#ff4444', gap: 1.5,
              '&:hover': { background: 'rgba(255,68,68,0.1)' } }}>
              <LogoutIcon fontSize="small" />
              Logout
            </MenuItem>
          </Menu>

        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar