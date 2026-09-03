import React from 'react';
import { ResponsiveContainer, BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';

export default function DynamicCharts({ analysis }) {
  if (!analysis || !analysis.profile || !analysis.profile.numerical.length) return null;

  const numericalData = analysis.profile.numerical;

  return (
    <div style={{ marginTop: '32px' }}>
      <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#f8fafc', marginBottom: '20px' }}>
        Auto-Generated Visualizations
      </h3>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '24px' }}>
        {/* Metric Comparison Bar Chart */}
        <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '12px', border: '1px solid #334155' }}>
          <h4 style={{ color: '#38bdf8', marginBottom: '16px', fontSize: '1rem', fontWeight: '600' }}>
            Numerical Metrics Comparison (Sum)
          </h4>
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <BarChart data={numericalData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="column" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f8fafc' }} />
                <Legend />
                <Bar dataKey="sum" fill="#0284c7" radius={[4, 4, 0, 0]} name="Total Sum" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Min vs Max Distribution Line Chart */}
        <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '12px', border: '1px solid #334155' }}>
          <h4 style={{ color: '#34d399', marginBottom: '16px', fontSize: '1rem', fontWeight: '600' }}>
            Boundary Distribution (Min vs Max Range)
          </h4>
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <LineChart data={numericalData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="column" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f8fafc' }} />
                <Legend />
                <Line type="monotone" dataKey="max" stroke="#34d399" strokeWidth={2} name="Maximum Value" />
                <Line type="monotone" dataKey="min" stroke="#f43f5e" strokeWidth={2} name="Minimum Value" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
