import { useEffect, useState } from 'react';
import { api } from '../utils/api';

export default function VehicleRegistry() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  
  // Form fields
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [vehicleName, setVehicleName] = useState('');
  const [model, setModel] = useState('');
  const [vehicleType, setVehicleType] = useState('Truck');
  const [capacity, setCapacity] = useState('');
  const [odometer, setOdometer] = useState('');
  const [acquisitionCost, setAcquisitionCost] = useState('');
  const [status, setStatus] = useState('Available');
  
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Filters
  const [searchId, setSearchId] = useState('');
  const [filterType, setFilterType] = useState('All Types');
  const [filterStatus, setFilterStatus] = useState('All Statuses');

  const fetchVehicles = async () => {
    try {
      const res = await api.getVehicles();
      setVehicles(res.data);
    } catch (err) {
      console.error('Error fetching vehicles:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  const handleAddVehicle = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      await api.createVehicle({
        registration_number: registrationNumber,
        vehicle_name: vehicleName,
        model,
        vehicle_type: vehicleType,
        capacity: parseFloat(capacity),
        odometer: odometer ? parseInt(odometer) : 0,
        acquisition_cost: acquisitionCost ? parseFloat(acquisitionCost) : 0,
        status,
      });
      setSuccess('Vehicle registered successfully!');
      setRegistrationNumber('');
      setVehicleName('');
      setModel('');
      setCapacity('');
      setOdometer('');
      setAcquisitionCost('');
      setShowAddForm(false);
      fetchVehicles();
    } catch (err) {
      setError(err.message || 'Failed to add vehicle');
    }
  };

  const getStatusClass = (status) => {
    if (!status) return 'status-gray';
    const s = status.toLowerCase();
    if (s === 'available') return 'status-active';
    if (s === 'on trip') return 'status-enroute';
    if (s === 'in shop') return 'status-maintenance';
    return 'status-gray';
  };

  const filteredVehicles = vehicles.filter(v => {
    const matchesSearch = v.registration_number.toLowerCase().includes(searchId.toLowerCase()) ||
                          v.id.toString().includes(searchId) ||
                          (v.vehicle_name && v.vehicle_name.toLowerCase().includes(searchId.toLowerCase()));
    const matchesType = filterType === 'All Types' || v.vehicle_type === filterType;
    const matchesStatus = filterStatus === 'All Statuses' || v.status === filterStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <div className="page-content">
      <div className="page-header flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Vehicle Registry</h1>
          <p className="text-secondary text-sm">Manage and monitor all fleet vehicles</p>
        </div>
        <button onClick={() => setShowAddForm(!showAddForm)} className="btn-primary">
          {showAddForm ? 'Close Form' : 'Add Vehicle'}
        </button>
      </div>

      {showAddForm && (
        <div className="card mb-6" style={{ maxWidth: '600px' }}>
          <h3 className="font-semibold text-lg mb-4">Register New Vehicle</h3>
          {error && <div style={{ color: 'red', marginBottom: '1rem', fontSize: '0.875rem' }}>{error}</div>}
          {success && <div style={{ color: 'green', marginBottom: '1rem', fontSize: '0.875rem' }}>{success}</div>}
          <form onSubmit={handleAddVehicle} className="flex-col gap-4">
            <div className="form-group flex flex-col gap-1">
              <label className="text-sm">Registration Number *</label>
              <input 
                type="text" 
                className="input-field" 
                placeholder="e.g. TRK-1001" 
                value={registrationNumber} 
                onChange={(e) => setRegistrationNumber(e.target.value)} 
                required 
              />
            </div>
            <div className="form-group flex flex-col gap-1 mt-3">
              <label className="text-sm">Vehicle Name</label>
              <input 
                type="text" 
                className="input-field" 
                placeholder="e.g. Freightliner" 
                value={vehicleName} 
                onChange={(e) => setVehicleName(e.target.value)} 
              />
            </div>
            <div className="form-group flex flex-col gap-1 mt-3">
              <label className="text-sm">Model</label>
              <input 
                type="text" 
                className="input-field" 
                placeholder="e.g. Cascadia 126" 
                value={model} 
                onChange={(e) => setModel(e.target.value)} 
              />
            </div>
            <div className="form-group flex flex-col gap-1 mt-3">
              <label className="text-sm">Vehicle Type</label>
              <select className="input-field" value={vehicleType} onChange={(e) => setVehicleType(e.target.value)}>
                <option value="Truck">Truck</option>
                <option value="Van">Van</option>
                <option value="Bus">Bus</option>
                <option value="SUV">SUV</option>
                <option value="Sedan">Sedan</option>
              </select>
            </div>
            <div className="form-group flex flex-col gap-1 mt-3">
              <label className="text-sm">Capacity (kg / passengers) *</label>
              <input 
                type="number" 
                step="any"
                className="input-field" 
                placeholder="e.g. 20000" 
                value={capacity} 
                onChange={(e) => setCapacity(e.target.value)} 
                required 
              />
            </div>
            <div className="form-group flex flex-col gap-1 mt-3">
              <label className="text-sm">Odometer Reading (km)</label>
              <input 
                type="number" 
                className="input-field" 
                placeholder="0" 
                value={odometer} 
                onChange={(e) => setOdometer(e.target.value)} 
              />
            </div>
            <div className="form-group flex flex-col gap-1 mt-3">
              <label className="text-sm">Acquisition Cost ($)</label>
              <input 
                type="number" 
                step="any"
                className="input-field" 
                placeholder="0.00" 
                value={acquisitionCost} 
                onChange={(e) => setAcquisitionCost(e.target.value)} 
              />
            </div>
            <div className="form-group flex flex-col gap-1 mt-3">
              <label className="text-sm">Status</label>
              <select className="input-field" value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="Available">Available</option>
                <option value="On Trip">On Trip</option>
                <option value="In Shop">In Shop</option>
                <option value="Retired">Retired</option>
              </select>
            </div>
            <button type="submit" className="btn-primary w-full mt-6 justify-center">Save Vehicle</button>
          </form>
        </div>
      )}

      <div className="card">
        <div className="filters flex gap-4 mb-6">
          <div className="flex-col gap-1 w-full max-w-[200px]">
            <label className="text-xs text-secondary">Search</label>
            <input 
              type="text" 
              className="input-field" 
              placeholder="Search ID, Reg, Name..." 
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
            />
          </div>
          <div className="flex-col gap-1 w-full max-w-[200px]">
            <label className="text-xs text-secondary">Type</label>
            <select className="input-field" value={filterType} onChange={(e) => setFilterType(e.target.value)}>
              <option value="All Types">All Types</option>
              <option value="Truck">Truck</option>
              <option value="Van">Van</option>
              <option value="Bus">Bus</option>
              <option value="SUV">SUV</option>
              <option value="Sedan">Sedan</option>
            </select>
          </div>
          <div className="flex-col gap-1 w-full max-w-[200px]">
            <label className="text-xs text-secondary">Status</label>
            <select className="input-field" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
              <option value="All Statuses">All Statuses</option>
              <option value="Available">Available</option>
              <option value="On Trip">On Trip</option>
              <option value="In Shop">In Shop</option>
              <option value="Retired">Retired</option>
            </select>
          </div>
        </div>

        {loading ? (
          <p className="text-secondary text-sm">Loading vehicles...</p>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Reg Number</th>
                <th>Make & Model</th>
                <th>Type</th>
                <th>Capacity</th>
                <th>Odometer (km)</th>
                <th>Cost ($)</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredVehicles.map(vehicle => (
                <tr key={vehicle.id}>
                  <td className="font-medium">VH-{vehicle.id}</td>
                  <td>{vehicle.registration_number}</td>
                  <td>{vehicle.vehicle_name || ''} {vehicle.model ? `(${vehicle.model})` : ''}</td>
                  <td>{vehicle.vehicle_type}</td>
                  <td>{vehicle.capacity}</td>
                  <td>{vehicle.odometer}</td>
                  <td>{vehicle.acquisition_cost}</td>
                  <td>
                    <span className={`status-badge ${getStatusClass(vehicle.status)}`}>
                      {vehicle.status}
                    </span>
                  </td>
                </tr>
              ))}
              {filteredVehicles.length === 0 && (
                <tr>
                  <td colSpan="8" style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '2rem' }}>
                    No matching vehicles found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
        
        <div className="pagination flex justify-between items-center mt-6 text-sm text-secondary">
          <div>Showing {filteredVehicles.length} entries</div>
        </div>
      </div>
    </div>
  );
}
