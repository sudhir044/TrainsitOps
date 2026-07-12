import { useEffect, useState } from 'react';
import { api } from '../utils/api';
import './TripDispatcher.css';

export default function TripDispatcher() {
  const [trips, setTrips] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form Fields
  const [vehicleId, setVehicleId] = useState('');
  const [driverId, setDriverId] = useState('');
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [cargoWeight, setCargoWeight] = useState('');
  const [plannedDistance, setPlannedDistance] = useState('');
  const [dispatchDate, setDispatchDate] = useState('');
  const [routeNotes, setRouteNotes] = useState('');

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Completion Form Dialog State
  const [completingTripId, setCompletingTripId] = useState(null);
  const [fuelUsed, setFuelUsed] = useState('');
  const [finalOdometer, setFinalOdometer] = useState('');

  const loadData = async () => {
    try {
      const [tripsRes, vehiclesRes, driversRes] = await Promise.all([
        api.getTrips(),
        api.getVehicles(),
        api.getDrivers(),
      ]);
      setTrips(tripsRes.data);
      setVehicles(vehiclesRes.data);
      setDrivers(driversRes.data);
    } catch (err) {
      console.error('Error loading dispatcher data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCreateTrip = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      await api.createTrip({
        vehicle_id: parseInt(vehicleId),
        driver_id: parseInt(driverId),
        source,
        destination,
        cargo_weight: parseFloat(cargoWeight),
        planned_distance: parseFloat(plannedDistance),
        dispatch_date: dispatchDate,
        route_notes: routeNotes,
      });
      setSuccess('Trip created successfully as Draft!');
      setVehicleId('');
      setDriverId('');
      setSource('');
      setDestination('');
      setCargoWeight('');
      setPlannedDistance('');
      setDispatchDate('');
      setRouteNotes('');
      loadData();
    } catch (err) {
      setError(err.message || 'Failed to create trip');
    }
  };

  const handleDispatch = async (id) => {
    try {
      await api.dispatchTrip(id);
      loadData();
    } catch (err) {
      alert(err.message || 'Failed to dispatch trip');
    }
  };

  const handleCompleteSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.completeTrip(completingTripId, {
        fuel_used: parseFloat(fuelUsed),
        final_odometer: parseInt(finalOdometer),
      });
      setCompletingTripId(null);
      setFuelUsed('');
      setFinalOdometer('');
      loadData();
    } catch (err) {
      alert(err.message || 'Failed to complete trip');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this trip?')) return;
    try {
      await api.deleteTrip(id);
      loadData();
    } catch (err) {
      alert(err.message || 'Failed to delete trip');
    }
  };

  const availableVehicles = vehicles.filter(v => v.status === 'Available');
  const availableDrivers = drivers.filter(d => d.status === 'Available');

  const getStatusClass = (status) => {
    if (!status) return 'status-gray';
    const s = status.toLowerCase();
    if (s === 'completed') return 'status-ontime';
    if (s === 'dispatched') return 'status-active';
    if (s === 'draft') return 'status-scheduled';
    return 'status-gray';
  };

  return (
    <div className="page-content">
      <div className="page-header mb-6">
        <h1 className="text-2xl font-bold">Trip Dispatcher</h1>
        <p className="text-secondary text-sm">Create, dispatch, and track trips</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '1.5rem' }}>
        
        {/* Creation Card */}
        <div className="card">
          <h3 className="font-semibold text-lg mb-4">New Trip Dispatch</h3>
          {error && <div style={{ color: 'red', marginBottom: '1rem', fontSize: '0.875rem' }}>{error}</div>}
          {success && <div style={{ color: 'green', marginBottom: '1rem', fontSize: '0.875rem' }}>{success}</div>}
          <form onSubmit={handleCreateTrip} className="flex-col gap-4">
            <div className="form-group flex flex-col gap-1">
              <label className="text-sm">Select Vehicle *</label>
              <select 
                className="input-field" 
                value={vehicleId} 
                onChange={(e) => setVehicleId(e.target.value)}
                required
              >
                <option value="">-- Choose Available Vehicle --</option>
                {availableVehicles.map(v => (
                  <option key={v.id} value={v.id}>
                    {v.registration_number} - {v.vehicle_name || 'Vehicle'} (Cap: {v.capacity}kg)
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group flex flex-col gap-1 mt-3">
              <label className="text-sm">Select Driver *</label>
              <select 
                className="input-field" 
                value={driverId} 
                onChange={(e) => setDriverId(e.target.value)}
                required
              >
                <option value="">-- Choose Available Driver --</option>
                {availableDrivers.map(d => (
                  <option key={d.id} value={d.id}>
                    {d.full_name} ({d.license_number})
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group flex flex-col gap-1 mt-3">
              <label className="text-sm">Source Location *</label>
              <input 
                type="text" 
                className="input-field" 
                placeholder="e.g. Dallas, TX" 
                value={source} 
                onChange={(e) => setSource(e.target.value)}
                required 
              />
            </div>

            <div className="form-group flex flex-col gap-1 mt-3">
              <label className="text-sm">Destination *</label>
              <input 
                type="text" 
                className="input-field" 
                placeholder="e.g. Houston, TX" 
                value={destination} 
                onChange={(e) => setDestination(e.target.value)}
                required 
              />
            </div>

            <div className="form-group flex flex-col gap-1 mt-3">
              <label className="text-sm">Cargo Weight (kg) *</label>
              <input 
                type="number" 
                step="any"
                className="input-field" 
                placeholder="Cargo weight" 
                value={cargoWeight} 
                onChange={(e) => setCargoWeight(e.target.value)}
                required 
              />
            </div>

            <div className="form-group flex flex-col gap-1 mt-3">
              <label className="text-sm">Planned Distance (km) *</label>
              <input 
                type="number" 
                step="any"
                className="input-field" 
                placeholder="Distance" 
                value={plannedDistance} 
                onChange={(e) => setPlannedDistance(e.target.value)}
                required 
              />
            </div>

            <div className="form-group flex flex-col gap-1 mt-3">
              <label className="text-sm">Dispatch Date & Time *</label>
              <input 
                type="datetime-local" 
                className="input-field" 
                value={dispatchDate} 
                onChange={(e) => setDispatchDate(e.target.value)}
                required 
              />
            </div>

            <div className="form-group flex flex-col gap-1 mt-3">
              <label className="text-sm">Route Notes</label>
              <textarea 
                className="input-field" 
                placeholder="Special route instructions..."
                value={routeNotes} 
                onChange={(e) => setRouteNotes(e.target.value)}
              />
            </div>

            <button type="submit" className="btn-primary w-full mt-6 justify-center">Create Draft Trip</button>
          </form>
        </div>

        {/* List Card */}
        <div className="card">
          <h3 className="font-semibold text-lg mb-4">Trip Roster</h3>
          {loading ? (
            <p className="text-secondary text-sm">Loading trips...</p>
          ) : (
            <table className="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Vehicle</th>
                  <th>Driver</th>
                  <th>Route</th>
                  <th>Dispatch Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {trips.map(trip => (
                  <tr key={trip.id}>
                    <td className="font-medium">TR-{trip.id}</td>
                    <td>{trip.registration_number}</td>
                    <td>{trip.driver_name}</td>
                    <td>{trip.source} → {trip.destination}</td>
                    <td>{new Date(trip.dispatch_date).toLocaleString()}</td>
                    <td>
                      <span className={`status-badge ${getStatusClass(trip.status)}`}>
                        {trip.status}
                      </span>
                    </td>
                    <td>
                      <div className="flex gap-2">
                        {trip.status === 'Draft' && (
                          <button 
                            onClick={() => handleDispatch(trip.id)} 
                            className="btn-primary" 
                            style={{ padding: '2px 8px', fontSize: '0.75rem' }}
                          >
                            Dispatch
                          </button>
                        )}
                        {trip.status === 'Dispatched' && (
                          <button 
                            onClick={() => setCompletingTripId(trip.id)} 
                            className="btn-secondary" 
                            style={{ padding: '2px 8px', fontSize: '0.75rem', backgroundColor: '#e2e8f0' }}
                          >
                            Complete
                          </button>
                        )}
                        <button 
                          onClick={() => handleDelete(trip.id)} 
                          className="btn-secondary" 
                          style={{ padding: '2px 8px', fontSize: '0.75rem', color: 'red' }}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {trips.length === 0 && (
                  <tr>
                    <td colSpan="7" style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '2rem' }}>
                      No trips found. Create one to begin.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>

      </div>

      {/* Completion Modal */}
      {completingTripId && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 999
        }}>
          <div className="card" style={{ width: '400px', backgroundColor: '#fff', padding: '1.5rem', borderRadius: '8px' }}>
            <h3 className="font-semibold text-lg mb-4">Complete Trip</h3>
            <form onSubmit={handleCompleteSubmit}>
              <div className="form-group flex flex-col gap-1">
                <label className="text-sm">Fuel Used (Liters) *</label>
                <input 
                  type="number" 
                  step="any"
                  className="input-field" 
                  value={fuelUsed} 
                  onChange={(e) => setFuelUsed(e.target.value)} 
                  required 
                />
              </div>
              <div className="form-group flex flex-col gap-1 mt-3">
                <label className="text-sm">Final Odometer Reading (km) *</label>
                <input 
                  type="number" 
                  className="input-field" 
                  value={finalOdometer} 
                  onChange={(e) => setFinalOdometer(e.target.value)} 
                  required 
                />
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button type="button" onClick={() => setCompletingTripId(null)} className="btn-secondary">Cancel</button>
                <button type="submit" className="btn-primary">Save & Complete</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
