import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import P2Clients from './pages/P2Clients'
import P2ClientDetail from './pages/P2ClientDetail'
import AddP2Client from './pages/AddP2Client'
import Websites from './pages/Websites'
import Automation from './pages/Automation'
import Reports from './pages/Reports'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/p2-clients" element={<P2Clients />} />
        <Route path="/p2-clients/add" element={<AddP2Client />} />
        <Route path="/p2-clients/:id" element={<P2ClientDetail />} />
        <Route path="/websites" element={<Websites />} />
        <Route path="/automation" element={<Automation />} />
        <Route path="/reports" element={<Reports />} />
      </Routes>
    </Layout>
  )
}

export default App