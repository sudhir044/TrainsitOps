import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './ReportsAnalytics.css';

export default function ReportsAnalytics() {
  const data = [
    { name: 'Jan', revenue: 4000, cost: 2400 },
    { name: 'Feb', revenue: 3000, cost: 1398 },
    { name: 'Mar', revenue: 2000, cost: 9800 },
    { name: 'Apr', revenue: 2780, cost: 3908 },
    { name: 'May', revenue: 1890, cost: 4800 },
    { name: 'Jun', revenue: 2390, cost: 3800 },
    { name: 'Jul', revenue: 3490, cost: 4300 },
  ];

  return (
    <div className="page-content">
      <div className="page-header flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Reports & Analytics</h1>
          <p className="text-secondary text-sm">Actionable insights from fleet data</p>
        </div>
        <div className="flex gap-3">
          <select className="input-field w-auto">
            <option>Last 6 Months</option>
            <option>Last Year</option>
          </select>
          <button className="btn-primary">Download PDF</button>
        </div>
      </div>

      <div className="analytics-grid mb-6">
        <div className="card metric-card">
          <div className="metric-title">Total Revenue</div>
          <div className="metric-value">$ 124,500</div>
          <div className="metric-trend text-green">+12.5% vs last period</div>
        </div>
        <div className="card metric-card">
          <div className="metric-title">Total Expenses</div>
          <div className="metric-value">$ 45,210</div>
          <div className="metric-trend text-red">+4.2% vs last period</div>
        </div>
        <div className="card metric-card">
          <div className="metric-title">Avg. Cost per Trip</div>
          <div className="metric-value">$ 34.50</div>
          <div className="metric-trend text-green">-1.5% vs last period</div>
        </div>
      </div>

      <div className="charts-container">
        <div className="card chart-main">
          <h3 className="font-semibold text-lg mb-4">Revenue vs Expenses</h3>
          <div className="chart-wrapper h-[300px]" style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" vertical={false} />
                <XAxis dataKey="name" stroke="var(--text-secondary)" tickLine={false} axisLine={false} />
                <YAxis stroke="var(--text-secondary)" tickLine={false} axisLine={false} tickFormatter={(value) => `$${value/1000}k`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--bg-panel)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
                  itemStyle={{ color: 'var(--text-primary)' }}
                />
                <Bar dataKey="revenue" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="cost" fill="#f58220" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="card chart-side">
          <h3 className="font-semibold text-lg mb-4">Fleet Utilization</h3>
          <div className="utilization-bars">
             <div className="util-item mb-4">
               <div className="flex justify-between text-sm mb-1">
                 <span>Vans</span>
                 <span>75%</span>
               </div>
               <div className="bar-bg">
                 <div className="bar-fill bg-blue-500" style={{ width: '75%', backgroundColor: '#3b82f6' }}></div>
               </div>
             </div>
             <div className="util-item mb-4">
               <div className="flex justify-between text-sm mb-1">
                 <span>SUVs</span>
                 <span>45%</span>
               </div>
               <div className="bar-bg">
                 <div className="bar-fill" style={{ width: '45%', backgroundColor: '#f58220' }}></div>
               </div>
             </div>
             <div className="util-item mb-4">
               <div className="flex justify-between text-sm mb-1">
                 <span>Sedans</span>
                 <span>90%</span>
               </div>
               <div className="bar-bg">
                 <div className="bar-fill bg-green" style={{ width: '90%' }}></div>
               </div>
             </div>
             <div className="util-item">
               <div className="flex justify-between text-sm mb-1">
                 <span>Trucks</span>
                 <span>20%</span>
               </div>
               <div className="bar-bg">
                 <div className="bar-fill" style={{ width: '20%', backgroundColor: '#ef4444' }}></div>
               </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
