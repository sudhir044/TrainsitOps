import React, { useState } from 'react';
import './fleet.css';

const Fleet = () => {
  const [typeFilter, setTypeFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchReg, setSearchReg] = useState('');

  // Keeps data empty until the backend API connection is established
  const vehicles = [];

  return (
    <div className="fleet-container">
      {/* Header section with view action */}
      <div className="fleet-header">
        <h1>Vehicle Registry</h1>
        <button className="btn-add-vehicle">+ Add Vehicle</button>
      </div>

      {/* Filter and Query controls area */}
      <div className="fleet-filters">
        <div className="filter-group">
          <label>Type:</label>
          <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
            <option value="All">All</option>
            <option value="Van">Van</option>
            <option value="Truck">Truck</option>
            <option value="Mini">Mini</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Status:</label>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="All">All</option>
            <option value="Available">Available</option>
            <option value="On Trip">On Trip</option>
            <option value="In Shop">In Shop</option>
            <option value="Retired">Retired</option>
          </select>
        </div>

        <div className="search-group">
          <input 
            type="text" 
            placeholder="Search reg. no..." 
            value={searchReg}
            onChange={(e) => setSearchReg(e.target.value)}
          />
        </div>
      </div>

      {/* Data Layout Table */}
      <div className="fleet-table-wrapper">
        <table className="fleet-table">
          <thead>
            <tr>
              <th>REG. NO. (UNIQUE)</th>
              <th>NAME/MODE</th>
              <th>TYPE</th>
              <th>CAPACITY</th>
              <th>ODOMETER</th>
              <th>ACQ. COST</th>
              <th>STATUS</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.length > 0 ? (
              vehicles.map((vehicle) => (
                <tr key={vehicle.regNo}>
                  <td className="text-bold">{vehicle.regNo}</td>
                  <td>{vehicle.nameMode}</td>
                  <td>{vehicle.type}</td>
                  <td>{vehicle.capacity}</td>
                  <td>{vehicle.odometer}</td>
                  <td>₹ {vehicle.acqCost}</td>
                  <td>
                    <span className={`status-badge ${vehicle.status.toLowerCase().replace(' ', '-')}`}>
                      {vehicle.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              /* Safe Placeholder State */
              <tr>
                <td colSpan="7" className="empty-state-text">
                  No vehicles available. Connect the backend to fetch registries.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <p className="fleet-rule-notice">
        Rule: Registration No. must be unique • Retired/In Shop vehicles are hidden from Trip Dispatcher
      </p>
    </div>
  );
};

export default Fleet;