'use client';
import React from 'react';
import Image from 'next/image';

interface Props {
  formData: any;
  setFormData: (data: any) => void;
  next: () => void;
}

const homeTypes = [
  { type: '1 BHK', image: '/images/1bhk.jpeg' },
  { type: '2 BHK', image: '/images/2bhk.jpeg' },
  { type: '3 BHK', image: '/images/3bhk.jpeg' },
  { type: '4 BHK', image: '/images/4bhk.jpeg' },
];

const HomeTypeStep = ({ formData, setFormData, next }: Props) => {
  return (
    <div className="text-center">
      <h2 className="text-xl md:text-2xl font-semibold text-black mb-6">
        Select Your Home Type
      </h2>

      <div className="grid grid-cols-2 md:flex justify-center gap-6 text-black mb-6">
        {homeTypes.map((bhk) => (
          <div
            key={bhk.type}
            className={`border-4 p-2 rounded-xl cursor-pointer transition-all duration-300 ${
              formData.homeType === bhk.type ? 'border-teal-500' : 'border-transparent'
            }`}
            onClick={() => setFormData({ ...formData, homeType: bhk.type })}
          >
            <Image
              src={bhk.image}
              alt={bhk.type}
              width={160}
              height={120}
              className="w-full h-auto object-contain"
            />
            <p className="mt-2 font-medium">{bhk.type}</p>
          </div>
        ))}
      </div>

      {/* Carpet Area Input */}
      <div className="mb-6">
        <label htmlFor="carpet" className="block font-medium text-black mb-2">
          Enter Carpet Area (sq. ft.):
        </label>
        <input
          id="carpet"
          type="number"
          value={formData.carpetArea}
          onChange={(e) => setFormData({ ...formData, carpetArea: e.target.value })}
          className="border text-black border-teal-600 rounded px-4 py-2 w-full md:w-1/2 hover:border-teal-700 focus:outline-none focus:border-teal-700"
          placeholder="e.g. 1200"
        />
      </div>

      <button
        onClick={next}
        className="bg-teal-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-teal-700"
        disabled={!formData.homeType || !formData.carpetArea}
      >
        NEXT
      </button>
    </div>
  );
};

export default HomeTypeStep;