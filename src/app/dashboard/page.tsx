"use client";

import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, PieChart, Pie, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, Legend 
} from 'recharts';
import { 
  AlertTriangle, Users, Tent, ShieldAlert, HeartPulse, Activity, Bell, Map, AlertCircle, Droplets, ArrowUpRight
} from 'lucide-react';

const mockDistricts = [
  { id: 1, district: "Silchar", state: "Assam", rainfall: 145, riverLevel: "Danger", zone: "Zone A", risk: "Critical" },
  { id: 2, district: "Darbhanga", state: "Bihar", rainfall: 110, riverLevel: "Danger", zone: "Zone B", risk: "Critical" },
  { id: 3, district: "Cuddalore", state: "Tamil Nadu", rainfall: 90, riverLevel: "Warning", zone: "Coastal", risk: "High" },
  { id: 4, district: "Gorakhpur", state: "Uttar Pradesh", rainfall: 85, riverLevel: "Warning", zone: "Zone C", risk: "High" },
  { id: 5, district: "Kozhikode", state: "Kerala", rainfall: 120, riverLevel: "Danger", zone: "Zone A", risk: "Critical" },
  { id: 6, district: "Surat", state: "Gujarat", rainfall: 40, riverLevel: "Normal", zone: "Zone D", risk: "Moderate" },
  { id: 7, district: "Ernakulam", state: "Kerala", rainfall: 95, riverLevel: "Warning", zone: "Zone B", risk: "High" },
  { id: 8, district: "Muzaffarpur", state: "Bihar", rainfall: 130, riverLevel: "Danger", zone: "Zone A", risk: "Critical" },
  { id: 9, district: "Thiruvananthapuram", state: "Kerala", rainfall: 50, riverLevel: "Normal", zone: "Zone E", risk: "Low" },
  { id: 10, district: "Nagaon", state: "Assam", rainfall: 105, riverLevel: "Warning", zone: "Zone C", risk: "High" },
  { id: 11, district: "Patna", state: "Bihar", rainfall: 75, riverLevel: "Warning", zone: "Zone B", risk: "Moderate" },
  { id: 12, district: "Chennai", state: "Tamil Nadu", rainfall: 30, riverLevel: "Normal", zone: "Coastal", risk: "Low" },
  { id: 13, district: "Cuttack", state: "Odisha", rainfall: 115, riverLevel: "Danger", zone: "Zone A", risk: "Critical" },
  { id: 14, district: "Guwahati", state: "Assam", rainfall: 88, riverLevel: "Warning", zone: "Zone C", risk: "High" },
  { id: 15, district: "Mumbai", state: "Maharashtra", rainfall: 150, riverLevel: "Danger", zone: "Coastal", risk: "Critical" },
];

const mockResources = [
  { type: "NDRF Teams", total: 45, deployed: 32, status: "DEPLOYED" },
  { type: "SDRF Teams", total: 80, deployed: 65, status: "DEPLOYED" },
  { type: "Boats", total: 250, deployed: 180, available: 50, maintenance: 20, status: "AVAILABLE" },
  { type: "Ambulances", total: 150, deployed: 120, status: "DEPLOYED" },
  { type: "Helicopters", total: 15, deployed: 12, status: "MAINTENANCE" },
  { type: "Medical Teams", total: 60, deployed: 45, status: "DEPLOYED" },
  { type: "Relief Camps", total: 100, deployed: 75, status: "AVAILABLE" },
  { type: "Food Packets (k)", total: 500, deployed: 200, status: "AVAILABLE" },
  { type: "Water Tanks", total: 300, deployed: 250, status: "DEPLOYED" },
  { type: "Generators", total: 200, deployed: 180, status: "MAINTENANCE" },
];

const populationAffected = [
  { name: 'Silchar', affected: 120000 },
  { name: 'Darbhanga', affected: 95000 },
  { name: 'Mumbai', affected: 85000 },
  { name: 'Kozhikode', affected: 70000 },
  { name: 'Cuttack', affected: 65000 },
  { name: 'Muzaffarpur', affected: 60000 },
  { name: 'Ernakulam', affected: 45000 },
  { name: 'Nagaon', affected: 40000 },
];

const alertLevels = [
  { name: 'Critical', value: 6, color: '#EF4444' },
  { name: 'High', value: 5, color: '#F59E0B' },
  { name: 'Moderate', value: 2, color: '#06B6D4' },
  { name: 'Low', value: 2, color: '#22C55E' },
];

const economicLoss = [
  { year: '2018', loss: 8500 },
  { year: '2019', loss: 10200 },
  { year: '2020', loss: 7800 },
  { year: '2021', loss: 11500 },
  { year: '2022', loss: 9200 },
  { year: '2023', loss: 13800 },
  { year: '2024', loss: 12450 },
];

const recommendations = [
  { title: "Deploy 2 additional NDRF teams to Silchar", reason: "Critical flooding expected", type: "urgent" },
  { title: "Open 3 more relief camps in Darbhanga district", reason: "Current capacity at 95%", type: "action" },
  { title: "Issue RED alert for Cuddalore", reason: "Cyclonic storm approaching within 24h", type: "alert" },
  { title: "Pre-position boats in Gorakhpur", reason: "Rapti river rising above danger mark", type: "warning" },
];

export default function GovernmentDashboard() {
  const [filter, setFilter] = useState("All");
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(prev => (prev + 1) % 60);
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const filteredDistricts = filter === "All" 
    ? mockDistricts 
    : mockDistricts.filter(d => d.risk === filter);

  return (
    <div className="min-h-screen bg-dark-900 text-slate-200 p-6 font-sans">
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 border-b border-dark-700 pb-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-1 flex items-center gap-2">
            <Map className="text-brand-blue" />
            Government Command Center
          </h1>
          <p className="text-slate-400 text-sm font-medium tracking-wide">
            NDMA · SDMA · NDRF · District Administration
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex items-center gap-3 bg-dark-800 px-4 py-2 rounded-lg border border-dark-700">
          <Activity className="text-brand-green w-5 h-5 animate-pulse" />
          <span className="text-sm font-medium">Last Updated: {currentTime === 0 ? 'Just now' : `${currentTime} mins ago`}</span>
        </div>
      </header>

      {/* Top Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        <StatCard icon={<AlertTriangle />} title="Districts Under Alert" value="12" color="text-brand-amber" bg="bg-brand-amber/10" />
        <StatCard icon={<ShieldAlert />} title="Active SOS" value="7" color="text-brand-red" bg="bg-brand-red/10" />
        <StatCard icon={<Users />} title="People Evacuated" value="4,520" color="text-brand-blue" bg="bg-brand-blue/10" />
        <StatCard icon={<Tent />} title="Shelters Active" value="10" color="text-brand-green" bg="bg-brand-green/10" />
        <StatCard icon={<HeartPulse />} title="Rescue Teams" value="8" color="text-brand-cyan" bg="bg-brand-cyan/10" />
        <StatCard icon={<Activity />} title="Economic Loss Est" value="₹12.4K Cr" color="text-brand-red" bg="bg-brand-red/10" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* District Monitoring (Left) */}
        <div className="lg:col-span-2 bg-dark-800 rounded-xl border border-dark-700 p-5 flex flex-col h-[500px]">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Map className="w-5 h-5 text-brand-blue" />
              District Monitoring
            </h2>
            <select 
              className="bg-dark-900 border border-dark-700 text-sm rounded-md px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-brand-blue"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="All">All Risk Levels</option>
              <option value="Critical">Critical</option>
              <option value="High">High</option>
              <option value="Moderate">Moderate</option>
              <option value="Low">Low</option>
            </select>
          </div>
          
          <div className="overflow-auto flex-1 pr-2 custom-scrollbar">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-400 uppercase bg-dark-900 sticky top-0">
                <tr>
                  <th className="px-4 py-3 rounded-tl-lg">District</th>
                  <th className="px-4 py-3">State</th>
                  <th className="px-4 py-3 text-right">Rainfall (mm)</th>
                  <th className="px-4 py-3">River Level</th>
                  <th className="px-4 py-3">Flood Zone</th>
                  <th className="px-4 py-3 rounded-tr-lg">Risk Level</th>
                </tr>
              </thead>
              <tbody>
                {filteredDistricts.map((d, i) => (
                  <tr key={d.id} className={`border-b border-dark-700 hover:bg-dark-700/50 transition-colors ${i % 2 === 0 ? 'bg-dark-800' : 'bg-dark-900/30'}`}>
                    <td className="px-4 py-3 font-medium text-white">{d.district}</td>
                    <td className="px-4 py-3">{d.state}</td>
                    <td className="px-4 py-3 text-right font-mono">{d.rainfall}</td>
                    <td className={`px-4 py-3 font-medium ${d.riverLevel === 'Danger' ? 'text-brand-red' : d.riverLevel === 'Warning' ? 'text-brand-amber' : 'text-brand-green'}`}>
                      {d.riverLevel}
                    </td>
                    <td className="px-4 py-3 text-slate-300">{d.zone}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold
                        ${d.risk === 'Critical' ? 'bg-brand-red/20 text-brand-red border border-brand-red/30' : 
                          d.risk === 'High' ? 'bg-brand-amber/20 text-brand-amber border border-brand-amber/30' : 
                          d.risk === 'Moderate' ? 'bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/30' : 
                          'bg-brand-green/20 text-brand-green border border-brand-green/30'}`}>
                        {d.risk}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Resource Tracking (Right) */}
        <div className="bg-dark-800 rounded-xl border border-dark-700 p-5 flex flex-col h-[500px]">
          <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-4">
            <HeartPulse className="w-5 h-5 text-brand-cyan" />
            Resource Tracking
          </h2>
          <div className="overflow-y-auto pr-2 space-y-3 custom-scrollbar">
            {mockResources.map((res, idx) => (
              <div key={idx} className="bg-dark-900 rounded-lg p-3 border border-dark-700 hover:border-dark-700/80 transition-colors">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-slate-200">{res.type}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium tracking-wide
                    ${res.status === 'DEPLOYED' ? 'bg-brand-amber/10 text-brand-amber border border-brand-amber/20' : 
                      res.status === 'AVAILABLE' ? 'bg-brand-green/10 text-brand-green border border-brand-green/20' : 
                      'bg-slate-700 text-slate-300 border border-slate-600'}`}>
                    {res.status}
                  </span>
                </div>
                <div className="flex items-end justify-between text-sm">
                  <div className="text-slate-400">Total: <span className="text-white font-medium">{res.total}</span></div>
                  <div className="flex gap-4">
                    <div className="text-slate-400">Deployed: <span className="text-brand-amber font-medium">{res.deployed}</span></div>
                    {res.available !== undefined && <div className="text-slate-400">Avail: <span className="text-brand-green font-medium">{res.available}</span></div>}
                  </div>
                </div>
                {/* Progress bar */}
                <div className="w-full bg-dark-700 h-1.5 mt-3 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${res.status === 'MAINTENANCE' ? 'bg-slate-500' : 'bg-brand-blue'}`} 
                    style={{ width: `${(res.deployed / res.total) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Analytics Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-dark-800 rounded-xl border border-dark-700 p-5 h-[350px]">
          <h3 className="text-lg font-bold text-white mb-4">Population Affected (Top 8)</h3>
          <ResponsiveContainer width="100%" height="85%">
            <BarChart data={populationAffected} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
              <XAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: 12 }} angle={-45} textAnchor="end" height={60} interval={0} stroke="#475569" />
              <YAxis tick={{ fill: '#94a3b8', fontSize: 12 }} stroke="#475569" tickFormatter={(val) => `${val/1000}k`} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1E293B', borderColor: '#334155', color: '#f8fafc' }}
                itemStyle={{ color: '#60A5FA' }}
              />
              <Bar dataKey="affected" fill="#2563EB" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-dark-800 rounded-xl border border-dark-700 p-5 h-[350px]">
          <h3 className="text-lg font-bold text-white mb-4">Alert Level Distribution</h3>
          <ResponsiveContainer width="100%" height="85%">
            <PieChart>
              <Pie
                data={alertLevels}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={5}
                dataKey="value"
                stroke="none"
              >
                {alertLevels.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: '#1E293B', borderColor: '#334155', color: '#f8fafc' }} />
              <Legend verticalAlign="bottom" height={36} wrapperStyle={{ fontSize: '12px', color: '#94a3b8' }}/>
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-dark-800 rounded-xl border border-dark-700 p-5 h-[350px]">
          <h3 className="text-lg font-bold text-white mb-4">Economic Loss Trend (Cr)</h3>
          <ResponsiveContainer width="100%" height="85%">
            <LineChart data={economicLoss} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
              <XAxis dataKey="year" tick={{ fill: '#94a3b8', fontSize: 12 }} stroke="#475569" />
              <YAxis tick={{ fill: '#94a3b8', fontSize: 12 }} stroke="#475569" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1E293B', borderColor: '#334155', color: '#f8fafc' }}
                itemStyle={{ color: '#EF4444' }}
              />
              <Line type="monotone" dataKey="loss" stroke="#EF4444" strokeWidth={3} dot={{ r: 4, fill: '#1E293B', stroke: '#EF4444', strokeWidth: 2 }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Decision Support Panel */}
      <div className="bg-dark-800 rounded-xl border border-dark-700 p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Bell className="w-5 h-5 text-brand-amber" />
            AI Decision Support Recommendations
          </h2>
          <span className="bg-brand-blue/20 text-brand-blue px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-brand-blue/30">
            Auto-Generated
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {recommendations.map((rec, i) => (
            <div key={i} className="bg-dark-900 rounded-lg p-4 border border-dark-700 hover:border-brand-blue/50 transition-colors group cursor-default">
              <div className="flex items-start justify-between mb-2">
                {rec.type === 'urgent' && <AlertCircle className="w-5 h-5 text-brand-red flex-shrink-0" />}
                {rec.type === 'action' && <Users className="w-5 h-5 text-brand-green flex-shrink-0" />}
                {rec.type === 'alert' && <AlertTriangle className="w-5 h-5 text-brand-amber flex-shrink-0" />}
                {rec.type === 'warning' && <Droplets className="w-5 h-5 text-brand-cyan flex-shrink-0" />}
                <ArrowUpRight className="w-4 h-4 text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <h4 className="font-semibold text-slate-200 text-sm leading-snug mb-1">{rec.title}</h4>
              <p className="text-xs text-slate-400">{rec.reason}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, title, value, color, bg }: { icon: React.ReactNode, title: string, value: string, color: string, bg: string }) {
  return (
    <div className="bg-dark-800 rounded-xl border border-dark-700 p-4 flex items-center gap-4 hover:bg-dark-700/30 transition-colors">
      <div className={`p-3 rounded-lg ${bg} ${color}`}>
        {icon}
      </div>
      <div>
        <p className="text-slate-400 text-xs font-medium uppercase tracking-wider mb-1">{title}</p>
        <p className={`text-2xl font-bold ${color}`}>{value}</p>
      </div>
    </div>
  );
}
