"use client";

import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
  PieChart, Pie, Legend
} from 'recharts';
import { 
  Activity, AlertTriangle, Droplets, MapPin, 
  BrainCircuit, Radar, Database, Network, Search, Filter,
  TrendingUp, Clock
} from 'lucide-react';

// Mock Data (Sorted by probability descending)
const predictions = [
  { id: 1, district: 'Pathanamthitta', state: 'Kerala', rainfall: 245, probability: 92, depth: 3.4, risk: 'SEVERE', model: 'Ensemble', confidence: 96 },
  { id: 2, district: 'Alappuzha', state: 'Kerala', rainfall: 210, probability: 88, depth: 2.8, risk: 'SEVERE', model: 'Ensemble', confidence: 95 },
  { id: 3, district: 'Navsari', state: 'Gujarat', rainfall: 195, probability: 85, depth: 2.5, risk: 'SEVERE', model: 'LSTM', confidence: 92 },
  { id: 4, district: 'Cachar', state: 'Assam', rainfall: 180, probability: 82, depth: 2.2, risk: 'SEVERE', model: 'Ensemble', confidence: 94 },
  { id: 5, district: 'Majuli', state: 'Assam', rainfall: 175, probability: 78, depth: 1.9, risk: 'HIGH', model: 'XGBoost', confidence: 91 },
  { id: 6, district: 'Ernakulam', state: 'Kerala', rainfall: 160, probability: 75, depth: 1.7, risk: 'HIGH', model: 'Ensemble', confidence: 93 },
  { id: 7, district: 'Kamrup', state: 'Assam', rainfall: 155, probability: 72, depth: 1.5, risk: 'HIGH', model: 'LSTM', confidence: 90 },
  { id: 8, district: 'Patna', state: 'Bihar', rainfall: 150, probability: 68, depth: 1.4, risk: 'HIGH', model: 'Ensemble', confidence: 92 },
  { id: 9, district: 'Kolhapur', state: 'Maharashtra', rainfall: 145, probability: 65, depth: 1.2, risk: 'HIGH', model: 'XGBoost', confidence: 89 },
  { id: 10, district: 'Surat', state: 'Gujarat', rainfall: 140, probability: 62, depth: 1.1, risk: 'HIGH', model: 'LSTM', confidence: 88 },
  { id: 11, district: 'Chennai', state: 'Tamil Nadu', rainfall: 120, probability: 55, depth: 0.9, risk: 'MODERATE', model: 'Ensemble', confidence: 91 },
  { id: 12, district: 'Dhubri', state: 'Assam', rainfall: 110, probability: 48, depth: 0.7, risk: 'MODERATE', model: 'XGBoost', confidence: 87 },
  { id: 13, district: 'Sangli', state: 'Maharashtra', rainfall: 105, probability: 45, depth: 0.6, risk: 'MODERATE', model: 'LSTM', confidence: 86 },
  { id: 14, district: 'Udupi', state: 'Karnataka', rainfall: 95, probability: 40, depth: 0.5, risk: 'MODERATE', model: 'Ensemble', confidence: 90 },
  { id: 15, district: 'Thrissur', state: 'Kerala', rainfall: 60, probability: 25, depth: 0.2, risk: 'LOW', model: 'LSTM', confidence: 92 },
];

const riskStyles: Record<string, string> = {
  SEVERE: 'text-brand-red bg-[#EF4444]/10 border-[#EF4444]/20',
  HIGH: 'text-brand-amber bg-[#F59E0B]/10 border-[#F59E0B]/20',
  MODERATE: 'text-brand-cyan bg-[#06B6D4]/10 border-[#06B6D4]/20',
  LOW: 'text-brand-green bg-[#22C55E]/10 border-[#22C55E]/20',
};

const riskColors: Record<string, string> = {
  SEVERE: '#EF4444',
  HIGH: '#F59E0B',
  MODERATE: '#06B6D4',
  LOW: '#22C55E',
};

// Compute Risk Distribution
const riskDistribution = Object.entries(
  predictions.reduce((acc, curr) => {
    acc[curr.risk] = (acc[curr.risk] || 0) + 1;
    return acc;
  }, {} as Record<string, number>)
).map(([name, value]) => ({ name, value }));

export default function PredictionDashboard() {
  const [timeline, setTimeline] = useState('24H');
  const timelines = ['6H', '12H', '24H', '48H', '72H'];

  return (
    <div className="min-h-screen bg-dark-900 text-slate-200 p-6 font-sans">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <BrainCircuit className="text-brand-blue h-8 w-8" />
            AI Prediction Dashboard
          </h1>
          <p className="text-slate-400 mt-2 flex items-center gap-2">
            <Network className="h-4 w-4" />
            Real-time flood predictions powered by LSTM, XGBoost & Ensemble models
          </p>
        </div>
        
        {/* Forecast Timeline Selector */}
        <div className="flex items-center bg-dark-800 rounded-lg p-1 border border-dark-700 shadow-lg">
          {timelines.map((t) => (
            <button
              key={t}
              onClick={() => setTimeline(t)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                timeline === t
                  ? 'bg-brand-blue text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-dark-700'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-dark-800 rounded-xl p-6 border border-dark-700 shadow-lg relative overflow-hidden group hover:border-brand-blue/50 transition-colors">
          <div className="absolute -right-4 -top-4 bg-brand-red/10 p-6 rounded-full group-hover:scale-110 transition-transform">
            <AlertTriangle className="h-8 w-8 text-brand-red opacity-80" />
          </div>
          <p className="text-slate-400 text-sm font-medium mb-1">Districts at Risk (Severe/High)</p>
          <p className="text-3xl font-bold text-white">10</p>
          <p className="text-xs text-brand-red mt-2 flex items-center gap-1">
            <TrendingUp className="h-3 w-3" /> +2 since last update
          </p>
        </div>
        <div className="bg-dark-800 rounded-xl p-6 border border-dark-700 shadow-lg relative overflow-hidden group hover:border-brand-blue/50 transition-colors">
          <div className="absolute -right-4 -top-4 bg-brand-amber/10 p-6 rounded-full group-hover:scale-110 transition-transform">
            <Activity className="h-8 w-8 text-brand-amber opacity-80" />
          </div>
          <p className="text-slate-400 text-sm font-medium mb-1">Avg Flood Probability</p>
          <p className="text-3xl font-bold text-white">65.2%</p>
          <p className="text-xs text-brand-amber mt-2 flex items-center gap-1">
            <TrendingUp className="h-3 w-3" /> Elevated across coastal regions
          </p>
        </div>
        <div className="bg-dark-800 rounded-xl p-6 border border-dark-700 shadow-lg relative overflow-hidden group hover:border-brand-blue/50 transition-colors">
          <div className="absolute -right-4 -top-4 bg-brand-cyan/10 p-6 rounded-full group-hover:scale-110 transition-transform">
            <Droplets className="h-8 w-8 text-brand-cyan opacity-80" />
          </div>
          <p className="text-slate-400 text-sm font-medium mb-1">Max Predicted Depth</p>
          <p className="text-3xl font-bold text-white">3.4m</p>
          <p className="text-xs text-slate-400 mt-2 flex items-center gap-1">
            <MapPin className="h-3 w-3" /> Pathanamthitta, Kerala
          </p>
        </div>
        <div className="bg-dark-800 rounded-xl p-6 border border-dark-700 shadow-lg relative overflow-hidden group hover:border-brand-blue/50 transition-colors">
          <div className="absolute -right-4 -top-4 bg-brand-green/10 p-6 rounded-full group-hover:scale-110 transition-transform">
            <Radar className="h-8 w-8 text-brand-green opacity-80" />
          </div>
          <p className="text-slate-400 text-sm font-medium mb-1">Model Confidence</p>
          <p className="text-3xl font-bold text-white">91.8%</p>
          <p className="text-xs text-brand-green mt-2 flex items-center gap-1">
            Ensemble optimal
          </p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Bar Chart */}
        <div className="lg:col-span-2 bg-dark-800 rounded-xl p-6 border border-dark-700 shadow-lg">
          <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-brand-blue" />
            Top 8 Districts - Predicted Inundation Depth (m)
          </h2>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={predictions.slice(0, 8)} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey="district" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1E293B', borderColor: '#334155', color: '#f8fafc', borderRadius: '8px' }}
                  itemStyle={{ color: '#06B6D4' }}
                  cursor={{ fill: '#334155', opacity: 0.4 }}
                />
                <Bar dataKey="depth" radius={[4, 4, 0, 0]}>
                  {predictions.slice(0, 8).map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={riskColors[entry.risk]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="bg-dark-800 rounded-xl p-6 border border-dark-700 shadow-lg">
          <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
            <Activity className="h-5 w-5 text-brand-blue" />
            Risk Level Distribution
          </h2>
          <div className="h-[300px] w-full flex justify-center items-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={riskDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {riskDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={riskColors[entry.name]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1E293B', borderColor: '#334155', color: '#f8fafc', borderRadius: '8px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Legend verticalAlign="bottom" height={36} iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Model Performance Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-dark-800 rounded-lg p-4 border border-dark-700 shadow-sm flex flex-col justify-center items-center text-center">
          <p className="text-slate-400 text-xs mb-1 uppercase tracking-wider">LSTM Accuracy</p>
          <p className="text-xl font-bold text-brand-green">94.2%</p>
        </div>
        <div className="bg-dark-800 rounded-lg p-4 border border-dark-700 shadow-sm flex flex-col justify-center items-center text-center">
          <p className="text-slate-400 text-xs mb-1 uppercase tracking-wider">XGBoost Accuracy</p>
          <p className="text-xl font-bold text-brand-green">91.8%</p>
        </div>
        <div className="bg-dark-800 rounded-lg p-4 border border-dark-700 shadow-sm flex flex-col justify-center items-center text-center">
          <p className="text-slate-400 text-xs mb-1 uppercase tracking-wider">Ensemble Accuracy</p>
          <p className="text-xl font-bold text-brand-green">96.1%</p>
        </div>
        <div className="bg-dark-800 rounded-lg p-4 border border-dark-700 shadow-sm flex flex-col justify-center items-center text-center">
          <Database className="h-5 w-5 text-brand-blue mb-1" />
          <p className="text-slate-300 text-xs font-medium">IMD • ISRO • CWC • NCEP</p>
        </div>
      </div>

      {/* Predictions Table */}
      <div className="bg-dark-800 rounded-xl border border-dark-700 shadow-lg overflow-hidden">
        <div className="p-6 border-b border-dark-700 flex justify-between items-center bg-dark-800">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <Filter className="h-5 w-5 text-brand-blue" />
            Detailed District Predictions
          </h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search districts..." 
              className="bg-dark-900 border border-dark-700 text-sm rounded-lg pl-9 pr-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-brand-blue transition-colors w-64"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-dark-900/50 text-slate-400 text-xs uppercase tracking-wider">
                <th className="p-4 font-semibold">District</th>
                <th className="p-4 font-semibold">State</th>
                <th className="p-4 font-semibold">Rainfall (mm)</th>
                <th className="p-4 font-semibold">Probability</th>
                <th className="p-4 font-semibold">Depth (m)</th>
                <th className="p-4 font-semibold">Risk Level</th>
                <th className="p-4 font-semibold">Model</th>
                <th className="p-4 font-semibold">Confidence</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-700 text-sm">
              {predictions.map((item) => (
                <tr key={item.id} className="hover:bg-dark-700/30 transition-colors">
                  <td className="p-4 font-medium text-white">{item.district}</td>
                  <td className="p-4 text-slate-300">{item.state}</td>
                  <td className="p-4 text-slate-300">{item.rainfall} mm</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <span className="w-8">{item.probability}%</span>
                      <div className="h-2 w-16 bg-dark-700 rounded-full overflow-hidden">
                        <div 
                          className="h-full rounded-full" 
                          style={{ width: `${item.probability}%`, backgroundColor: riskColors[item.risk] }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="p-4 font-mono text-slate-300">{item.depth.toFixed(2)}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-md text-xs font-semibold border ${riskStyles[item.risk]}`}>
                      {item.risk}
                    </span>
                  </td>
                  <td className="p-4 text-slate-300">
                    <span className="flex items-center gap-1.5 bg-dark-700/50 px-2 py-1 rounded text-xs">
                      <BrainCircuit className="h-3 w-3" /> {item.model}
                    </span>
                  </td>
                  <td className="p-4 text-slate-300">{item.confidence}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
    </div>
  );
}
