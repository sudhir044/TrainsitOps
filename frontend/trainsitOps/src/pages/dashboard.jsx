import React from 'react';
import './Dashboard.css';

const Dashboard = ({ 
  metrics = [], 
  recentTrips = [], 
  vehicleStatus = [], 
  user = { name: 'Raven K.', role: 'Dispatcher', initials: 'RK' } 
}) => {
  
  // Helper to determine CSS classes for status badges dynamically
  const getStatusClass = (status) => {
    if (!status) return 'draft';
    return status.toLowerCase().replace(/\s+/g, '-');
  };

  return (
    <div className="dashboard-container">
      {/* Top Header Row */}
      <header className="dashboard-header">
        <div className="search-bar-container">
          <input type="text" placeholder="Search..." className="search-input" />
        </div>
        <div className="user-profile">
          <span className="user-name">{user.name}</span>
          <span className="user-role-badge">{user.role}</span>
          <div className="avatar">{user.initials}</div>
        </div>
      </header>

      {/* Filters Row */}
      <section className="filters-section">
        <span className="filters-title">FILTERS</span>
        <div className="filters-group">
          <select defaultValue="all"><option value="all">Vehicle Type: All</option></select>
          <select defaultValue="all"><option value="all">Status: All</option></select>
          <select defaultValue="all"><option value="all">Region: All</option></select>
        </div>
      </section>

      {/* Metrics Grid */}
      <section className="metrics-grid">
        {metrics.length > 0 ? (
          metrics.map((metric, index) => (
            <div key={index} className="metric-card" style={{ borderLeft: `4px solid ${metric.color || '#3b82f6'}` }}>
              <span className="metric-label">{metric.label}</span>
              <span className="metric-value">{metric.value}</span>
            </div>
          ))
        ) : (
          <div className="no-data-placeholder">No metrics available</div>
        )}
      </section>

      {/* Main Split Layout: Table & Progress Charts */}
      <div className="dashboard-layout-split">
        {/* Recent Trips Table */}
        <section className="table-card">
          <h3 className="section-title">Recent Trips</h3>
          <div className="table-responsive">
            <table className="trips-table">
              <thead>
                <tr>
                  <th>TRIP</th>
                  <th>VEHICLE</th>
                  <th>DRIVER</th>
                  <th>STATUS</th>
                  <th>ETA</th>
                </tr>
              </thead>
              <tbody>
                {recentTrips.length > 0 ? (
                  recentTrips.map((trip, idx) => (
                    <tr key={trip.id || idx}>
                      <td className="trip-id">{trip.id || '—'}</td>
                      <td>{trip.vehicle || '—'}</td>
                      <td>{trip.driver || '—'}</td>
                      <td>
                        <span className={`status-badge ${getStatusClass(trip.status)}`}>
                          {trip.status || 'Unknown'}
                        </span>
                      </td>
                      <td className="trip-eta">{trip.eta || '—'}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="table-empty-state">No recent trips found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* Vehicle Status Progress Breakdown */}
        <section className="status-card">
          <h3 className="section-title">Vehicle Status</h3>
          <div className="status-bars-list">
            {vehicleStatus.length > 0 ? (
              vehicleStatus.map((status, idx) => (
                <div key={idx} className="status-progress-group">
                  <div className="status-bar-labels">
                    <span className="status-bar-name">{status.label}</span>
                    <span className="status-bar-percentage">{status.percentage}%</span>
                  </div>
                  <div className="progress-track">
                    <div 
                      className="progress-fill" 
                      style={{ width: `${status.percentage}%`, backgroundColor: status.color || '#6b7280' }}
                    ></div>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-data-placeholder">No status records</div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;