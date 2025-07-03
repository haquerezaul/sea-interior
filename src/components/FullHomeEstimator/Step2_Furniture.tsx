'use client';

import React from "react";
import { FullHomeFormData, FurnitureItem } from "./types";

interface Props {
  formData: FullHomeFormData;
  setFormData: (data: FullHomeFormData) => void;
  next: () => void;
  prev: () => void;
  groupedFurniture: Record<string, string[]>; // Room → Subcategory[]
}

const styles = ["Modern", "Traditional", "Luxury"];

const Step2_Furniture: React.FC<Props> = ({
  formData,
  setFormData,
  next,
  prev,
  groupedFurniture
}) => {
  const handleChange = (
    room: string,
    item: string,
    field: keyof FurnitureItem,
    value: string | number
  ) => {
    const updatedFurniture = {
      ...formData.furniture,
      [room]: {
        ...formData.furniture[room],
        [item]: {
          ...formData.furniture[room]?.[item],
          [field]: value,
        },
      },
    };
    setFormData({ ...formData, furniture: updatedFurniture });
  };

  // Extract BHK count from homeType (e.g., "2 BHK" → 2)
  const bhkMatch = formData.homeType.match(/^(\d+)/);
  const bhkCount = bhkMatch ? parseInt(bhkMatch[1]) : 1;

  // Items to exclude from furniture
  const excludedItems = [
    "False Ceiling",
    "Electrical & Lighting",
    "Painting",
    "Tiles",
    "Marble",
    "Wooden Flooring",
    "Carpet",
  ];

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6 text-black">Furniture Selection</h2>

      {Object.entries(groupedFurniture).map(([room, items]) => {
        // ❌ Skip Gym & Office if 1 or 2 BHK
        if ((room === "Gym" || room === "Office") && bhkCount <= 2) {
          return null;
        }

        // 🧹 Filter out excluded service/flooring items
        const filteredItems = items.filter(
          (item) =>
            !excludedItems.includes(item) &&
            !((room === "Gym" || room === "Office") && bhkCount <= 2)
        );

        // ⛔ Skip rendering if room is empty after filtering
        if (filteredItems.length === 0) return null;

        return (
          <div key={room} className="mb-8">
            <h3 className="text-xl font-semibold text-teal-600 mb-2">{room}</h3>

            {filteredItems.map((item) => {
              const data = formData.furniture?.[room]?.[item] || {
                style: "",
                quantity: 0,
              };

              return (
                <div key={item} className="mb-4 border-b pb-4">
                  <label className="block font-medium text-black mb-1">
                    {item}
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <select
                      className="border rounded px-3 py-2 text-black"
                      value={data.style}
                      onChange={(e) =>
                        handleChange(room, item, "style", e.target.value)
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
                      min={0}
                      value={data.quantity || ""}
                      placeholder="Quantity"
                      className="border rounded px-3 py-2 text-black"
                      onChange={(e) =>
                        handleChange(
                          room,
                          item,
                          "quantity",
                          parseInt(e.target.value) || 0
                        )
                      }
                    />
                  </div>
                </div>
              );
            })}
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

export default Step2_Furniture;
