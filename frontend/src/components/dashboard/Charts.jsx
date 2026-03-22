import { Box, Grid, Typography } from '@mui/material'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, LineChart,
  Line, Legend
} from 'recharts'

const statusData = [
  { name: 'Active', count: 420 },
  { name: 'Inactive', count: 210 },
  { name: 'Pending', count: 180 },
  { name: 'Rejected', count: 95 },
  { name: 'Approved', count: 310 },
  { name: 'Review', count: 69 },
]

const trendData = [
  { month: 'Jan', entries: 200, count: 4000 },
  { month: 'Feb', entries: 350, count: 6500 },
  { month: 'Mar', entries: 280, count: 5200 },
  { month: 'Apr', entries: 420, count: 8000 },
  { month: 'May', entries: 390, count: 7200 },
  { month: 'Jun', entries: 510, count: 9500 },
]

const cardStyle = {
  p: 3, borderRadius: 3,
  background: 'linear-gradient(135deg, #0f172a, #1e293b)',
  border: '1px solid rgba(255,255,255,0.08)',
}

function Charts() {
  return (
    <Grid container spacing={2} mb={3}>

      {/* Bar Chart — Status Distribution */}
      <Grid item xs={12} md={6}>
        <Box sx={cardStyle}>
          <Typography fontWeight="700" fontSize="0.95rem"
            sx={{ color: 'white', mb: 0.5 }}>
            Status Distribution
          </Typography>
          <Typography fontSize="0.72rem" mb={2}
            sx={{ color: 'rgba(255,255,255,0.35)' }}>
            Count by status type
          </Typography>

          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={statusData}>
              <CartesianGrid strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="name"
                tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }}
                axisLine={false} tickLine={false} />
              <YAxis
                tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }}
                axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{
                  background: '#1e293b',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 8,
                  color: 'white'
                }}
              />
              <Bar dataKey="count" fill="#00b4ff"
                radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </Grid>

      {/* Line Chart — Trends */}
      <Grid item xs={12} md={6}>
        <Box sx={cardStyle}>
          <Typography fontWeight="700" fontSize="0.95rem"
            sx={{ color: 'white', mb: 0.5 }}>
            Monthly Trends
          </Typography>
          <Typography fontSize="0.72rem" mb={2}
            sx={{ color: 'rgba(255,255,255,0.35)' }}>
            Entries and count over time
          </Typography>

          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="month"
                tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }}
                axisLine={false} tickLine={false} />
              <YAxis
                tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }}
                axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{
                  background: '#1e293b',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 8,
                  color: 'white'
                }}
              />
              <Legend
                wrapperStyle={{ color: 'rgba(255,255,255,0.4)', fontSize: 12 }}
              />
              <Line type="monotone" dataKey="entries"
                stroke="#00b4ff" strokeWidth={2}
                dot={{ fill: '#00b4ff', r: 4 }} />
              <Line type="monotone" dataKey="count"
                stroke="#00ff88" strokeWidth={2}
                dot={{ fill: '#00ff88', r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </Grid>

    </Grid>
  )
}

export default Charts
