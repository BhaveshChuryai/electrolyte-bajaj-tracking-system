import { useState } from 'react'
import {
  Box, Card, CardContent, TextField,
  Button, Typography, Alert
} from '@mui/material'

function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = () => {
    if (email === 'admin@bajaj.com' && password === 'admin123') {
      window.location.href = '/dashboard'
    } else {
      setError('Invalid email or password!')
    }
  }

  return (
    <Box sx={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1565C0 0%, #0D47A1 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <Card sx={{ width: 400, borderRadius: 3, boxShadow: 10 }}>
        <CardContent sx={{ p: 4 }}>

          <Typography variant="h5" fontWeight="bold" 
            textAlign="center" color="#1565C0" mb={1}>
            ⚡ Electrolyte Bajaj
          </Typography>
          <Typography variant="body2" 
            textAlign="center" color="gray" mb={3}>
            PCB Data Analysis Dashboard
          </Typography>

          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

          <TextField
            fullWidth label="Email" type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth label="Password" type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ mb: 3 }}
          />

          <Button
            fullWidth variant="contained"
            size="large"
            onClick={handleLogin}
            sx={{
              background: 'linear-gradient(135deg, #1565C0, #0D47A1)',
              borderRadius: 2,
              py: 1.5,
              fontWeight: 'bold',
              fontSize: '1rem'
            }}>
            Login
          </Button>

          <Typography variant="caption" 
            display="block" textAlign="center" 
            color="gray" mt={2}>
            Use: admin@bajaj.com / admin123
          </Typography>

        </CardContent>
      </Card>
    </Box>
  )
}

export default LoginPage
