'use client'
import React from 'react'
import { Button } from '@/components/ui/moving-border'

function HeroSection() {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* 🎥 Background Video: Fullscreen & fixed */}
      <video
        className="fixed top-0 left-0 w-full h-full object-cover z-0 pointer-events-none"
        src="/videos/a81d9135dd07c1a29776faafd2eca16d.mp4"
        autoPlay
        muted
        loop
        playsInline
      />

      {/* 🔲 Dark overlay (optional) */}
      <div className="fixed inset-0 bg-black/40 z-10 pointer-events-none" />

      {/* 🔤 Foreground content */}
      <div className="relative z-20 flex flex-col items-center justify-center text-center text-white px-4 h-screen">
        <h1 className="text-5xl md:text-7xl font-bold mb-4 text-white[text-shadow:4px_2px_2px_#000000]">
          Sea Interior
        </h1>
        <p className="text-2xl md:text-3xl mb-5 pt-3 text-white [text-shadow:4px_2px_2px_#000000]">
          Where Dream Meets Destiny - Transforming Spaces with Elegance
        </p>
        <p className='text-xl md:text-2xl pt-4 mb-8 mx-6 playfair font-medium text-white [text-shadow:2px_3px_3px_#000000] '>
          At Sea Interior, we don’t just design spaces — we shape experiences.
          From luxury living rooms to elegant workspaces, our bespoke interiors bring out the soul of every space.
          Let us turn your vision into a place you’ll love coming home to.
          </p>
        <div className="flex justify-center space-x-5 md:space-x-10 pt-4 ">
        <Button
        borderRadius="1.75rem"
        className="bg-teal-600 dark:bg-teal-600 text-black font-bold italic merienda text-lg dark:text-black border-neutral-700 dark:border-slate-800"
      >
      View Portfolio
      </Button>
      <Button
        borderRadius="1.75rem"
        className="bg-teal-600 dark:bg-teal-600 text-black font-bold italic merienda text-lg dark:text-black border-neutral-700 dark:border-slate-800"
      >
        Get  Free Estimate
      </Button>
        </div>
      </div>
    </div>
  )
}

export default HeroSection