import React from 'react';
import './globals.css';
// import Navbar from '@/components/ui/Navbar'; // Ensure the module exists or correct the path
import HeroSection from '@/components/HeroSection';
import DesignFeatureSection from '@/components/DesignFeatureSection';
import { CustomerReview } from '@/components/CustomerReview';
import TestimonialCard from '@/components/TestimonialCard';
import PortfolioGallery from '@/components/PortfolioGallery';
import { StaggerTestimonials } from '@/components/ui/stagger-testimonials';
import BenefitsCards from '@/components/ui/BenifitsCards';
import AboutUs from '@/components/AboutUs';

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <DesignFeatureSection />
     <TestimonialCard />
     <PortfolioGallery />
     <StaggerTestimonials/>
     <BenefitsCards/>
      <AboutUs />
    </main>
  );
}
