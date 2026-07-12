import { Link, useLocation, useNavigate } from 'react-router-dom';
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
  const location = useLocation();

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
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-item ${isActive ? 'active' : ''}`}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-label">{item.label}</span>
                {isActive && <div className="active-indicator"></div>}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="sidebar-section">
        <div className="section-title">Session</div>
        <div className="sidebar-footer" style={{ padding: '0px' }}>
          <button onClick={handleLogout} className="logout-btn" style={{ width: '100%' }}>
            <LogOut size={20} />
            <span>Log Out</span>
          </button>
        </div>
      </div>
    </aside>
  );
}