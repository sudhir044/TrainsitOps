import { Search, Bell, User } from 'lucide-react';
import { api } from '../utils/api';
import './Header.css';

export default function Header() {
  const user = api.getUser();

  return (
    <header className="header">
      <div className="header-search">
        <Search size={18} className="search-icon" />
        <input 
          type="text" 
          placeholder="Search..." 
          className="search-input"
        />
      </div>
      
      <div className="header-actions">
        <button className="icon-btn">
          <Bell size={20} />
          <span className="notification-dot"></span>
        </button>
        
        <div className="user-profile">
          <div className="avatar">
            <User size={18} />
          </div>
          <div className="user-info">
            <span className="user-name">{user?.full_name || 'Admin User'}</span>
            <span className="user-role">{user?.role || 'Super Admin'}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
