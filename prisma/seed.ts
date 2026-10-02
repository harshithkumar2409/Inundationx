import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌊 Seeding InundationX database...\n');

  // ─── Districts ──────────────────────────────────────────────
  console.log('📍 Creating districts...');
  const districts = await Promise.all([
    prisma.district.create({ data: { name: 'Chennai', state: 'Tamil Nadu', latitude: 13.0827, longitude: 80.2707, population: 7090000, area: 426, riskLevel: 'SEVERE' } }),
    prisma.district.create({ data: { name: 'Mumbai', state: 'Maharashtra', latitude: 19.0760, longitude: 72.8777, population: 12440000, area: 603, riskLevel: 'HIGH' } }),
    prisma.district.create({ data: { name: 'Patna', state: 'Bihar', latitude: 25.6093, longitude: 85.1376, population: 2050000, area: 3202, riskLevel: 'HIGH' } }),
    prisma.district.create({ data: { name: 'Kolkata', state: 'West Bengal', latitude: 22.5726, longitude: 88.3639, population: 4490000, area: 205, riskLevel: 'MODERATE' } }),
    prisma.district.create({ data: { name: 'Kochi', state: 'Kerala', latitude: 9.9312, longitude: 76.2673, population: 2120000, area: 440, riskLevel: 'SEVERE' } }),
    prisma.district.create({ data: { name: 'Wayanad', state: 'Kerala', latitude: 11.6854, longitude: 76.1320, population: 820000, area: 2131, riskLevel: 'HIGH' } }),
    prisma.district.create({ data: { name: 'Nagpur', state: 'Maharashtra', latitude: 21.1458, longitude: 79.0882, population: 2400000, area: 9892, riskLevel: 'MODERATE' } }),
    prisma.district.create({ data: { name: 'Silchar', state: 'Assam', latitude: 24.8333, longitude: 92.7789, population: 172000, area: 3786, riskLevel: 'SEVERE' } }),
    prisma.district.create({ data: { name: 'Gorakhpur', state: 'Uttar Pradesh', latitude: 26.7606, longitude: 83.3732, population: 670000, area: 3483, riskLevel: 'HIGH' } }),
    prisma.district.create({ data: { name: 'Bhubaneswar', state: 'Odisha', latitude: 20.2961, longitude: 85.8245, population: 840000, area: 422, riskLevel: 'MODERATE' } }),
    prisma.district.create({ data: { name: 'Hyderabad', state: 'Telangana', latitude: 17.3850, longitude: 78.4867, population: 6800000, area: 650, riskLevel: 'MODERATE' } }),
    prisma.district.create({ data: { name: 'Guwahati', state: 'Assam', latitude: 26.1445, longitude: 91.7362, population: 960000, area: 328, riskLevel: 'HIGH' } }),
    prisma.district.create({ data: { name: 'Cuddalore', state: 'Tamil Nadu', latitude: 11.7480, longitude: 79.7714, population: 770000, area: 3678, riskLevel: 'SEVERE' } }),
    prisma.district.create({ data: { name: 'Alappuzha', state: 'Kerala', latitude: 9.4981, longitude: 76.3388, population: 2120000, area: 1414, riskLevel: 'HIGH' } }),
    prisma.district.create({ data: { name: 'Darbhanga', state: 'Bihar', latitude: 26.1542, longitude: 85.8918, population: 390000, area: 2279, riskLevel: 'SEVERE' } }),
  ]);

  // ─── Rainfall Data ──────────────────────────────────────────
  console.log('🌧️  Creating rainfall data...');
  const sources = ['IMD', 'SATELLITE', 'RADAR', 'AWS'];
  const now = new Date();
  for (const district of districts) {
    for (let h = 0; h < 72; h += 3) {
      const ts = new Date(now.getTime() - h * 3600000);
      const baseRain = district.riskLevel === 'SEVERE' ? 45 : district.riskLevel === 'HIGH' ? 25 : 10;
      await prisma.rainfallData.create({
        data: {
          districtId: district.id,
          timestamp: ts,
          rainfall: Math.round((baseRain + Math.random() * 60) * 10) / 10,
          humidity: Math.round((65 + Math.random() * 30) * 10) / 10,
          windSpeed: Math.round((10 + Math.random() * 40) * 10) / 10,
          temperature: Math.round((22 + Math.random() * 10) * 10) / 10,
          pressure: Math.round((990 + Math.random() * 30) * 10) / 10,
          source: sources[Math.floor(Math.random() * sources.length)],
        },
      });
    }
  }

  // ─── AI Predictions ─────────────────────────────────────────
  console.log('🤖 Creating AI predictions...');
  const forecastHours = [6, 12, 24, 48, 72];
  const models = ['LSTM', 'XGBoost', 'Ensemble'];
  for (const district of districts) {
    for (const hours of forecastHours) {
      const baseRain = district.riskLevel === 'SEVERE' ? 120 : district.riskLevel === 'HIGH' ? 80 : 40;
      const floodProb = district.riskLevel === 'SEVERE' ? 75 + Math.random() * 25 : district.riskLevel === 'HIGH' ? 45 + Math.random() * 30 : 10 + Math.random() * 25;
      const depth = district.riskLevel === 'SEVERE' ? 1.5 + Math.random() * 2 : district.riskLevel === 'HIGH' ? 0.5 + Math.random() * 1.5 : Math.random() * 0.5;
      const risk = floodProb > 75 ? 'SEVERE' : floodProb > 50 ? 'HIGH' : floodProb > 25 ? 'MODERATE' : 'LOW';
      await prisma.prediction.create({
        data: {
          districtId: district.id,
          forecastHours: hours,
          predictedRainfall: Math.round((baseRain + Math.random() * 80 - hours * 0.5) * 10) / 10,
          floodProbability: Math.round(floodProb * 10) / 10,
          inundationDepth: Math.round(depth * 100) / 100,
          confidence: Math.round((70 + Math.random() * 25) * 10) / 10,
          modelUsed: models[Math.floor(Math.random() * models.length)],
          riskLevel: risk,
          timestamp: new Date(),
        },
      });
    }
  }

  // ─── Alerts ─────────────────────────────────────────────────
  console.log('🚨 Creating alerts...');
  const alertData = [
    { districtIdx: 0, level: 'RED', title: 'Extreme Rainfall Warning - Chennai', desc: 'IMD predicts extremely heavy rainfall (>204mm) in next 24 hours. Severe flooding expected in low-lying areas.', rain: 220, depth: 2.5, action: 'Evacuate low-lying areas immediately. Move to higher ground or nearest relief camp.' },
    { districtIdx: 1, level: 'ORANGE', title: 'Heavy Rainfall Alert - Mumbai', desc: 'Heavy to very heavy rainfall expected. Waterlogging likely in Andheri, Sion, Dadar areas.', rain: 145, depth: 1.2, action: 'Avoid unnecessary travel. Keep emergency supplies ready. Stay away from Mithi River bank.' },
    { districtIdx: 4, level: 'RED', title: 'Flood Warning - Kochi', desc: 'Dam shutters opened. Major flooding expected in Periyar river basin. Extremely dangerous situation.', rain: 180, depth: 3.1, action: 'Immediate evacuation required. NDRF teams deployed. Call 1078 for rescue.' },
    { districtIdx: 2, level: 'ORANGE', title: 'River Overflow Alert - Patna', desc: 'Ganga water level above danger mark at Gandhi Ghat. Flooding expected in Kankarbagh and Rajendra Nagar.', rain: 95, depth: 1.8, action: 'Move valuables to upper floors. Prepare for possible evacuation.' },
    { districtIdx: 7, level: 'RED', title: 'Flash Flood Warning - Silchar', desc: 'Barak river above HFL. Flash floods reported in multiple wards. Critical emergency.', rain: 250, depth: 3.5, action: 'Do not venture out. If stranded, call NDRF 011-24363260. SOS through InundationX.' },
    { districtIdx: 5, level: 'ORANGE', title: 'Landslide & Flood Alert - Wayanad', desc: 'Heavy rainfall and saturated soil increases landslide risk. Flash floods possible in valley areas.', rain: 160, depth: 1.5, action: 'Residents near hills must evacuate. Avoid roads near slopes and river crossings.' },
    { districtIdx: 3, level: 'YELLOW', title: 'Waterlogging Advisory - Kolkata', desc: 'Moderate rainfall expected. Waterlogging likely in Salt Lake, EM Bypass and Park Circus.', rain: 75, depth: 0.6, action: 'Carry rain gear. Avoid underpasses. Drive carefully through waterlogged roads.' },
    { districtIdx: 9, level: 'YELLOW', title: 'Rainfall Advisory - Bhubaneswar', desc: 'Moderate to heavy rainfall forecast. Mahanadi tributaries rising. Monitor updates.', rain: 85, depth: 0.4, action: 'Stay alert. Follow updates from OSDMA. Keep emergency kit ready.' },
    { districtIdx: 14, level: 'RED', title: 'Severe Flood Warning - Darbhanga', desc: 'Kamla-Balan river system flooding. Multiple villages inundated. Critical rescue operations underway.', rain: 190, depth: 2.8, action: 'Evacuate to nearest relief camp. Do not attempt to cross flooded roads. Call 112 for emergency.' },
    { districtIdx: 12, level: 'ORANGE', title: 'Storm Surge Alert - Cuddalore', desc: 'Cyclonic circulation over Bay of Bengal. Storm surge of 1-2m expected along coast.', rain: 170, depth: 1.8, action: 'Fishermen should not venture into sea. Coastal residents should move inland.' },
    { districtIdx: 10, level: 'YELLOW', title: 'Urban Flooding Advisory - Hyderabad', desc: 'Heavy rainfall expected in GHMC limits. Musi river rising. Waterlogging possible in Old City.', rain: 90, depth: 0.7, action: 'Avoid low-lying areas. Do not park vehicles near nalas. Keep drains clear.' },
    { districtIdx: 11, level: 'ORANGE', title: 'Flood Alert - Guwahati', desc: 'Brahmaputra river level rising rapidly. Low-lying areas of Paltan Bazar and Fancy Bazar at risk.', rain: 130, depth: 1.4, action: 'Prepare for possible evacuation. Move essential documents to safe location.' },
  ];

  for (const a of alertData) {
    await prisma.alert.create({
      data: {
        districtId: districts[a.districtIdx].id,
        level: a.level,
        title: a.title,
        description: a.desc,
        expectedRainfall: a.rain,
        predictedDepth: a.depth,
        action: a.action,
        isActive: true,
        issuedAt: new Date(now.getTime() - Math.random() * 12 * 3600000),
        expiresAt: new Date(now.getTime() + (24 + Math.random() * 24) * 3600000),
      },
    });
  }

  // ─── River Stations ─────────────────────────────────────────
  console.log('🏞️  Creating river stations...');
  const rivers = [
    { name: 'Gandhi Ghat', river: 'Ganga', distIdx: 2, lat: 25.6120, lng: 85.1560, current: 52.8, danger: 53.0, warning: 51.5, trend: 'RISING' },
    { name: 'Harding Bridge', river: 'Hooghly', distIdx: 3, lat: 22.5650, lng: 88.3450, current: 5.2, danger: 5.8, warning: 5.0, trend: 'STABLE' },
    { name: 'Aluva', river: 'Periyar', distIdx: 4, lat: 10.1004, lng: 76.3570, current: 8.5, danger: 8.0, warning: 7.0, trend: 'RISING' },
    { name: 'Panjim', river: 'Mithi', distIdx: 1, lat: 19.0300, lng: 72.8540, current: 3.2, danger: 4.0, warning: 3.5, trend: 'RISING' },
    { name: 'Badarpurghat', river: 'Barak', distIdx: 7, lat: 24.8690, lng: 92.5960, current: 22.5, danger: 21.0, warning: 20.0, trend: 'RISING' },
    { name: 'Hayaghat', river: 'Kamla-Balan', distIdx: 14, lat: 26.2100, lng: 85.9200, current: 55.2, danger: 54.5, warning: 53.0, trend: 'RISING' },
    { name: 'Uzanbazar', river: 'Brahmaputra', distIdx: 11, lat: 26.1890, lng: 91.7410, current: 48.3, danger: 49.0, warning: 47.5, trend: 'RISING' },
    { name: 'Naraj', river: 'Mahanadi', distIdx: 9, lat: 20.4680, lng: 85.8020, current: 25.6, danger: 27.7, warning: 26.0, trend: 'STABLE' },
  ];

  for (const r of rivers) {
    await prisma.riverStation.create({
      data: {
        name: r.name,
        riverName: r.river,
        districtId: districts[r.distIdx].id,
        latitude: r.lat,
        longitude: r.lng,
        currentLevel: r.current,
        dangerLevel: r.danger,
        warningLevel: r.warning,
        trend: r.trend,
        lastUpdated: new Date(),
      },
    });
  }

  // ─── SOS Requests ───────────────────────────────────────────
  console.log('🆘 Creating SOS requests...');
  const sosData = [
    { name: 'Rajesh Kumar', phone: '9876543210', distIdx: 0, lat: 13.0600, lng: 80.2500, addr: 'Adyar, Chennai', sev: 'CRITICAL', status: 'IN_PROGRESS', team: 'NDRF Team 4', count: 5, notes: 'Family of 5 stranded on rooftop. Water level 4ft.' },
    { name: 'Priya Nair', phone: '9845612378', distIdx: 4, lat: 9.9400, lng: 76.2600, addr: 'Mattancherry, Kochi', sev: 'HIGH', status: 'TEAM_ASSIGNED', team: 'SDRF Team 2', count: 3, notes: 'Elderly persons unable to move. Need boat rescue.' },
    { name: 'Mohammad Irfan', phone: '9912345678', distIdx: 7, lat: 24.8200, lng: 92.7900, addr: 'Tarapur Ward, Silchar', sev: 'CRITICAL', status: 'RECEIVED', team: null, count: 12, notes: '12 people including children trapped. Water rising fast.' },
    { name: 'Sunita Devi', phone: '9430567890', distIdx: 2, lat: 25.6200, lng: 85.1200, addr: 'Kankarbagh, Patna', sev: 'MEDIUM', status: 'COMPLETED', team: 'NDRF Team 7', count: 2, notes: 'Rescued successfully. Shifted to relief camp.' },
    { name: 'Amit Sharma', phone: '9876012345', distIdx: 1, lat: 19.0500, lng: 72.8400, addr: 'Sion, Mumbai', sev: 'HIGH', status: 'IN_PROGRESS', team: 'Fire Brigade Unit 3', count: 8, notes: 'Ground floor flooded. 8 residents on first floor.' },
    { name: 'Lakshmi Menon', phone: '9947123456', distIdx: 13, lat: 9.5200, lng: 76.3500, addr: 'Muhamma, Alappuzha', sev: 'CRITICAL', status: 'TEAM_ASSIGNED', team: 'Navy Team Delta', count: 20, notes: 'Entire colony underwater. 20+ people need airlift.' },
    { name: 'Ravi Prasad', phone: '9848567890', distIdx: 14, lat: 26.1700, lng: 85.9000, addr: 'Benipur, Darbhanga', sev: 'HIGH', status: 'IN_PROGRESS', team: 'SDRF Team 5', count: 15, notes: 'Village cutoff. Needs food and water supply drop.' },
  ];

  for (const s of sosData) {
    await prisma.sOSRequest.create({
      data: {
        name: s.name,
        phone: s.phone,
        districtId: districts[s.distIdx].id,
        latitude: s.lat,
        longitude: s.lng,
        address: s.addr,
        severity: s.sev,
        status: s.status,
        teamAssigned: s.team,
        peopleCount: s.count,
        notes: s.notes,
      },
    });
  }

  // ─── Citizen Reports ────────────────────────────────────────
  console.log('📝 Creating citizen reports...');
  const reportData = [
    { name: 'Karthik R', phone: '9841234567', distIdx: 0, lat: 13.0400, lng: 80.2300, addr: 'T. Nagar, Chennai', sev: 'WAIST', level: 0.9, desc: 'Main road completely flooded. Vehicles submerged. Need drainage.', verified: true },
    { name: 'Meera Iyer', phone: '9841098765', distIdx: 0, lat: 13.0700, lng: 80.2100, addr: 'Saidapet, Chennai', sev: 'CHEST', level: 1.4, desc: 'Water entering houses. Sewage mixing with flood water.', verified: true },
    { name: 'Rahul Verma', phone: '9871234560', distIdx: 1, lat: 19.0600, lng: 72.8600, addr: 'Kurla, Mumbai', sev: 'KNEE', level: 0.5, desc: 'Waterlogging on railway tracks. Local trains stopped.', verified: true },
    { name: 'Anupama Devi', phone: '9430123456', distIdx: 2, lat: 25.5900, lng: 85.1500, addr: 'Rajendra Nagar, Patna', sev: 'WAIST', level: 0.8, desc: 'Colony flooded. No electricity since 12 hours. Need help.', verified: false },
    { name: 'John Thomas', phone: '9947654321', distIdx: 4, lat: 9.9500, lng: 76.2800, addr: 'Fort Kochi', sev: 'ANKLE', level: 0.3, desc: 'Water receding slowly. Roads still slippery. Debris everywhere.', verified: true },
    { name: 'Biplab Das', phone: '9854321098', distIdx: 7, lat: 24.8400, lng: 92.7800, addr: 'Rangirkhari, Silchar', sev: 'ABOVE_HEAD', level: 2.5, desc: 'Complete submersion. Only rooftops visible. SOS sent separately.', verified: true },
  ];

  for (const r of reportData) {
    await prisma.citizenReport.create({
      data: {
        name: r.name,
        phone: r.phone,
        districtId: districts[r.distIdx].id,
        latitude: r.lat,
        longitude: r.lng,
        address: r.addr,
        floodSeverity: r.sev,
        waterLevel: r.level,
        description: r.desc,
        verified: r.verified,
      },
    });
  }

  // ─── Shelters ───────────────────────────────────────────────
  console.log('⛺ Creating shelters...');
  const shelterData = [
    { name: 'Anna University Convention Centre', distIdx: 0, type: 'COMMUNITY_HALL', lat: 13.0100, lng: 80.2350, addr: 'Guindy, Chennai', cap: 500, occ: 320, contact: 'Mr. Suresh', ph: '044-22357890', fac: 'FOOD,WATER,MEDICAL,ELECTRICITY' },
    { name: 'Pachaiyappas College', distIdx: 0, type: 'SCHOOL', lat: 13.0850, lng: 80.2600, addr: 'Chetpet, Chennai', cap: 800, occ: 456, contact: 'Dr. Ramesh', ph: '044-26421567', fac: 'FOOD,WATER,ELECTRICITY' },
    { name: 'Nehru Stadium Relief Camp', distIdx: 0, type: 'STADIUM', lat: 13.0590, lng: 80.2540, addr: 'Egmore, Chennai', cap: 2000, occ: 1230, contact: 'Collector Office', ph: '044-25360100', fac: 'FOOD,WATER,MEDICAL,ELECTRICITY' },
    { name: 'Kozhikode Town Hall', distIdx: 4, type: 'COMMUNITY_HALL', lat: 9.9550, lng: 76.2700, addr: 'MG Road, Kochi', cap: 350, occ: 280, contact: 'Mr. Vinod', ph: '0484-2367100', fac: 'FOOD,WATER,MEDICAL' },
    { name: 'GM College Shelter', distIdx: 7, type: 'SCHOOL', lat: 24.8310, lng: 92.7750, addr: 'College Road, Silchar', cap: 600, occ: 590, contact: 'Prof. Hazarika', ph: '03842-240241', fac: 'FOOD,WATER' },
    { name: 'Rajendra Nagar School', distIdx: 2, type: 'SCHOOL', lat: 25.6000, lng: 85.1300, addr: 'Rajendra Nagar, Patna', cap: 400, occ: 210, contact: 'Mr. Singh', ph: '0612-2224567', fac: 'FOOD,WATER,ELECTRICITY' },
    { name: 'NDRF Base Camp - Mumbai', distIdx: 1, type: 'RELIEF_CAMP', lat: 19.0450, lng: 72.8500, addr: 'Bandra, Mumbai', cap: 1000, occ: 340, contact: 'Cmdt. Rao', ph: '022-26551100', fac: 'FOOD,WATER,MEDICAL,ELECTRICITY' },
    { name: 'Darbhanga Relief Camp', distIdx: 14, type: 'RELIEF_CAMP', lat: 26.1600, lng: 85.8800, addr: 'Laheriasarai, Darbhanga', cap: 1200, occ: 980, contact: 'SDM Office', ph: '06272-222100', fac: 'FOOD,WATER,MEDICAL,ELECTRICITY' },
    { name: 'Brahmaputra Board Camp', distIdx: 11, type: 'RELIEF_CAMP', lat: 26.1500, lng: 91.7500, addr: 'Pandu, Guwahati', cap: 500, occ: 120, contact: 'Mr. Bora', ph: '0361-2540100', fac: 'FOOD,WATER,MEDICAL' },
    { name: 'Alappuzha Town Hall', distIdx: 13, type: 'COMMUNITY_HALL', lat: 9.5000, lng: 76.3400, addr: 'Beach Road, Alappuzha', cap: 300, occ: 290, contact: 'Mr. Kurien', ph: '0477-2243100', fac: 'FOOD,WATER' },
  ];

  for (const s of shelterData) {
    await prisma.shelter.create({
      data: {
        name: s.name,
        districtId: districts[s.distIdx].id,
        type: s.type,
        latitude: s.lat,
        longitude: s.lng,
        address: s.addr,
        capacity: s.cap,
        currentOccupancy: s.occ,
        contactName: s.contact,
        contactPhone: s.ph,
        facilities: s.fac,
      },
    });
  }

  // ─── Rescue Resources ───────────────────────────────────────
  console.log('🚁 Creating rescue resources...');
  const resources = [
    { type: 'NDRF_TEAM', name: 'NDRF 4th Battalion - Team Alpha', status: 'DEPLOYED', loc: 'Chennai', lat: 13.06, lng: 80.25, assigned: 'Chennai Flood Ops', ph: '011-24363260' },
    { type: 'NDRF_TEAM', name: 'NDRF 4th Battalion - Team Bravo', status: 'DEPLOYED', loc: 'Kochi', lat: 9.94, lng: 76.26, assigned: 'Kochi Rescue', ph: '011-24363260' },
    { type: 'SDRF_TEAM', name: 'Bihar SDRF Unit 3', status: 'DEPLOYED', loc: 'Patna', lat: 25.61, lng: 85.14, assigned: 'Patna River Rescue', ph: '0612-2217711' },
    { type: 'BOAT', name: 'Inflatable Rescue Boat IRB-12', status: 'DEPLOYED', loc: 'Silchar', lat: 24.83, lng: 92.78, assigned: 'Silchar Ward Ops', ph: '03842-240200' },
    { type: 'BOAT', name: 'Motorized Boat MB-07', status: 'AVAILABLE', loc: 'Mumbai', lat: 19.05, lng: 72.84, assigned: null, ph: '022-22694725' },
    { type: 'AMBULANCE', name: '108 Emergency - TN Unit 34', status: 'DEPLOYED', loc: 'Chennai', lat: 13.04, lng: 80.23, assigned: 'Medical Evac Chennai', ph: '108' },
    { type: 'HELICOPTER', name: 'IAF Mi-17 V5 - Rescue Ops', status: 'DEPLOYED', loc: 'Kochi Naval Base', lat: 9.95, lng: 76.27, assigned: 'Kerala Airlift', ph: '0484-2562046' },
    { type: 'NDRF_TEAM', name: 'NDRF 1st Battalion - Team Delta', status: 'AVAILABLE', loc: 'Guwahati', lat: 26.14, lng: 91.74, assigned: null, ph: '011-24363260' },
    { type: 'BOAT', name: 'Country Boat Fleet - 5 units', status: 'DEPLOYED', loc: 'Darbhanga', lat: 26.17, lng: 85.90, assigned: 'Village Rescue', ph: '06272-222100' },
    { type: 'AMBULANCE', name: '108 Emergency - Bihar Unit 12', status: 'AVAILABLE', loc: 'Patna', lat: 25.60, lng: 85.13, assigned: null, ph: '108' },
  ];

  for (const r of resources) {
    await prisma.rescueResource.create({
      data: {
        type: r.type,
        name: r.name,
        status: r.status,
        location: r.loc,
        latitude: r.lat,
        longitude: r.lng,
        assignedTo: r.assigned,
        contactPhone: r.ph,
        lastUpdated: new Date(),
      },
    });
  }

  // ─── Historical Flood Events ────────────────────────────────
  console.log('📜 Creating historical flood data...');
  const floodEvents = [
    { year: 2024, month: 7, dist: 'Wayanad', state: 'Kerala', rain: 572, depth: 4.5, pop: 45000, villages: 23, loss: 1200, dur: 5, sev: 'CATASTROPHIC' },
    { year: 2023, month: 12, dist: 'Chennai', state: 'Tamil Nadu', rain: 490, depth: 3.2, pop: 180000, villages: 0, loss: 3500, dur: 7, sev: 'MAJOR' },
    { year: 2023, month: 7, dist: 'Silchar', state: 'Assam', rain: 380, depth: 2.8, pop: 120000, villages: 45, loss: 800, dur: 12, sev: 'MAJOR' },
    { year: 2022, month: 8, dist: 'Patna', state: 'Bihar', rain: 310, depth: 2.1, pop: 95000, villages: 67, loss: 650, dur: 8, sev: 'MAJOR' },
    { year: 2022, month: 6, dist: 'Silchar', state: 'Assam', rain: 420, depth: 3.5, pop: 150000, villages: 52, loss: 1100, dur: 15, sev: 'CATASTROPHIC' },
    { year: 2021, month: 10, dist: 'Chennai', state: 'Tamil Nadu', rain: 350, depth: 1.8, pop: 110000, villages: 0, loss: 2200, dur: 4, sev: 'MODERATE' },
    { year: 2021, month: 7, dist: 'Mumbai', state: 'Maharashtra', rain: 280, depth: 1.5, pop: 250000, villages: 0, loss: 5000, dur: 3, sev: 'MODERATE' },
    { year: 2020, month: 8, dist: 'Gorakhpur', state: 'Uttar Pradesh', rain: 290, depth: 2.0, pop: 85000, villages: 120, loss: 450, dur: 10, sev: 'MAJOR' },
    { year: 2020, month: 9, dist: 'Hyderabad', state: 'Telangana', rain: 320, depth: 2.2, pop: 200000, villages: 12, loss: 4500, dur: 5, sev: 'MAJOR' },
    { year: 2019, month: 8, dist: 'Kolkata', state: 'West Bengal', rain: 260, depth: 1.2, pop: 75000, villages: 8, loss: 800, dur: 4, sev: 'MODERATE' },
    { year: 2019, month: 8, dist: 'Patna', state: 'Bihar', rain: 340, depth: 2.5, pop: 180000, villages: 95, loss: 1500, dur: 12, sev: 'MAJOR' },
    { year: 2018, month: 8, dist: 'Kochi', state: 'Kerala', rain: 580, depth: 5.0, pop: 1400000, villages: 341, loss: 40000, dur: 14, sev: 'CATASTROPHIC' },
    { year: 2017, month: 8, dist: 'Mumbai', state: 'Maharashtra', rain: 310, depth: 2.0, pop: 350000, villages: 0, loss: 8000, dur: 3, sev: 'MAJOR' },
    { year: 2015, month: 12, dist: 'Chennai', state: 'Tamil Nadu', rain: 494, depth: 4.0, pop: 1800000, villages: 0, loss: 20000, dur: 10, sev: 'CATASTROPHIC' },
  ];

  for (const e of floodEvents) {
    await prisma.floodEvent.create({
      data: {
        year: e.year,
        month: e.month,
        districtName: e.dist,
        state: e.state,
        totalRainfall: e.rain,
        maxInundation: e.depth,
        populationAffected: e.pop,
        villagesAffected: e.villages,
        economicLoss: e.loss,
        duration: e.dur,
        severity: e.sev,
      },
    });
  }

  console.log('\n✅ Database seeded successfully!');
  console.log(`📊 Summary:`);
  console.log(`   Districts: ${districts.length}`);
  console.log(`   Rainfall Records: ${districts.length * 24}`);
  console.log(`   AI Predictions: ${districts.length * forecastHours.length}`);
  console.log(`   Alerts: ${alertData.length}`);
  console.log(`   River Stations: ${rivers.length}`);
  console.log(`   SOS Requests: ${sosData.length}`);
  console.log(`   Citizen Reports: ${reportData.length}`);
  console.log(`   Shelters: ${shelterData.length}`);
  console.log(`   Rescue Resources: ${resources.length}`);
  console.log(`   Historical Events: ${floodEvents.length}`);
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
