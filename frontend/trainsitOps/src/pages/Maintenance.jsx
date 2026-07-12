import { useEffect, useState } from 'react';
import { api } from '../utils/api';

export default function Maintenance() {
  const [records, setRecords] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form fields
  const [vehicleId, setVehicleId] = useState('');
  const [issue, setIssue] = useState('');
  const [description, setDescription] = useState('');
  const [cost, setCost] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Filters
  const [search, setSearch] = useState('');

  const loadData = async () => {
    try {
      const [recordsRes, vehiclesRes] = await Promise.all([
        api.getMaintenanceLogs(),
        api.getVehicles(),
      ]);
      setRecords(recordsRes.data);
      setVehicles(vehiclesRes.data);
      if (vehiclesRes.data.length > 0 && !vehicleId) {
        setVehicleId(vehiclesRes.data[0].id);
      }
    } catch (err) {
      console.error('Error loading maintenance data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleLogMaintenance = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      await api.createMaintenanceLog({
        vehicle_id: parseInt(vehicleId),
        issue,
        description,
        cost: cost ? parseFloat(cost) : 0,
      });
      setSuccess('Maintenance logged successfully!');
      setIssue('');
      setDescription('');
      setCost('');
      loadData();
    } catch (err) {
      setError(err.message || 'Failed to create log');
    }
  };

  const handleStart = async (id) => {
    try {
      await api.startMaintenance(id);
      loadData();
    } catch (err) {
      alert(err.message || 'Failed to start maintenance');
    }
  };

  const handleComplete = async (id) => {
    try {
      await api.completeMaintenance(id);
      loadData();
    } catch (err) {
      alert(err.message || 'Failed to complete maintenance');
    }
  };

  const getStatusClass = (status) => {
    if (status === 'Completed') return 'status-active';
    if (status === 'In Progress') return 'status-maintenance';
    if (status === 'Pending') return 'status-scheduled';
    return 'status-gray';
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    return new Date(dateStr).toLocaleDateString();
  };

  const filteredRecords = records.filter(r => {
    const matchesSearch = r.registration_number.toLowerCase().includes(search.toLowerCase()) ||
                          r.issue.toLowerCase().includes(search.toLowerCase()) ||
                          r.id.toString().includes(search);
    return matchesSearch;
  });

  return (
    <div className="page-content">
      <div className="page-header mb-6">
        <h1 className="text-2xl font-bold">Maintenance Schedule</h1>
        <p className="text-secondary text-sm">Track vehicle repairs and servicing</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '1.5rem' }}>
        
        {/* Form on left */}
        <div className="card">
          <h3 className="font-semibold text-lg mb-4">Log Maintenance</h3>
          {error && <div style={{ color: 'red', marginBottom: '1rem', fontSize: '0.875rem' }}>{error}</div>}
          {success && <div style={{ color: 'green', marginBottom: '1rem', fontSize: '0.875rem' }}>{success}</div>}
          <form onSubmit={handleLogMaintenance} className="flex-col gap-4">
            <div className="form-group flex flex-col gap-1">
              <label className="text-sm">Select Vehicle *</label>
              <select 
                className="input-field" 
                value={vehicleId} 
                onChange={(e) => setVehicleId(e.target.value)}
                required
              >
                <option value="">-- Choose Vehicle --</option>
                {vehicles.map(v => (
                  <option key={v.id} value={v.id}>
                    {v.registration_number} - {v.vehicle_name || 'Vehicle'}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group flex flex-col gap-1 mt-3">
              <label className="text-sm">Issue / Task *</label>
              <input 
                type="text" 
                className="input-field" 
                placeholder="e.g. Brake pad wear" 
                value={issue}
                onChange={(e) => setIssue(e.target.value)}
                required
              />
            </div>
            <div className="form-group flex flex-col gap-1 mt-3">
              <label className="text-sm">Description</label>
              <textarea 
                className="input-field" 
                placeholder="Details of repair..." 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="form-group flex flex-col gap-1 mt-3">
              <label className="text-sm">Cost ($)</label>
              <input 
                type="number" 
                step="any"
                className="input-field" 
                placeholder="0.00" 
                value={cost}
                onChange={(e) => setCost(e.target.value)}
              />
            </div>
            <button type="submit" className="btn-primary w-full mt-6 justify-center">Save Record</button>
          </form>
        </div>

        {/* Table on right */}
        <div className="card">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-lg">Recent Records</h3>
            <input 
              type="text" 
              className="input-field" 
              style={{ width: '200px' }} 
              placeholder="Search records..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          {loading ? (
            <p className="text-secondary text-sm">Loading records...</p>
          ) : (
            <table className="data-table">
              <thead>
                <tr>
                  <th>Record ID</th>
                  <th>Vehicle</th>
                  <th>Task</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Cost</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredRecords.map(record => (
                  <tr key={record.id}>
                    <td className="font-medium">MT-{record.id}</td>
                    <td>{record.registration_number}</td>
                    <td>{record.issue}</td>
                    <td>{formatDate(record.start_date)}</td>
                    <td>{formatDate(record.end_date)}</td>
                    <td>${record.cost}</td>
                    <td>
                      <span className={`status-badge ${getStatusClass(record.status)}`}>
                        {record.status}
                      </span>
                    </td>
                    <td>
                      {record.status === 'Pending' && (
                        <button onClick={() => handleStart(record.id)} className="btn-primary" style={{ padding: '2px 8px', fontSize: '0.75rem' }}>
                          Start Work
                        </button>
                      )}
                      {record.status === 'In Progress' && (
                        <button onClick={() => handleComplete(record.id)} className="btn-secondary" style={{ padding: '2px 8px', fontSize: '0.75rem', backgroundColor: '#e2e8f0' }}>
                          Complete
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
                {filteredRecords.length === 0 && (
                  <tr>
                    <td colSpan="8" style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '2rem' }}>
                      No maintenance records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>

      </div>
    </div>
  );
}
