import { useState, useRef } from 'react'
import {
  Box, Typography, Button, Grid, LinearProgress,
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Chip
} from '@mui/material'
import UploadFileIcon from '@mui/icons-material/UploadFile'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import ErrorIcon from '@mui/icons-material/Error'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'
import DeleteIcon from '@mui/icons-material/Delete'

const uploadHistory = [
  { id: 1, filename: 'pcb_data_march.xlsx', rows: 1359, status: 'Success', date: '2025-03-20' },
  { id: 2, filename: 'pcb_data_feb.xlsx', rows: 815, status: 'Success', date: '2025-03-15' },
  { id: 3, filename: 'pcb_data_jan.xlsx', rows: 141, status: 'Failed', date: '2025-03-10' },
  { id: 4, filename: 'pcb_data_dec.xlsx', rows: 99, status: 'Success', date: '2025-03-05' },
]

function UploadPage() {
  const [dragOver, setDragOver] = useState(false)
  const [file, setFile] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [uploadStatus, setUploadStatus] = useState(null)
  const fileInputRef = useRef(null)

  const handleDrop = (e) => {
    e.preventDefault()
    setDragOver(false)
    const dropped = e.dataTransfer.files[0]
    if (dropped && dropped.name.endsWith('.xlsx')) {
      setFile(dropped)
      setUploadStatus(null)
    } else {
      setUploadStatus('error')
    }
  }

  const handleFileSelect = (e) => {
    const selected = e.target.files[0]
    if (selected && selected.name.endsWith('.xlsx')) {
      setFile(selected)
      setUploadStatus(null)
    }
  }

  const handleUpload = () => {
    if (!file) return
    setUploading(true)
    setProgress(0)

    // Simulate upload progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setUploading(false)
          setUploadStatus('success')
          return 100
        }
        return prev + 10
      })
    }, 200)
  }

  const handleRemove = () => {
    setFile(null)
    setUploadStatus(null)
    setProgress(0)
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
          Upload Data
        </Typography>
        <Typography variant="caption"
          sx={{ color: 'rgba(255,255,255,0.35)' }}>
          Upload Excel files to update dashboard data
        </Typography>
      </Box>

      <Grid container spacing={3}>

        {/* Upload Box */}
        <Grid item xs={12} md={7}>
          <Box sx={{
            p: 3, borderRadius: 3,
            background: 'linear-gradient(135deg, #0f172a, #1e293b)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}>

            <Typography fontWeight="700" fontSize="0.95rem"
              sx={{ color: 'white', mb: 0.5 }}>
              Upload Excel Workbook
            </Typography>
            <Typography fontSize="0.75rem" mb={3}
              sx={{ color: 'rgba(255,255,255,0.35)' }}>
              Only .xlsx files are supported. Max size 10MB.
            </Typography>

            {/* Drag & Drop Zone */}
            {!file && (
              <Box
                onDrop={handleDrop}
                onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
                onDragLeave={() => setDragOver(false)}
                onClick={() => fileInputRef.current.click()}
                sx={{
                  border: `2px dashed ${dragOver ? '#00b4ff' : 'rgba(255,255,255,0.1)'}`,
                  borderRadius: 3,
                  p: 6,
                  textAlign: 'center',
                  cursor: 'pointer',
                  background: dragOver
                    ? 'rgba(0,180,255,0.05)'
                    : 'rgba(255,255,255,0.02)',
                  transition: 'all 0.3s',
                  '&:hover': {
                    border: '2px dashed rgba(0,180,255,0.5)',
                    background: 'rgba(0,180,255,0.04)',
                  }
                }}>
                <UploadFileIcon sx={{
                  fontSize: 48,
                  color: dragOver ? '#00b4ff' : 'rgba(255,255,255,0.2)',
                  mb: 2,
                  transition: 'all 0.3s',
                }} />
                <Typography fontWeight="600"
                  sx={{ color: dragOver ? '#00b4ff' : 'rgba(255,255,255,0.5)', mb: 0.5 }}>
                  {dragOver ? 'Drop your file here!' : 'Drag & drop your Excel file here'}
                </Typography>
                <Typography fontSize="0.75rem"
                  sx={{ color: 'rgba(255,255,255,0.25)', mb: 2 }}>
                  or click to browse
                </Typography>
                <Button variant="outlined" size="small"
                  sx={{
                    color: '#00b4ff',
                    borderColor: 'rgba(0,180,255,0.3)',
                    borderRadius: 2,
                    '&:hover': {
                      borderColor: '#00b4ff',
                      background: 'rgba(0,180,255,0.05)',
                    }
                  }}>
                  Choose File
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".xlsx"
                  onChange={handleFileSelect}
                  style={{ display: 'none' }}
                />
              </Box>
            )}

            {/* File Selected */}
            {file && (
              <Box sx={{
                p: 2.5, borderRadius: 2,
                background: 'rgba(0,180,255,0.05)',
                border: '1px solid rgba(0,180,255,0.2)',
                mb: 2,
              }}>
                <Box display="flex" alignItems="center"
                  justifyContent="space-between">
                  <Box display="flex" alignItems="center" gap={1.5}>
                    <InsertDriveFileIcon sx={{ color: '#00b4ff', fontSize: 28 }} />
                    <Box>
                      <Typography fontWeight="600" fontSize="0.85rem"
                        sx={{ color: 'white' }}>
                        {file.name}
                      </Typography>
                      <Typography fontSize="0.7rem"
                        sx={{ color: 'rgba(255,255,255,0.35)' }}>
                        {(file.size / 1024).toFixed(1)} KB
                      </Typography>
                    </Box>
                  </Box>
                  <Button size="small" onClick={handleRemove}
                    startIcon={<DeleteIcon />}
                    sx={{
                      color: '#ff4444',
                      '&:hover': { background: 'rgba(255,68,68,0.08)' }
                    }}>
                    Remove
                  </Button>
                </Box>

                {/* Progress bar */}
                {uploading && (
                  <Box mt={2}>
                    <Box display="flex" justifyContent="space-between" mb={0.5}>
                      <Typography fontSize="0.72rem"
                        sx={{ color: 'rgba(255,255,255,0.4)' }}>
                        Uploading...
                      </Typography>
                      <Typography fontSize="0.72rem"
                        sx={{ color: '#00b4ff' }}>
                        {progress}%
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={progress}
                      sx={{
                        borderRadius: 1,
                        background: 'rgba(255,255,255,0.08)',
                        '& .MuiLinearProgress-bar': {
                          background: 'linear-gradient(135deg, #00b4ff, #0066ff)',
                          borderRadius: 1,
                        }
                      }}
                    />
                  </Box>
                )}
              </Box>
            )}

            {/* Success message */}
            {uploadStatus === 'success' && (
              <Box sx={{
                p: 2, borderRadius: 2, mb: 2,
                background: 'rgba(0,255,136,0.05)',
                border: '1px solid rgba(0,255,136,0.2)',
                display: 'flex', alignItems: 'center', gap: 1.5,
              }}>
                <CheckCircleIcon sx={{ color: '#00ff88' }} />
                <Box>
                  <Typography fontWeight="600" fontSize="0.85rem"
                    sx={{ color: '#00ff88' }}>
                    Upload Successful!
                  </Typography>
                  <Typography fontSize="0.72rem"
                    sx={{ color: 'rgba(255,255,255,0.4)' }}>
                    Data has been processed and saved to database
                  </Typography>
                </Box>
              </Box>
            )}

            {/* Error message */}
            {uploadStatus === 'error' && (
              <Box sx={{
                p: 2, borderRadius: 2, mb: 2,
                background: 'rgba(255,68,68,0.05)',
                border: '1px solid rgba(255,68,68,0.2)',
                display: 'flex', alignItems: 'center', gap: 1.5,
              }}>
                <ErrorIcon sx={{ color: '#ff4444' }} />
                <Box>
                  <Typography fontWeight="600" fontSize="0.85rem"
                    sx={{ color: '#ff4444' }}>
                    Invalid File!
                  </Typography>
                  <Typography fontSize="0.72rem"
                    sx={{ color: 'rgba(255,255,255,0.4)' }}>
                    Please upload a valid .xlsx file only
                  </Typography>
                </Box>
              </Box>
            )}

            {/* Upload Button */}
            {file && !uploading && uploadStatus !== 'success' && (
              <Button
                fullWidth variant="contained"
                onClick={handleUpload}
                startIcon={<UploadFileIcon />}
                sx={{
                  py: 1.5, borderRadius: 2,
                  fontWeight: 'bold',
                  background: 'linear-gradient(135deg, #00b4ff, #0066ff)',
                  boxShadow: '0 8px 25px rgba(0,102,255,0.3)',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 12px 30px rgba(0,102,255,0.4)',
                  }
                }}>
                Upload & Process
              </Button>
            )}

          </Box>
        </Grid>

        {/* Instructions */}
        <Grid item xs={12} md={5}>
          <Box sx={{
            p: 3, borderRadius: 3,
            background: 'linear-gradient(135deg, #0f172a, #1e293b)',
            border: '1px solid rgba(255,255,255,0.08)',
            mb: 2,
          }}>
            <Typography fontWeight="700" fontSize="0.9rem"
              sx={{ color: 'white', mb: 2 }}>
              📋 Upload Instructions
            </Typography>
            {[
              'File must be .xlsx format',
              'Excel must have correct column headers',
              'Data columns: spare_part_code, component, status, count',
              'Max file size: 10MB',
              'Data will be appended to existing records',
              'Dashboard updates automatically after upload',
            ].map((tip, i) => (
              <Box key={i} display="flex" gap={1.5} mb={1.5}
                alignItems="flex-start">
                <Box sx={{
                  width: 20, height: 20, borderRadius: '50%',
                  background: 'rgba(0,180,255,0.15)',
                  border: '1px solid rgba(0,180,255,0.3)',
                  display: 'flex', alignItems: 'center',
                  justifyContent: 'center', flexShrink: 0, mt: 0.1,
                }}>
                  <Typography fontSize="0.6rem" fontWeight="800"
                    sx={{ color: '#00b4ff' }}>
                    {i + 1}
                  </Typography>
                </Box>
                <Typography fontSize="0.78rem"
                  sx={{ color: 'rgba(255,255,255,0.5)' }}>
                  {tip}
                </Typography>
              </Box>
            ))}
          </Box>
        </Grid>

        {/* Upload History */}
        <Grid item xs={12}>
          <Box sx={{
            p: 3, borderRadius: 3,
            background: 'linear-gradient(135deg, #0f172a, #1e293b)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}>
            <Typography fontWeight="700" fontSize="0.95rem"
              sx={{ color: 'white', mb: 2 }}>
              Upload History
            </Typography>

            <TableContainer sx={{
              borderRadius: 2,
              border: '1px solid rgba(255,255,255,0.05)',
            }}>
              <Table>
                <TableHead>
                  <TableRow sx={{ background: 'rgba(0,0,0,0.2)' }}>
                    {['#', 'Filename', 'Rows Processed', 'Status', 'Date'].map(h => (
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
                  {uploadHistory.map((row, i) => (
                    <TableRow key={row.id} sx={{
                      '&:hover': { background: 'rgba(0,180,255,0.04)' },
                      transition: 'background 0.2s',
                    }}>
                      <TableCell sx={cellStyle}>{i + 1}</TableCell>
                      <TableCell sx={{ ...cellStyle, color: 'white', fontWeight: 600 }}>
                        {row.filename}
                      </TableCell>
                      <TableCell sx={{ ...cellStyle, color: '#00b4ff' }}>
                        {row.rows.toLocaleString()}
                      </TableCell>
                      <TableCell sx={{ borderBottom: '1px solid rgba(255,255,255,0.04)', py: 1.5 }}>
                        <Chip
                          label={row.status}
                          size="small"
                          icon={row.status === 'Success'
                            ? <CheckCircleIcon style={{ fontSize: 14 }} />
                            : <ErrorIcon style={{ fontSize: 14 }} />}
                          sx={{
                            background: row.status === 'Success'
                              ? 'rgba(0,255,136,0.1)'
                              : 'rgba(255,68,68,0.1)',
                            border: row.status === 'Success'
                              ? '1px solid rgba(0,255,136,0.3)'
                              : '1px solid rgba(255,68,68,0.3)',
                            color: row.status === 'Success' ? '#00ff88' : '#ff4444',
                            fontSize: '0.7rem', fontWeight: 700, height: 22,
                          }}
                        />
                      </TableCell>
                      <TableCell sx={cellStyle}>{row.date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Grid>

      </Grid>
    </Box>
  )
}

const cellStyle = {
  color: 'rgba(255,255,255,0.65)',
  borderBottom: '1px solid rgba(255,255,255,0.04)',
  fontSize: '0.82rem', py: 1.5,
}

export default UploadPage

