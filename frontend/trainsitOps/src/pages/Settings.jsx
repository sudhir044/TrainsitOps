export default function Settings() {
  return (
    <div className="page-content">
      <div className="page-header mb-6">
        <h1 className="text-2xl font-bold">Settings & RBAC</h1>
        <p className="text-secondary text-sm">Configure system settings and manage user roles</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        
        <div className="card">
          <h3 className="font-semibold text-lg mb-4">Profile Settings</h3>
          <form className="flex-col gap-4">
            <div className="form-group flex flex-col gap-1">
              <label className="text-sm">Full Name</label>
              <input type="text" className="input-field" defaultValue="Admin User" />
            </div>
            
            <div className="form-group flex flex-col gap-1 mt-4">
              <label className="text-sm">Email Address</label>
              <input type="email" className="input-field" defaultValue="admin@transitops.com" />
            </div>

            <div className="form-group flex flex-col gap-1 mt-4">
              <label className="text-sm">Role</label>
              <input type="text" className="input-field bg-dark" defaultValue="Super Admin" disabled />
              <span className="text-xs text-muted mt-1">Role cannot be changed by the user.</span>
            </div>
            
            <div className="mt-6 pt-4 border-t" style={{ borderTop: '1px solid var(--border-color)' }}>
              <button type="button" className="btn-primary">Save Changes</button>
            </div>
          </form>
        </div>

        <div className="card">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-lg">Role-Based Access Control (RBAC)</h3>
            <button className="btn-secondary">Add Role</button>
          </div>
          
          <table className="data-table mt-4">
            <thead>
              <tr>
                <th>Role Name</th>
                <th>Users</th>
                <th>Permissions</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="font-medium">Super Admin</td>
                <td>2</td>
                <td>Full Access</td>
                <td><button className="text-secondary text-sm" disabled>Edit</button></td>
              </tr>
              <tr>
                <td className="font-medium">Dispatcher</td>
                <td>8</td>
                <td>Trips, Routes, Vehicles</td>
                <td><button className="text-orange hover:underline text-sm font-medium">Edit</button></td>
              </tr>
              <tr>
                <td className="font-medium">Mechanic</td>
                <td>12</td>
                <td>Maintenance Only</td>
                <td><button className="text-orange hover:underline text-sm font-medium">Edit</button></td>
              </tr>
              <tr>
                <td className="font-medium">Finance</td>
                <td>4</td>
                <td>Fuel, Reports</td>
                <td><button className="text-orange hover:underline text-sm font-medium">Edit</button></td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}
