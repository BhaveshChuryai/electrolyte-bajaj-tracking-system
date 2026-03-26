import { Grid, Box, Typography } from '@mui/material'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import DatasetIcon from '@mui/icons-material/Dataset'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CategoryIcon from '@mui/icons-material/Category'
import { useEffect, useState } from 'react'

// Animated counter hook
function useCounter(target, duration = 1000) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    let start = 0
    const step = target / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [target, duration])
  return count
}

function KPICard({ title, value, sub, icon, color, glow }) {
  const animatedValue = useCounter(value)

  return (
    <Box sx={{
      p: 3, borderRadius: 3,
      background: 'linear-gradient(135deg, #0f172a, #1e293b)',
      border: '1px solid rgba(255,255,255,0.08)',
      boxShadow: `0 8px 25px ${glow}`,
      transition: 'all 0.3s',
      cursor: 'default',
      '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: `0 20px 40px ${glow}`,
        border: `1px solid ${color}40`,
      }
    }}>

      {/* Top row — icon + trend */}
      <Box display="flex" justifyContent="space-between"
        alignItems="flex-start" mb={2}>
        <Box sx={{
          display: 'inline-flex', p: 1.2,
          borderRadius: 2,
          background: glow,
          color: color,
        }}>
          {icon}
        </Box>
        <Box sx={{
          px: 1, py: 0.3, borderRadius: 1,
          background: 'rgba(0,255,136,0.1)',
          border: '1px solid rgba(0,255,136,0.2)',
        }}>
          <Typography fontSize="0.65rem" fontWeight="700"
            sx={{ color: '#00ff88' }}>
            ↑ Live
          </Typography>
        </Box>
      </Box>

      {/* Animated value */}
      <Typography variant="h4" fontWeight="900"
        sx={{ color: 'white', mb: 0.3, letterSpacing: '-1px' }}>
        {animatedValue.toLocaleString()}
      </Typography>

      {/* Title */}
      <Typography fontSize="0.82rem" fontWeight="600"
        sx={{ color: 'rgba(255,255,255,0.55)', mb: 0.8 }}>
        {title}
      </Typography>

      {/* Divider */}
      <Box sx={{
        height: '1px',
        background: 'rgba(255,255,255,0.06)',
        mb: 0.8,
      }} />

      {/* Sub text */}
      <Typography fontSize="0.7rem"
        sx={{ color: color }}>
        {sub}
      </Typography>

    </Box>
  )
}

function KPICards({ data }) {
  const cards = [
    {
      title: 'Total Entries',
      value: data?.totalEntries || 0,
      sub: `${data?.totalEntries || 0} records in view`,
      icon: <DatasetIcon sx={{ fontSize: 26 }} />,
      color: '#00b4ff',
      glow: 'rgba(0,180,255,0.12)',
    },
    {
      title: 'Total Count',
      value: data?.totalCount || 0,
      sub: 'Sum of all counts',
      icon: <TrendingUpIcon sx={{ fontSize: 26 }} />,
      color: '#00ff88',
      glow: 'rgba(0,255,136,0.12)',
    },
    {
      title: 'Total Components',
      value: data?.totalComponents || 0,
      sub: 'Unique component types',
      icon: <CategoryIcon sx={{ fontSize: 26 }} />,
      color: '#ff9500',
      glow: 'rgba(255,149,0,0.12)',
    },
    {
      title: 'Status Types',
      value: data?.statusTypes || 0,
      sub: 'Active status categories',
      icon: <CheckCircleIcon sx={{ fontSize: 26 }} />,
      color: '#bf5af2',
      glow: 'rgba(191,90,242,0.12)',
    },
  ]

  return (
    <Grid container spacing={2} mb={3}>
      {cards.map((card, i) => (
        <Grid item xs={12} sm={6} md={3} key={i}>
          <KPICard {...card} />
        </Grid>
      ))}
    </Grid>
  )
}

export default KPICards

