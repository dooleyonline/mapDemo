'use client';

import { useEffect, useRef, useState } from 'react';
import type { IControl, Map as MapLibreMap, ControlPosition } from 'maplibre-gl';


type ZoneKey = 'main' | 'woodruff' | 'hospital' | 'clairmont';

const PALETTE = {
  zoneFill: '#90caf9',
  zoneFillActive: '#64b5f6',
  zoneLine: '#1976d2',
  poi: '#002f6c',
  poiSelected: '#053472',
  accPoi: '#f2a900',
  accPoiSelected: '#f5bd05',
  label: '#263238',
};

export default function Map({
  initialCenter = [-84.3200, 33.7955] as [number, number],
  initialZoom = 14,
}: {
  initialCenter?: [number, number];
  initialZoom?: number;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [selectedPoiName, setSelectedPoiName] = useState<string | null>(null);

  useEffect(() => {
    let cleanup = () => {};
    (async () => {
      const maplibre = await import('maplibre-gl');
      const map = new maplibre.Map({
        container: containerRef.current!,
        style: `https://api.maptiler.com/maps/streets/style.json?key=${process.env.NEXT_PUBLIC_MAPTILER_KEY}`,
        center: initialCenter,
        zoom: initialZoom,
      });

      map.addControl(new maplibre.NavigationControl(), 'top-right');

      let activeZone: ZoneKey | null = null;
      let selectedPoiId: string | null = null;
      let selectedAccId: string | null = null;

      function boundsFromPolygon(coords: number[][][]) {
        const b = new maplibre.LngLatBounds();
        coords[0].forEach(([lng, lat]) => b.extend([lng, lat]));
        return b;
      }

      map.on('load', async () => {
        const zonesRes = await fetch('/api/zones', { cache: 'no-store' });
        const zones = (await zonesRes.json()) as GeoJSON.FeatureCollection<GeoJSON.Polygon>;

        map.addSource('zones', {
          type: 'geojson',
          data: zones,
          promoteId: 'key',
        });

        map.addLayer({
          id: 'zones-fill',
          type: 'fill',
          source: 'zones',
          paint: {
            'fill-color': PALETTE.zoneFill,
            'fill-opacity': [
              'case',
              ['boolean', ['feature-state', 'active'], false],
              0.05, 0.2
            ],
          },
        });

        map.addLayer({
          id: 'zones-line',
          type: 'line',
          source: 'zones',
          paint: {
            'line-color': PALETTE.zoneLine,
            'line-width': 2,
          },
        });

        map.addLayer({
          id: 'zones-label',
          type: 'symbol',
          source: 'zones',
          layout: { 'text-field': ['get', 'name'], 'text-size': 13, 'text-offset': [0, 0.3] },
          paint: { 'text-color': PALETTE.label },
        });

        const placesRes = await fetch('/api/places', { cache: 'no-store' });
        const points = (await placesRes.json()) as GeoJSON.FeatureCollection<GeoJSON.Point>;

        map.addSource('places', { type: 'geojson', data: points });

        map.addLayer({
          id: 'poi-circle',
          type: 'circle',
          source: 'places',
          layout: { visibility: 'none' },
          paint: {
            'circle-radius': [
              'case',
              ['boolean', ['feature-state', 'selected'], false], 10, 7
            ],
            'circle-color': [
              'case',
              ['boolean', ['feature-state', 'selected'], false],
              PALETTE.poiSelected, PALETTE.poi
            ],
            'circle-stroke-width': 1.2,
            'circle-stroke-color': '#fff',
          },
        });

        // map.addLayer({
        //   id: 'poi-label',
        //   type: 'symbol',
        //   source: 'places',
        //   layout: {
        //     visibility: 'none',
        //     'text-field': ['get', 'name'],
        //     'text-size': 12,
        //     'text-offset': [0, 1.0],
        //   },
        //   paint: { 'text-color': PALETTE.label },
        // });

        const accPlacesRes = await fetch('/api/accPlaces', { cache: 'no-store' });
        const accPoints = (await accPlacesRes.json()) as GeoJSON.FeatureCollection<GeoJSON.Point>;

        map.addSource('accessible', { type: 'geojson', data: accPoints });

        map.addLayer({
          id: 'acc-poi-circle',
          type: 'circle',
          source: 'accessible',
          layout: { visibility: 'none' },
          paint: {
            'circle-radius': [
              'case',
              ['boolean', ['feature-state', 'selected'], false], 10, 7
            ],
            'circle-color': [
              'case',
              ['boolean', ['feature-state', 'selected'], false],
              PALETTE.accPoiSelected, PALETTE.accPoi
            ],
            'circle-stroke-width': 1.2,
            'circle-stroke-color': '#fff',
          },
        });

        // map.addLayer({
        //   id: 'acc-poi-label',
        //   type: 'symbol',
        //   source: 'accessible',
        //   layout: {
        //     visibility: 'none',
        //     'text-field': ['get', 'name'],
        //     'text-size': 12,
        //     'text-offset': [0, 1.0],
        //   },
        //   paint: { 'text-color': PALETTE.label },
        // });

        const setPointer = (on = true) => (map.getCanvas().style.cursor = on ? 'pointer' : '');
        map.on('mouseenter', 'zones-fill', () => setPointer(true));
        map.on('mouseleave', 'zones-fill', () => setPointer(false));
        map.on('mouseenter', 'poi-circle', () => setPointer(true));
        map.on('mouseleave', 'poi-circle', () => setPointer(false));
        map.on('mouseenter', 'acc-poi-circle', () => setPointer(true));
        map.on('mouseleave', 'acc-poi-circle', () => setPointer(false));

        map.on('click', 'zones-fill', (e: any) => {
          const f = e.features?.[0]; if (!f) return;
          const zone = (f.properties?.key || '') as ZoneKey;

          if (activeZone) {
            map.setFeatureState({ source: 'zones', id: activeZone }, { active: false });
          }
          map.setFeatureState({ source: 'zones', id: zone }, { active: true });
          activeZone = zone;

          map.setFilter('poi-circle', ['==', ['get', 'zone'], zone]);
          // map.setFilter('poi-label',  ['==', ['get', 'zone'], zone]);
          map.setLayoutProperty('poi-circle', 'visibility', 'visible');
          // map.setLayoutProperty('poi-label',  'visibility', 'visible');

          map.setFilter('acc-poi-circle', ['==', ['get', 'zone'], zone]);
          // map.setFilter('acc-poi-label',  ['==', ['get', 'zone'], zone]);
          map.setLayoutProperty('acc-poi-circle', 'visibility', 'visible');
          // map.setLayoutProperty('acc-poi-label',  'visibility', 'visible');

          const poly = f.geometry as GeoJSON.Polygon;
          const b = boundsFromPolygon(poly.coordinates as number[][][]);
          map.fitBounds(b, { padding: { top: 50, bottom: 50, left: 40, right: 40 }, duration: 800 });

          setSelectedPoiName(null);
        });

        map.on('click', 'poi-circle', (e: any) => {
          const f = e.features?.[0]; if (!f) return;
          const id = f.id as string;

          if (selectedPoiId) {
            map.setFeatureState({ source: 'places', id: selectedPoiId }, { selected: false });
          }
          map.setFeatureState({ source: 'places', id }, { selected: true });
          selectedPoiId = id;

          const [lng, lat] = (f.geometry as any).coordinates;
          const { name = 'Place', desc = '' } = f.properties || {};

          setSelectedPoiName(String(name));

          new (maplibre as any).Popup({ offset: 8, closeOnMove: true })
            .setLngLat([lng, lat])
            .setHTML(`<div style="font-size:14px"><strong>${name}</strong><br/>${desc}</div>`)
            .addTo(map);
        });

        map.on('click', 'acc-poi-circle', (e: any) => {
          const f = e.features?.[0]; if (!f) return;
          const id = f.id as string;

          if (selectedAccId) {
            map.setFeatureState({ source: 'accessible', id: selectedAccId }, { selected: false });
          }
          map.setFeatureState({ source: 'accessible', id }, { selected: true });
          selectedAccId = id;

          const [lng, lat] = (f.geometry as any).coordinates;
          const { name = 'Accessible', desc = '' } = f.properties || {};

          setSelectedPoiName(String(name));

          new (maplibre as any).Popup({ offset: 8, closeOnMove: true })
            .setLngLat([lng, lat])
            .setHTML(`<div style="font-size:14px"><strong>${name}</strong><br/>${desc}</div>`)
            .addTo(map);
        });

        function resetView() {
          if (activeZone) {
            map.setFeatureState({ source: 'zones', id: activeZone }, { active: false });
            activeZone = null;
          }
          map.setLayoutProperty('poi-circle', 'visibility', 'none');
          // map.setLayoutProperty('poi-label', 'visibility', 'none');
          map.setLayoutProperty('acc-poi-circle', 'visibility', 'none');
          // map.setLayoutProperty('acc-poi-label',  'visibility', 'none');
          if (selectedPoiId) {
            map.setFeatureState({ source: 'places', id: selectedPoiId }, { selected: false });
            selectedPoiId = null;
          }
          if (selectedAccId) {
            map.setFeatureState({ source: 'accessible', id: selectedAccId }, { selected: false });
            selectedAccId = null;
          }
          setSelectedPoiName(null);

          map.easeTo({ center: initialCenter, zoom: initialZoom, duration: 600 });
        }

        class ResetControl implements IControl {
          private _map?: MapLibreMap;
          private _container!: HTMLElement;
          private _onReset: () => void;

          constructor(onReset: () => void) {
            this._onReset = onReset;
          }

          onAdd(map: MapLibreMap): HTMLElement {
            this._map = map;

            const container = document.createElement('div');
            container.className = 'maplibregl-ctrl maplibregl-ctrl-group';

            const button = document.createElement('button');
            button.type = 'button';
            button.title = '전체보기';
            button.textContent = '⤢';
            button.style.fontSize = '16px';
            button.style.lineHeight = '20px';
            button.style.cursor = 'pointer';
            button.onclick = this._onReset;

            container.appendChild(button);
            this._container = container;
            return this._container;
          }

          onRemove(): void {
            if (this._container?.parentNode) {
              this._container.parentNode.removeChild(this._container);
            }
            this._map = undefined;
          }

          // ✅ 여기 반환 타입을 ControlPosition으로
          getDefaultPosition(): ControlPosition {
            return 'top-left';
          }
        }

        map.addControl(new ResetControl(resetView), 'top-left');
      });

      cleanup = () => map.remove();
    })();

    return () => cleanup();
  }, [initialCenter.toString(), initialZoom]);

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '70vh',
        borderRadius: 16,
        overflow: 'hidden',
        boxShadow: '0 6px 24px rgba(0,0,0,0.12)',
      }}
    >
      <div ref={containerRef} style={{ width: '100%', height: '100%' }} />

      {selectedPoiName && (
        <div
          style={{
            position: 'absolute',
            top: 14,
            left: '50%',
            transform: 'translateX(-50%)',
            backdropFilter: 'blur(8px)',
            background: 'rgba(255,255,255,0.65)',
            padding: '8px 18px',
            borderRadius: 999,
            fontWeight: 700,
            fontSize: 14,
            color: '#111827',
            boxShadow: '0 4px 14px rgba(0,0,0,0.12)',
            border: '1px solid rgba(255,255,255,0.8)',
          }}
        >
          {selectedPoiName}
        </div>
      )}

      <div
        style={{
          position: 'absolute',
          left: 12,
          bottom: 12,
          padding: 12,
          borderRadius: 12,
          background: 'rgba(255,255,255,0.9)',
          boxShadow: '0 8px 20px rgba(0,0,0,0.12)',
          border: '1px solid rgba(0,0,0,0.06)',
          minWidth: 160,
        }}
      >
        <ul style={{ listStyle: 'none', margin: 0, padding: 0, fontSize: 12, color: '#374151' }}>
          <li style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
            <span
              style={{
                display: 'inline-block',
                width: 10, height: 10, borderRadius: '50%',
                background: PALETTE.poi, border: '1px solid #fff', boxShadow: '0 0 0 1px rgba(0,0,0,0.08)'
              }}
            />
            Meetup Point
          </li>
          <li style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 0 }}>
            <span
              style={{
                display: 'inline-block',
                width: 10, height: 10, borderRadius: '50%',
                background: PALETTE.accPoi, border: '1px solid #fff', boxShadow: '0 0 0 1px rgba(0,0,0,0.08)'
              }}
            />
            Car-Accessible Meetup Point
          </li>
        </ul>
      </div>
    </div>
  );
}
