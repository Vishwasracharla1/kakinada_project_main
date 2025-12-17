import { useEffect, useMemo, useRef } from 'react';
import * as L from 'leaflet';
import 'leaflet.heat';

import type { ActivityPoint } from '../api/cohorts';

type Props = {
  points: ActivityPoint[];
  className?: string;
  onPointHover?: (p: ActivityPoint | null) => void;
};

function toIntensity(level: ActivityPoint['activity_level']) {
  switch (level) {
    case 'HIGH':
      return 1.0;
    case 'MEDIUM':
      return 0.65;
    case 'LOW':
    default:
      return 0.35;
  }
}

function colors(level: ActivityPoint['activity_level']) {
  switch (level) {
    case 'HIGH':
      return { ring: '#ef4444', fill: '#ef4444' };
    case 'MEDIUM':
      return { ring: '#f59e0b', fill: '#f59e0b' };
    case 'LOW':
    default:
      return { ring: '#22c55e', fill: '#22c55e' };
  }
}

function pinHtml(p: ActivityPoint) {
  const c = colors(p.activity_level);
  // Simple pin marker (like the reference): colored head + white inner dot.
  return `
    <div class="kkn-pin" title="${p.camera_id}">
      <svg width="20" height="28" viewBox="0 0 26 36" xmlns="http://www.w3.org/2000/svg">
        <path d="M13 36c6.2-8.7 12-14.1 12-22C25 6.3 19.6 1 13 1S1 6.3 1 14c0 7.9 5.8 13.3 12 22z"
          fill="${c.fill}" stroke="rgba(0,0,0,0.35)" stroke-width="1"/>
        <circle cx="13" cy="14" r="5.2" fill="rgba(255,255,255,0.95)"/>
        <circle cx="13" cy="14" r="3.2" fill="rgba(0,0,0,0.15)"/>
      </svg>
    </div>
  `;
}

export default function LeafletHeatmap({ points, className, onPointHover }: Props) {
  const elRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const heatRef = useRef<any>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);

  const bounds = useMemo(() => {
    const latlngs = points
      .filter((p) => Number.isFinite(p.latitude) && Number.isFinite(p.longitude))
      .map((p) => L.latLng(p.latitude, p.longitude));
    return latlngs.length ? L.latLngBounds(latlngs) : null;
  }, [points]);

  useEffect(() => {
    if (!elRef.current || mapRef.current) return;

    const map = L.map(elRef.current, {
      zoomControl: true,
      attributionControl: false,
      preferCanvas: true,
      zoomSnap: 0.25,
      zoomDelta: 0.5,
    });

    // Light street basemap (like the reference screenshot) — no API key required.
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      subdomains: ['a', 'b', 'c'],
      maxZoom: 20,
    }).addTo(map);

    markersLayerRef.current = L.layerGroup().addTo(map);

    // Default view: Kakinada-ish
    map.setView([16.9891, 82.2475], 12.5);

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
      heatRef.current = null;
      markersLayerRef.current = null;
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    // Heat data: [lat, lng, intensity]
    const heatData = points
      .filter((p) => Number.isFinite(p.latitude) && Number.isFinite(p.longitude))
      .map((p) => [p.latitude, p.longitude, toIntensity(p.activity_level)] as [number, number, number]);

    if (!heatRef.current) {
      heatRef.current = (L as any).heatLayer(heatData, {
        radius: 36,
        blur: 30,
        minOpacity: 0.28,
        maxZoom: 17,
        // Classic heat palette (green → yellow → red), like the reference
        gradient: {
          0.2: '#22c55e',
          0.45: '#a3e635',
          0.65: '#facc15',
          0.82: '#fb923c',
          1.0: '#ef4444',
        },
      }).addTo(map);
    } else {
      heatRef.current.setLatLngs(heatData);
    }

    // Markers layer (camera dots)
    const markersLayer = markersLayerRef.current;
    if (markersLayer) {
      markersLayer.clearLayers();

      points.forEach((p) => {
        if (!Number.isFinite(p.latitude) || !Number.isFinite(p.longitude)) return;

        const icon = L.divIcon({
          className: 'kkn-pin-icon',
          html: pinHtml(p),
          iconSize: [20, 28],
          iconAnchor: [10, 27],
          popupAnchor: [0, -26],
        });

        const marker = L.marker([p.latitude, p.longitude], { icon, riseOnHover: true });

        const popupHtml = `
          <div class="kkn-popup">
            <div class="kkn-popup__title">${p.camera_id}</div>
            <div class="kkn-popup__row"><span class="kkn-popup__label">Zone</span><span class="kkn-popup__value">${p.zone || '—'}</span></div>
            <div class="kkn-popup__row"><span class="kkn-popup__label">Activity</span><span class="kkn-popup__value kkn-popup__pill kkn-pill-${p.activity_level.toLowerCase()}">${p.activity_level}</span></div>
          </div>
        `;

        marker.bindPopup(popupHtml, { closeButton: false, offset: L.point(0, -6) });

        marker.on('mouseover', () => {
          onPointHover?.(p);
          const el = marker.getElement();
          if (el) el.classList.add('is-hover');
          marker.openPopup();
        });
        marker.on('mouseout', () => {
          onPointHover?.(null);
          const el = marker.getElement();
          if (el) el.classList.remove('is-hover');
          marker.closePopup();
        });

        marker.addTo(markersLayer);
      });
    }

    if (bounds && bounds.isValid()) {
      map.fitBounds(bounds.pad(0.18), { animate: false, maxZoom: 15.5 });
    }
  }, [points, bounds, onPointHover]);

  return (
    <div
      ref={elRef}
      className={className}
      style={{ width: '100%', height: '100%', outline: 'none' }}
      // Leaflet uses its own focus management; keep React quiet.
      suppressHydrationWarning
    />
  );
}


