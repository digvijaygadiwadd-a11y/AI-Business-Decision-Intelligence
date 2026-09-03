import React from 'react';

export default function Sidebar({ activeTab, setActiveTab }) {
  const tabs = [
    { id: "Executive Command", label: "Executive Command", icon: "⚡" },
    { id: "Deep Telemetry", label: "Deep Telemetry", icon: "📊" },
    { id: "Inventory Matrix", label: "Inventory Matrix", icon: "📦" },
    { id: "Threat Alerts", label: "Threat Alerts", icon: "🚨" },
    { id: "AI Recommendations", label: "AI Recommendations", icon: "🤖" }
  ];

  return (
    <aside style={{ width: '260px', backgroundColor: '#020617', borderRight: '1px solid #1e293b', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '24px', userSelect: 'none' }}>
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
          <div style={{ width: '36px', height: '36px', backgroundColor: '#2563eb', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: '#fff', fontSize: '18px' }}>B</div>
          <div>
            <span style={{ fontSize: '16px', fontWeight: 'bold', display: 'block', color: '#fff' }}>BusinessIQ</span>
            <span style={{ fontSize: '9px', fontWeight: 'bold', color: '#60a5fa', letterSpacing: '0.05em' }}>DECISION ENGINE</span>
          </div>
        </div>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '10px 14px',
                borderRadius: '10px',
                fontSize: '13px',
                fontWeight: '500',
                cursor: 'pointer',
                textAlign: 'left',
                border: activeTab === tab.id ? '1px solid rgba(59, 130, 246, 0.3)' : '1px solid transparent',
                backgroundColor: activeTab === tab.id ? 'rgba(37, 99, 235, 0.1)' : 'transparent',
                color: activeTab === tab.id ? '#60a5fa' : '#94a3b8',
                transition: 'all 0.2s'
              }}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>
      <div style={{ backgroundColor: '#0b1329', padding: '14px', borderRadius: '12px', border: '1px solid #1e293b', fontSize: '12px' }}>
        <div style={{ color: '#94a3b8', fontSize: '9px', fontWeight: 'bold', letterSpacing: '0.05em', marginBottom: '4px' }}>SYSTEM STATE</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#34d399' }}></span>
          <span style={{ color: '#34d399', fontWeight: '600' }}>Live Operational</span>
        </div>
      </div>
    </aside>
  );
}