"use client";

import React from "react";

type Props = {
  selectedStyle: string;
  onChange: (style: string) => void;
};

const styles = ["Traditional", "Modern", "Luxury"];

export default function StyleSelector({ selectedStyle, onChange }: Props) {
  return (
    <div className="flex flex-wrap gap-2 mb-3">
      {styles.map(style => (
        <button
          key={style}
          onClick={() => onChange(style)}
          className={`px-3 py-1 rounded-full border text-sm font-medium transition ${
            selectedStyle === style
              ? "bg-teal-600 text-white border-teal-700"
              : "bg-white text-teal-700 border-teal-400"
          }`}
        >
          {style}
        </button>
      ))}
    </div>
  );
}
