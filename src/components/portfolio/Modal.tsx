"use client";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    images: { src: string; alt: string }[];
    currentIndex: number;
    setCurrentIndex: React.Dispatch<React.SetStateAction<number>>; // ✅ Fix here
  }

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  images,
  currentIndex,
  setCurrentIndex,
}) => {
  if (!isOpen || !images || images.length === 0) return null;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const currentImage = images[currentIndex];

  const handleShare = () => {
    const msg = `Check out this interior design image:\n${window.location.origin}${currentImage.src}`;
    const url = `https://wa.me/?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-[9999] flex items-center justify-center p-4">
      <button
        onClick={onClose}
        className="absolute top-5 right-5 text-white hover:text-red-400"
      >
        <X size={32} />
      </button>

      <button
        onClick={handlePrev}
        className="absolute left-5 top-1/2 -translate-y-1/2 text-white hover:text-teal-300"
      >
        <ChevronLeft size={40} />
      </button>

      <div className="max-w-full max-h-[80vh]">
        <img
          src={currentImage.src}
          alt={currentImage.alt}
          className="rounded shadow-xl object-contain max-h-[80vh] mx-auto"
        />
        <div className="text-center mt-4">
          <button
            onClick={handleShare}
            className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700"
          >
            Share on WhatsApp
          </button>
        </div>
      </div>

      <button
        onClick={handleNext}
        className="absolute right-5 top-1/2 -translate-y-1/2 text-white hover:text-teal-300"
      >
        <ChevronRight size={40} />
      </button>
    </div>
  );
};

export default Modal;