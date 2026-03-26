import { Box, Grid, Typography } from '@mui/material'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, LineChart,
  Line, Legend, PieChart, Pie, Cell
} from 'recharts'

const COLORS = ['#00b4ff', '#00ff88', '#ff9500', '#bf5af2', '#ff4444', '#ffdd00']

const cardStyle = {
  p: 3, borderRadius: 3,
  background: 'linear-gradient(135deg, #0f172a, #1e293b)',
  border: '1px solid rgba(255,255,255,0.08)',
  height: '100%',
}

const tooltipStyle = {
  contentStyle: {
    background: '#1e293b',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: 8,
    color: 'white',
    fontSize: '0.8rem',
  }
}

// Custom donut label
const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  const RADIAN = Math.PI / 180
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)
  return percent > 0.05 ? (
    <text x={x} y={y} fill="white" textAnchor="middle"
      dominantBaseline="central" fontSize={11} fontWeight={700}>
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  ) : null
}

const trendData = [
  { month: 'Jan', entries: 200, count: 4000 },
  { month: 'Feb', entries: 350, count: 6500 },
  { month: 'Mar', entries: 280, count: 5200 },
  { month: 'Apr', entries: 420, count: 8000 },
  { month: 'May', entries: 390, count: 7200 },
  { month: 'Jun', entries: 510, count: 9500 },
]

function ChartCard({ title, subtitle, children }) {
  return (
    <Box sx={cardStyle}>
      <Typography fontWeight="700" fontSize="0.95rem"
        sx={{ color: 'white', mb: 0.3 }}>
        {title}
      </Typography>
      <Typography fontSize="0.72rem" mb={2.5}
        sx={{ color: 'rgba(255,255,255,0.35)' }}>
        {subtitle}
      </Typography>
      {children}
    </Box>
  )
}

function Charts({ statusData = [], componentData = [] }) {
  return (
    <Grid container spacing={2} mb={3}>

      {/* Bar Chart — Status Distribution */}
      <Grid item xs={12} md={5}>
        <ChartCard
          title="Status Distribution"
          subtitle="Count by status type">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={statusData} barSize={32}>
              <CartesianGrid strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.04)" vertical={false} />
              <XAxis dataKey="name"
                tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }}
                axisLine={false} tickLine={false} />
              <YAxis
                tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }}
                axisLine={false} tickLine={false} />
              <Tooltip {...tooltipStyle} />
              <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                {statusData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </Grid>

      {/* Donut Chart — Component Distribution */}
      <Grid item xs={12} md={4}>
        <ChartCard
          title="Component Distribution"
          subtitle="Breakdown by component type">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={componentData}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={110}
                paddingAngle={3}
                dataKey="value"
                labelLine={false}
                label={renderCustomLabel}>
                {componentData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip {...tooltipStyle} />
              <Legend
                wrapperStyle={{
                  color: 'rgba(255,255,255,0.4)',
                  fontSize: 11,
                  paddingTop: 10,
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </Grid>

      {/* Line Chart — Monthly Trends (full width) */}
      <Grid item xs={12} md={3}>
        <ChartCard
          title="Monthly Trends"
          subtitle="Entries and count over time">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.04)" vertical={false} />
              <XAxis dataKey="month"
                tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }}
                axisLine={false} tickLine={false} />
              <YAxis
                tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }}
                axisLine={false} tickLine={false} />
              <Tooltip {...tooltipStyle} />
              <Legend wrapperStyle={{
                color: 'rgba(255,255,255,0.4)', fontSize: 11
              }} />
              <Line type="monotone" dataKey="entries"
                stroke="#00b4ff" strokeWidth={2.5}
                dot={{ fill: '#00b4ff', r: 4, strokeWidth: 0 }}
                activeDot={{ r: 6 }} />
              <Line type="monotone" dataKey="count"
                stroke="#00ff88" strokeWidth={2.5}
                dot={{ fill: '#00ff88', r: 4, strokeWidth: 0 }}
                activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </Grid>

    </Grid>
  )
}

export default Charts

