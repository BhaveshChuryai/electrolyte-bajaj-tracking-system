import {
  Box, Typography, MenuItem, Select, Button,
  FormControl, InputLabel, TextField, InputAdornment, Chip
} from '@mui/material'
import FilterListIcon from '@mui/icons-material/FilterList'
import RestartAltIcon from '@mui/icons-material/RestartAlt'
import SearchIcon from '@mui/icons-material/Search'

const selectStyle = {
  color: 'white',
  borderRadius: 2,
  background: 'rgba(255,255,255,0.05)',
  '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.1)' },
  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#00b4ff' },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#00b4ff' },
  '& .MuiSvgIcon-root': { color: 'rgba(255,255,255,0.4)' },
}

const menuProps = {
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
}

function FilterBar({ filters, onFilterChange, onReset }) {

  const activeFilterCount = [
    filters.status !== 'All',
    filters.component !== 'All',
    filters.search !== '',
  ].filter(Boolean).length

  return (
    <Box sx={{
      p: 2.5, borderRadius: 3, mb: 3,
      background: 'linear-gradient(135deg, #0f172a, #1e293b)',
      border: '1px solid rgba(255,255,255,0.08)',
    }}>

      {/* Header */}
      <Box display="flex" alignItems="center"
        justifyContent="space-between" mb={2}>
        <Box display="flex" alignItems="center" gap={1}>
          <FilterListIcon sx={{ color: '#00b4ff', fontSize: 18 }} />
          <Typography fontWeight="700" fontSize="0.85rem"
            sx={{ color: 'white' }}>
            Filters
          </Typography>
          {activeFilterCount > 0 && (
            <Chip
              label={`${activeFilterCount} active`}
              size="small"
              sx={{
                background: 'rgba(0,180,255,0.15)',
                border: '1px solid rgba(0,180,255,0.3)',
                color: '#00b4ff',
                fontSize: '0.65rem',
                height: 20,
              }}
            />
          )}
        </Box>

        {/* Reset */}
        {activeFilterCount > 0 && (
          <Button
            onClick={onReset}
            startIcon={<RestartAltIcon />}
            size="small"
            sx={{
              color: '#ff4444',
              border: '1px solid rgba(255,68,68,0.3)',
              borderRadius: 2,
              fontSize: '0.75rem',
              '&:hover': {
                background: 'rgba(255,68,68,0.08)',
                border: '1px solid rgba(255,68,68,0.5)',
              }
            }}>
            Reset All
          </Button>
        )}
      </Box>

      {/* Filter controls */}
      <Box display="flex" gap={2} flexWrap="wrap" alignItems="center">

        {/* Search */}
        <TextField
          size="small"
          placeholder="Search parts, components..."
          value={filters.search}
          onChange={(e) => onFilterChange({ search: e.target.value })}
          sx={{
            minWidth: 220,
            '& .MuiOutlinedInput-root': {
              color: 'white',
              borderRadius: 2,
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

        {/* Status filter */}
        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel sx={{ color: 'rgba(255,255,255,0.4)' }}>
            Status
          </InputLabel>
          <Select
            value={filters.status}
            label="Status"
            onChange={(e) => onFilterChange({ status: e.target.value })}
            sx={selectStyle}
            MenuProps={menuProps}>
            {['All', 'Active', 'Inactive', 'Pending', 'Approved', 'Review'].map(s => (
              <MenuItem key={s} value={s}>{s}</MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Component filter */}
        <FormControl size="small" sx={{ minWidth: 160 }}>
          <InputLabel sx={{ color: 'rgba(255,255,255,0.4)' }}>
            Component
          </InputLabel>
          <Select
            value={filters.component}
            label="Component"
            onChange={(e) => onFilterChange({ component: e.target.value })}
            sx={selectStyle}
            MenuProps={menuProps}>
            {['All', 'Resistor', 'Capacitor', 'Transistor', 'Diode', 'IC Chip', 'Relay', 'Fuse', 'Transformer'].map(c => (
              <MenuItem key={c} value={c}>{c}</MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Active filter tags */}
        {filters.status !== 'All' && (
          <Chip
            label={`Status: ${filters.status}`}
            size="small"
            onDelete={() => onFilterChange({ status: 'All' })}
            sx={{
              background: 'rgba(0,180,255,0.1)',
              border: '1px solid rgba(0,180,255,0.2)',
              color: '#00b4ff',
              fontSize: '0.72rem',
              '& .MuiChip-deleteIcon': { color: '#00b4ff' }
            }}
          />
        )}
        {filters.component !== 'All' && (
          <Chip
            label={`Component: ${filters.component}`}
            size="small"
            onDelete={() => onFilterChange({ component: 'All' })}
            sx={{
              background: 'rgba(255,149,0,0.1)',
              border: '1px solid rgba(255,149,0,0.2)',
              color: '#ff9500',
              fontSize: '0.72rem',
              '& .MuiChip-deleteIcon': { color: '#ff9500' }
            }}
          />
        )}

      </Box>
    </Box>
  )
}

export default FilterBar

