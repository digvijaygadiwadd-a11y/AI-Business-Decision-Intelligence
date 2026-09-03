import React, { useState } from 'react';

export default function SQLCopilot() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleExecuteQuery = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://127.0.0.1:8000/api/v1/data/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sql_query: query }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.detail || 'SQL Execution failed');
      }
      setResults(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ marginTop: '32px', padding: '24px', backgroundColor: '#0f172a', borderRadius: '12px', border: '1px solid #1e293b' }}>
      <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#38bdf8', marginBottom: '8px' }}>
        Safe SQL Copilot
      </h3>
      <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '16px' }}>
        Execute read-only analytical queries against your ingested dataset. Malicious mutation commands (DROP, DELETE, UPDATE) are blocked automatically.
      </p>

      <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g. SELECT * FROM user_dynamic_data LIMIT 10"
          style={{
            flex: 1,
            padding: '12px',
            backgroundColor: '#1e293b',
            border: '1px solid #334155',
            borderRadius: '6px',
            color: '#f8fafc',
            fontFamily: 'monospace'
          }}
        />
        <button
          onClick={handleExecuteQuery}
          disabled={loading || !query.trim()}
          style={{
            padding: '12px 24px',
            backgroundColor: query.trim() && !loading ? '#0284c7' : '#475569',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            cursor: query.trim() && !loading ? 'pointer' : 'not-allowed',
            fontWeight: '600'
          }}
        >
          {loading ? 'Executing...' : 'Run Query'}
        </button>
      </div>

      {error && (
        <div style={{ padding: '12px', backgroundColor: '#7f1d1d', color: '#fca5a5', borderRadius: '6px', marginBottom: '16px' }}>
          {error}
        </div>
      )}

      {results && (
        <div style={{ marginTop: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#94a3b8', fontSize: '0.85rem', marginBottom: '8px' }}>
            <span>Executed: <code style={{ color: '#38bdf8' }}>{results.query}</code></span>
            <span>Rows Returned: {results.row_count}</span>
          </div>

          <div style={{ overflowX: 'auto', maxHeight: '300px' }}>
            {results.data.length > 0 ? (
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', backgroundColor: '#1e293b', borderRadius: '6px' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #334155', color: '#94a3b8' }}>
                    {Object.keys(results.data[0]).map((col, idx) => (
                      <th key={idx} style={{ padding: '10px' }}>{col}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {results.data.map((row, rIdx) => (
                    <tr key={rIdx} style={{ borderBottom: '1px solid #334155', color: '#e2e8f0' }}>
                      {Object.values(row).map((val, cIdx) => (
                        <td key={cIdx} style={{ padding: '10px' }}>{String(val)}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div style={{ color: '#94a3b8', padding: '12px', textAlign: 'center' }}>No rows returned.</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
