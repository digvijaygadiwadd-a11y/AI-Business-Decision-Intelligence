import React from 'react';
import Chart from 'react-apexcharts';

export default function ExecutiveCommand({ metrics }) {
  const revenueChartOptions = {
    chart: { type: 'bar', background: 'transparent', toolbar: { show: false } },
    theme: { mode: 'dark' },
    colors: ['#3b82f6'],
    plotOptions: { bar: { borderRadius: 6, columnWidth: '55%' } },
    xaxis: { 
      categories: ['Apparel', 'Electronics'],
      labels: { style: { colors: '#94a3b8', fontSize: '11px' } }
    },
    yaxis: { labels: { style: { colors: '#94a3b8' } } },
    grid: { borderColor: '#1e293b', strokeDashArray: 4 }
  };

  const revenueChartSeries = [{ name: 'Gross Revenue', data: [40000, 15000] }];

  return (
    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#fff' }}>Executive Command Dashboard</h2>
        <p style={{ fontSize: '12px', color: '#94a3b8', marginTop: '4px' }}>Real-time business orchestration and telemetry metrics.</p>
      </div>

      {/* Metrics Grid Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px' }}>
        <div style={{ background: '#090e1f', border: '1px solid #1e293b', padding: '20px', borderRadius: '16px' }}>
          <p style={{ fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase' }}>Total Revenue</p>
          <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#34d399', marginTop: '8px' }}>₹{metrics.total_revenue?.toLocaleString() || '40,000.00'}</h3>
        </div>
        <div style={{ background: '#090e1f', border: '1px solid #1e293b', padding: '20px', borderRadius: '16px' }}>
          <p style={{ fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase' }}>Total Orders</p>
          <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#60a5fa', marginTop: '8px' }}>{metrics.total_orders || 2}</h3>
        </div>
        <div style={{ background: '#090e1f', border: '1px solid #1e293b', padding: '20px', borderRadius: '16px' }}>
          <p style={{ fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase' }}>Customers</p>
          <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#fbbf24', marginTop: '8px' }}>{metrics.customers_count || 6}</h3>
        </div>
        <div style={{ background: '#090e1f', border: '1px solid #1e293b', padding: '20px', borderRadius: '16px' }}>
          <p style={{ fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase' }}>Supply Health</p>
          <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#f43f5e', marginTop: '8px' }}>Action Required</h3>
        </div>
        <div style={{ background: '#090e1f', border: '1px solid #1e293b', padding: '20px', borderRadius: '16px' }}>
          <p style={{ fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase' }}>Low Stock SKUs</p>
          <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#f43f5e', marginTop: '8px' }}>{metrics.low_stock_count || 6}</h3>
        </div>
      </div>

      {/* Chart Section */}
      <div style={{ background: '#090e1f', border: '1px solid #1e293b', padding: '24px', borderRadius: '16px' }}>
        <h3 style={{ fontSize: '15px', fontWeight: '600', color: '#fff', marginBottom: '16px' }}>Gross Revenue by Product Category</h3>
        <div style={{ height: '280px' }}>
          <Chart options={revenueChartOptions} series={revenueChartSeries} type="bar" height="100%" />
        </div>
      </div>
    </div>
  );
}