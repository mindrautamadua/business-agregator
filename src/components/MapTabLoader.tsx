"use client";
import dynamic from 'next/dynamic';

const MapTab = dynamic(() => import('./MapTab'), {
  ssr: false,
  loading: () => (
    <div style={{ height: '100dvh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0f172a', color: '#94a3b8' }}>
      Memuat Peta...
    </div>
  )
});

export default MapTab;
