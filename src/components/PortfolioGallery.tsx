'use client';
import React, { useState } from 'react';
import Image from 'next/image';

const categories = [
  'Living Room',
  'Dining Room',
  'Combined Living/Dining',
  'Bedroom',
  'Bathroom',
  'Office',
  'Kitchen',
  'Hallway',
  'Kids',
  'Outdoor',
  
];

// 🔁 Generate image paths assuming subfolders: /portfolio/<folderName>/<folderName>1.jpg
const generateImages = (category: string) => {
  const folderName = category.toLowerCase().replace(/\s+/g, '');
  return Array.from({ length: 10 }, (_, i) => ({
    src: `/portfolio/${folderName}/${folderName}${i + 1}.jpeg`,
    category,
  }));
};

const allImages = categories.flatMap(generateImages);

const PortfolioGallery = () => {
  const [selected, setSelected] = useState('Bathroom');

  const filteredImages = allImages.filter((img) => img.category === selected);

  return (
    <section className="px-4 py-16 text-center bg-white h-auto">
      <h2 className="text-2xl md:text-4xl playfair font-semibold mb-6 text-teal-700 [text-shadow:3px_3px_0_#fff,_-1px_1px_0_#fff,_-1px_-1px_0_#fff,1px_-1px_0_#fff]">
        Explore Real Spaces We've Transformed
      </h2>

      {/* 🧭 Category Tabs (scrollable on mobile) */}
      <div className="flex overflow-x-auto whitespace-nowrap scrollbar-hide justify-start md:justify-center gap-4 text-sm font-medium text-gray-700 mb-10 px-2">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`px-3 py-1 border-b-2 whitespace-nowrap shrink-0 ${
              selected === cat
                ? 'border-black font-semibold'
                : 'border-transparent hover:border-gray-300'
            }`}
            onClick={() => setSelected(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 🖼️ Image Carousel */}
      <div className="flex overflow-x-auto space-x-6 px-2 scrollbar-hide">
        {filteredImages.length > 0 ? (
          filteredImages.map((img, idx) => (
            <div
              key={idx}
              className="flex-shrink-0 w-[250px] md:w-[320px] rounded-xl overflow-hidden shadow"
            >
              <Image
                src={img.src}
                alt={`${img.category} ${idx + 1}`}
                width={320}
                height={220}
                className="w-full h-full object-cover"
              />
            </div>
          ))
        ) : (
          <p className="text-gray-500">No images available for {selected}.</p>
        )}
      </div>

      {/* CTA Button */}
      <div className="mt-12">
        <a
          href="/portfolio"
          className="inline-block bg-teal-400 dark:bg-teal-400 text-black font-bold italic merienda text-lg dark:text-black px-8 py-3 rounded-full "
        >
          View Portfolio
        </a>
      </div>
    </section>
  );
};

export default PortfolioGallery;