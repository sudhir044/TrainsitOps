import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import VehicleRegistry from './pages/VehicleRegistry';
import Drivers from './pages/Drivers';
import RoutesStops from './pages/RoutesStops';
import TripDispatcher from './pages/TripDispatcher';
import Maintenance from './pages/Maintenance';
import FuelExpense from './pages/FuelExpense';
import ReportsAnalytics from './pages/ReportsAnalytics';
import Settings from './pages/Settings';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="vehicles" element={<VehicleRegistry />} />
          <Route path="drivers" element={<Drivers />} />
          <Route path="routes" element={<RoutesStops />} />
          <Route path="dispatch" element={<TripDispatcher />} />
          <Route path="maintenance" element={<Maintenance />} />
          <Route path="fuel" element={<FuelExpense />} />
          <Route path="reports" element={<ReportsAnalytics />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
