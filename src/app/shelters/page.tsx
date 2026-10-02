"use client";

import React, { useState, useMemo } from 'react';
import { Search, MapPin, Users, Phone, Tent, ShieldAlert, CheckCircle2 } from 'lucide-react';

const MOCK_SHELTERS = [
  {
    id: '1',
    name: 'Government Higher Secondary School, Aluva',
    type: 'SCHOOL',
    district: 'Ernakulam',
    state: 'Kerala',
    address: 'Aluva, Ernakulam, Kerala',
    capacity: 1000,
    currentOccupancy: 850,
    contactName: 'Ravi Kumar',
    contactPhone: '+91 9876543210',
    facilities: ['FOOD', 'WATER', 'MEDICAL', 'ELECTRICITY']
  },
  {
    id: '2',
    name: 'Kottayam Community Hall',
    type: 'COMMUNITY_HALL',
    district: 'Kottayam',
    state: 'Kerala',
    address: 'Main Road, Kottayam',
    capacity: 500,
    currentOccupancy: 480,
    contactName: 'Lakshmi Nair',
    contactPhone: '+91 9876543211',
    facilities: ['FOOD', 'WATER', 'ELECTRICITY']
  },
  {
    id: '3',
    name: 'Jawaharlal Nehru Stadium Relief Camp',
    type: 'STADIUM',
    district: 'Ernakulam',
    state: 'Kerala',
    address: 'Kaloor, Kochi',
    capacity: 2000,
    currentOccupancy: 1500,
    contactName: 'Rajesh Sharma',
    contactPhone: '+91 9876543212',
    facilities: ['FOOD', 'WATER', 'MEDICAL', 'ELECTRICITY']
  },
  {
    id: '4',
    name: "St. Mary's College Relief Camp",
    type: 'RELIEF_CAMP',
    district: 'Thrissur',
    state: 'Kerala',
    address: 'Thrissur City',
    capacity: 800,
    currentOccupancy: 600,
    contactName: 'George Thomas',
    contactPhone: '+91 9876543213',
    facilities: ['FOOD', 'WATER', 'MEDICAL']
  },
  {
    id: '5',
    name: 'Wayanad Central School',
    type: 'SCHOOL',
    district: 'Wayanad',
    state: 'Kerala',
    address: 'Kalpetta, Wayanad',
    capacity: 400,
    currentOccupancy: 150,
    contactName: 'Ali Hassan',
    contactPhone: '+91 9876543214',
    facilities: ['FOOD', 'WATER']
  },
  {
    id: '6',
    name: 'Pathanamthitta Town Hall',
    type: 'COMMUNITY_HALL',
    district: 'Pathanamthitta',
    state: 'Kerala',
    address: 'Town Center, Pathanamthitta',
    capacity: 400,
    currentOccupancy: 390,
    contactName: 'Anjali Menon',
    contactPhone: '+91 9876543215',
    facilities: ['FOOD', 'WATER', 'ELECTRICITY']
  },
  {
    id: '7',
    name: 'Idukki District Sports Complex',
    type: 'STADIUM',
    district: 'Idukki',
    state: 'Kerala',
    address: 'Thodupuzha, Idukki',
    capacity: 500,
    currentOccupancy: 200,
    contactName: 'Suresh Babu',
    contactPhone: '+91 9876543216',
    facilities: ['FOOD', 'WATER', 'MEDICAL', 'ELECTRICITY']
  },
  {
    id: '8',
    name: 'Munnar Relief Center',
    type: 'RELIEF_CAMP',
    district: 'Idukki',
    state: 'Kerala',
    address: 'Munnar, Idukki',
    capacity: 350,
    currentOccupancy: 316,
    contactName: 'John Varghese',
    contactPhone: '+91 9876543217',
    facilities: ['FOOD', 'WATER', 'MEDICAL']
  },
  {
    id: '9',
    name: 'Palakkad Govt School',
    type: 'SCHOOL',
    district: 'Palakkad',
    state: 'Kerala',
    address: 'Palakkad City',
    capacity: 400,
    currentOccupancy: 100,
    contactName: 'Manoj Kumar',
    contactPhone: '+91 9876543218',
    facilities: ['FOOD', 'WATER', 'ELECTRICITY']
  },
  {
    id: '10',
    name: 'Alappuzha Marine Hall',
    type: 'COMMUNITY_HALL',
    district: 'Alappuzha',
    state: 'Kerala',
    address: 'Beach Road, Alappuzha',
    capacity: 300,
    currentOccupancy: 230,
    contactName: 'Preethi S',
    contactPhone: '+91 9876543219',
    facilities: ['FOOD', 'WATER', 'MEDICAL', 'ELECTRICITY']
  }
];

const SHELTER_TYPES = ['ALL', 'RELIEF_CAMP', 'SCHOOL', 'COMMUNITY_HALL', 'STADIUM'];

export default function SheltersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('ALL');
  const [selectedType, setSelectedType] = useState('ALL');

  const districts = ['ALL', ...Array.from(new Set(MOCK_SHELTERS.map(s => s.district))).sort()];

  const filteredShelters = useMemo(() => {
    return MOCK_SHELTERS.filter(shelter => {
      const matchesSearch = shelter.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            shelter.address.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDistrict = selectedDistrict === 'ALL' || shelter.district === selectedDistrict;
      const matchesType = selectedType === 'ALL' || shelter.type === selectedType;
      
      return matchesSearch && matchesDistrict && matchesType;
    });
  }, [searchQuery, selectedDistrict, selectedType]);

  const totalCapacity = MOCK_SHELTERS.reduce((acc, curr) => acc + curr.capacity, 0);
  const totalOccupancy = MOCK_SHELTERS.reduce((acc, curr) => acc + curr.currentOccupancy, 0);
  const availableSpots = totalCapacity - totalOccupancy;

  const getTypeColor = (type: string) => {
    switch(type) {
      case 'SCHOOL': return 'bg-blue-900/50 text-brand-blue border-brand-blue/30';
      case 'COMMUNITY_HALL': return 'bg-cyan-900/50 text-brand-cyan border-brand-cyan/30';
      case 'STADIUM': return 'bg-purple-900/50 text-purple-400 border-purple-500/30';
      case 'RELIEF_CAMP': return 'bg-emerald-900/50 text-emerald-400 border-emerald-500/30';
      default: return 'bg-gray-800 text-gray-300 border-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-dark-900 text-slate-200 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-2">
            <Tent className="text-brand-blue" />
            Shelter & Relief Camp Finder
          </h1>
          <p className="text-slate-400">Find and manage emergency shelters across affected regions.</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-dark-800 p-4 rounded-xl border border-dark-700">
            <p className="text-slate-400 text-sm font-medium mb-1">Total Shelters</p>
            <p className="text-2xl font-bold text-white">{MOCK_SHELTERS.length}</p>
          </div>
          <div className="bg-dark-800 p-4 rounded-xl border border-dark-700">
            <p className="text-slate-400 text-sm font-medium mb-1">Total Capacity</p>
            <p className="text-2xl font-bold text-white">{totalCapacity.toLocaleString()}</p>
          </div>
          <div className="bg-dark-800 p-4 rounded-xl border border-dark-700">
            <p className="text-slate-400 text-sm font-medium mb-1">Current Occupancy</p>
            <p className="text-2xl font-bold text-brand-amber">{totalOccupancy.toLocaleString()}</p>
          </div>
          <div className="bg-dark-800 p-4 rounded-xl border border-dark-700">
            <p className="text-slate-400 text-sm font-medium mb-1">Available Spots</p>
            <p className="text-2xl font-bold text-brand-green">{availableSpots.toLocaleString()}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-dark-800 p-4 rounded-xl border border-dark-700 flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input 
              type="text"
              placeholder="Search by name or address..."
              className="w-full bg-dark-900 border border-dark-700 rounded-lg pl-10 pr-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:border-brand-blue transition-colors"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <select 
            className="bg-dark-900 border border-dark-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-brand-blue"
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
          >
            {districts.map(d => (
              <option key={d} value={d}>{d === 'ALL' ? 'All Districts' : d}</option>
            ))}
          </select>
          <select 
            className="bg-dark-900 border border-dark-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-brand-blue"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            {SHELTER_TYPES.map(t => (
              <option key={t} value={t}>{t === 'ALL' ? 'All Types' : t.replace('_', ' ')}</option>
            ))}
          </select>
        </div>

        {/* Shelter Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredShelters.map(shelter => {
            const occupancyRate = (shelter.currentOccupancy / shelter.capacity) * 100;
            const isFull = occupancyRate >= 90;

            return (
              <div key={shelter.id} className="bg-dark-800 rounded-xl border border-dark-700 overflow-hidden hover:border-dark-700/80 hover:shadow-lg transition-all flex flex-col">
                <div className="p-5 flex-1">
                  <div className="flex justify-between items-start mb-4">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${getTypeColor(shelter.type)}`}>
                      {shelter.type.replace('_', ' ')}
                    </span>
                    <span className={`flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${isFull ? 'bg-red-900/30 text-brand-red border border-red-500/30' : 'bg-green-900/30 text-brand-green border border-green-500/30'}`}>
                      {isFull ? <ShieldAlert className="w-3 h-3" /> : <CheckCircle2 className="w-3 h-3" />}
                      {isFull ? 'FULL' : 'ACTIVE'}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-bold text-white mb-2 line-clamp-2">{shelter.name}</h3>
                  
                  <div className="space-y-2 mb-4">
                    <p className="flex items-start gap-2 text-sm text-slate-400">
                      <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-brand-blue" />
                      <span>{shelter.address}<br/>{shelter.district}, {shelter.state}</span>
                    </p>
                    <p className="flex items-center gap-2 text-sm text-slate-400">
                      <Phone className="w-4 h-4 shrink-0 text-brand-blue" />
                      <span>{shelter.contactName} ({shelter.contactPhone})</span>
                    </p>
                  </div>

                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-400 flex items-center gap-1">
                        <Users className="w-4 h-4" /> Capacity
                      </span>
                      <span className="font-medium text-white">{shelter.currentOccupancy} / {shelter.capacity}</span>
                    </div>
                    <div className="w-full bg-dark-900 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${isFull ? 'bg-brand-red' : 'bg-brand-blue'}`}
                        style={{ width: `${Math.min(occupancyRate, 100)}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-auto">
                    {shelter.facilities.map(fac => (
                      <span key={fac} className="text-[10px] uppercase font-bold tracking-wider px-2 py-1 bg-dark-900 text-slate-400 rounded border border-dark-700">
                        {fac}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {filteredShelters.length === 0 && (
          <div className="text-center py-12 text-slate-400 bg-dark-800 rounded-xl border border-dark-700">
            No shelters found matching your criteria.
          </div>
        )}
      </div>
    </div>
  );
}
