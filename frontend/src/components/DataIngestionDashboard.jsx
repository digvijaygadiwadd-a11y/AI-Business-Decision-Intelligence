import React, { useState } from 'react';
import DynamicCharts from './DynamicCharts';

export default function DataIngestionDashboard() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://127.0.0.1:8000/api/v1/data/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('File upload and analysis failed');
      }

      const data = await response.json();
      setAnalysis(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '24px', fontFamily: 'system-ui, sans-serif', color: '#e2e8f0', backgroundColor: '#0f172a', borderRadius: '12px' }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '16px', color: '#38bdf8' }}>
        Apex Dynamic Data Intelligence Engine
      </h2>
      <p style={{ color: '#94a3b8', marginBottom: '20px' }}>
        Upload any CSV or Excel file to auto-detect schema, profile numerical metrics, and build instant analytical visualizations.
      </p>

      {/* Upload Drop Zone */}
      <div style={{ border: '2px dashed #334155', padding: '32px', borderRadius: '8px', textAlign: 'center', backgroundColor: '#1e293b' }}>
        <input type="file" accept=".csv, .xlsx, .xls" onChange={handleFileChange} style={{ marginBottom: '12px', color: '#94a3b8' }} />
        <br />
        <button 
          onClick={handleUpload} 
          disabled={!file || loading}
          style={{
            padding: '10px 24px',
            backgroundColor: file && !loading ? '#0284c7' : '#475569',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            cursor: file && !loading ? 'pointer' : 'not-allowed',
            fontWeight: '600'
          }}
        >
          {loading ? 'Analyzing Dataset...' : 'Ingest & Process Dataset'}
        </button>
      </div>

      {error && (
        <div style={{ marginTop: '16px', padding: '12px', backgroundColor: '#7f1d1d', color: '#fca5a5', borderRadius: '6px' }}>
          {error}
        </div>
      )}

      {/* Dataset Profile Metrics */}
      {analysis && (
        <div style={{ marginTop: '24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
            <div style={{ backgroundColor: '#1e293b', padding: '16px', borderRadius: '8px', borderLeft: '4px solid #38bdf8' }}>
              <div style={{ color: '#94a3b8', fontSize: '0.875rem' }}>Total Records</div>
              <div style={{ fontSize: '1.875rem', fontWeight: 'bold' }}>{analysis.total_rows}</div>
            </div>
            <div style={{ backgroundColor: '#1e293b', padding: '16px', borderRadius: '8px', borderLeft: '4px solid #34d399' }}>
              <div style={{ color: '#94a3b8', fontSize: '0.875rem' }}>Total Columns</div>
              <div style={{ fontSize: '1.875rem', fontWeight: 'bold' }}>{analysis.total_columns}</div>
            </div>
            <div style={{ backgroundColor: '#1e293b', padding: '16px', borderRadius: '8px', borderLeft: '4px solid #a78bfa' }}>
              <div style={{ color: '#94a3b8', fontSize: '0.875rem' }}>Engine Table</div>
              <div style={{ fontSize: '1.2rem', fontWeight: '600', color: '#c084fc' }}>{analysis.table_name}</div>
            </div>
          </div>

          {/* Numerical Profiles */}
          <h3 style={{ fontSize: '1.2rem', color: '#f8fafc', marginBottom: '12px' }}>Auto-Detected Numerical Metrics</h3>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', backgroundColor: '#1e293b', borderRadius: '8px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #334155', color: '#94a3b8' }}>
                  <th style={{ padding: '12px' }}>Column</th>
                  <th style={{ padding: '12px' }}>Sum</th>
                  <th style={{ padding: '12px' }}>Mean</th>
                  <th style={{ padding: '12px' }}>Min</th>
                  <th style={{ padding: '12px' }}>Max</th>
                </tr>
              </thead>
              <tbody>
                {analysis.profile.numerical.map((item, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid #334155' }}>
                    <td style={{ padding: '12px', fontWeight: '600', color: '#38bdf8' }}>{item.column}</td>
                    <td style={{ padding: '12px' }}>{item.sum.toLocaleString()}</td>
                    <td style={{ padding: '12px' }}>{item.mean.toFixed(2)}</td>
                    <td style={{ padding: '12px' }}>{item.min}</td>
                    <td style={{ padding: '12px' }}>{item.max}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Render Recharts Dynamic Charts */}
          <DynamicCharts analysis={analysis} />
        </div>
      )}
    </div>
  );
}
