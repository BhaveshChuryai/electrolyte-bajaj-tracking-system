import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import AnalyticsPage from './pages/AnalyticsPage'
import MasterTablePage from './pages/MasterTablePage'
import UploadPage from './pages/UploadPage'
import Layout from './components/common/Layout'

function App() {
  return (
    <Router>
      <Routes>
        {/* Public route */}
        <Route path="/login" element={<LoginPage />} />

        {/* Protected routes with Layout */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/dashboard" />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="analytics" element={<AnalyticsPage />} />
          <Route path="master-table" element={<MasterTablePage />} />
          <Route path="upload" element={<UploadPage />} />
        </Route>

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </Router>
  )
}

export default App

