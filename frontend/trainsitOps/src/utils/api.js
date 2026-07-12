const BASE_URL = "http://localhost:5000/api";

const getHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

async function request(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`;
  const headers = getHeaders();
  const config = {
    ...options,
    headers: {
      ...headers,
      ...options.headers,
    },
  };

  const response = await fetch(url, config);
  
  if (response.status === 401 || response.status === 403) {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    if (window.location.pathname !== "/login") {
      window.location.href = "/login";
    }
  }

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }
  return data;
}

export const api = {
  // Auth
  login: async (email, password) => {
    const data = await request("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    if (data.token) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
    }
    return data;
  },
  
  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  },

  getUser: () => {
    const userStr = localStorage.getItem("user");
    return userStr ? JSON.parse(userStr) : null;
  },

  getToken: () => {
    return localStorage.getItem("token");
  },

  // Dashboard
  getDashboardKPIs: () => request("/dashboard/kpis"),
  getDashboardOverview: () => request("/dashboard/overview"),
  getRecentTrips: () => request("/dashboard/recent-trips"),
  getVehicleStatus: () => request("/dashboard/vehicle-status"),
  getFleetUtilization: () => request("/dashboard/fleet-utilization"),
  getExpenseChart: () => request("/dashboard/expense-chart"),
  getRecentActivities: () => request("/dashboard/recent-activities"),

  // Vehicles
  getVehicles: () => request("/vehicles"),
  getVehicle: (id) => request(`/vehicles/${id}`),
  createVehicle: (data) => request("/vehicles", {
    method: "POST",
    body: JSON.stringify(data),
  }),
  updateVehicle: (id, data) => request(`/vehicles/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  }),
  deleteVehicle: (id) => request(`/vehicles/${id}`, {
    method: "DELETE",
  }),

  // Drivers
  getDrivers: () => request("/drivers"),
  getDriver: (id) => request(`/drivers/${id}`),
  createDriver: (data) => request("/drivers", {
    method: "POST",
    body: JSON.stringify(data),
  }),

  // Trips
  getTrips: () => request("/trips"),
  getTrip: (id) => request(`/trips/${id}`),
  createTrip: (data) => request("/trips", {
    method: "POST",
    body: JSON.stringify(data),
  }),
  dispatchTrip: (id) => request(`/trips/${id}/dispatch`, {
    method: "PATCH",
  }),
  completeTrip: (id, data) => request(`/trips/${id}/complete`, {
    method: "PATCH",
    body: JSON.stringify(data),
  }),

  // Maintenance
  getMaintenanceLogs: () => request("/maintenance"),
  createMaintenanceLog: (data) => request("/maintenance", {
    method: "POST",
    body: JSON.stringify(data),
  }),
  startMaintenance: (id) => request(`/maintenance/${id}/start`, {
    method: "PATCH",
  }),
  completeMaintenance: (id, data) => request(`/maintenance/${id}/complete`, {
    method: "PATCH",
    body: JSON.stringify(data),
  }),

  // Fuel Logs
  getFuelLogs: () => request("/fuel"),
  createFuelLog: (data) => request("/fuel", {
    method: "POST",
    body: JSON.stringify(data),
  }),

  // Expenses
  getExpenses: () => request("/expenses"),
  createExpense: (data) => request("/expenses", {
    method: "POST",
    body: JSON.stringify(data),
  }),

  // Reports
  getSummaryReport: () => request("/reports/summary"),
  getTripReport: () => request("/reports/trips"),
  getFuelReport: () => request("/reports/fuel"),
  getExpenseReport: () => request("/reports/expenses"),
  getMaintenanceReport: () => request("/reports/maintenance"),
  getDriverReport: () => request("/reports/drivers"),
};
