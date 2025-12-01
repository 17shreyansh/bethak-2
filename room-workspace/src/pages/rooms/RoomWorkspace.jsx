import { useState } from 'react';

export default function RoomWorkspace() {
  const [activeTab, setActiveTab] = useState(0);
  
  const room = {
    id: 1,
    name: 'Project Room',
    icon: '🚀',
    category: 'Development',
    tags: ['React', 'Frontend']
  };

  const user = { name: 'User' };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <div style={{ backgroundColor: 'white', marginBottom: '16px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '8px',
                backgroundColor: '#1976d2',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem'
              }}>
                {room.icon}
              </div>
              <div>
                <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 700 }}>
                  {room.name}
                </h2>
                <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
                  <span style={{
                    padding: '4px 8px',
                    backgroundColor: '#e3f2fd',
                    borderRadius: '16px',
                    fontSize: '0.75rem'
                  }}>
                    {room.category}
                  </span>
                  {room.tags?.map(tag => (
                    <span key={tag} style={{
                      padding: '4px 8px',
                      border: '1px solid #ccc',
                      borderRadius: '16px',
                      fontSize: '0.75rem'
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: '4px' }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: '#1976d2',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '0.875rem'
                }}>
                  {user?.name?.[0] || 'U'}
                </div>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: '#9c27b0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '0.875rem'
                }}>A</div>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: '#2e7d32',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '0.875rem'
                }}>B</div>
              </div>
              <button style={{
                background: 'none',
                border: 'none',
                padding: '8px',
                borderRadius: '4px',
                cursor: 'pointer'
              }}>💬</button>
              <button style={{
                background: 'none',
                border: 'none',
                padding: '8px',
                borderRadius: '4px',
                cursor: 'pointer'
              }}>⚙️</button>
            </div>
          </div>

          <div style={{ marginTop: '16px', borderBottom: '1px solid #e0e0e0' }}>
            <div style={{ display: 'flex', gap: '32px' }}>
              {['Canvas Space', 'Files', 'Chat', 'Activity'].map((tab, index) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(index)}
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: '12px 0',
                    cursor: 'pointer',
                    borderBottom: activeTab === index ? '2px solid #1976d2' : '2px solid transparent',
                    color: activeTab === index ? '#1976d2' : '#666',
                    fontWeight: activeTab === index ? 600 : 400
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 16px' }}>
        {activeTab === 0 && (
          <div style={{
            backgroundColor: 'white',
            padding: '32px',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            minHeight: '400px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <div style={{ textAlign: 'center' }}>
              <h3>Canvas Space</h3>
              <p style={{ color: '#666' }}>Interactive workspace area</p>
            </div>
          </div>
        )}
        {activeTab === 1 && (
          <div style={{
            backgroundColor: 'white',
            padding: '32px',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            <p style={{ color: '#666' }}>Files view coming soon</p>
          </div>
        )}
        {activeTab === 2 && (
          <div style={{
            backgroundColor: 'white',
            padding: '32px',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            <p style={{ color: '#666' }}>Chat view coming soon</p>
          </div>
        )}
        {activeTab === 3 && (
          <div style={{
            backgroundColor: 'white',
            padding: '32px',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            <p style={{ color: '#666' }}>Activity view coming soon</p>
          </div>
        )}
      </div>
    </div>
  );
}
