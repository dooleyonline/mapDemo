// src/app/page.tsx (Server Component)
import MapWrapper from '@/components/MapWrapper';

export default function HomePage() {
  return (
    <main style={{ padding: 20, maxWidth: 960, margin: '0 auto' }}>
      <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 12 }}>Dynamic Campus Map Demo</h1>
      <p style={{ color: '#555', marginBottom: 16 }}>
        click poligon regions → zoom in to the selected region & show markers belongs the the region → select marker.
      </p>
      <MapWrapper />
    </main>
  );
}
