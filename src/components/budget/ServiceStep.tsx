// src/components/budget/ServiceStep.tsx

'use client';

import React from 'react';

interface ServiceStepProps {
  formData: any;
  setFormData: (data: any) => void;
  next: () => void;
  prev: () => void;
}

const serviceOptions = [
  'False Ceiling',
  'Painting',
  'Electrical & Lighting'
];

const flooringOptions = [
  'Marble',
  'Tiles',
  'Wooden Flooring',
  'Carpet',
];

const ServiceStep: React.FC<ServiceStepProps> = ({ formData, setFormData, next, prev }) => {
  const services = formData.services || { list: [], flooring: '' };

  const toggleService = (service: string) => {
    const updatedList = services.list.includes(service)
      ? services.list.filter((s: string) => s !== service)
      : [...services.list, service];

    setFormData({
      ...formData,
      services: {
        ...services,
        list: updatedList,
      },
    });
  };

  const handleFlooringChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({
      ...formData,
      services: {
        ...services,
        flooring: e.target.value,
      },
    });
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-black">Select Services</h2>

      <div className="grid gap-4 mb-6">
        {serviceOptions.map((service) => (
          <label key={service} className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={services.list.includes(service)}
              onChange={() => toggleService(service)}
              className="w-5 h-5 accent-teal-600"
            />
            <span className="text-gray-700">{service}</span>
          </label>
        ))}
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-2">
          Select Flooring Type
        </label>
        <select
          value={services.flooring || ''}
          onChange={handleFlooringChange}
          className="w-full border border-gray-300 rounded px-3 py-2 text-black hover:border-teal-700 focus:outline-none focus:border-teal-700"
        >
          <option value="">-- Select Flooring --</option>
          {flooringOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-6 flex justify-between">
        <button
          onClick={prev}
          className="bg-gray-300 text-gray-800 px-6 py-2 rounded-md"
        >
          Previous
        </button>
        <button
          onClick={next}
          className="bg-teal-600 text-white px-6 py-2 rounded-md"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ServiceStep;
