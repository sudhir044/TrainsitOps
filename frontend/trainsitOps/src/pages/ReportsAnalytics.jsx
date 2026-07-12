import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { api } from '../utils/api';
import './ReportsAnalytics.css';

export default function ReportsAnalytics() {
  const [summary, setSummary] = useState(null);
  const [expenseData, setExpenseData] = useState([]);
  const [fuelData, setFuelData] = useState([]);
  const [driverData, setDriverData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadReports() {
      try {
        const [sumRes, expRes, fuelRes, driverRes] = await Promise.all([
          api.getSummaryReport(),
          api.getExpenseReport(),
          api.getFuelReport(),
          api.getDriverReport(),
        ]);
        setSummary(sumRes.data);
        setExpenseData(expRes.data);
        setFuelData(fuelRes.data);
        setDriverData(driverRes.data);
      } catch (err) {
        console.error('Error loading reports:', err);
      } finally {
        setLoading(false);
      }
    }
    loadReports();
  }, []);

  if (loading) {
    return (
      <div className="page-content flex items-center justify-center p-12">
        <p className="text-secondary text-lg">Loading operational analytics reports...</p>
      </div>
    );
  }

  // Format Recharts data keys
  const chartData = expenseData.map(item => ({
    name: item.expense_type,
    amount: item.total
  }));

  return (
    <div className="page-content">
      <div className="page-header flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Reports & Analytics</h1>
          <p className="text-secondary text-sm">Actionable insights from fleet data</p>
        </div>
      </div>

      <div className="analytics-grid mb-6">
        <div className="card metric-card">
          <div className="metric-title">Total Active Drivers</div>
          <div className="metric-value">{summary?.totalDrivers || 0}</div>
          <div className="metric-trend text-green">Roster strength</div>
        </div>
        <div className="card metric-card">
          <div className="metric-title">Total General Expenses</div>
          <div className="metric-value">${summary?.totalExpenses || 0}</div>
          <div className="metric-trend text-red">Operational fees</div>
        </div>
        <div className="card metric-card">
          <div className="metric-title">Total Fuel Purchases</div>
          <div className="metric-value">${summary?.totalFuelCost || 0}</div>
          <div className="metric-trend text-orange">Fuel logs</div>
        </div>
      </div>

      <div className="charts-container" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
        
        {/* Main Chart */}
        <div className="card chart-main">
          <h3 className="font-semibold text-lg mb-4">Expenses by Category</h3>
          <div className="chart-wrapper" style={{ height: '300px' }}>
            {chartData.length === 0 ? (
              <p className="text-secondary text-sm text-center py-12">No expense logs available for chart representation.</p>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" vertical={false} />
                  <XAxis dataKey="name" stroke="var(--text-secondary)" tickLine={false} axisLine={false} />
                  <YAxis stroke="var(--text-secondary)" tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'var(--bg-panel)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
                    itemStyle={{ color: 'var(--text-primary)' }}
                  />
                  <Bar dataKey="amount" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
        
        {/* Fuel Efficiency List */}
        <div className="card chart-side">
          <h3 className="font-semibold text-lg mb-4">Fuel Log Summary</h3>
          <div className="utilization-bars">
            {fuelData.map((item, index) => (
              <div className="util-item mb-4" key={index}>
                <div className="flex justify-between text-sm mb-1">
                  <span>{item.registration_number}</span>
                  <span className="font-medium">{item.total_liters} L (${item.total_cost})</span>
                </div>
              </div>
            ))}
            {fuelData.length === 0 && (
              <p className="text-secondary text-sm py-4">No vehicle fuel summaries.</p>
            )}
          </div>
        </div>
      </div>

      {/* Driver safety Ranks */}
      <div className="card mt-6">
        <h3 className="font-semibold text-lg mb-4">Driver Safety & Performance Rank</h3>
        <table className="data-table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Name</th>
              <th>Trips Managed</th>
              <th>Safety Score Rating</th>
            </tr>
          </thead>
          <tbody>
            {driverData.map((driver, index) => (
              <tr key={index}>
                <td className="font-medium">#{index + 1}</td>
                <td>{driver.full_name}</td>
                <td>{driver.trips}</td>
                <td>
                  <span className="font-semibold" style={{ color: driver.safety_score >= 90 ? 'green' : 'orange' }}>
                    {driver.safety_score}%
                  </span>
                </td>
              </tr>
            ))}
            {driverData.length === 0 && (
              <tr>
                <td colSpan="4" style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '2rem' }}>
                  No performance metrics loaded.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
