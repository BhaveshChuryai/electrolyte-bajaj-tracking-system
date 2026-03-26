import { Box, Typography, Grid } from '@mui/material'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, LineChart,
  Line, Legend, AreaChart, Area, PieChart,
  Pie, Cell
} from 'recharts'

const COLORS = ['#00b4ff', '#00ff88', '#ff9500', '#bf5af2', '#ff4444', '#ffdd00']

const tooltipStyle = {
  contentStyle: {
    background: '#1e293b',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: 8,
    color: 'white',
    fontSize: '0.8rem',
  }
}

const cardStyle = {
  p: 3, borderRadius: 3,
  background: 'linear-gradient(135deg, #0f172a, #1e293b)',
  border: '1px solid rgba(255,255,255,0.08)',
}

const monthlyData = [
  { month: 'Jan', entries: 200, count: 4000, approved: 120, pending: 80 },
  { month: 'Feb', entries: 350, count: 6500, approved: 200, pending: 150 },
  { month: 'Mar', entries: 280, count: 5200, approved: 180, pending: 100 },
  { month: 'Apr', entries: 420, count: 8000, approved: 300, pending: 120 },
  { month: 'May', entries: 390, count: 7200, approved: 250, pending: 140 },
  { month: 'Jun', entries: 510, count: 9500, approved: 380, pending: 130 },
]

const componentData = [
  { name: 'Resistor', value: 610 },
  { name: 'Capacitor', value: 370 },
  { name: 'Transistor', value: 480 },
  { name: 'Diode', value: 500 },
  { name: 'IC Chip', value: 740 },
  { name: 'Relay', value: 210 },
]

const statusData = [
  { name: 'Active', value: 850 },
  { name: 'Approved', value: 820 },
  { name: 'Pending', value: 225 },
  { name: 'Review', value: 210 },
  { name: 'Inactive', value: 270 },
]

const topParts = [
  { name: 'SP005', count: 560 },
  { name: 'SP003', count: 480 },
  { name: 'SP011', count: 410 },
  { name: 'SP007', count: 340 },
  { name: 'SP001', count: 320 },
  { name: 'SP009', count: 290 },
  { name: 'SP006', count: 210 },
  { name: 'SP002', count: 150 },
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

function AnalyticsPage() {
  return (
    <Box>

      {/* Page Header */}
      <Box mb={3}>
        <Typography variant="h5" fontWeight="800"
          sx={{
            background: 'linear-gradient(135deg, #ffffff, #00b4ff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
          Analytics
        </Typography>
        <Typography variant="caption"
          sx={{ color: 'rgba(255,255,255,0.35)' }}>
          Deep insights into your PCB data
        </Typography>
      </Box>

      <Grid container spacing={2}>

        {/* Area Chart — Monthly Trend */}
        <Grid item xs={12}>
          <ChartCard
            title="Monthly Entry Trends"
            subtitle="Total entries and count over the last 6 months">
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={monthlyData}>
                <defs>
                  <linearGradient id="colorEntries" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00b4ff" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#00b4ff" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00ff88" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#00ff88" stopOpacity={0} />
                  </linearGradient>
                </defs>
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
                  color: 'rgba(255,255,255,0.4)', fontSize: 12
                }} />
                <Area type="monotone" dataKey="entries"
                  stroke="#00b4ff" strokeWidth={2.5}
                  fill="url(#colorEntries)" />
                <Area type="monotone" dataKey="count"
                  stroke="#00ff88" strokeWidth={2.5}
                  fill="url(#colorCount)" />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>
        </Grid>

        {/* Approved vs Pending Bar Chart */}
        <Grid item xs={12} md={6}>
          <ChartCard
            title="Approved vs Pending"
            subtitle="Monthly comparison of approval status">
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={monthlyData} barSize={20}>
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
                  color: 'rgba(255,255,255,0.4)', fontSize: 12
                }} />
                <Bar dataKey="approved" fill="#00b4ff"
                  radius={[4, 4, 0, 0]} name="Approved" />
                <Bar dataKey="pending" fill="#ff9500"
                  radius={[4, 4, 0, 0]} name="Pending" />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </Grid>

        {/* Status Pie Chart */}
        <Grid item xs={12} md={6}>
          <ChartCard
            title="Status Breakdown"
            subtitle="Distribution of all status types">
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  paddingAngle={3}
                  dataKey="value">
                  {statusData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip {...tooltipStyle} />
                <Legend wrapperStyle={{
                  color: 'rgba(255,255,255,0.4)', fontSize: 12
                }} />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>
        </Grid>

        {/* Top Parts Bar Chart */}
        <Grid item xs={12} md={6}>
          <ChartCard
            title="Top Spare Parts by Count"
            subtitle="Highest count spare parts">
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={topParts} layout="vertical" barSize={16}>
                <CartesianGrid strokeDasharray="3 3"
                  stroke="rgba(255,255,255,0.04)" horizontal={false} />
                <XAxis type="number"
                  tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }}
                  axisLine={false} tickLine={false} />
                <YAxis dataKey="name" type="category"
                  tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }}
                  axisLine={false} tickLine={false} width={45} />
                <Tooltip {...tooltipStyle} />
                <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                  {topParts.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </Grid>

        {/* Component Distribution */}
        <Grid item xs={12} md={6}>
          <ChartCard
            title="Component Distribution"
            subtitle="Count by component type">
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={componentData} barSize={28}>
                <CartesianGrid strokeDasharray="3 3"
                  stroke="rgba(255,255,255,0.04)" vertical={false} />
                <XAxis dataKey="name"
                  tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10 }}
                  axisLine={false} tickLine={false} />
                <YAxis
                  tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }}
                  axisLine={false} tickLine={false} />
                <Tooltip {...tooltipStyle} />
                <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                  {componentData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </Grid>

      </Grid>
    </Box>
  )
}

export default AnalyticsPage

