'use client';

import { useState, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, CircleMarker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Search, Layers } from 'lucide-react';
import L from 'leaflet';

// Mock Data
const riskZones = [
  { id: 1, name: 'Chennai', lat: 13.0827, lng: 80.2707, risk: 'red', prob: 85, depth: 1.2, rain: 150 },
  { id: 2, name: 'Mumbai', lat: 19.0760, lng: 72.8777, risk: 'orange', prob: 65, depth: 0.8, rain: 90 },
  { id: 3, name: 'Patna', lat: 25.5941, lng: 85.1376, risk: 'red', prob: 78, depth: 1.5, rain: 110 },
  { id: 4, name: 'Kolkata', lat: 22.5726, lng: 88.3639, risk: 'yellow', prob: 45, depth: 0.4, rain: 60 },
  { id: 5, name: 'Kochi', lat: 9.9312, lng: 76.2673, risk: 'orange', prob: 70, depth: 0.9, rain: 130 },
  { id: 6, name: 'Wayanad', lat: 11.6854, lng: 76.1320, risk: 'red', prob: 92, depth: 2.1, rain: 210 },
  { id: 7, name: 'Silchar', lat: 24.8333, lng: 92.7789, risk: 'orange', prob: 60, depth: 0.7, rain: 85 },
  { id: 8, name: 'Gorakhpur', lat: 26.7606, lng: 83.3732, risk: 'yellow', prob: 40, depth: 0.3, rain: 50 },
];

const shelters = [
  { id: 1, name: 'Chennai Central Relief Camp', lat: 13.1, lng: 80.2 },
  { id: 2, name: 'Mumbai City Hall Shelter', lat: 19.1, lng: 72.8 },
  { id: 3, name: 'Patna Govt School Camp', lat: 25.6, lng: 85.2 },
  { id: 4, name: 'Wayanad Community Center', lat: 11.7, lng: 76.1 },
];

const hospitals = [
  { id: 1, name: 'Apollo Hospitals Chennai', lat: 13.06, lng: 80.25 },
  { id: 2, name: 'KEM Hospital Mumbai', lat: 19.02, lng: 72.84 },
  { id: 3, name: 'PMCH Patna', lat: 25.61, lng: 85.15 },
];

const riverStations = [
  { id: 1, name: 'Ganga Level Monitor - Patna', lat: 25.65, lng: 85.12 },
  { id: 2, name: 'Adyar River Station', lat: 13.01, lng: 80.24 },
];

const ndrfCenters = [
  { id: 1, name: 'NDRF Base Arakkonam', lat: 13.08, lng: 79.67 },
  { id: 2, name: 'NDRF Pune', lat: 18.52, lng: 73.85 },
];

// Helper to get color based on risk
const getRiskColor = (risk: string) => {
  switch (risk) {
    case 'red': return '#EF4444';
    case 'orange': return '#F59E0B';
    case 'yellow': return '#EAB308';
    case 'green': return '#22C55E';
    default: return '#3B82F6';
  }
};

// Create custom DivIcons for markers
const createIcon = (color: string) => {
  if (typeof window === 'undefined') return null; // Avoid SSR issues
  return new L.DivIcon({
    html: `<div style="background-color: ${color}; width: 14px; height: 14px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 4px rgba(0,0,0,0.8);"></div>`,
    className: '',
    iconSize: [14, 14],
    iconAnchor: [7, 7]
  });
};

export default function FloodMap() {
  const [layers, setLayers] = useState({
    riskZones: true,
    shelters: false,
    hospitals: false,
    riverStations: false,
    ndrfCenters: false,
  });
  const [searchQuery, setSearchQuery] = useState('');

  const toggleLayer = (layer: keyof typeof layers) => {
    setLayers(prev => ({ ...prev, [layer]: !prev[layer] }));
  };

  const filteredRiskZones = useMemo(() => {
    if (!searchQuery) return riskZones;
    return riskZones.filter(z => z.name.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [searchQuery]);

  return (
    <div className="relative w-full h-[calc(100vh-5rem)]">
      {/* Search Bar */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[1000] w-full max-w-md px-4">
        <div className="relative flex items-center">
          <Search className="absolute left-3 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search districts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-dark-800/90 backdrop-blur border border-dark-700 text-white rounded-full py-3 pl-10 pr-4 shadow-lg focus:outline-none focus:ring-2 focus:ring-brand-blue"
          />
        </div>
      </div>

      {/* Layer Toggle Panel */}
      <div className="absolute top-20 left-4 z-[1000] bg-dark-800/90 backdrop-blur border border-dark-700 rounded-xl p-4 shadow-xl w-64">
        <div className="flex items-center gap-2 mb-4 text-white">
          <Layers className="w-5 h-5 text-brand-blue" />
          <h2 className="font-semibold text-lg">Map Layers</h2>
        </div>
        <div className="space-y-3">
          <label className="flex items-center gap-3 text-gray-200 cursor-pointer group">
            <input 
              type="checkbox" 
              checked={layers.riskZones} 
              onChange={() => toggleLayer('riskZones')}
              className="w-4 h-4 rounded bg-dark-900 border-dark-700 text-brand-blue focus:ring-brand-blue/50"
            />
            <span className="group-hover:text-white transition-colors">Flood Risk Zones</span>
          </label>
          <label className="flex items-center gap-3 text-gray-200 cursor-pointer group">
            <input 
              type="checkbox" 
              checked={layers.shelters} 
              onChange={() => toggleLayer('shelters')}
              className="w-4 h-4 rounded bg-dark-900 border-dark-700 text-brand-green focus:ring-brand-green/50"
            />
            <span className="group-hover:text-white transition-colors">Relief Shelters</span>
          </label>
          <label className="flex items-center gap-3 text-gray-200 cursor-pointer group">
            <input 
              type="checkbox" 
              checked={layers.hospitals} 
              onChange={() => toggleLayer('hospitals')}
              className="w-4 h-4 rounded bg-dark-900 border-dark-700 text-brand-blue focus:ring-brand-blue/50"
            />
            <span className="group-hover:text-white transition-colors">Hospitals</span>
          </label>
          <label className="flex items-center gap-3 text-gray-200 cursor-pointer group">
            <input 
              type="checkbox" 
              checked={layers.riverStations} 
              onChange={() => toggleLayer('riverStations')}
              className="w-4 h-4 rounded bg-dark-900 border-dark-700 text-brand-cyan focus:ring-brand-cyan/50"
            />
            <span className="group-hover:text-white transition-colors">River Stations</span>
          </label>
          <label className="flex items-center gap-3 text-gray-200 cursor-pointer group">
            <input 
              type="checkbox" 
              checked={layers.ndrfCenters} 
              onChange={() => toggleLayer('ndrfCenters')}
              className="w-4 h-4 rounded bg-dark-900 border-dark-700 text-brand-amber focus:ring-brand-amber/50"
            />
            <span className="group-hover:text-white transition-colors">NDRF Centers</span>
          </label>
        </div>
      </div>

      {/* Legend */}
      <div className="absolute bottom-6 right-4 z-[1000] bg-dark-800/90 backdrop-blur border border-dark-700 rounded-xl p-4 shadow-xl">
        <h3 className="text-white text-sm font-semibold mb-3">Risk Level</h3>
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-brand-red"></div>
            <span className="text-gray-300">High (Red Alert)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-brand-amber"></div>
            <span className="text-gray-300">Moderate (Orange Alert)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <span className="text-gray-300">Low (Yellow Alert)</span>
          </div>
        </div>
      </div>

      {/* Map */}
      <MapContainer 
        center={[20.5937, 78.9629]} 
        zoom={5} 
        style={{ width: '100%', height: '100%', zIndex: 1 }}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://carto.com/">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />

        {layers.riskZones && filteredRiskZones.map((zone) => (
          <CircleMarker
            key={`risk-${zone.id}`}
            center={[zone.lat, zone.lng]}
            radius={18}
            pathOptions={{ 
              color: getRiskColor(zone.risk), 
              fillColor: getRiskColor(zone.risk),
              fillOpacity: 0.4,
              weight: 2
            }}
          >
            <Popup className="custom-popup">
              <div className="p-2 min-w-[200px]">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold text-gray-800">{zone.name}</h3>
                  <span className={`px-2 py-0.5 rounded text-xs font-bold text-white ${zone.risk === 'red' ? 'bg-red-500' : zone.risk === 'orange' ? 'bg-orange-500' : 'bg-yellow-500'}`}>
                    {zone.risk.toUpperCase()}
                  </span>
                </div>
                <div className="space-y-1 text-sm text-gray-600">
                  <p><strong>Flood Probability:</strong> {zone.prob}%</p>
                  <p><strong>Predicted Depth:</strong> {zone.depth} m</p>
                  <p><strong>Rainfall Forecast:</strong> {zone.rain} mm</p>
                </div>
              </div>
            </Popup>
          </CircleMarker>
        ))}

        {layers.shelters && createIcon('#22C55E') && shelters.map(s => (
          <Marker key={`shelter-${s.id}`} position={[s.lat, s.lng]} icon={createIcon('#22C55E')!}>
            <Popup><strong className="text-gray-800">{s.name}</strong><br/><span className="text-sm text-gray-500">Relief Shelter</span></Popup>
          </Marker>
        ))}

        {layers.hospitals && createIcon('#3B82F6') && hospitals.map(h => (
          <Marker key={`hospital-${h.id}`} position={[h.lat, h.lng]} icon={createIcon('#3B82F6')!}>
            <Popup><strong className="text-gray-800">{h.name}</strong><br/><span className="text-sm text-gray-500">Hospital Facility</span></Popup>
          </Marker>
        ))}

        {layers.riverStations && createIcon('#06B6D4') && riverStations.map(r => (
          <Marker key={`river-${r.id}`} position={[r.lat, r.lng]} icon={createIcon('#06B6D4')!}>
            <Popup><strong className="text-gray-800">{r.name}</strong><br/><span className="text-sm text-gray-500">River Level Monitoring Station</span></Popup>
          </Marker>
        ))}

        {layers.ndrfCenters && createIcon('#F97316') && ndrfCenters.map(n => (
          <Marker key={`ndrf-${n.id}`} position={[n.lat, n.lng]} icon={createIcon('#F97316')!}>
            <Popup><strong className="text-gray-800">{n.name}</strong><br/><span className="text-sm text-gray-500">NDRF Response Center</span></Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
