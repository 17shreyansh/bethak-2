import { usePanelStore } from './store/usePanelStore';

export default function AppDebug() {
  const store = usePanelStore();
  
  return (
    <div style={{ padding: '20px', fontFamily: 'monospace' }}>
      <h1>Store Debug</h1>
      <pre>{JSON.stringify(store, null, 2)}</pre>
      <button onClick={() => store.setActiveTab('bottom', 'resources')}>
        Set Bottom to Resources
      </button>
      <button onClick={() => store.setActiveTab('bottom', 'notes')}>
        Set Bottom to Notes
      </button>
    </div>
  );
}
