import { useEffect, useState } from 'react';
import { api } from '../utils/api';

export default function FuelExpense() {
  const [activeTab, setActiveTab] = useState('fuel'); // 'fuel' or 'expenses'
  const [fuelLogs, setFuelLogs] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fuel Form Fields
  const [fuelVehicleId, setFuelVehicleId] = useState('');
  const [liters, setLiters] = useState('');
  const [fuelCost, setFuelCost] = useState('');
  const [fuelDate, setFuelDate] = useState('');

  // Expense Form Fields
  const [expVehicleId, setExpVehicleId] = useState('');
  const [expenseType, setExpenseType] = useState('Toll');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [expenseDate, setExpenseDate] = useState('');

  // Feedback Messages
  const [fuelError, setFuelError] = useState('');
  const [fuelSuccess, setFuelSuccess] = useState('');
  const [expError, setExpError] = useState('');
  const [expSuccess, setExpSuccess] = useState('');

  const loadData = async () => {
    try {
      const [fuelRes, expRes, vehiclesRes] = await Promise.all([
        api.getFuelLogs(),
        api.getExpenses(),
        api.getVehicles(),
      ]);
      setFuelLogs(fuelRes.data);
      setExpenses(expRes.data);
      setVehicles(vehiclesRes.data);

      if (vehiclesRes.data.length > 0) {
        setFuelVehicleId(vehiclesRes.data[0].id);
        setExpVehicleId(vehiclesRes.data[0].id);
      }
    } catch (err) {
      console.error('Error loading fuel & expenses:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleLogFuel = async (e) => {
    e.preventDefault();
    setFuelError('');
    setFuelSuccess('');
    try {
      await api.createFuelLog({
        vehicle_id: parseInt(fuelVehicleId),
        liters: parseFloat(liters),
        fuel_cost: parseFloat(fuelCost),
        fuel_date: fuelDate || undefined,
      });
      setFuelSuccess('Fuel log saved successfully!');
      setLiters('');
      setFuelCost('');
      setFuelDate('');
      loadData();
    } catch (err) {
      setFuelError(err.message || 'Failed to save fuel log');
    }
  };

  const handleLogExpense = async (e) => {
    e.preventDefault();
    setExpError('');
    setExpSuccess('');
    try {
      await api.createExpense({
        vehicle_id: parseInt(expVehicleId),
        expense_type: expenseType,
        amount: parseFloat(amount),
        description,
        expense_date: expenseDate || undefined,
      });
      setExpSuccess('Expense log saved successfully!');
      setAmount('');
      setDescription('');
      setExpenseDate('');
      loadData();
    } catch (err) {
      setExpError(err.message || 'Failed to save expense log');
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    return new Date(dateStr).toLocaleDateString();
  };

  // Totals
  const totalFuelCost = fuelLogs.reduce((sum, log) => sum + parseFloat(log.fuel_cost || 0), 0);
  const totalExpenseCost = expenses.reduce((sum, exp) => sum + parseFloat(exp.amount || 0), 0);

  return (
    <div className="page-content">
      <div className="page-header flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Fuel & Expenses</h1>
          <p className="text-secondary text-sm">Monitor fleet fuel consumption and operational costs</p>
        </div>
        
        {/* Tab Buttons */}
        <div className="flex gap-2" style={{ backgroundColor: 'var(--card-bg)', padding: '4px', borderRadius: '8px' }}>
          <button 
            onClick={() => setActiveTab('fuel')} 
            className={`btn-${activeTab === 'fuel' ? 'primary' : 'secondary'}`}
            style={{ padding: '6px 16px' }}
          >
            Fuel Logs
          </button>
          <button 
            onClick={() => setActiveTab('expenses')} 
            className={`btn-${activeTab === 'expenses' ? 'primary' : 'secondary'}`}
            style={{ padding: '6px 16px' }}
          >
            Expenses
          </button>
        </div>
      </div>

      {activeTab === 'fuel' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '1.5rem' }}>
          {/* Fuel Log Form */}
          <div className="card">
            <h3 className="font-semibold text-lg mb-4">Log Fuel Purchase</h3>
            {fuelError && <div style={{ color: 'red', marginBottom: '1rem', fontSize: '0.875rem' }}>{fuelError}</div>}
            {fuelSuccess && <div style={{ color: 'green', marginBottom: '1rem', fontSize: '0.875rem' }}>{fuelSuccess}</div>}
            <form onSubmit={handleLogFuel} className="flex-col gap-4">
              <div className="form-group flex flex-col gap-1">
                <label className="text-sm">Select Vehicle *</label>
                <select 
                  className="input-field" 
                  value={fuelVehicleId} 
                  onChange={(e) => setFuelVehicleId(e.target.value)}
                  required
                >
                  {vehicles.map(v => (
                    <option key={v.id} value={v.id}>
                      {v.registration_number} - {v.vehicle_name || 'Vehicle'}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group flex flex-col gap-1 mt-3">
                <label className="text-sm">Fuel Liters *</label>
                <input 
                  type="number" 
                  step="any"
                  className="input-field" 
                  placeholder="e.g. 50" 
                  value={liters}
                  onChange={(e) => setLiters(e.target.value)}
                  required
                />
              </div>
              <div className="form-group flex flex-col gap-1 mt-3">
                <label className="text-sm">Cost ($) *</label>
                <input 
                  type="number" 
                  step="any"
                  className="input-field" 
                  placeholder="Total cost" 
                  value={fuelCost}
                  onChange={(e) => setFuelCost(e.target.value)}
                  required
                />
              </div>
              <div className="form-group flex flex-col gap-1 mt-3">
                <label className="text-sm">Date Incurred</label>
                <input 
                  type="date" 
                  className="input-field" 
                  value={fuelDate}
                  onChange={(e) => setFuelDate(e.target.value)}
                />
              </div>
              <button type="submit" className="btn-primary w-full mt-6 justify-center">Save Fuel Log</button>
            </form>
          </div>

          {/* Fuel Log Table */}
          <div className="card">
            <h3 className="font-semibold text-lg mb-4">Fuel Log Roster</h3>
            {loading ? (
              <p className="text-secondary text-sm">Loading fuel logs...</p>
            ) : (
              <>
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Log ID</th>
                      <th>Vehicle</th>
                      <th>Liters (L)</th>
                      <th>Cost</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {fuelLogs.map(log => (
                      <tr key={log.id}>
                        <td className="font-medium">FL-{log.id}</td>
                        <td>{log.registration_number} ({log.vehicle_name})</td>
                        <td>{log.liters}</td>
                        <td className="font-medium">${log.fuel_cost}</td>
                        <td>{formatDate(log.fuel_date)}</td>
                      </tr>
                    ))}
                    {fuelLogs.length === 0 && (
                      <tr>
                        <td colSpan="5" style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '2rem' }}>
                          No fuel purchases logged yet.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
                <div className="summary-footer mt-6 p-4 border-t border-gray-700 flex justify-between items-center" style={{ borderTop: '1px solid var(--border-color)' }}>
                  <span className="text-sm text-secondary">Cumulative Fuel Expenditure:</span>
                  <span className="text-xl font-bold text-orange">${totalFuelCost.toFixed(2)}</span>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {activeTab === 'expenses' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '1.5rem' }}>
          {/* General Expense Form */}
          <div className="card">
            <h3 className="font-semibold text-lg mb-4">Log General Expense</h3>
            {expError && <div style={{ color: 'red', marginBottom: '1rem', fontSize: '0.875rem' }}>{expError}</div>}
            {expSuccess && <div style={{ color: 'green', marginBottom: '1rem', fontSize: '0.875rem' }}>{expSuccess}</div>}
            <form onSubmit={handleLogExpense} className="flex-col gap-4">
              <div className="form-group flex flex-col gap-1">
                <label className="text-sm">Select Vehicle *</label>
                <select 
                  className="input-field" 
                  value={expVehicleId} 
                  onChange={(e) => setExpVehicleId(e.target.value)}
                  required
                >
                  {vehicles.map(v => (
                    <option key={v.id} value={v.id}>
                      {v.registration_number} - {v.vehicle_name || 'Vehicle'}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group flex flex-col gap-1 mt-3">
                <label className="text-sm">Expense Type *</label>
                <select 
                  className="input-field" 
                  value={expenseType} 
                  onChange={(e) => setExpenseType(e.target.value)}
                  required
                >
                  <option value="Insurance">Insurance</option>
                  <option value="Toll">Toll</option>
                  <option value="Parking">Parking</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="form-group flex flex-col gap-1 mt-3">
                <label className="text-sm">Amount ($) *</label>
                <input 
                  type="number" 
                  step="any"
                  className="input-field" 
                  placeholder="Total amount" 
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                />
              </div>
              <div className="form-group flex flex-col gap-1 mt-3">
                <label className="text-sm">Description</label>
                <input 
                  type="text" 
                  className="input-field" 
                  placeholder="Purpose of expense" 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="form-group flex flex-col gap-1 mt-3">
                <label className="text-sm">Date Incurred</label>
                <input 
                  type="date" 
                  className="input-field" 
                  value={expenseDate}
                  onChange={(e) => setExpenseDate(e.target.value)}
                />
              </div>
              <button type="submit" className="btn-primary w-full mt-6 justify-center">Save Expense</button>
            </form>
          </div>

          {/* Expense Log Table */}
          <div className="card">
            <h3 className="font-semibold text-lg mb-4">Expense Log Roster</h3>
            {loading ? (
              <p className="text-secondary text-sm">Loading expenses...</p>
            ) : (
              <>
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Expense ID</th>
                      <th>Vehicle</th>
                      <th>Expense Type</th>
                      <th>Description</th>
                      <th>Amount</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {expenses.map(exp => (
                      <tr key={exp.id}>
                        <td className="font-medium">EX-{exp.id}</td>
                        <td>{exp.registration_number} ({exp.vehicle_name})</td>
                        <td>{exp.expense_type}</td>
                        <td>{exp.description}</td>
                        <td className="font-medium">${exp.amount}</td>
                        <td>{formatDate(exp.expense_date)}</td>
                      </tr>
                    ))}
                    {expenses.length === 0 && (
                      <tr>
                        <td colSpan="6" style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '2rem' }}>
                          No operational expenses logged yet.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
                <div className="summary-footer mt-6 p-4 border-t border-gray-700 flex justify-between items-center" style={{ borderTop: '1px solid var(--border-color)' }}>
                  <span className="text-sm text-secondary">Cumulative Operational Expenses:</span>
                  <span className="text-xl font-bold text-orange">${totalExpenseCost.toFixed(2)}</span>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
