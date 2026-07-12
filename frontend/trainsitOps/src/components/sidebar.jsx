import React, { useState } from 'react';
import './sidebar.css';

const Sidebar = () => {
  // Local state to keep the active styling working on click
  const [activeItem, setActiveItem] = useState('Dashboard');

  const menuItems = [
    'Dashboard',
    'Fleet',
    'Drivers',
    'Trips',
    'Maintenance',
    'Fuel & Expenses',
    'Analytics'
  ];

  return (
    <aside className="sidebar">
      {/* Brand Header */}
      <div className="sidebar-brand">
        <h2>TransitOps</h2>
      </div>

      {/* Navigation Menu Links */}
      <nav className="sidebar-menu">
        <ul>
          {menuItems.map((item) => (
            <li 
              key={item}
              className={`menu-item ${activeItem === item ? 'active' : ''}`}
              onClick={() => setActiveItem(item)}
            >
              {item}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;