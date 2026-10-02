'use client';

import React from 'react';
import Link from 'next/link';
import { 
  AlertTriangle, 
  CloudRain, 
  Map, 
  Clock, 
  ArrowRight, 
  Activity, 
  Users, 
  ShieldAlert, 
  Phone,
  Radio,
  MapPin,
  Siren,
  Shield,
  LayoutDashboard
} from 'lucide-react';

export default function HomePage() {
  const tickerAlerts = [
    "🚨 ORANGE ALERT: Heavy rainfall expected in Mumbai over the next 24 hours.",
    "⚠️ WARNING: Water levels rising in Mithi River.",
    "📢 EVACUATION: Low-lying areas in Kurla advised to move to safe shelters.",
    "🚨 ALERT: NDRF teams deployed in coastal districts."
  ];

  const quickStats = [
    { label: "Active Alerts", value: "12", icon: Siren, color: "text-brand-amber" },
    { label: "Districts Monitored", value: "15", icon: MapPin, color: "text-brand-blue" },
    { label: "Shelters Active", value: "10", icon: Shield, color: "text-brand-green" },
    { label: "People Evacuated", value: "4,520", icon: Users, color: "text-brand-cyan" },
    { label: "SOS Requests", value: "7", icon: Phone, color: "text-brand-red" },
    { label: "Rescue Teams Deployed", value: "8", icon: Activity, color: "text-brand-amber" }
  ];

  const features = [
    { title: "AI Rainfall Prediction", description: "Advanced machine learning models predicting localized rainfall intensity with 90% accuracy.", icon: CloudRain },
    { title: "Flood Inundation Mapping", description: "Dynamic visualization of potential flood zones based on terrain and drainage data.", icon: Map },
    { title: "Real-time Alert System", description: "Automated multi-channel alerts (SMS, App, Web) based on risk thresholds.", icon: Radio },
    { title: "Citizen Reporting", description: "Crowdsourced water logging reports with geocoded image verification.", icon: Users },
    { title: "Emergency SOS", description: "One-tap emergency assistance routing to the nearest available rescue teams.", icon: Siren },
    { title: "Government Dashboard", description: "Comprehensive analytical dashboard for administrative decision-making and resource allocation.", icon: LayoutDashboard }
  ];

  const emergencyContacts = [
    { name: "NDRF Control Room", number: "9711077372" },
    { name: "Police", number: "100" },
    { name: "Ambulance", number: "108" },
    { name: "State Disaster Management", number: "1070" }
  ];

  return (
    <div className="min-h-screen bg-dark-900 text-slate-200">
      {/* Live Alerts Ticker */}
      <div className="bg-brand-red/10 border-b border-brand-red/20 py-2 overflow-hidden flex items-center relative">
        <div className="px-4 font-bold text-brand-red whitespace-nowrap z-10 bg-dark-900 flex items-center gap-2">
          <AlertTriangle size={18} /> LIVE ALERTS:
        </div>
        <div className="flex animate-marquee whitespace-nowrap overflow-hidden">
          {tickerAlerts.map((alert, idx) => (
            <span key={idx} className="mx-8 text-slate-300 font-medium">
              {alert}
            </span>
          ))}
          {/* Duplicate for infinite effect */}
          {tickerAlerts.map((alert, idx) => (
            <span key={'dup-'+idx} className="mx-8 text-slate-300 font-medium">
              {alert}
            </span>
          ))}
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col gap-16">
        
        {/* Hero Section */}
        <section className="text-center space-y-8 mt-8">
          <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue via-brand-cyan to-brand-green">
              InundationX
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-400 max-w-4xl mx-auto font-medium">
            AI-Powered Heavy Rainfall Early Warning & Flood Inundation Prediction System
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto mt-12">
            <div className="bg-dark-800/50 backdrop-blur-sm p-6 rounded-2xl border border-dark-700/50 hover:border-brand-amber/50 transition-all duration-300">
              <div className="text-slate-400 text-sm font-semibold uppercase tracking-wider mb-2 flex items-center justify-center gap-2">
                <AlertTriangle size={16} className="text-brand-amber" /> Status
              </div>
              <div className="text-xl font-bold text-brand-amber">ORANGE ALERT</div>
            </div>
            <div className="bg-dark-800/50 backdrop-blur-sm p-6 rounded-2xl border border-dark-700/50 hover:border-brand-blue/50 transition-all duration-300">
              <div className="text-slate-400 text-sm font-semibold uppercase tracking-wider mb-2 flex items-center justify-center gap-2">
                <CloudRain size={16} className="text-brand-blue" /> Expected Rainfall
              </div>
              <div className="text-2xl font-bold text-slate-100">145 mm</div>
            </div>
            <div className="bg-dark-800/50 backdrop-blur-sm p-6 rounded-2xl border border-dark-700/50 hover:border-brand-red/50 transition-all duration-300">
              <div className="text-slate-400 text-sm font-semibold uppercase tracking-wider mb-2 flex items-center justify-center gap-2">
                <MapPin size={16} className="text-brand-red" /> High-Risk Districts
              </div>
              <div className="text-2xl font-bold text-slate-100">12</div>
            </div>
            <div className="bg-dark-800/50 backdrop-blur-sm p-6 rounded-2xl border border-dark-700/50 hover:border-brand-green/50 transition-all duration-300">
              <div className="text-slate-400 text-sm font-semibold uppercase tracking-wider mb-2 flex items-center justify-center gap-2">
                <Clock size={16} className="text-brand-green" /> Lead Time
              </div>
              <div className="text-2xl font-bold text-slate-100">24 Hours</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            <Link href="/map" className="inline-flex items-center gap-2 px-8 py-4 bg-brand-blue hover:bg-brand-blue/90 text-white rounded-full font-bold transition-all duration-300 shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)]">
              <Map size={20} /> View Live Map
            </Link>
            <Link href="/alerts" className="inline-flex items-center gap-2 px-8 py-4 bg-dark-800 hover:bg-dark-700 text-slate-200 border border-dark-700 rounded-full font-bold transition-all duration-300">
              <ShieldAlert size={20} /> Check Alerts
            </Link>
          </div>
        </section>

        {/* Quick Stats Grid */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-slate-100">Quick Overview</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {quickStats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div key={idx} className="bg-dark-800 p-5 rounded-xl border border-dark-700 flex flex-col items-center text-center hover:-translate-y-1 transition-transform duration-300 shadow-sm">
                  <div className={`p-3 rounded-full bg-dark-900 mb-3 ${stat.color}`}>
                    <Icon size={24} />
                  </div>
                  <div className="text-2xl font-bold text-slate-100">{stat.value}</div>
                  <div className="text-xs text-slate-400 font-medium uppercase mt-1">{stat.label}</div>
                </div>
              )
            })}
          </div>
        </section>

        {/* Feature Highlights */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-slate-100">Platform Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div key={idx} className="group bg-dark-800/80 p-8 rounded-2xl border border-dark-700 hover:bg-dark-700/50 hover:border-dark-600 transition-all duration-300 shadow-md">
                  <div className="text-brand-blue mb-6 group-hover:scale-110 group-hover:text-brand-cyan transition-all duration-300">
                    <Icon size={40} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-100 mb-3">{feature.title}</h3>
                  <p className="text-slate-400 leading-relaxed">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </section>

        {/* Emergency Contacts */}
        <section className="bg-dark-800 border border-brand-red/20 rounded-2xl p-8 mb-12 shadow-md">
          <div className="flex items-center gap-3 mb-6">
            <Phone className="text-brand-red" size={28} />
            <h2 className="text-2xl font-bold text-slate-100">Emergency Contacts</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {emergencyContacts.map((contact, idx) => (
              <div key={idx} className="bg-dark-900 p-4 rounded-xl border border-dark-700 flex flex-col items-center text-center">
                <span className="text-slate-400 font-medium mb-1">{contact.name}</span>
                <span className="text-xl font-bold text-brand-red">{contact.number}</span>
              </div>
            ))}
          </div>
        </section>
        
        {/* Pitch Banner */}
        <div className="text-center pb-12">
          <p className="text-slate-500 italic max-w-3xl mx-auto">
            "InundationX is an AI-powered integrated heavy rainfall early warning and flood inundation prediction platform designed to empower local authorities and save lives."
          </p>
        </div>

      </main>

      {/* Inline styles for marquee animation */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
      `}} />
    </div>
  );
}
