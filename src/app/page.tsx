import React from 'react';
import './globals.css';
// import Navbar from '@/components/ui/Navbar'; // Ensure the module exists or correct the path
import HeroSection from '@/components/HeroSection';
import DesignFeatureSection from '@/components/DesignFeatureSection';

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <DesignFeatureSection />
      
    </main>
  );
}
