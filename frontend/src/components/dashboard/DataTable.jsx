import {
  Box, Typography, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Chip, TextField,
  InputAdornment
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { useState } from 'react'

const rows = [
  { id: 1, sparePart: 'SP001', component: 'Resistor', status: 'Active', count: 320, total: 1200 },
  { id: 2, sparePart: 'SP002', component: 'Capacitor', status: 'Pending', count: 150, total: 800 },
  { id: 3, sparePart: 'SP003', component: 'Transistor', status: 'Approved', count: 480, total: 2100 },
  { id: 4, sparePart: 'SP004', component: 'Diode', status: 'Inactive', count: 90, total: 450 },
  { id: 5, sparePart: 'SP005', component: 'IC Chip', status: 'Active', count: 560, total: 3200 },
  { id: 6, sparePart: 'SP006', component: 'Relay', status: 'Review', count: 210, total: 950 },
  { id: 7, sparePart: 'SP007', component: 'Fuse', status: 'Approved', count: 340, total: 1800 },
  { id: 8, sparePart: 'SP008', component: 'Transformer', status: 'Pending', count: 75, total: 600 },
]

const statusColors = {
  Active: '#00ff88',
  Pending: '#ff9500',
  Approved: '#00b4ff',
  Inactive: '#ff4444',
  Review: '#bf5af2',
}

function DataTable() {
  const [search, setSearch] = useState('')

  const filtered = rows.filter(r =>
    r.component.toLowerCase().includes(search.toLowerCase()) ||
    r.sparePart.toLowerCase().includes(search.toLowerCase()) ||
    r.status.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <Box sx={{
      p: 3, borderRadius: 3,
      background: 'linear-gradient(135deg, #0f172a, #1e293b)',
      border: '1px solid rgba(255,255,255,0.08)',
      mb: 3,
    }}>

      {/* Header */}
      <Box display="flex" justifyContent="space-between"
        alignItems="center" mb={2}>
        <Box>
          <Typography fontWeight="700" fontSize="0.95rem"
            sx={{ color: 'white' }}>
            PCB Data Table
          </Typography>
          <Typography fontSize="0.72rem"
            sx={{ color: 'rgba(255,255,255,0.35)' }}>
            {filtered.length} records found
          </Typography>
        </Box>

        {/* Search */}
        <TextField
          size="small"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{
            width: 200,
            '& .MuiOutlinedInput-root': {
              color: 'white',
              borderRadius: 2,
              background: 'rgba(255,255,255,0.05)',
              '& fieldset': { borderColor: 'rgba(255,255,255,0.1)' },
              '&:hover fieldset': { borderColor: '#00b4ff' },
              '&.Mui-focused fieldset': { borderColor: '#00b4ff' },
            },
            '& input::placeholder': { color: 'rgba(255,255,255,0.3)', opacity: 1 },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: 'rgba(255,255,255,0.3)', fontSize: 18 }} />
              </InputAdornment>
            )
          }}
        />
      </Box>

      {/* Table */}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {['#', 'Spare Part', 'Component', 'Status', 'Count', 'Total'].map((h) => (
                <TableCell key={h} sx={{
                  color: 'rgba(255,255,255,0.4)',
                  borderBottom: '1px solid rgba(255,255,255,0.06)',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  letterSpacing: 1,
                  textTransform: 'uppercase',
                }}>
                  {h}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filtered.map((row) => (
              <TableRow key={row.id} sx={{
                '&:hover': { background: 'rgba(0,180,255,0.04)' },
                transition: 'all 0.2s',
              }}>
                <TableCell sx={{ color: 'rgba(255,255,255,0.3)', borderBottom: '1px solid rgba(255,255,255,0.04)', fontSize: '0.82rem' }}>
                  {row.id}
                </TableCell>
                <TableCell sx={{ color: 'white', borderBottom: '1px solid rgba(255,255,255,0.04)', fontSize: '0.82rem', fontWeight: 600 }}>
                  {row.sparePart}
                </TableCell>
                <TableCell sx={{ color: 'rgba(255,255,255,0.7)', borderBottom: '1px solid rgba(255,255,255,0.04)', fontSize: '0.82rem' }}>
                  {row.component}
                </TableCell>
                <TableCell sx={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <Chip
                    label={row.status}
                    size="small"
                    sx={{
                      background: `${statusColors[row.status]}15`,
                      border: `1px solid ${statusColors[row.status]}40`,
                      color: statusColors[row.status],
                      fontSize: '0.7rem',
                      fontWeight: 700,
                    }}
                  />
                </TableCell>
                <TableCell sx={{ color: 'rgba(255,255,255,0.7)', borderBottom: '1px solid rgba(255,255,255,0.04)', fontSize: '0.82rem' }}>
                  {row.count}
                </TableCell>
                <TableCell sx={{ color: '#00b4ff', borderBottom: '1px solid rgba(255,255,255,0.04)', fontSize: '0.82rem', fontWeight: 600 }}>
                  {row.total}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default DataTable
