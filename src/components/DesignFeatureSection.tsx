'use client';

import { FaCouch, FaLightbulb, FaPhoneAlt, FaCubes, FaPalette } from 'react-icons/fa';
import React from 'react';

const features = [
  {
    icon: <FaCouch size={32} className="text-teal-600" />,
    text: 'Up to 45% off at +350 furniture stores',
  },
  {
    icon: <FaLightbulb size={32} className="text-teal-600" />,
    text: 'Concepts from multiple top designers',
  },
  {
    icon: <FaPhoneAlt size={32} className="text-teal-600" />,
    text: 'One-on-one interior design consultation',
  },
  
  {
    icon: <FaPalette size={32} className="text-teal-600" />,
    text: 'Color palette & floor plan',
  },
];

const DesignFeatureSection = () => {
  return (
    <section className="py-16 bg-teal-50 text-center">
      <div className="max-w-4xl mx-auto px-4">
      <h2 className="text-3xl md:text-4xl playfair font-semibold mb-2 text-black [text-shadow:3px_3px_0_#fff,_-1px_1px_0_#fff,_-1px_-1px_0_#fff,1px_-1px_0_#fff]">
          Work Online With The Finest Interior Designers
        </h2>
        <p className="text-gray-600 text-lg font-semibold mb-12">
          Get award-winning personalized online interior design help
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-8 justify-items-center">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="mb-4">{feature.icon}</div>
              <p className="text-gray-800 max-w-xs text-sm font-semibold">
                {feature.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DesignFeatureSection;
