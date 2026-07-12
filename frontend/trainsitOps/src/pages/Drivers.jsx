import { useEffect, useState } from 'react';
import { api } from '../utils/api';

export default function Drivers() {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const fetchDrivers = async () => {
    try {
      const res = await api.getDrivers();
      setDrivers(res.data);
    } catch (err) {
      console.error('Error fetching drivers:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDrivers();
  }, []);

  const getStatusClass = (status) => {
    if (!status) return 'status-gray';
    const s = status.toLowerCase();
    if (s === 'available') return 'status-active';
    if (s === 'on trip') return 'status-enroute';
    if (s === 'off duty') return 'status-maintenance';
    return 'status-gray';
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString();
  };

  const filteredDrivers = drivers.filter(d => {
    const matchesSearch = (d.full_name && d.full_name.toLowerCase().includes(search.toLowerCase())) ||
                          (d.email && d.email.toLowerCase().includes(search.toLowerCase())) ||
                          d.license_number.toLowerCase().includes(search.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="page-content">
      <div className="page-header flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Driver Roster</h1>
          <p className="text-secondary text-sm">Manage and monitor all fleet operators</p>
        </div>
      </div>

      <div className="card">
        <div className="filters flex gap-4 mb-6">
          <div className="flex-col gap-1 w-full max-w-[300px]">
            <label className="text-xs text-secondary">Search Drivers</label>
            <input 
              type="text" 
              className="input-field" 
              placeholder="Search by name, email, or license..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {loading ? (
          <p className="text-secondary text-sm">Loading drivers...</p>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Driver ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>License Number</th>
                <th>Category</th>
                <th>Expiry Date</th>
                <th>Safety Score</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredDrivers.map(driver => (
                <tr key={driver.id}>
                  <td className="font-medium">DR-{driver.id}</td>
                  <td>{driver.full_name}</td>
                  <td>{driver.email}</td>
                  <td>{driver.license_number}</td>
                  <td>{driver.license_category}</td>
                  <td>{formatDate(driver.expiry_date)}</td>
                  <td>{driver.safety_score}%</td>
                  <td>
                    <span className={`status-badge ${getStatusClass(driver.status)}`}>
                      {driver.status}
                    </span>
                  </td>
                </tr>
              ))}
              {filteredDrivers.length === 0 && (
                <tr>
                  <td colSpan="8" style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '2rem' }}>
                    No matching drivers found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}

        <div className="pagination flex justify-between items-center mt-6 text-sm text-secondary">
          <div>Showing {filteredDrivers.length} entries</div>
        </div>
      </div>
    </div>
  );
}
