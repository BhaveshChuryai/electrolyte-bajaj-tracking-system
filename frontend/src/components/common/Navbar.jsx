import { AppBar, Toolbar, Typography, Box, Chip, IconButton } from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout'
import NotificationsIcon from '@mui/icons-material/Notifications'
import logo from '../../assets/logo.jpeg'

function Navbar() {
  const handleLogout = () => {
    window.location.href = '/login'
  }

  return (
    <AppBar position="static" elevation={0} sx={{
      background: 'linear-gradient(135deg, #020617, #0f172a)',
      borderBottom: '1px solid rgba(255,255,255,0.08)',
    }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>

        {/* Left — Logo */}
        <Box display="flex" alignItems="center" gap={1.5}>
          <img src={logo} alt="logo" style={{ width: 80, borderRadius: 6 }} />
          <Box>
            <Typography fontWeight="800" fontSize="0.95rem"
              sx={{
                background: 'linear-gradient(135deg, #ffffff, #00b4ff)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
              Electrolyte Bajaj
            </Typography>
            <Typography fontSize="0.65rem"
              sx={{ color: 'rgba(255,255,255,0.4)', letterSpacing: 1 }}>
              PCB Data Intelligence
            </Typography>
          </Box>
        </Box>

        {/* Right — Actions */}
        <Box display="flex" alignItems="center" gap={2}>
          <Chip
            label="● Live"
            size="small"
            sx={{
              background: 'rgba(0,255,136,0.1)',
              border: '1px solid rgba(0,255,136,0.3)',
              color: '#00ff88',
              fontSize: '0.7rem',
              fontWeight: 700,
            }}
          />
          <IconButton sx={{ color: 'rgba(255,255,255,0.5)' }}>
            <NotificationsIcon fontSize="small" />
          </IconButton>
          <IconButton onClick={handleLogout}
            sx={{ color: 'rgba(255,255,255,0.5)',
              '&:hover': { color: '#ff4444' } }}>
            <LogoutIcon fontSize="small" />
          </IconButton>
        </Box>

      </Toolbar>
    </AppBar>
  )
}

export default Navbar
