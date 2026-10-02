'use client';

import dynamic from 'next/dynamic';

// Dynamically import the map component with SSR disabled
// This is critical because Leaflet uses the window object which is not available during server-side rendering
const FloodMap = dynamic(() => import('@/components/FloodMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[calc(100vh-5rem)] flex items-center justify-center bg-dark-900">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-4 border-brand-blue border-t-transparent rounded-full animate-spin"></div>
        <p className="text-brand-blue font-medium animate-pulse">Loading Interactive Map...</p>
      </div>
    </div>
  )
});

export default function InteractiveMapPage() {
  return (
    <main className="bg-dark-900 min-h-[calc(100vh-5rem)]">
      <FloodMap />
    </main>
  );
}
