import {
  Box, Typography, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, IconButton,
  TextField, InputAdornment, Chip, Tooltip, Grid
} from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility'
import SearchIcon from '@mui/icons-material/Search'
import FileDownloadIcon from '@mui/icons-material/FileDownload'
import TableChartIcon from '@mui/icons-material/TableChart'
import { useState } from 'react'

const pcbData = [
  { id: 1, pcbCode: '971039', totalEntries: 1359, components: 8, lastUpdated: '2025-03-20' },
  { id: 2, pcbCode: '974290', totalEntries: 815, components: 6, lastUpdated: '2025-03-19' },
  { id: 3, pcbCode: '971084', totalEntries: 141, components: 4, lastUpdated: '2025-03-18' },
  { id: 4, pcbCode: '974284', totalEntries: 99, components: 3, lastUpdated: '2025-03-17' },
  { id: 5, pcbCode: '971089', totalEntries: 75, components: 5, lastUpdated: '2025-03-16' },
  { id: 6, pcbCode: '974278', totalEntries: 70, components: 4, lastUpdated: '2025-03-15' },
  { id: 7, pcbCode: '971065', totalEntries: 42, components: 3, lastUpdated: '2025-03-14' },
  { id: 8, pcbCode: '971040', totalEntries: 23, components: 2, lastUpdated: '2025-03-13' },
]

const getSizeLabel = (entries) => {
  if (entries > 1000) return { label: 'Large', color: '#00b4ff' }
  if (entries > 500) return { label: 'Medium', color: '#00ff88' }
  if (entries > 100) return { label: 'Small', color: '#ff9500' }
  return { label: 'Tiny', color: '#bf5af2' }
}

function MasterTablePage() {
  const [search, setSearch] = useState('')

  const filtered = pcbData.filter(r =>
    r.pcbCode.includes(search) ||
    r.totalEntries.toString().includes(search)
  )

  const totalEntries = pcbData.reduce((sum, r) => sum + r.totalEntries, 0)

  const handleExport = () => {
    const csv = [
      '#,PCB Code,Total Entries,Components,Last Updated',
      ...pcbData.map(r => `${r.id},${r.pcbCode},${r.totalEntries},${r.components},${r.lastUpdated}`)
    ].join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'master_table.csv'
    a.click()
  }

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
          Master Table
        </Typography>
        <Typography variant="caption"
          sx={{ color: 'rgba(255,255,255,0.35)' }}>
          All PCB codes and their data summary
        </Typography>
      </Box>

      {/* Summary Cards */}
      <Grid container spacing={2} mb={3}>
        {[
          { label: 'Total PCBs', value: pcbData.length, color: '#00b4ff' },
          { label: 'Total Entries', value: totalEntries.toLocaleString(), color: '#00ff88' },
          { label: 'Avg Entries', value: Math.round(totalEntries / pcbData.length), color: '#ff9500' },
          { label: 'Last Updated', value: 'Today', color: '#bf5af2' },
        ].map((card, i) => (
          <Grid item xs={6} md={3} key={i}>
            <Box sx={{
              p: 2.5, borderRadius: 3,
              background: 'linear-gradient(135deg, #0f172a, #1e293b)',
              border: '1px solid rgba(255,255,255,0.08)',
              transition: 'all 0.3s',
              '&:hover': {
                transform: 'translateY(-3px)',
                border: `1px solid ${card.color}30`,
              }
            }}>
              <Typography variant="h5" fontWeight="900"
                sx={{ color: card.color, mb: 0.3 }}>
                {card.value}
              </Typography>
              <Typography fontSize="0.78rem"
                sx={{ color: 'rgba(255,255,255,0.4)' }}>
                {card.label}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>

      {/* Table */}
      <Box sx={{
        p: 3, borderRadius: 3,
        background: 'linear-gradient(135deg, #0f172a, #1e293b)',
        border: '1px solid rgba(255,255,255,0.08)',
      }}>

        {/* Table Header */}
        <Box display="flex" justifyContent="space-between"
          alignItems="center" mb={2.5}>
          <Box display="flex" alignItems="center" gap={1.5}>
            <TableChartIcon sx={{ color: '#00b4ff', fontSize: 20 }} />
            <Box>
              <Typography fontWeight="700" fontSize="0.95rem"
                sx={{ color: 'white' }}>
                Master Summary
              </Typography>
              <Typography fontSize="0.72rem"
                sx={{ color: 'rgba(255,255,255,0.35)' }}>
                {filtered.length} PCBs total
              </Typography>
            </Box>
          </Box>

          <Box display="flex" gap={1.5} alignItems="center">
            {/* Search */}
            <TextField
              size="small"
              placeholder="Search PCB code..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              sx={{
                width: 200,
                '& .MuiOutlinedInput-root': {
                  color: 'white', borderRadius: 2,
                  background: 'rgba(255,255,255,0.05)',
                  '& fieldset': { borderColor: 'rgba(255,255,255,0.1)' },
                  '&:hover fieldset': { borderColor: '#00b4ff' },
                  '&.Mui-focused fieldset': { borderColor: '#00b4ff' },
                },
                '& input::placeholder': { color: 'rgba(255,255,255,0.25)', opacity: 1 },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: 'rgba(255,255,255,0.3)', fontSize: 18 }} />
                  </InputAdornment>
                )
              }}
            />

            {/* Export */}
            <Tooltip title="Export CSV">
              <IconButton onClick={handleExport}
                sx={{
                  color: 'rgba(255,255,255,0.4)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 2,
                  '&:hover': {
                    color: '#00ff88',
                    border: '1px solid rgba(0,255,136,0.3)',
                    background: 'rgba(0,255,136,0.05)',
                  }
                }}>
                <FileDownloadIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        {/* Table */}
        <TableContainer sx={{
          borderRadius: 2,
          border: '1px solid rgba(255,255,255,0.05)',
        }}>
          <Table>
            <TableHead>
              <TableRow sx={{ background: 'rgba(0,0,0,0.2)' }}>
                {['#', 'PCB Code', 'Total Entries', 'Components', 'Size', 'Last Updated', 'Action'].map(h => (
                  <TableCell key={h} sx={{
                    color: 'rgba(255,255,255,0.35)',
                    borderBottom: '1px solid rgba(255,255,255,0.06)',
                    fontSize: '0.72rem', fontWeight: 700,
                    letterSpacing: 1.5, textTransform: 'uppercase',
                    py: 1.5,
                  }}>
                    {h}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filtered.map((row, i) => {
                const size = getSizeLabel(row.totalEntries)
                return (
                  <TableRow key={row.id} sx={{
                    '&:hover': { background: 'rgba(0,180,255,0.04)' },
                    transition: 'background 0.2s',
                    background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.01)',
                  }}>
                    <TableCell sx={cellStyle}>{i + 1}</TableCell>
                    <TableCell sx={{ ...cellStyle, color: 'white', fontWeight: 700, fontSize: '0.9rem' }}>
                      {row.pcbCode}
                    </TableCell>
                    <TableCell sx={{ ...cellStyle, color: '#00b4ff', fontWeight: 600 }}>
                      {row.totalEntries.toLocaleString()}
                    </TableCell>
                    <TableCell sx={cellStyle}>{row.components}</TableCell>
                    <TableCell sx={{ borderBottom: '1px solid rgba(255,255,255,0.04)', py: 1.5 }}>
                      <Chip label={size.label} size="small" sx={{
                        background: `${size.color}15`,
                        border: `1px solid ${size.color}40`,
                        color: size.color,
                        fontSize: '0.7rem', fontWeight: 700, height: 22,
                      }} />
                    </TableCell>
                    <TableCell sx={cellStyle}>{row.lastUpdated}</TableCell>
                    <TableCell sx={{ borderBottom: '1px solid rgba(255,255,255,0.04)', py: 1.5 }}>
                      <Tooltip title="View Details">
                        <IconButton size="small" sx={{
                          color: 'rgba(255,255,255,0.3)',
                          border: '1px solid rgba(255,255,255,0.08)',
                          borderRadius: 1.5,
                          '&:hover': {
                            color: '#00b4ff',
                            border: '1px solid rgba(0,180,255,0.3)',
                            background: 'rgba(0,180,255,0.05)',
                          }
                        }}>
                          <VisibilityIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  )
}

const cellStyle = {
  color: 'rgba(255,255,255,0.65)',
  borderBottom: '1px solid rgba(255,255,255,0.04)',
  fontSize: '0.82rem', py: 1.5,
}

export default MasterTablePage

