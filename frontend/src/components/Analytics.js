import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import './Analytics.css';

const Analytics = () => {
  const data = [
    { name: 'Jan', intrusions: 120, alerts: 300 },
    { name: 'Feb', intrusions: 90, alerts: 260 },
    { name: 'Mar', intrusions: 150, alerts: 340 },
    { name: 'Apr', intrusions: 170, alerts: 390 },
    { name: 'May', intrusions: 140, alerts: 320 },
    { name: 'Jun', intrusions: 180, alerts: 410 },
    { name: 'Jul', intrusions: 200, alerts: 450 },
  ];

  const threatCategoryData = [
    { name: 'Malware', value: 400 },
    { name: 'Phishing', value: 300 },
    { name: 'DDoS', value: 200 },
    { name: 'Ransomware', value: 150 },
    { name: 'Insider Threat', value: 100 },
  ];

  return (
    <div className="analytics-container">
      <h2 className="analytics-heading">🛡️ Cyber Threat Detection Analytics</h2>
      
      {/* Line Chart - Intrusions vs Alerts */}
      <div className="chart-container">
        <h3 className="chart-heading">Intrusions vs Alerts</h3>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
            <XAxis dataKey="name" stroke="#555" />
            <YAxis stroke="#555" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="intrusions" stroke="#ff4d4f" strokeWidth={2} />
            <Line type="monotone" dataKey="alerts" stroke="#1890ff" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Bar Chart - Total Security Alerts */}
      <div className="chart-container">
        <h3 className="chart-heading">Total Security Alerts</h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
            <XAxis dataKey="name" stroke="#555" />
            <YAxis stroke="#555" />
            <Tooltip />
            <Legend />
            <Bar dataKey="alerts" fill="#1890ff" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Area Chart - Intrusions & Alerts Trend */}
      <div className="chart-container">
        <h3 className="chart-heading">Intrusion & Alert Trends</h3>
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
            <XAxis dataKey="name" stroke="#555" />
            <YAxis stroke="#555" />
            <Tooltip />
            <Legend />
            <Area type="monotone" dataKey="intrusions" stroke="#ff4d4f" fillOpacity={0.3} fill="#ff4d4f" />
            <Area type="monotone" dataKey="alerts" stroke="#1890ff" fillOpacity={0.3} fill="#1890ff" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Pie Chart - Threat Category Distribution */}
      {/* Pie Chart - Threat Category Distribution */}
<div className="chart-container">
  <h3 className="chart-heading">Threat Category Distribution</h3>
  <ResponsiveContainer width="100%" height={400}>
    <PieChart>
      <Pie
        data={threatCategoryData}
        dataKey="value"
        nameKey="name"
        outerRadius={150}
        label
      >
        {threatCategoryData.map((entry, index) => (
          <Cell
            key={`cell-${index}`}
            fill={['#ff4d4f', '#1890ff', '#ffc658', '#722ed1', '#52c41a'][index % 5]}
          />
        ))}
      </Pie>
    </PieChart>
  </ResponsiveContainer>

  {/* Custom Legend */}
  <div className="custom-legend">
    <ul>
      <li><span className="legend-color" style={{ backgroundColor: '#ff4d4f' }}></span> Malware</li>
      <li><span className="legend-color" style={{ backgroundColor: '#1890ff' }}></span> Phishing</li>
      <li><span className="legend-color" style={{ backgroundColor: '#ffc658' }}></span> DDoS</li>
      <li><span className="legend-color" style={{ backgroundColor: '#722ed1' }}></span> Ransomware</li>
      <li><span className="legend-color" style={{ backgroundColor: '#52c41a' }}></span> Insider Threat</li>
    </ul>
  </div>
</div>

    </div>
  );
};

export default Analytics;
