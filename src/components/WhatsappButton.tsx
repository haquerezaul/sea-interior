"use client";

import React from "react";
import { FaWhatsapp } from "react-icons/fa";

const WhatsAppButton = () => {
  const phoneNumber = "917439315210"; // Include country code (91 for India)
  const message = "Hey! I want to add some life to my space. Can you please revert with a call!";
  const waUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={waUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50"
    >
      <div className="bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg transition-all duration-300">
        <FaWhatsapp size={28} />
      </div>
    </a>
  );
};

export default WhatsAppButton;