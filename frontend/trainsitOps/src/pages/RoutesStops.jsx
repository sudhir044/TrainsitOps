export default function RoutesStops() {
  const routes = [
    { id: 'RT-01', name: 'Downtown Express', start: 'Central Station', end: 'North Hill', distance: '12.4 km', stops: 8, status: 'Active' },
    { id: 'RT-02', name: 'Airport Shuttle', start: 'City Center', end: 'Airport T1', distance: '24.8 km', stops: 3, status: 'Active' },
    { id: 'RT-03', name: 'University Loop', start: 'Campus North', end: 'Campus South', distance: '5.2 km', stops: 12, status: 'Inactive' },
    { id: 'RT-04', name: 'Westside Commuter', start: 'West Park', end: 'Business Dist', distance: '18.1 km', stops: 15, status: 'Active' },
    { id: 'RT-05', name: 'Night Owl Line', start: 'Entertainment Dist', end: 'Suburbs', distance: '32.5 km', stops: 6, status: 'Scheduled' },
  ];

  const getStatusClass = (status) => {
    if (status.toLowerCase() === 'active') return 'status-active';
    if (status.toLowerCase() === 'inactive') return 'status-gray';
    if (status.toLowerCase() === 'scheduled') return 'status-scheduled';
    return 'status-gray';
  };

  return (
    <div className="page-content">
      <div className="page-header flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Routes & Stops</h1>
          <p className="text-secondary text-sm">Manage transit routes and designate stops</p>
        </div>
        <button className="btn-primary">Add Route</button>
      </div>

      <div className="card">
        <div className="filters flex justify-between mb-6">
          <div className="flex gap-4">
            <div className="flex-col gap-1 w-[250px]">
              <input type="text" className="input-field" placeholder="Search routes by name or ID..." />
            </div>
            <div className="flex-col gap-1 w-[150px]">
              <select className="input-field">
                <option>All Statuses</option>
                <option>Active</option>
                <option>Inactive</option>
                <option>Scheduled</option>
              </select>
            </div>
          </div>
        </div>

        <table className="data-table">
          <thead>
            <tr>
              <th>Route ID</th>
              <th>Route Name</th>
              <th>Start Point</th>
              <th>End Point</th>
              <th>Distance</th>
              <th>Stops</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {routes.map(route => (
              <tr key={route.id}>
                <td className="font-medium">{route.id}</td>
                <td>{route.name}</td>
                <td>{route.start}</td>
                <td>{route.end}</td>
                <td>{route.distance}</td>
                <td>{route.stops}</td>
                <td>
                  <span className={`status-badge ${getStatusClass(route.status)}`}>
                    {route.status}
                  </span>
                </td>
                <td>
                  <button className="text-orange hover:underline text-sm font-medium">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
