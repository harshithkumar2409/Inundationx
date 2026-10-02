'use client';

import React, { useState } from 'react';
import { Upload, AlertTriangle, ShieldCheck, MapPin, Clock } from 'lucide-react';
import Link from 'next/link';

const mockReports = [
  {
    id: 1,
    name: 'Rahul Sharma',
    address: 'Anna Nagar, Chennai',
    floodSeverity: 'Knee Level',
    waterLevel: 0.5,
    description: 'Water has entered the ground floor. Power is out.',
    timeAgo: '2 hours ago',
    verified: true,
  },
  {
    id: 2,
    name: 'Priya Patel',
    address: 'Andheri East, Mumbai',
    floodSeverity: 'Ankle Level',
    waterLevel: 0.2,
    description: 'Roads are waterlogged, traffic is moving slowly.',
    timeAgo: '4 hours ago',
    verified: false,
  },
  {
    id: 3,
    name: 'Amit Kumar',
    address: 'Kankarbagh, Patna',
    floodSeverity: 'Waist Level',
    waterLevel: 1.0,
    description: 'Severe waterlogging. Need rescue boats.',
    timeAgo: '5 hours ago',
    verified: true,
  }
];

export default function CitizenPortalPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    districtId: '1',
    floodSeverity: 'Ankle Level',
    waterLevel: '',
    description: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/reports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        alert('Report submitted successfully!');
        setFormData({
          name: '',
          phone: '',
          address: '',
          districtId: '1',
          floodSeverity: 'Ankle Level',
          waterLevel: '',
          description: '',
        });
      } else {
        alert('Failed to submit report.');
      }
    } catch (err) {
      console.error(err);
      alert('Error submitting report.');
    }
  };

  const getSeverityColor = (severity: string) => {
    switch(severity) {
      case 'Ankle Level': return 'text-brand-cyan bg-brand-cyan/10';
      case 'Knee Level': return 'text-brand-amber bg-brand-amber/10';
      case 'Waist Level': return 'text-orange-500 bg-orange-500/10';
      case 'Chest Level': return 'text-brand-red bg-brand-red/10';
      case 'Above Head': return 'text-purple-500 bg-purple-500/10';
      default: return 'text-gray-400 bg-gray-400/10';
    }
  };

  return (
    <div className="min-h-screen bg-dark-900 text-slate-200 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-white tracking-tight">Citizen Portal</h1>
          <p className="text-slate-400 text-lg">Report flooding, share information, help your community</p>
        </div>

        {/* Main Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Left Column - Report Form */}
          <div className="bg-dark-800 border border-dark-700 rounded-2xl p-6 shadow-xl">
            <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-2">
              <AlertTriangle className="text-brand-amber" />
              Submit a Report
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-sm text-slate-400">Name</label>
                  <input required name="name" value={formData.name} onChange={handleChange} type="text" className="w-full bg-dark-700 border border-dark-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-brand-blue" />
                </div>
                <div className="space-y-1">
                  <label className="text-sm text-slate-400">Phone</label>
                  <input required name="phone" value={formData.phone} onChange={handleChange} type="tel" className="w-full bg-dark-700 border border-dark-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-brand-blue" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-sm text-slate-400">Location / Address</label>
                <input required name="address" value={formData.address} onChange={handleChange} type="text" className="w-full bg-dark-700 border border-dark-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-brand-blue" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-sm text-slate-400">District</label>
                  <select name="districtId" value={formData.districtId} onChange={handleChange} className="w-full bg-dark-700 border border-dark-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-brand-blue">
                    <option value="1">Chennai</option>
                    <option value="2">Mumbai</option>
                    <option value="3">Patna</option>
                    <option value="4">Kolkata</option>
                    <option value="5">Kochi</option>
                    <option value="6">Wayanad</option>
                    <option value="7">Silchar</option>
                    <option value="8">Gorakhpur</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-sm text-slate-400">Flood Severity</label>
                  <select name="floodSeverity" value={formData.floodSeverity} onChange={handleChange} className="w-full bg-dark-700 border border-dark-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-brand-blue">
                    <option>Ankle Level</option>
                    <option>Knee Level</option>
                    <option>Waist Level</option>
                    <option>Chest Level</option>
                    <option>Above Head</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-sm text-slate-400">Water Level (meters)</label>
                <input name="waterLevel" value={formData.waterLevel} onChange={handleChange} type="number" step="0.1" className="w-full bg-dark-700 border border-dark-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-brand-blue" />
              </div>

              <div className="space-y-1">
                <label className="text-sm text-slate-400">Description</label>
                <textarea name="description" value={formData.description} onChange={handleChange} rows={3} className="w-full bg-dark-700 border border-dark-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-brand-blue"></textarea>
              </div>

              <div className="space-y-1">
                <label className="text-sm text-slate-400">Image Upload</label>
                <div className="border-2 border-dashed border-dark-600 rounded-lg p-6 flex flex-col items-center justify-center text-slate-400 hover:bg-dark-700/50 transition cursor-pointer">
                  <Upload className="w-8 h-8 mb-2 text-slate-500" />
                  <span className="text-sm">Click to upload or drag and drop</span>
                </div>
              </div>

              <button type="submit" className="w-full bg-brand-blue hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors">
                Submit Report
              </button>
            </form>
          </div>

          {/* Right Column - Recent Reports */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-white mb-6">Recent Reports</h2>
            <div className="space-y-4">
              {mockReports.map(report => (
                <div key={report.id} className="bg-dark-800 border border-dark-700 rounded-xl p-5 hover:border-dark-600 transition">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold text-white flex items-center gap-2">
                        {report.name}
                        {report.verified && <ShieldCheck className="w-4 h-4 text-brand-green" />}
                      </h3>
                      <div className="flex items-center gap-1 text-sm text-slate-400 mt-1">
                        <MapPin className="w-3 h-3" />
                        {report.address}
                      </div>
                    </div>
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${getSeverityColor(report.floodSeverity)}`}>
                      {report.floodSeverity}
                    </span>
                  </div>
                  
                  <p className="text-slate-300 text-sm mb-4">
                    {report.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {report.timeAgo}
                    </span>
                    {report.waterLevel && (
                      <span>Water level: {report.waterLevel}m</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* SOS Button */}
        <div className="pt-8 text-center">
          <Link href="/sos">
            <button className="bg-brand-red hover:bg-red-600 text-white font-bold py-6 px-16 rounded-full text-2xl shadow-[0_0_30px_rgba(239,68,68,0.5)] animate-pulse hover:animate-none transition-all duration-300">
              EMERGENCY SOS
            </button>
          </Link>
        </div>

      </div>
    </div>
  );
}
