"use client";

import React from "react";

type Props = {
  quantity: number;
  unit: string;
  onChange: (value: number) => void;
};

export default function QuantityInput({ quantity, unit, onChange }: Props) {
  return (
    <div className="flex items-center gap-2 mb-2">
      <label className="text-sm font-medium text-gray-600">Quantity:</label>
      <input
        type="number"
        min={0}
        value={quantity}
        onChange={(e) =>
          onChange(Number.isNaN(parseInt(e.target.value)) ? 0 : parseInt(e.target.value))
        }
        className="w-20 px-2 py-1 border rounded-md text-sm"
      />
      <span className="text-sm text-gray-500">{unit.replace("_", " ")}</span>
    </div>
  );
}
