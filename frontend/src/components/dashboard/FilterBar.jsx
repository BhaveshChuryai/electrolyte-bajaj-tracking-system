import { Box, Typography, MenuItem, Select, Button, FormControl, InputLabel } from '@mui/material'
import FilterListIcon from '@mui/icons-material/FilterList'
import RestartAltIcon from '@mui/icons-material/RestartAlt'
import { useState } from 'react'

function FilterBar() {
  const [status, setStatus] = useState('All')
  const [component, setComponent] = useState('All')

  const handleReset = () => {
    setStatus('All')
    setComponent('All')
  }

  const selectStyle = {
    color: 'white',
    borderRadius: 2,
    background: 'rgba(255,255,255,0.05)',
    '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.1)' },
    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#00b4ff' },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#00b4ff' },
    '& .MuiSvgIcon-root': { color: 'rgba(255,255,255,0.4)' },
  }

  return (
    <Box sx={{
      p: 2.5, borderRadius: 3, mb: 3,
      background: 'linear-gradient(135deg, #0f172a, #1e293b)',
      border: '1px solid rgba(255,255,255,0.08)',
      display: 'flex',
      alignItems: 'center',
      gap: 2,
      flexWrap: 'wrap',
    }}>

      {/* Title */}
      <Box display="flex" alignItems="center" gap={1} mr={1}>
        <FilterListIcon sx={{ color: '#00b4ff', fontSize: 20 }} />
        <Typography fontWeight="700" fontSize="0.85rem"
          sx={{ color: 'white' }}>
          Filters
        </Typography>
      </Box>

      {/* Status Filter */}
      <FormControl size="small" sx={{ minWidth: 150 }}>
        <InputLabel sx={{ color: 'rgba(255,255,255,0.4)' }}>
          Status
        </InputLabel>
        <Select
          value={status}
          label="Status"
          onChange={(e) => setStatus(e.target.value)}
          sx={selectStyle}
          MenuProps={{
            PaperProps: {
              sx: {
                background: '#1e293b',
                border: '1px solid rgba(255,255,255,0.1)',
                '& .MuiMenuItem-root': {
                  color: 'rgba(255,255,255,0.7)',
                  '&:hover': { background: 'rgba(0,180,255,0.1)' },
                  '&.Mui-selected': { background: 'rgba(0,180,255,0.15)', color: '#00b4ff' },
                }
              }
            }
          }}>
          {['All', 'Active', 'Inactive', 'Pending', 'Approved', 'Review'].map(s => (
            <MenuItem key={s} value={s}>{s}</MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Component Filter */}
      <FormControl size="small" sx={{ minWidth: 150 }}>
        <InputLabel sx={{ color: 'rgba(255,255,255,0.4)' }}>
          Component
        </InputLabel>
        <Select
          value={component}
          label="Component"
          onChange={(e) => setComponent(e.target.value)}
          sx={selectStyle}
          MenuProps={{
            PaperProps: {
              sx: {
                background: '#1e293b',
                border: '1px solid rgba(255,255,255,0.1)',
                '& .MuiMenuItem-root': {
                  color: 'rgba(255,255,255,0.7)',
                  '&:hover': { background: 'rgba(0,180,255,0.1)' },
                  '&.Mui-selected': { background: 'rgba(0,180,255,0.15)', color: '#00b4ff' },
                }
              }
            }
          }}>
          {['All', 'Resistor', 'Capacitor', 'Transistor', 'Diode', 'IC Chip', 'Relay', 'Fuse', 'Transformer'].map(c => (
            <MenuItem key={c} value={c}>{c}</MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Reset Button */}
      <Button
        onClick={handleReset}
        startIcon={<RestartAltIcon />}
        size="small"
        sx={{
          color: 'rgba(255,255,255,0.4)',
          borderColor: 'rgba(255,255,255,0.1)',
          borderRadius: 2,
          border: '1px solid rgba(255,255,255,0.1)',
          '&:hover': {
            borderColor: '#ff4444',
            color: '#ff4444',
            background: 'rgba(255,68,68,0.05)',
          }
        }}>
        Reset
      </Button>

      {/* Active filter info */}
      {(status !== 'All' || component !== 'All') && (
        <Typography variant="caption"
          sx={{ color: '#00b4ff', ml: 'auto' }}>
          Filtering: {status !== 'All' ? `Status = ${status}` : ''} {component !== 'All' ? `Component = ${component}` : ''}
        </Typography>
      )}

    </Box>
  )
}

export default FilterBar
