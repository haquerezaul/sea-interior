"use client";

import React, { useState, useEffect } from "react";
import StyleSelector from "./StyleSelector";
import QuantityInput from "./QuantityInput";

type PricingItem = {
  category: string;
  subcategory: string;
  style: string;
  unitType: string;
  unitPrice: number;
};

type Props = {
  subcategory: string;
  options: PricingItem[];
  category: string;
  onItemChange: (item: any) => void;
};

export default function SubCategoryCard({
  subcategory,
  options,
  category,
  onItemChange,
}: Props) {
  const [selectedStyle, setSelectedStyle] = useState("Modern");
  const [quantity, setQuantity] = useState(0); // ⬅️ Start with 0

  const currentOption = options.find((opt) => opt.style === selectedStyle);
  const unitType = currentOption?.unitType || "unit";
  const unitPrice = currentOption?.unitPrice || 0;
  const total = unitPrice * quantity;

  // Inform parent only if quantity > 0
  useEffect(() => {
    if (quantity > 0) {
      onItemChange({
        category,
        subcategory,
        style: selectedStyle,
        unitType,
        unitPrice,
        quantity,
      });
    } else {
      // quantity 0 → remove from selection
      onItemChange({
        category,
        subcategory,
        style: selectedStyle,
        unitType,
        unitPrice,
        quantity: 0,
      });
    }
  }, [selectedStyle, quantity]);

  return (
    <div className="border rounded-lg p-4 shadow-sm bg-gray-50">
      <h3 className="font-semibold text-lg mb-2">{subcategory}</h3>

      <StyleSelector selectedStyle={selectedStyle} onChange={setSelectedStyle} />

      <QuantityInput quantity={quantity} unit={unitType} onChange={setQuantity} />

      {quantity > 0 && (
        <p className="mt-2 font-medium text-teal-700">
          Estimated Cost: ₹{total.toLocaleString()}
        </p>
      )}
    </div>
  );
}
