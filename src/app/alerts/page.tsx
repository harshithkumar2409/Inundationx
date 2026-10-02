'use client';

import React, { useState } from 'react';
import { AlertTriangle, AlertOctagon, Info, CheckCircle2, MapPin, Droplets, Waves, Clock, Activity } from 'lucide-react';

type AlertLevel = 'RED' | 'ORANGE' | 'YELLOW' | 'GREEN';

interface AlertData {
  id: string;
  level: AlertLevel;
  title: string;
  area: string;
  expectedRainfall: number;
  predictedDepth: number;
  issuedTime: string;
  recommendedAction: string;
  status: 'ACTIVE' | 'RESOLVED';
}

const MOCK_ALERTS: AlertData[] = [
  {
    id: 'ALT-001',
    level: 'RED',
    title: 'Extreme Rainfall Warning',
    area: 'Chennai South, Tamil Nadu',
    expectedRainfall: 250,
    predictedDepth: 1.8,
    issuedTime: '10 mins ago',
    recommendedAction: 'Evacuate low-lying areas immediately. Move to designated shelters.',
    status: 'ACTIVE',
  },
  {
    id: 'ALT-002',
    level: 'RED',
    title: 'Severe Flood Alert',
    area: 'Ernakulam, Kerala',
    expectedRainfall: 180,
    predictedDepth: 1.5,
    issuedTime: '45 mins ago',
    recommendedAction: 'Avoid all travel. Do not enter floodwaters. Disconnect power supplies.',
    status: 'ACTIVE',
  },
  {
    id: 'ALT-003',
    level: 'RED',
    title: 'Dam Release Warning',
    area: 'Pune Riverside, Maharashtra',
    expectedRainfall: 100,
    predictedDepth: 2.0,
    issuedTime: '1 hour ago',
    recommendedAction: 'Move to higher ground immediately. River banks are highly dangerous.',
    status: 'ACTIVE',
  },
  {
    id: 'ALT-004',
    level: 'ORANGE',
    title: 'Heavy Rainfall Warning',
    area: 'Mumbai Suburbs, Maharashtra',
    expectedRainfall: 120,
    predictedDepth: 0.8,
    issuedTime: '2 hours ago',
    recommendedAction: 'Prepare for possible waterlogging. Stock up on essentials.',
    status: 'ACTIVE',
  },
  {
    id: 'ALT-005',
    level: 'ORANGE',
    title: 'Rising River Levels',
    area: 'Guwahati, Assam',
    expectedRainfall: 80,
    predictedDepth: 0.9,
    issuedTime: '3 hours ago',
    recommendedAction: 'Stay alert. Keep emergency kits ready. Monitor local news.',
    status: 'ACTIVE',
  },
  {
    id: 'ALT-006',
    level: 'ORANGE',
    title: 'Urban Flooding Advisory',
    area: 'Bengaluru South, Karnataka',
    expectedRainfall: 100,
    predictedDepth: 0.6,
    issuedTime: '4 hours ago',
    recommendedAction: 'Avoid underpasses and low-lying roads. Work from home if possible.',
    status: 'ACTIVE',
  },
  {
    id: 'ALT-007',
    level: 'ORANGE',
    title: 'Coastal Surge Warning',
    area: 'Puri, Odisha',
    expectedRainfall: 60,
    predictedDepth: 1.1,
    issuedTime: '5 hours ago',
    recommendedAction: 'Fishermen are advised not to venture into the sea. Coastal residents stay vigilant.',
    status: 'ACTIVE',
  },
  {
    id: 'ALT-008',
    level: 'YELLOW',
    title: 'Moderate Rainfall Alert',
    area: 'Hyderabad, Telangana',
    expectedRainfall: 45,
    predictedDepth: 0.3,
    issuedTime: '6 hours ago',
    recommendedAction: 'Be aware of traffic disruptions. Clear drains around your property.',
    status: 'ACTIVE',
  },
  {
    id: 'ALT-009',
    level: 'YELLOW',
    title: 'Thunderstorm Warning',
    area: 'Kolkata, West Bengal',
    expectedRainfall: 50,
    predictedDepth: 0.2,
    issuedTime: '8 hours ago',
    recommendedAction: 'Stay indoors during lightning. Watch for localized water accumulation.',
    status: 'ACTIVE',
  },
  {
    id: 'ALT-010',
    level: 'YELLOW',
    title: 'Pre-Monsoon Showers',
    area: 'Ahmedabad, Gujarat',
    expectedRainfall: 35,
    predictedDepth: 0.1,
    issuedTime: '12 hours ago',
    recommendedAction: 'Monitor updates. Normal activities can continue with caution.',
    status: 'ACTIVE',
  },
  {
    id: 'ALT-011',
    level: 'GREEN',
    title: 'Clear Weather Update',
    area: 'New Delhi, Delhi',
    expectedRainfall: 0,
    predictedDepth: 0,
    issuedTime: '1 day ago',
    recommendedAction: 'No action required. Weather conditions are stable.',
    status: 'ACTIVE',
  },
  {
    id: 'ALT-012',
    level: 'GREEN',
    title: 'Flood Threat Receding',
    area: 'Surat, Gujarat',
    expectedRainfall: 5,
    predictedDepth: 0,
    issuedTime: '1 day ago',
    recommendedAction: 'Continue normal activities. River levels returning to normal.',
    status: 'ACTIVE',
  },
];

const levelConfig = {
  RED: {
    color: 'bg-brand-red',
    text: 'text-brand-red',
    border: 'border-brand-red',
    lightBg: 'bg-brand-red/10',
    icon: AlertOctagon,
    emoji: '🔴',
    label: 'Emergency',
  },
  ORANGE: {
    color: 'bg-brand-amber', // Using amber for orange/warning as per typical tailwind, or custom orange if available. Using amber as fallback.
    text: 'text-brand-amber',
    border: 'border-brand-amber',
    lightBg: 'bg-brand-amber/10',
    icon: AlertTriangle,
    emoji: '🟠',
    label: 'Warning',
  },
  YELLOW: {
    color: 'bg-yellow-400',
    text: 'text-yellow-400',
    border: 'border-yellow-400',
    lightBg: 'bg-yellow-400/10',
    icon: Info,
    emoji: '🟡',
    label: 'Watch',
  },
  GREEN: {
    color: 'bg-brand-green',
    text: 'text-brand-green',
    border: 'border-brand-green',
    lightBg: 'bg-brand-green/10',
    icon: CheckCircle2,
    emoji: '🟢',
    label: 'All Clear',
  },
};

export default function AlertCenterPage() {
  const [activeFilter, setActiveFilter] = useState<'ALL' | AlertLevel>('ALL');

  const filteredAlerts = activeFilter === 'ALL' 
    ? MOCK_ALERTS 
    : MOCK_ALERTS.filter(alert => alert.level === activeFilter);

  const stats = {
    RED: MOCK_ALERTS.filter(a => a.level === 'RED').length,
    ORANGE: MOCK_ALERTS.filter(a => a.level === 'ORANGE').length,
    YELLOW: MOCK_ALERTS.filter(a => a.level === 'YELLOW').length,
    GREEN: MOCK_ALERTS.filter(a => a.level === 'GREEN').length,
  };

  return (
    <div className="min-h-screen bg-dark-900 p-6 md:p-8 text-gray-200">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
              Alert Center
              <span className="relative flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-red opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-brand-red"></span>
              </span>
            </h1>
          </div>
        </div>

        {/* Alert Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {(Object.keys(stats) as AlertLevel[]).map((level) => {
            const config = levelConfig[level];
            const count = stats[level];
            return (
              <div key={level} className="bg-dark-800 rounded-xl p-4 border border-dark-700 flex flex-col items-center justify-center shadow-lg transition-transform hover:scale-105">
                <span className={`text-4xl font-bold ${config.text}`}>{count}</span>
                <span className="text-gray-400 font-medium text-sm mt-1">{config.label} Alerts</span>
              </div>
            );
          })}
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-3 bg-dark-800 p-2 rounded-xl border border-dark-700 w-fit">
          <button
            onClick={() => setActiveFilter('ALL')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${activeFilter === 'ALL' ? 'bg-dark-700 text-white shadow-md' : 'text-gray-400 hover:text-white hover:bg-dark-700/50'}`}
          >
            All Alerts
          </button>
          {(['GREEN', 'YELLOW', 'ORANGE', 'RED'] as AlertLevel[]).map((level) => {
             const config = levelConfig[level];
             return (
               <button
                 key={level}
                 onClick={() => setActiveFilter(level)}
                 className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2 ${activeFilter === level ? 'bg-dark-700 text-white shadow-md' : 'text-gray-400 hover:text-white hover:bg-dark-700/50'}`}
               >
                 {config.emoji} {config.label}
               </button>
             );
          })}
        </div>

        {/* Alert Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredAlerts.map((alert) => {
            const config = levelConfig[alert.level];
            const isRed = alert.level === 'RED';
            
            return (
              <div 
                key={alert.id}
                className={`relative bg-dark-800 rounded-xl overflow-hidden border ${isRed ? 'border-brand-red animate-pulse' : 'border-dark-700'} shadow-xl group hover:-translate-y-1 transition-transform duration-300`}
                style={{ animationDuration: '3s' }}
              >
                {/* Left Color Stripe */}
                <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${config.color}`} />
                
                <div className="p-5 pl-7">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xl" title={config.label}>{config.emoji}</span>
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${config.lightBg} ${config.text} border ${config.border} bg-opacity-20`}>
                        {config.label.toUpperCase()}
                      </span>
                    </div>
                    <span className="bg-brand-blue/20 text-brand-blue border border-brand-blue/30 px-2 py-0.5 rounded text-xs font-semibold flex items-center gap-1">
                      <Activity size={12} /> {alert.status}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-bold text-white mb-2 leading-tight">{alert.title}</h3>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-gray-300 text-sm">
                      <MapPin size={16} className="text-gray-500" />
                      {alert.area}
                    </div>
                    <div className="flex items-center gap-2 text-gray-300 text-sm">
                      <Droplets size={16} className="text-brand-cyan" />
                      Expected Rainfall: <span className="font-semibold text-white">{alert.expectedRainfall} mm</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300 text-sm">
                      <Waves size={16} className="text-brand-blue" />
                      Predicted Depth: <span className="font-semibold text-white">{alert.predictedDepth} m</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300 text-sm">
                      <Clock size={16} className="text-gray-500" />
                      Issued: {alert.issuedTime}
                    </div>
                  </div>

                  <div className={`mt-4 p-3 rounded-lg border ${config.border} ${config.lightBg} border-opacity-30`}>
                    <p className="text-sm text-gray-200">
                      <span className="font-semibold block mb-1">Recommended Action:</span>
                      {alert.recommendedAction}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Color Legend */}
        <div className="mt-12 bg-dark-800 rounded-xl p-6 border border-dark-700 shadow-lg">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Info className="text-brand-cyan" />
            Alert Level Legend
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-start gap-3">
              <div className="mt-1">{levelConfig.GREEN.emoji}</div>
              <div>
                <p className="font-semibold text-brand-green">Green (All Clear)</p>
                <p className="text-sm text-gray-400">No significant risk. Normal conditions.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="mt-1">{levelConfig.YELLOW.emoji}</div>
              <div>
                <p className="font-semibold text-yellow-400">Yellow (Watch)</p>
                <p className="text-sm text-gray-400">Be aware, monitor conditions. Potential for isolated disruption.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="mt-1">{levelConfig.ORANGE.emoji}</div>
              <div>
                <p className="font-semibold text-brand-amber">Orange (Warning)</p>
                <p className="text-sm text-gray-400">Be prepared. Possible flooding and significant disruption.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="mt-1">{levelConfig.RED.emoji}</div>
              <div>
                <p className="font-semibold text-brand-red">Red (Emergency)</p>
                <p className="text-sm text-gray-400">Take action immediately. Severe flooding and life-threatening conditions.</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
