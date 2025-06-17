"use client";

import React from "react";

interface FurnitureStepProps {
  formData: any;
  setFormData: (data: any) => void;
  next: () => void;
  prev?: () => void;
}

const bedTypes = ["Box Type", "Hydraulic"];
const wardrobeTypes = ["2-Door", "3-Door", "With Mirror"];

const FurnitureStep: React.FC<FurnitureStepProps> = ({ formData, setFormData, next, prev }) => {
  const homeType = formData.homeType || "";
  const match = homeType.match(/(\d+)/);
  const numberOfBedrooms = match ? parseInt(match[1]) : 1;

  const handleChange = (section: string, key: string, value: any) => {
    const updatedFurniture = {
      ...formData.furniture,
      [section]: {
        ...formData.furniture?.[section],
        [key]: value,
      },
    };

    setFormData({
      ...formData,
      furniture: updatedFurniture,
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-semibold text-teal-600 mb-2">Living & Dining</h3>
        {["TV Unit", "Puja Unit", "Crockery Unit / Bar Unit", "Common Washbasin", "Washbasin Designer Backlit Mirror"].map(item => (
          <div key={item} className="mb-2 text-black">
            <label>{item}</label>
            <input
              type="number"
              min={0}
              className="w-full border p-2 text-black hover:border-teal-700 focus:outline-none focus:border-teal-700 "
              value={formData.furniture?.["Living & Dining"]?.[item] || ""}
              onChange={(e) => handleChange("Living & Dining", item, parseInt(e.target.value))}
            />
          </div>
        ))}
      </div>

      <div>
        <h3 className="text-xl font-semibold text-teal-600 mb-2">Kitchen</h3>
        <label className="text-black">Type of Kitchen</label>
        <select
          className="w-full border p-2 text-black hover:border-teal-700 focus:outline-none focus:border-teal-700 "
          value={formData.furniture?.Kitchen?.type || ""}
          onChange={(e) => handleChange("Kitchen", "type", e.target.value)}
        >
          <option value="">--Select--</option>
          <option value="Straight">Straight</option>
          <option value="L-Shape">L-Shape</option>
          <option value="U-Shape">U-Shape</option>
          <option value="Parallel">Parallel</option>
        </select>
      </div>

      {Array.from({ length: numberOfBedrooms }, (_, i) => {
        const section = `Bedroom ${i + 1}`;
        return (
          <div key={section}>
            <h3 className="text-xl font-semibold text-teal-600 mt-4 mb-2">{section}</h3>

            <label className="text-black">Wardrobe Type</label>
            <select
              className="w-full border p-2 mb-2 text-black hover:border-teal-700 focus:outline-none focus:border-teal-700 "
              value={formData.furniture?.[section]?.["Wardrobe Type"] || ""}
              onChange={(e) => handleChange(section, "Wardrobe Type", e.target.value)}
            >
              <option value="">--Select--</option>
              {wardrobeTypes.map(type => (
                <option key={type}>{type}</option>
              ))}
            </select>

            <input
              type="number"
              placeholder="Wardrobe Qty"
              className="w-full border p-2 mb-2 text-black hover:border-teal-700 focus:outline-none focus:border-teal-700 "
              value={formData.furniture?.[section]?.["Wardrobe"] || ""}
              onChange={(e) => handleChange(section, "Wardrobe", parseInt(e.target.value))}
            />

            <label className="text-black">Bed Type</label>
            <select
              className="w-full border p-2 mb-2 text-black hover:border-teal-700 focus:outline-none focus:border-teal-700 "
              value={formData.furniture?.[section]?.["Bed Type"] || ""}
              onChange={(e) => handleChange(section, "Bed Type", e.target.value)}
            >
              <option value="">--Select--</option>
              {bedTypes.map(type => (
                <option key={type}>{type}</option>
              ))}
            </select>

            <input
              type="number"
              placeholder="Bed Qty"
              className="w-full border p-2 mb-2 text-black hover:border-teal-700 focus:outline-none focus:border-teal-700 "
              value={formData.furniture?.[section]?.["Bed"] || ""}
              onChange={(e) => handleChange(section, "Bed", parseInt(e.target.value))}
            />

            {["Loft", "Dressing Unit", "Bed Headboard", "Side Table", "Mini TV Unit", "Study/Work Table"].map(item => (
              <div key={item} className="mb-2 text-black">
                <label>{item}</label>
                <input
                  type="number"
                  className="w-full border p-2 text-black hover:border-teal-700 focus:outline-none focus:border-teal-700 "
                  min={0}
                  value={formData.furniture?.[section]?.[item] || ""}
                  onChange={(e) => handleChange(section, item, parseInt(e.target.value))}
                />
              </div>
            ))}
          </div>
        );
      })}

      <div>
        <h3 className="text-xl font-semibold text-teal-600 mb-2">Others</h3>
        {["Shoe Cabinet", "Bathroom & Washbasin Vanity"].map(item => (
          <div key={item} className="mb-2 text-black">
            <label>{item}</label>
            <input
              type="number"
              className="w-full border p-2 text-black hover:border-teal-700 focus:outline-none focus:border-teal-700 "
              min={0}
              value={formData.furniture?.["Others"]?.[item] || ""}
              onChange={(e) => handleChange("Others", item, parseInt(e.target.value))}
            />
          </div>
        ))}
      </div>

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
