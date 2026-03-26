import {
  Box, Typography, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Chip,
  TablePagination, IconButton, Tooltip
} from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility'
import FileDownloadIcon from '@mui/icons-material/FileDownload'
import { useState } from 'react'

const statusColors = {
  Active: { bg: 'rgba(0,255,136,0.1)', border: 'rgba(0,255,136,0.3)', color: '#00ff88' },
  Pending: { bg: 'rgba(255,149,0,0.1)', border: 'rgba(255,149,0,0.3)', color: '#ff9500' },
  Approved: { bg: 'rgba(0,180,255,0.1)', border: 'rgba(0,180,255,0.3)', color: '#00b4ff' },
  Inactive: { bg: 'rgba(255,68,68,0.1)', border: 'rgba(255,68,68,0.3)', color: '#ff4444' },
  Review: { bg: 'rgba(191,90,242,0.1)', border: 'rgba(191,90,242,0.3)', color: '#bf5af2' },
}

const headers = ['#', 'Spare Part', 'Component', 'Status', 'Count', 'Total', 'Action']

function DataTable({ rows = [], search, onSearchChange }) {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  // Pagination
  const paginatedRows = rows.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  )

  const handleExport = () => {
    const csv = [
      headers.slice(0, -1).join(','),
      ...rows.map(r => `${r.id},${r.sparePart},${r.component},${r.status},${r.count},${r.total}`)
    ].join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'pcb_data.csv'
    a.click()
  }

  return (
    <Box sx={{
      p: 3, borderRadius: 3,
      background: 'linear-gradient(135deg, #0f172a, #1e293b)',
      border: '1px solid rgba(255,255,255,0.08)',
      mb: 3,
    }}>

      {/* Header */}
      <Box display="flex" justifyContent="space-between"
        alignItems="center" mb={2.5}>
        <Box>
          <Typography fontWeight="700" fontSize="0.95rem"
            sx={{ color: 'white' }}>
            PCB Data Table
          </Typography>
          <Typography fontSize="0.72rem"
            sx={{ color: 'rgba(255,255,255,0.35)' }}>
            {rows.length} records found
          </Typography>
        </Box>

        {/* Export button */}
        <Tooltip title="Export as CSV">
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

      {/* Empty state */}
      {rows.length === 0 && (
        <Box textAlign="center" py={6}>
          <Typography fontSize="2rem" mb={1}>🔍</Typography>
          <Typography fontWeight="600"
            sx={{ color: 'rgba(255,255,255,0.4)' }}>
            No records found
          </Typography>
          <Typography fontSize="0.8rem"
            sx={{ color: 'rgba(255,255,255,0.2)' }}>
            Try adjusting your filters
          </Typography>
        </Box>
      )}

      {/* Table */}
      {rows.length > 0 && (
        <>
          <TableContainer sx={{
            borderRadius: 2,
            border: '1px solid rgba(255,255,255,0.05)',
          }}>
            <Table>
              <TableHead>
                <TableRow sx={{
                  background: 'rgba(0,0,0,0.2)',
                }}>
                  {headers.map((h) => (
                    <TableCell key={h} sx={{
                      color: 'rgba(255,255,255,0.35)',
                      borderBottom: '1px solid rgba(255,255,255,0.06)',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      letterSpacing: 1.5,
                      textTransform: 'uppercase',
                      py: 1.5,
                    }}>
                      {h}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedRows.map((row, i) => (
                  <TableRow key={row.id} sx={{
                    '&:hover': {
                      background: 'rgba(0,180,255,0.04)',
                    },
                    transition: 'background 0.2s',
                    background: i % 2 === 0
                      ? 'transparent'
                      : 'rgba(255,255,255,0.01)',
                  }}>
                    <TableCell sx={cellStyle}>
                      {page * rowsPerPage + i + 1}
                    </TableCell>
                    <TableCell sx={{ ...cellStyle, color: 'white', fontWeight: 600 }}>
                      {row.sparePart}
                    </TableCell>
                    <TableCell sx={cellStyle}>
                      {row.component}
                    </TableCell>
                    <TableCell sx={{ borderBottom: '1px solid rgba(255,255,255,0.04)', py: 1.5 }}>
                      <Chip
                        label={row.status}
                        size="small"
                        sx={{
                          background: statusColors[row.status]?.bg,
                          border: `1px solid ${statusColors[row.status]?.border}`,
                          color: statusColors[row.status]?.color,
                          fontSize: '0.7rem',
                          fontWeight: 700,
                          height: 22,
                        }}
                      />
                    </TableCell>
                    <TableCell sx={cellStyle}>
                      {row.count.toLocaleString()}
                    </TableCell>
                    <TableCell sx={{ ...cellStyle, color: '#00b4ff', fontWeight: 600 }}>
                      {row.total.toLocaleString()}
                    </TableCell>
                    <TableCell sx={{ borderBottom: '1px solid rgba(255,255,255,0.04)', py: 1.5 }}>
                      <Tooltip title="View Details">
                        <IconButton size="small"
                          sx={{
                            color: 'rgba(255,255,255,0.3)',
                            '&:hover': { color: '#00b4ff' }
                          }}>
                          <VisibilityIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Pagination */}
          <TablePagination
            component="div"
            count={rows.length}
            page={page}
            onPageChange={(e, newPage) => setPage(newPage)}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={(e) => {
              setRowsPerPage(parseInt(e.target.value, 10))
              setPage(0)
            }}
            rowsPerPageOptions={[5, 10, 25]}
            sx={{
              color: 'rgba(255,255,255,0.4)',
              borderTop: '1px solid rgba(255,255,255,0.06)',
              mt: 1,
              '& .MuiIconButton-root': { color: 'rgba(255,255,255,0.4)' },
              '& .MuiSelect-icon': { color: 'rgba(255,255,255,0.4)' },
              '& .MuiTablePagination-select': { color: 'rgba(255,255,255,0.6)' },
            }}
          />
        </>
      )}
    </Box>
  )
}

const cellStyle = {
  color: 'rgba(255,255,255,0.65)',
  borderBottom: '1px solid rgba(255,255,255,0.04)',
  fontSize: '0.82rem',
  py: 1.5,
}

export default DataTable
