import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Car,
  Users,
  MapPin,
  Send,
  Wrench,
  Fuel,
  BarChart3,
  Settings,
  LogOut
} from 'lucide-react';
import { api } from '../utils/api';
import './Sidebar.css';

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
  { path: '/vehicles', label: 'Vehicle Registry', icon: <Car size={20} /> },
  { path: '/drivers', label: 'Drivers', icon: <Users size={20} /> },
  { path: '/routes', label: 'Routes & Stops', icon: <MapPin size={20} /> },
  { path: '/dispatch', label: 'Trip Dispatcher', icon: <Send size={20} /> },
  { path: '/maintenance', label: 'Maintenance', icon: <Wrench size={20} /> },
  { path: '/fuel', label: 'Fuel & Expense', icon: <Fuel size={20} /> },
  { path: '/reports', label: 'Reports & Analytics', icon: <BarChart3 size={20} /> },
  { path: '/settings', label: 'Settings & RBAC', icon: <Settings size={20} /> },
];

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    api.logout();
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="brand-logo">
          {/* Using a simple styled div to mimic the dotted logo */}
          <div className="logo-dots">
            <div className="dot"></div><div className="dot"></div><div className="dot"></div>
            <div className="dot"></div><div className="dot"></div><div className="dot"></div>
            <div className="dot"></div><div className="dot"></div><div className="dot"></div>
          </div>
        </div>
        <h2>TransitOps</h2>
      </div>

      <div className="sidebar-section">
        <div className="section-title">Dashboard</div>
        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            >
              {({ isActive }) => (
                <>
                  <span className="nav-icon">{item.icon}</span>
                  <span className="nav-label">{item.label}</span>
                  {isActive && <div className="active-indicator"></div>}
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="sidebar-footer">
        <button onClick={handleLogout} className="logout-btn">
          <LogOut size={20} />
          <span>Log Out</span>
        </button>
      </div>
    </aside>
  );
}