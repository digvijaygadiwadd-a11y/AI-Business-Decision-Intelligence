import React, { useState } from 'react';

export default function ScenarioSimulator() {
  const [priceChange, setPriceChange] = useState(5);
  const [volumeChange, setVolumeChange] = useState(-2);
  const [costChange, setCostChange] = useState(0);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSimulate = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('http://127.0.0.1:8000/api/v1/data/simulate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          price_change_pct: parseFloat(priceChange),
          volume_change_pct: parseFloat(volumeChange),
          cost_change_pct: parseFloat(costChange)
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.detail || 'Simulation execution failed');
      }
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ marginTop: '32px', padding: '24px', backgroundColor: '#0f172a', borderRadius: '12px', border: '1px solid #1e293b' }}>
      <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#c084fc', marginBottom: '8px' }}>
        Mode 4: Executive Scenario Simulator
      </h3>
      <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '20px' }}>
        Model "What-If" business sensitivity scenarios by adjusting price, volume, and operational cost levers.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '20px' }}>
        <div>
          <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.85rem', marginBottom: '6px' }}>
            Price Change (%): {priceChange}%
          </label>
          <input
            type="range"
            min="-50"
            max="50"
            value={priceChange}
            onChange={(e) => setPriceChange(e.target.value)}
            style={{ width: '100%', accentColor: '#c084fc' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.85rem', marginBottom: '6px' }}>
            Volume Change (%): {volumeChange}%
          </label>
          <input
            type="range"
            min="-50"
            max="50"
            value={volumeChange}
            onChange={(e) => setVolumeChange(e.target.value)}
            style={{ width: '100%', accentColor: '#38bdf8' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.85rem', marginBottom: '6px' }}>
            Cost Change (%): {costChange}%
          </label>
          <input
            type="range"
            min="-50"
            max="50"
            value={costChange}
            onChange={(e) => setCostChange(e.target.value)}
            style={{ width: '100%', accentColor: '#f43f5e' }}
          />
        </div>
      </div>

      <button
        onClick={handleSimulate}
        disabled={loading}
        style={{
          width: '100%',
          padding: '12px',
          backgroundColor: '#9333ea',
          color: '#fff',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          fontWeight: '600',
          marginBottom: '20px'
        }}
      >
        {loading ? 'Simulating Model...' : 'Run Scenario Model'}
      </button>

      {error && (
        <div style={{ padding: '12px', backgroundColor: '#7f1d1d', color: '#fca5a5', borderRadius: '6px', marginBottom: '16px' }}>
          {error}
        </div>
      )}

      {result && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
          <div style={{ backgroundColor: '#1e293b', padding: '16px', borderRadius: '8px', borderLeft: '4px solid #38bdf8' }}>
            <span style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Projected Revenue</span>
            <div style={{ fontSize: '1.4rem', fontWeight: 'bold', color: '#f8fafc', marginTop: '4px' }}>
              ${result.simulation.projected_revenue.toLocaleString()}
            </div>
            <span style={{ color: result.simulation.revenue_delta >= 0 ? '#34d399' : '#f43f5e', fontSize: '0.85rem' }}>
              {result.simulation.revenue_delta >= 0 ? '+' : ''}${result.simulation.revenue_delta.toLocaleString()}
            </span>
          </div>

          <div style={{ backgroundColor: '#1e293b', padding: '16px', borderRadius: '8px', borderLeft: '4px solid #f43f5e' }}>
            <span style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Projected Operational Cost</span>
            <div style={{ fontSize: '1.4rem', fontWeight: 'bold', color: '#f8fafc', marginTop: '4px' }}>
              ${result.simulation.projected_cost.toLocaleString()}
            </div>
          </div>

          <div style={{ backgroundColor: '#1e293b', padding: '16px', borderRadius: '8px', borderLeft: '4px solid #c084fc' }}>
            <span style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Projected Net Profit Margin</span>
            <div style={{ fontSize: '1.4rem', fontWeight: 'bold', color: '#f8fafc', marginTop: '4px' }}>
              ${result.simulation.projected_margin.toLocaleString()}
            </div>
            <span style={{ color: result.simulation.margin_growth_pct >= 0 ? '#34d399' : '#f43f5e', fontSize: '0.85rem' }}>
              {result.simulation.margin_growth_pct >= 0 ? '+' : ''}{result.simulation.margin_growth_pct}% Growth
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
