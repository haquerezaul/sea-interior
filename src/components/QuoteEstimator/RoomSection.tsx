'use client';

import React, { useState } from 'react';
import SubCategoryCard from './SubCategoryCard';

type PricingItem = {
  category: string;
  subcategory: string;
  style: string;
  unitType: string;
  unitPrice: number;
};

type RoomSectionProps = {
  category: string;
  items: PricingItem[];
  onItemChange: (item: {
    category: string;
    subcategory: string;
    style: string;
    unitType: string;
    unitPrice: number;
    quantity: number;
  }) => void;
};

export default function RoomSection({ category, items, onItemChange }: RoomSectionProps) {
  const [isOpen, setIsOpen] = useState(false)

  // Unique subcategories inside this room
  const subcategories = Array.from(new Set(items.map((item) => item.subcategory)));

  return (
    <div className="border rounded-md mb-4 bg-white shadow">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left px-4 py-3 bg-teal-600 text-white font-semibold"
      >
        {category} {isOpen ? '▾' : '▸'}
      </button>

      {isOpen && (
        <div className="p-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {subcategories.map((sub) => {
            const relatedItems = items.filter((item) => item.subcategory === sub);
            return (
              <SubCategoryCard
                key={sub}
                subcategory={sub}
                options={relatedItems}
                category={category}
                onItemChange={onItemChange} // ✅ Pass handler to SubCategoryCard
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
