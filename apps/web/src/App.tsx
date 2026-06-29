import { useEffect, useState } from 'react';
import { formatMoney } from '@shopfront/shared';
import { fetchJson } from './api/client';

interface Health {
  status: string;
}

export function App() {
  const [apiStatus, setApiStatus] = useState('connecting…');

  useEffect(() => {
    fetchJson<Health>('/health')
      .then((health) => setApiStatus(health.status))
      .catch(() => setApiStatus('unavailable'));
  }, []);

  return (
    <main style={{ fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <h1>Shopfront</h1>
      <p>API status: {apiStatus}</p>
      <p>Sample price: {formatMoney(1999)}</p>
    </main>
  );
}
