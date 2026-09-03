import React, { useState } from 'react';

export default function EvidenceChat() {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAsk = async () => {
    if (!question.trim()) return;
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('http://127.0.0.1:8000/api/v1/data/evidence-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.detail || 'Evidence retrieval failed');
      }
      setResponse(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ marginTop: '32px', padding: '24px', backgroundColor: '#0f172a', borderRadius: '12px', border: '1px solid #1e293b' }}>
      <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#34d399', marginBottom: '8px' }}>
        Mode 2: Evidence-Based AI Business Analyst
      </h3>
      <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '16px' }}>
        Ask questions about your uploaded data. The engine provides root-cause explanations backed by exact numerical evidence.
      </p>

      <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="e.g. Why did revenue drop this month? Which category drives top sales?"
          style={{
            flex: 1,
            padding: '12px',
            backgroundColor: '#1e293b',
            border: '1px solid #334155',
            borderRadius: '6px',
            color: '#f8fafc'
          }}
        />
        <button
          onClick={handleAsk}
          disabled={loading || !question.trim()}
          style={{
            padding: '12px 24px',
            backgroundColor: question.trim() && !loading ? '#059669' : '#475569',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            cursor: question.trim() && !loading ? 'pointer' : 'not-allowed',
            fontWeight: '600'
          }}
        >
          {loading ? 'Analyzing...' : 'Analyze Evidence'}
        </button>
      </div>

      {error && (
        <div style={{ padding: '12px', backgroundColor: '#7f1d1d', color: '#fca5a5', borderRadius: '6px', marginBottom: '16px' }}>
          {error}
        </div>
      )}

      {response && (
        <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '8px', borderLeft: '4px solid #34d399' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span style={{ fontWeight: 'bold', color: '#34d399' }}>Analysis Summary</span>
            <span style={{ color: '#a78bfa', fontSize: '0.85rem' }}>Confidence: {(response.confidence_score * 100).toFixed(0)}%</span>
          </div>
          <p style={{ color: '#f8fafc', marginBottom: '16px', lineHeight: '1.5' }}>{response.summary_insight}</p>

          <h4 style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '8px' }}>Root Cause Category Drivers:</h4>
          <ul style={{ paddingLeft: '20px', color: '#e2e8f0', marginBottom: '16px' }}>
            {response.root_cause_drivers.map((driver, idx) => (
              <li key={idx} style={{ marginBottom: '4px' }}>
                Category <strong style={{ color: '#38bdf8' }}>{driver.category}</strong>: Top driver is <strong style={{ color: '#f43f5e' }}>{driver.top_driver}</strong> contributing <strong>{driver.percentage_share}%</strong> of {driver.metric}.
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
