import { useEffect, useState } from 'react';
import { api } from '../utils/api';
import './Dashboard.css';

export default function Dashboard() {
  const [overview, setOverview] = useState(null);
  const [kpis, setKpis] = useState(null);
  const [recentTrips, setRecentTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [overviewData, kpiData, tripsData] = await Promise.all([
          api.getDashboardOverview(),
          api.getDashboardKPIs(),
          api.getRecentTrips(),
        ]);
        setOverview(overviewData.data);
        setKpis(kpiData.data);
        setRecentTrips(tripsData.data);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="dashboard flex items-center justify-center p-12">
        <p className="text-secondary text-lg">Loading dashboard analytics...</p>
      </div>
    );
  }

  const kpiCards = [
    { label: 'Total Vehicles', value: overview?.totalVehicles || 0, change: 'Fleet strength', trend: 'neutral' },
    { label: 'Active Trips', value: overview?.activeTrips || 0, change: 'En-route right now', trend: 'up' },
    { label: 'Fleet Utilization', value: `${overview?.fleetUtilization || 0}%`, change: 'Utilization rate', trend: 'up' },
    { label: 'Total Expenses', value: `$${kpis?.totalExpenses || 0}`, change: 'Tolls & other charges', trend: 'neutral' },
  ];

  const getStatusClass = (status) => {
    if (!status) return 'status-gray';
    const s = status.toLowerCase();
    if (s === 'completed') return 'status-ontime';
    if (s === 'dispatched') return 'status-active';
    if (s === 'draft') return 'status-scheduled';
    return 'status-gray';
  };

  const getAvailablePercent = () => {
    if (!overview || overview.totalVehicles === 0) return 0;
    return Math.round((overview.availableVehicles / overview.totalVehicles) * 100);
  };

  const getMaintenancePercent = () => {
    if (!overview || overview.totalVehicles === 0) return 0;
    return Math.round((overview.maintenanceVehicles / overview.totalVehicles) * 100);
  };

  const getOtherPercent = () => {
    if (!overview || overview.totalVehicles === 0) return 0;
    const other = overview.totalVehicles - overview.availableVehicles - overview.maintenanceVehicles;
    return Math.round((other / overview.totalVehicles) * 100);
  };

  return (
    <div className="dashboard">
      <div className="page-header flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-secondary text-sm">Overview of fleet operations</p>
        </div>
        <div className="header-actions">
          <select className="input-field w-auto">
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
            <option>This Year</option>
          </select>
          <button className="btn-primary">Generate Report</button>
        </div>
      </div>

      <div className="kpi-grid">
        {kpiCards.map((kpi, index) => (
          <div key={index} className="card kpi-card">
            <div className="kpi-label">{kpi.label}</div>
            <div className="kpi-value">{kpi.value}</div>
            <div className={`kpi-change ${kpi.trend === 'up' ? 'text-green' : 'text-muted'}`}>
              {kpi.change}
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-grid">
        <div className="card table-card">
          <div className="card-header flex justify-between items-center">
            <h3 className="font-semibold text-lg">Recent Trips</h3>
            <button className="btn-secondary">View All</button>
          </div>
          <table className="data-table">
            <thead>
              <tr>
                <th>Trip ID</th>
                <th>Vehicle</th>
                <th>Driver</th>
                <th>Route</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentTrips.map(trip => (
                <tr key={trip.id}>
                  <td>TR-{trip.id}</td>
                  <td>{trip.registration_number}</td>
                  <td>{trip.driver_name}</td>
                  <td>{trip.source} → {trip.destination}</td>
                  <td>
                    <span className={`status-badge ${getStatusClass(trip.status)}`}>
                      {trip.status}
                    </span>
                  </td>
                </tr>
              ))}
              {recentTrips.length === 0 && (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '2rem' }}>
                    No trips logged.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="card chart-card">
          <div className="card-header">
            <h3 className="font-semibold text-lg">Fleet Status</h3>
          </div>
          <div className="status-bars">
            <div className="status-bar-item">
              <div className="flex justify-between text-sm mb-1">
                <span>Available</span>
                <span>{overview?.availableVehicles || 0}</span>
              </div>
              <div className="bar-bg">
                <div className="bar-fill bg-green" style={{ width: `${getAvailablePercent()}%` }}></div>
              </div>
            </div>
            
            <div className="status-bar-item">
              <div className="flex justify-between text-sm mb-1">
                <span>In Maintenance (Shop)</span>
                <span>{overview?.maintenanceVehicles || 0}</span>
              </div>
              <div className="bar-bg">
                <div className="bar-fill bg-orange" style={{ width: `${getMaintenancePercent()}%` }}></div>
              </div>
            </div>
            
            <div className="status-bar-item">
              <div className="flex justify-between text-sm mb-1">
                <span>Other (On Trip / Retired)</span>
                <span>{(overview?.totalVehicles || 0) - (overview?.availableVehicles || 0) - (overview?.maintenanceVehicles || 0)}</span>
              </div>
              <div className="bar-bg">
                <div className="bar-fill bg-gray" style={{ width: `${getOtherPercent()}%` }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
