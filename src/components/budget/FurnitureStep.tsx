"use client";

import React, { useState, useEffect } from "react";

interface FurnitureStepProps {
  formData: any;
  setFormData: (data: any) => void;
  next: () => void;
  prev?: () => void;
}

const styles = ["Modern", "Traditional", "Luxury"];

const FurnitureStep: React.FC<FurnitureStepProps> = ({ formData, setFormData, next, prev }) => {
  const homeType = formData.homeType || "";
  const match = homeType.match(/(\d+)/);
  const numberOfBedrooms = match ? parseInt(match[1]) : 1;

  const handleChange = (section: string, item: string, key: string, value: any) => {
    const updated = {
      ...formData.furniture,
      [section]: {
        ...formData.furniture?.[section],
        [item]: {
          ...formData.furniture?.[section]?.[item],
          [key]: value,
        },
      },
    };
    setFormData({ ...formData, furniture: updated });
  };

  const renderItems = (section: string, items: string[]) => (
    <div className="mb-6">
      <h3 className="text-xl font-semibold text-teal-600 mb-2">{section}</h3>
      {items.map((item) => (
        <div key={item} className="mb-4">
          <label className="block font-medium text-black mb-1">{item}</label>
          <select
            className="w-full border p-2 text-black mb-1"
            value={formData.furniture?.[section]?.[item]?.style || ""}
            onChange={(e) => handleChange(section, item, "style", e.target.value)}
          >
            <option value="">Select Style</option>
            {styles.map((style) => (
              <option key={style}>{style}</option>
            ))}
          </select>
          <input
            type="number"
            placeholder="Quantity"
            min={0}
            className="w-full border p-2 text-black"
            value={formData.furniture?.[section]?.[item]?.quantity || ""}
            onChange={(e) => handleChange(section, item, "quantity", parseInt(e.target.value))}
          />
        </div>
      ))}
    </div>
  );

  return (
    <div className="space-y-10">
      {renderItems("Living & Dining", [
        "TV Unit",
        "Puja Unit",
        "Crockery Unit / Bar Unit",
        "Common Washbasin",
        "Washbasin Designer Backlit Mirror",
      ])}

      {renderItems("Kitchen", [
        "Straight",
        "L-Shape",
        "U-Shape",
        "Parallel",
      ])}

      {Array.from({ length: numberOfBedrooms }, (_, i) => {
        const section = `Bedroom ${i + 1}`;
        return renderItems(section, [
          "Wardrobe",
          "Loft",
          "Dressing Unit",
          "Bed",
          "Bed Headboard",
          "Side Table",
          "Mini TV Unit",
          "Study/Work Table",
        ]);
      })}

      {renderItems("Bathroom", [
        "Vanity Cabinet",
        "Mirror Cabinet",
        "Towel Rack",
      ])}

      {renderItems("Others", [
        "Shoe Cabinet",
        "Bathroom & Washbasin Vanity",
      ])}

      <div className="mt-6 flex justify-between">
        {prev && (
          <button onClick={prev} className="bg-gray-300 px-6 py-2 rounded">
            Previous
          </button>
        )}
        <button onClick={next} className="bg-teal-600 text-white px-6 py-2 rounded">
          Next
        </button>
      </div>
    </div>
  );
};

export default FurnitureStep;
