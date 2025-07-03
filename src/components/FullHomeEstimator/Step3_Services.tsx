'use client';

import React from "react";
import { FullHomeFormData, ServiceItem, FlooringItem } from "./types";

interface Props {
  formData: FullHomeFormData;
  setFormData: (data: FullHomeFormData) => void;
  next: () => void;
  prev: () => void;
  serviceList: string[];
  flooringOptions: string[];
}

const styles = ["Modern", "Traditional", "Luxury"];

const Step3_Services: React.FC<Props> = ({
  formData,
  setFormData,
  next,
  prev,
  serviceList,
  flooringOptions,
}) => {
  const carpetArea = parseFloat(formData.carpetArea) || 1000;

  const handleServiceChange = (
    name: string,
    field: keyof ServiceItem,
    value: string | number
  ) => {
    const updated = {
      ...formData.services.list,
      [name]: {
        ...formData.services.list[name],
        [field]: value,
        quantity: carpetArea,
      },
    };
    setFormData({
      ...formData,
      services: {
        ...formData.services,
        list: updated,
      },
    });
  };

  const handleFlooringChange = (
    name: string,
    field: keyof FlooringItem,
    value: string | number
  ) => {
    const updated = {
      ...formData.services.flooring,
      [name]: {
        ...formData.services.flooring[name],
        [field]: value,
        quantity: carpetArea,
      },
    };
    setFormData({
      ...formData,
      services: {
        ...formData.services,
        flooring: updated,
      },
    });
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6 text-black">Service Selection</h2>

      {/* Non-flooring services */}
      {serviceList.map((service) => {
        const data = formData.services.list?.[service] || {
          style: "",
          quantity: carpetArea,
        };

        return (
          <div key={service} className="mb-4 border-b pb-4">
            <label className="block font-medium text-black mb-1">
              {service} (Based on Carpet Area)
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <select
                className="border rounded px-3 py-2 text-black"
                value={data.style}
                onChange={(e) =>
                  handleServiceChange(service, "style", e.target.value)
                }
              >
                <option value="">Select Style</option>
                {styles.map((style) => (
                  <option key={style} value={style}>
                    {style}
                  </option>
                ))}
              </select>

              <input
                type="number"
                disabled
                value={carpetArea}
                placeholder="Quantity (sqft)"
                className="border rounded px-3 py-2 text-gray-400 bg-gray-100"
              />
            </div>
          </div>
        );
      })}

      {/* Flooring Services */}
      {flooringOptions.map((flooring) => {
        const data = formData.services.flooring?.[flooring] || {
          style: "",
          quantity: carpetArea,
        };

        return (
          <div key={flooring} className="mb-4 border-b pb-4">
            <label className="block font-medium text-black mb-1">
              {flooring} Flooring (Based on Carpet Area)
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <select
                className="border rounded px-3 py-2 text-black"
                value={data.style}
                onChange={(e) =>
                  handleFlooringChange(flooring, "style", e.target.value)
                }
              >
                <option value="">Select Style</option>
                {styles.map((style) => (
                  <option key={style} value={style}>
                    {style}
                  </option>
                ))}
              </select>

              <input
                type="number"
                disabled
                value={carpetArea}
                placeholder="Quantity (sqft)"
                className="border rounded px-3 py-2 text-gray-400 bg-gray-100"
              />
            </div>
          </div>
        );
      })}

      <div className="mt-6 flex justify-between">
        <button onClick={prev} className="bg-gray-300 px-6 py-2 rounded">
          Previous
        </button>
        <button
          onClick={next}
          className="bg-teal-600 text-white px-6 py-2 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Step3_Services;
