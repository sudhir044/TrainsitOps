import React, { useState } from 'react';
import './Maintainance.css';

const Maintenance = () => {
  // Form State
  const [formData, setFormData] = useState({
    vehicleId: '',
    issueDescription: '',
    reportedDate: '',
    status: 'Scheduled',
  });

  // Mock Data for the Active Logs Table
  const [maintenanceLogs, setMaintenanceLogs] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.vehicleId || !formData.issueDescription) return;

    const newLog = {
      id: `MNT-${Math.floor(1000 + Math.random() * 9000)}`,
      vehicle: formData.vehicleId,
      issue: formData.issueDescription,
      cost: '—', // Cost calculated after maintenance completion
      status: formData.status,
    };

    setMaintenanceLogs([newLog, ...maintenanceLogs]);
    setFormData({ vehicleId: '', issueDescription: '', reportedDate: '', status: 'Scheduled' });
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'In Progress': return 'status-in-progress';
      case 'On Hold': return 'status-on-hold';
      case 'Scheduled': return 'status-scheduled';
      default: return '';
    }
  };

  return (
    <div className="maintenance-container">
      {/* Left Panel: Log Form */}
      <div className="maintenance-card form-panel">
        <h3 className="panel-title">Log Vehicle for Maintenance</h3>
        <form onSubmit={handleSubmit} className="maintenance-form">
          <div className="form-group">
            <label htmlFor="vehicleId">Vehicle ID / Reg No.</label>
            <input
              type="text"
              id="vehicleId"
              name="vehicleId"
              placeholder="e.g. TRK-2940"
              value={formData.vehicleId}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="issueDescription">Issue Description</label>
            <textarea
              id="issueDescription"
              name="issueDescription"
              rows="4"
              placeholder="Describe the vehicle issues..."
              value={formData.issueDescription}
              onChange={handleInputChange}
              required
            ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="reportedDate">Reported Date</label>
            <input
              type="date"
              id="reportedDate"
              name="reportedDate"
              value={formData.reportedDate}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="status">Initial Status</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleInputChange}
            >
              <option value="Scheduled">Scheduled</option>
              <option value="In Progress">In Progress</option>
              <option value="On Hold">On Hold</option>
            </select>
          </div>

          <button type="submit" className="submit-btn">Log Maintenance</button>
        </form>
      </div>

      {/* Right Panel: Data Grid */}
      <div className="maintenance-card grid-panel">
        <h3 className="panel-title">Active Maintenance Logs</h3>
        <div className="table-responsive">
          <table className="maintenance-table">
            <thead>
              <tr>
                <th>Log ID</th>
                <th>Vehicle</th>
                <th>Issue Details</th>
                <th>Est. Cost</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {maintenanceLogs.length === 0 ? (
                <tr>
                  <td colSpan="5" className="empty-row">No active maintenance records found.</td>
                </tr>
              ) : (
                maintenanceLogs.map((log) => (
                  <tr key={log.id}>
                    <td className="text-bold">{log.id}</td>
                    <td>{log.vehicle}</td>
                    <td className="text-muted">{log.issue}</td>
                    <td>{log.cost}</td>
                    <td>
                      <span className={`status-badge ${getStatusClass(log.status)}`}>
                        {log.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Maintenance;