"use client";

import React, { useState } from 'react';
import { AlertTriangle, Phone, MapPin, Users, Info, ShieldAlert, CheckCircle2, Truck, Clock, X, AlertCircle } from 'lucide-react';

const MOCK_REQUESTS = [
  { id: 'SOS-001', name: 'Rahul Sharma', location: 'Velachery, Chennai', severity: 'Critical', status: 'Rescue In Progress', team: 'NDRF-Alpha', people: 4, time: '10 mins ago' },
  { id: 'SOS-002', name: 'Priya Patel', location: 'Andheri East, Mumbai', severity: 'High', status: 'Team Assigned', team: 'SDRF-Mh-02', people: 2, time: '25 mins ago' },
  { id: 'SOS-003', name: 'Amit Kumar', location: 'Kankarbagh, Patna', severity: 'Medium', status: 'SOS Received', team: 'Pending', people: 1, time: '2 mins ago' },
  { id: 'SOS-004', name: 'Anita Das', location: 'Salt Lake, Kolkata', severity: 'Low', status: 'Completed', team: 'Local Rescue', people: 3, time: '2 hours ago' },
  { id: 'SOS-005', name: 'Suresh Menon', location: 'Aluva, Kochi', severity: 'Critical', status: 'SOS Received', team: 'Pending', people: 8, time: 'Just now' },
  { id: 'SOS-006', name: 'Meena Iyer', location: 'Kalpetta, Wayanad', severity: 'High', status: 'Rescue In Progress', team: 'Army Unit-7', people: 5, time: '45 mins ago' },
  { id: 'SOS-007', name: 'Ravi Singh', location: 'Sonai Road, Silchar', severity: 'Medium', status: 'Team Assigned', team: 'SDRF-Assam', people: 2, time: '1 hour ago' },
];

const STATUS_STEPS = ['SOS Received', 'Team Assigned', 'Rescue In Progress', 'Completed'];

const DISTRICTS = [
  { id: 1, name: 'Chennai' },
  { id: 2, name: 'Mumbai' },
  { id: 3, name: 'Patna' },
  { id: 4, name: 'Kolkata' },
  { id: 5, name: 'Kochi' },
  { id: 6, name: 'Wayanad' },
  { id: 7, name: 'Silchar' },
  { id: 8, name: 'Gorakhpur' },
  { id: 9, name: 'Darbhanga' }
];

export default function SOSPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    districtId: '',
    peopleCount: '1',
    address: '',
    severity: 'High',
    notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/sos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        setIsModalOpen(false);
        alert('SOS Request Submitted Successfully! Help is on the way.');
        setFormData({
          name: '', phone: '', districtId: '', peopleCount: '1', address: '', severity: 'High', notes: ''
        });
      } else {
        alert('Failed to submit SOS request. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting SOS:', error);
      alert('Network error. Please try again or call emergency numbers.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch(severity) {
      case 'Critical': return 'text-brand-red bg-brand-red/10 border-brand-red/20';
      case 'High': return 'text-orange-500 bg-orange-500/10 border-orange-500/20';
      case 'Medium': return 'text-brand-amber bg-brand-amber/10 border-brand-amber/20';
      case 'Low': return 'text-brand-cyan bg-brand-cyan/10 border-brand-cyan/20';
      default: return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
    }
  };

  return (
    <div className="min-h-screen bg-dark-900 p-6">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header & Emergency Button */}
        <div className="text-center space-y-8 flex flex-col items-center justify-center pt-8">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-white flex items-center justify-center gap-3">
              <ShieldAlert className="w-10 h-10 text-brand-red" />
              Emergency Response Center
            </h1>
            <p className="text-gray-400 text-lg">Immediate assistance for flood-related emergencies.</p>
          </div>

          <div className="relative group cursor-pointer" onClick={() => setIsModalOpen(true)}>
            {/* Pulsing rings */}
            <div className="absolute inset-0 bg-brand-red/20 rounded-full animate-ping [animation-duration:2s]" />
            <div className="absolute inset-2 bg-brand-red/30 rounded-full animate-ping [animation-duration:3s]" />
            <div className="absolute inset-4 bg-brand-red/40 rounded-full animate-ping [animation-duration:2.5s]" />
            
            {/* Main Button */}
            <div className="relative w-48 h-48 bg-gradient-to-b from-red-500 to-red-700 rounded-full flex flex-col items-center justify-center shadow-[0_0_50px_rgba(239,68,68,0.5)] border-4 border-red-400 group-hover:scale-105 transition-transform duration-300">
              <span className="text-5xl font-black text-white tracking-widest">SOS</span>
            </div>
          </div>
          
          <div className="text-brand-red font-bold animate-pulse text-xl">
            PRESS FOR EMERGENCY RESCUE
          </div>
        </div>

        {/* SOS Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <div className="bg-dark-800 border border-brand-red/30 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl shadow-brand-red/20">
              <div className="bg-gradient-to-r from-red-600 to-red-800 p-4 flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <AlertTriangle className="w-6 h-6" />
                  Emergency Relief Request
                </h2>
                <button onClick={() => setIsModalOpen(false)} className="text-white/80 hover:text-white bg-black/20 hover:bg-black/40 rounded-full p-2 transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Full Name *</label>
                    <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-dark-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red transition-all" placeholder="Enter your name" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Phone Number *</label>
                    <input required type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full bg-dark-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red transition-all" placeholder="Enter phone number" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">District *</label>
                    <select required value={formData.districtId} onChange={e => setFormData({...formData, districtId: e.target.value})} className="w-full bg-dark-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red transition-all">
                      <option value="">Select District</option>
                      {DISTRICTS.map(d => (
                        <option key={d.id} value={d.id}>{d.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Number of People *</label>
                    <input required type="number" min="1" value={formData.peopleCount} onChange={e => setFormData({...formData, peopleCount: e.target.value})} className="w-full bg-dark-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red transition-all" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Precise Location / Address *</label>
                  <textarea required rows={2} value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} className="w-full bg-dark-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red transition-all" placeholder="Landmarks, floor number, street name..." />
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-medium text-gray-300">Severity Level *</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {['Low', 'Medium', 'High', 'Critical'].map((level) => (
                      <label key={level} className={`flex items-center justify-center p-3 rounded-lg cursor-pointer border transition-all ${formData.severity === level ? (level === 'Critical' ? 'bg-red-500/20 border-red-500 text-red-500' : level === 'High' ? 'bg-orange-500/20 border-orange-500 text-orange-500' : level === 'Medium' ? 'bg-yellow-500/20 border-yellow-500 text-yellow-500' : 'bg-cyan-500/20 border-cyan-500 text-cyan-500') : 'bg-dark-900 border-gray-700 text-gray-400 hover:border-gray-500'}`}>
                        <input type="radio" name="severity" value={level} checked={formData.severity === level} onChange={e => setFormData({...formData, severity: e.target.value})} className="sr-only" />
                        <span className="font-semibold">{level}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Additional Needs (Medical, Food, Boat etc.)</label>
                  <textarea rows={2} value={formData.notes} onChange={e => setFormData({...formData, notes: e.target.value})} className="w-full bg-dark-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red transition-all" placeholder="Any specific requirements..." />
                </div>

                <button type="submit" disabled={isSubmitting} className="w-full bg-brand-red hover:bg-red-600 text-white font-bold text-lg py-4 rounded-xl transition-all shadow-lg shadow-brand-red/30 flex justify-center items-center gap-2">
                  {isSubmitting ? (
                    <span className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></span>
                  ) : (
                    <>
                      <AlertCircle className="w-6 h-6" />
                      SUBMIT SOS REQUEST
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        )}

        <hr className="border-dark-700 my-8" />

        {/* Active Requests Tracker */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Activity className="w-6 h-6 text-brand-blue" />
              Live Rescue Status
            </h2>
            <div className="flex gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <span className="w-3 h-3 rounded-full bg-brand-red animate-pulse"></span>
                Live Updates
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {MOCK_REQUESTS.map((req) => (
              <div key={req.id} className="bg-dark-800 rounded-xl border border-dark-700 p-5 hover:border-dark-500 transition-colors flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-white">{req.name}</h3>
                      <p className="text-sm text-gray-400 flex items-center gap-1 mt-1">
                        <MapPin className="w-4 h-4" /> {req.location}
                      </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getSeverityColor(req.severity)}`}>
                      {req.severity}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                    <div className="bg-dark-900 rounded-lg p-3">
                      <p className="text-gray-500 mb-1 flex items-center gap-1"><Users className="w-4 h-4"/> People</p>
                      <p className="text-white font-medium">{req.people} persons</p>
                    </div>
                    <div className="bg-dark-900 rounded-lg p-3">
                      <p className="text-gray-500 mb-1 flex items-center gap-1"><Truck className="w-4 h-4"/> Unit</p>
                      <p className="text-white font-medium truncate">{req.team}</p>
                    </div>
                  </div>
                </div>

                {/* Status Stepper */}
                <div className="mt-auto">
                  <div className="flex justify-between mb-2">
                    <span className="text-xs font-medium text-brand-blue">{req.status}</span>
                    <span className="text-xs text-gray-500 flex items-center gap-1"><Clock className="w-3 h-3"/> {req.time}</span>
                  </div>
                  <div className="relative">
                    <div className="absolute top-1/2 left-0 w-full h-1 bg-dark-700 -translate-y-1/2 rounded-full"></div>
                    <div className="relative flex justify-between">
                      {STATUS_STEPS.map((step, idx) => {
                        const currentStepIdx = STATUS_STEPS.indexOf(req.status);
                        const isCompleted = idx <= currentStepIdx;
                        const isCurrent = idx === currentStepIdx;
                        
                        return (
                          <div key={step} className="flex flex-col items-center group relative">
                            <div className={`w-3 h-3 rounded-full z-10 transition-colors ${isCompleted ? 'bg-brand-blue shadow-[0_0_10px_rgba(37,99,235,0.5)]' : 'bg-dark-700'}`}>
                              {isCurrent && <div className="absolute inset-0 bg-brand-blue rounded-full animate-ping opacity-75"></div>}
                            </div>
                            {/* Tooltip */}
                            <div className="absolute bottom-full mb-2 hidden group-hover:block whitespace-nowrap bg-dark-900 text-xs text-gray-300 px-2 py-1 rounded border border-dark-700">
                              {step}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Just missing an icon in imports, fixing locally here
function Activity(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  );
}
