"use client";

import React, { useState } from 'react';
import { 
  BarChart, Bar, LineChart, Line, PieChart, Pie, AreaChart, Area, 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, Legend 
} from 'recharts';
import { Activity, Droplets, Banknote, Users } from 'lucide-react';

const MOCK_YEARLY_DATA = [
  { year: '2015', events: 1, rainfall: 450, loss: 1200 },
  { year: '2016', events: 1, rainfall: 380, loss: 800 },
  { year: '2017', events: 1, rainfall: 410, loss: 1500 },
  { year: '2018', events: 3, rainfall: 850, loss: 31000 },
  { year: '2019', events: 2, rainfall: 620, loss: 15000 },
  { year: '2020', events: 2, rainfall: 590, loss: 12000 },
  { year: '2021', events: 1, rainfall: 480, loss: 8000 },
  { year: '2022', events: 1, rainfall: 520, loss: 9500 },
  { year: '2023', events: 1, rainfall: 490, loss: 7500 },
  { year: '2024', events: 1, rainfall: 560, loss: 11000 },
];

const SEVERITY_DATA = [
  { name: 'MINOR', value: 4, color: '#06B6D4' },
  { name: 'MODERATE', value: 5, color: '#F59E0B' },
  { name: 'MAJOR', value: 3, color: '#EF4444' },
  { name: 'CATASTROPHIC', value: 2, color: '#991B1B' },
];

const DISTRICT_DATA = [
  { district: 'Ernakulam', events: 8 },
  { district: 'Idukki', events: 7 },
  { district: 'Pathanamthitta', events: 6 },
  { district: 'Alappuzha', events: 6 },
  { district: 'Wayanad', events: 5 },
  { district: 'Thrissur', events: 4 },
];

const POPULATION_IMPACT = [
  { district: 'Ernakulam', affected: 1200000 },
  { district: 'Alappuzha', affected: 850000 },
  { district: 'Thrissur', affected: 750000 },
  { district: 'Pathanamthitta', affected: 600000 },
  { district: 'Idukki', affected: 450000 },
];

const YEARS = ['All', '2018', '2019', '2020', '2021', '2022', '2023', '2024'];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-dark-800 border border-dark-700 p-3 rounded-lg shadow-xl">
        <p className="text-white font-semibold mb-1">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} style={{ color: entry.color }} className="text-sm">
            {entry.name}: {entry.value.toLocaleString()}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function AnalyticsPage() {
  const [selectedYear, setSelectedYear] = useState('All');

  return (
    <div className="min-h-screen bg-dark-900 text-slate-200 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header & Filter */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-2">
              <Activity className="text-brand-blue" />
              Analytics & Insights
            </h1>
            <p className="text-slate-400">Historical flood data analysis and trend visualization</p>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-400">Time Range:</span>
            <select 
              className="bg-dark-800 border border-dark-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-brand-blue"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
            >
              {YEARS.map(y => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-dark-800 p-4 rounded-xl border border-dark-700 flex items-center gap-4">
            <div className="p-3 bg-blue-900/30 rounded-lg text-brand-blue">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <p className="text-slate-400 text-sm font-medium">Total Events</p>
              <p className="text-2xl font-bold text-white">14</p>
            </div>
          </div>
          <div className="bg-dark-800 p-4 rounded-xl border border-dark-700 flex items-center gap-4">
            <div className="p-3 bg-red-900/30 rounded-lg text-brand-red">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <p className="text-slate-400 text-sm font-medium">Pop. Affected</p>
              <p className="text-2xl font-bold text-white">4.8M</p>
            </div>
          </div>
          <div className="bg-dark-800 p-4 rounded-xl border border-dark-700 flex items-center gap-4">
            <div className="p-3 bg-amber-900/30 rounded-lg text-brand-amber">
              <Banknote className="w-6 h-6" />
            </div>
            <div>
              <p className="text-slate-400 text-sm font-medium">Economic Loss</p>
              <p className="text-xl font-bold text-white">₹97,500 Cr</p>
            </div>
          </div>
          <div className="bg-dark-800 p-4 rounded-xl border border-dark-700 flex items-center gap-4">
            <div className="p-3 bg-cyan-900/30 rounded-lg text-brand-cyan">
              <Droplets className="w-6 h-6" />
            </div>
            <div>
              <p className="text-slate-400 text-sm font-medium">Avg Duration</p>
              <p className="text-2xl font-bold text-white">8 days</p>
            </div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Rainfall Trend */}
          <div className="bg-dark-800 p-6 rounded-xl border border-dark-700">
            <h3 className="text-lg font-semibold text-white mb-6">Average Rainfall Trend (mm)</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={MOCK_YEARLY_DATA}>
                  <defs>
                    <linearGradient id="colorRain" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#06B6D4" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                  <XAxis dataKey="year" stroke="#94a3b8" tick={{fill: '#94a3b8'}} />
                  <YAxis stroke="#94a3b8" tick={{fill: '#94a3b8'}} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="rainfall" name="Rainfall (mm)" stroke="#06B6D4" fillOpacity={1} fill="url(#colorRain)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Economic Loss Trend */}
          <div className="bg-dark-800 p-6 rounded-xl border border-dark-700">
            <h3 className="text-lg font-semibold text-white mb-6">Economic Loss (₹ Crores)</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={MOCK_YEARLY_DATA}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                  <XAxis dataKey="year" stroke="#94a3b8" tick={{fill: '#94a3b8'}} />
                  <YAxis stroke="#94a3b8" tick={{fill: '#94a3b8'}} />
                  <Tooltip content={<CustomTooltip />} />
                  <Line type="monotone" dataKey="loss" name="Loss (Cr)" stroke="#EF4444" strokeWidth={3} dot={{r: 4, fill: '#EF4444'}} activeDot={{r: 6}} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Flood Frequency */}
          <div className="bg-dark-800 p-6 rounded-xl border border-dark-700">
            <h3 className="text-lg font-semibold text-white mb-6">Flood Frequency by Year</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={MOCK_YEARLY_DATA}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                  <XAxis dataKey="year" stroke="#94a3b8" tick={{fill: '#94a3b8'}} />
                  <YAxis stroke="#94a3b8" tick={{fill: '#94a3b8'}} allowDecimals={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="events" name="Events" fill="#2563EB" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Severity Distribution */}
          <div className="bg-dark-800 p-6 rounded-xl border border-dark-700">
            <h3 className="text-lg font-semibold text-white mb-6">Event Severity Distribution</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={SEVERITY_DATA}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {SEVERITY_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend verticalAlign="bottom" height={36} iconType="circle" />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* District Comparison */}
          <div className="bg-dark-800 p-6 rounded-xl border border-dark-700">
            <h3 className="text-lg font-semibold text-white mb-6">Most Affected Districts (Events)</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={DISTRICT_DATA} layout="vertical" margin={{ left: 40 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" horizontal={true} vertical={false} />
                  <XAxis type="number" stroke="#94a3b8" tick={{fill: '#94a3b8'}} />
                  <YAxis dataKey="district" type="category" stroke="#94a3b8" tick={{fill: '#94a3b8'}} width={80} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="events" name="Events" fill="#F59E0B" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Population Impact */}
          <div className="bg-dark-800 p-6 rounded-xl border border-dark-700">
            <h3 className="text-lg font-semibold text-white mb-6">Population Impact by District</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={POPULATION_IMPACT}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                  <XAxis dataKey="district" stroke="#94a3b8" tick={{fill: '#94a3b8'}} />
                  <YAxis stroke="#94a3b8" tick={{fill: '#94a3b8'}} 
                    tickFormatter={(value) => `${(value / 100000).toFixed(1)}L`} 
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="affected" name="People Affected" fill="#22C55E" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
