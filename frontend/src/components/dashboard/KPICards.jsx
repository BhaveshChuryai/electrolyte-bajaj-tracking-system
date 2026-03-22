import { Grid, Box, Typography, CircularProgress } from '@mui/material'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import DatasetIcon from '@mui/icons-material/Dataset'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CategoryIcon from '@mui/icons-material/Category'

const cards = [
  {
    title: 'Total Entries',
    value: '1,284',
    sub: '+12% this week',
    icon: <DatasetIcon sx={{ fontSize: 28 }} />,
    color: '#00b4ff',
    glow: 'rgba(0,180,255,0.15)',
  },
  {
    title: 'Total Count',
    value: '48,320',
    sub: '+8% this week',
    icon: <TrendingUpIcon sx={{ fontSize: 28 }} />,
    color: '#00ff88',
    glow: 'rgba(0,255,136,0.15)',
  },
  {
    title: 'Total Components',
    value: '36',
    sub: '4 new added',
    icon: <CategoryIcon sx={{ fontSize: 28 }} />,
    color: '#ff9500',
    glow: 'rgba(255,149,0,0.15)',
  },
  {
    title: 'Status Types',
    value: '8',
    sub: 'Active statuses',
    icon: <CheckCircleIcon sx={{ fontSize: 28 }} />,
    color: '#bf5af2',
    glow: 'rgba(191,90,242,0.15)',
  },
]

function KPICards() {
  return (
    <Grid container spacing={2} mb={3}>
      {cards.map((card, i) => (
        <Grid item xs={12} sm={6} md={3} key={i}>
          <Box sx={{
            p: 3, borderRadius: 3,
            background: 'linear-gradient(135deg, #0f172a, #1e293b)',
            border: `1px solid rgba(255,255,255,0.08)`,
            boxShadow: `0 8px 25px ${card.glow}`,
            transition: 'all 0.3s',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: `0 15px 35px ${card.glow}`,
              border: `1px solid ${card.color}40`,
            }
          }}>

            {/* Icon */}
            <Box sx={{
              display: 'inline-flex',
              p: 1.2, borderRadius: 2,
              background: card.glow,
              color: card.color,
              mb: 2,
            }}>
              {card.icon}
            </Box>

            {/* Value */}
            <Typography variant="h4" fontWeight="900"
              sx={{ color: 'white', mb: 0.3 }}>
              {card.value}
            </Typography>

            {/* Title */}
            <Typography fontSize="0.85rem" fontWeight="600"
              sx={{ color: 'rgba(255,255,255,0.6)', mb: 0.5 }}>
              {card.title}
            </Typography>

            {/* Sub */}
            <Typography fontSize="0.72rem"
              sx={{ color: card.color }}>
              ↑ {card.sub}
            </Typography>

          </Box>
        </Grid>
      ))}
    </Grid>
  )
}

export default KPICards
