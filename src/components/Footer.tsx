import { CloudRain, Github, Mail, Phone, Shield } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-dark-800/50 border-t border-dark-700/50 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <CloudRain className="w-7 h-7 text-brand-blue" />
              <span className="text-lg font-bold gradient-text">InundationX</span>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">
              AI-Powered Heavy Rainfall Early Warning &amp; Flood Inundation Prediction System.
              Built for Smart India Hackathon 2024.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Platform</h3>
            <div className="space-y-2">
              {['GIS Map', 'AI Predictions', 'Alert Center', 'Analytics'].map((item) => (
                <Link key={item} href="#" className="block text-sm text-gray-400 hover:text-brand-blue transition-colors">
                  {item}
                </Link>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Services</h3>
            <div className="space-y-2">
              {['Citizen Portal', 'Emergency SOS', 'Shelter Finder', 'Gov Dashboard'].map((item) => (
                <Link key={item} href="#" className="block text-sm text-gray-400 hover:text-brand-blue transition-colors">
                  {item}
                </Link>
              ))}
            </div>
          </div>

          {/* Emergency */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Emergency</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Phone className="w-4 h-4 text-brand-red" />
                <span>NDRF: 011-24363260</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Phone className="w-4 h-4 text-brand-amber" />
                <span>Disaster: 1078</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Shield className="w-4 h-4 text-brand-green" />
                <span>Police: 100</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-dark-700/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            © 2024 InundationX. Smart India Hackathon Project. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-xs text-gray-600">
              Data Sources: IMD • ISRO • CWC • NCEP
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
