"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Modal from "@/components/portfolio/Modal";

const categories = [
  "all",
  "bathroom",
  "bedroom",
  "combinedlivingdining",
  "diningroom",
  "hallway",
  "kids",
  "kitchen",
  "livingroom",
  "office",
  "other",
  "outdoor",
];

interface GalleryImage {
  src: string;
  alt: string;
  category: string;
}

export default function PortfolioPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    const allImages: GalleryImage[] = [];

    categories.slice(1).forEach((category) => {
      for (let i = 1; i <= 10; i++) {
        allImages.push({
          src: `/portfolio/${category}/${category}${i}.jpeg`,
          alt: `${category} ${i}`,
          category,
        });
      }
    });

    setImages(allImages);
  }, []);

  const filtered =
    selectedCategory === "all"
      ? images
      : images.filter((img) => img.category === selectedCategory);

  return (
    <main className="pt-24 pb-20 px-4 sm:px-8 md:px-12 lg:px-24">
      <h1 className="text-center text-3xl md:text-4xl font-semibold text-teal-700 mb-6">
        Our Portfolio
      </h1>

      {/* Mobile Dropdown */}
      <div className="sm:hidden mb-6">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full border border-teal-400 rounded px-4 py-2 text-teal-700 focus:outline-none"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat === "all"
                ? "All"
                : cat.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/\b\w/g, (c) => c.toUpperCase())}
            </option>
          ))}
        </select>
      </div>

      {/* Desktop Filter Buttons */}
      <div className="hidden sm:flex flex-wrap justify-center gap-2 mb-10 overflow-x-auto scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-300 whitespace-nowrap
              ${selectedCategory === cat
                ? "bg-teal-600 text-white border-teal-600"
                : "bg-white text-teal-700 border-teal-300 hover:bg-teal-100"}`}
          >
            {cat === "all"
              ? "All"
              : cat.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/\b\w/g, (c) => c.toUpperCase())}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div
        key={selectedCategory}
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
      >
        {filtered.map((img, index) => (
          <div
            key={`${img.src}-${index}`}
            onClick={() => {
              setCurrentIndex(index);
              setIsModalOpen(true);
            }}
            className="relative w-full h-48 sm:h-56 md:h-64 overflow-hidden rounded-lg shadow-md group cursor-pointer"
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
              className="object-cover transition-transform duration-500 ease-in-out scale-100 group-hover:scale-105"
            />
          </div>
        ))}
      </div>

      {/* Modal Viewer */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        images={filtered}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
      />
    </main>
  );
}
