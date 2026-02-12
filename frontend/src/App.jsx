import { Navigate, Route, Routes } from 'react-router-dom';
import RoleRoute from './components/RoleRoute.jsx';
import AddWorkersPage from './pages/AddWorkersPage.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import GroupsPage from './pages/GroupsPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import ManageSlotsPage from './pages/ManageSlotsPage.jsx';
import RecordsPage from './pages/RecordsPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import SupervisorDashboard from './pages/SupervisorDashboard.jsx';
import WorkerDashboard from './pages/WorkerDashboard.jsx';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/worker" element={<RoleRoute allow={['worker']}><WorkerDashboard /></RoleRoute>} />
      <Route path="/admin" element={<RoleRoute allow={['admin']}><AdminDashboard /></RoleRoute>} />
      <Route path="/admin/workers" element={<RoleRoute allow={['admin']}><AddWorkersPage /></RoleRoute>} />
      <Route path="/admin/records" element={<RoleRoute allow={['admin']}><RecordsPage /></RoleRoute>} />
      <Route path="/admin/slots" element={<RoleRoute allow={['admin']}><ManageSlotsPage /></RoleRoute>} />
      <Route path="/admin/groups" element={<RoleRoute allow={['admin']}><GroupsPage /></RoleRoute>} />
      <Route path="/supervisor" element={<RoleRoute allow={['supervisor']}><SupervisorDashboard /></RoleRoute>} />
    </Routes>
  );
}
