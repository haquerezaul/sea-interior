"use client";
import React from "react";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";


const content = [
  {
    title: "⭐⭐⭐⭐",
    description:
      "Sea Interior completely transformed our living space into something out of a design magazine. They truly understood our taste and maximized every inch of the room without over-cluttering it. The use of textures and lighting was just perfect.\n — Ritika Sharma, Kolkata",
      content: (
        <div className="flex h-full w-full items-center justify-center text-white gap-7">
          <img
            src="/customer profile/ritika.jpg"
            width={300}
            height={300}
            className="h-full w-full object-cover   "
            alt="linear board demo"
          />
        </div>
      ),
  },
  {
    title: "⭐⭐⭐⭐⭐",
    description:
    "I hired Sea Interior to revamp my home office, and it’s now the most peaceful, motivating space I’ve ever worked in. Their team combined functionality with aesthetics beautifully. Highly recommend them for modern workspace design!\n — Aman Verma, Bangalore",
   
    content: (
      <div className="flex h-full w-full items-center justify-center text-white">
        <img
          src="/customer profile/verma.webp"
          width={300}
          height={300}
          className="h-full w-full object-contain object-fill rounded-md "
          alt="linear board demo"
        />
      </div>
    ),
  },
  {
    title: "⭐⭐⭐⭐⭐",
    description:
    "I thought hiring an interior designer would be expensive, but Sea Interior worked within our budget and still delivered a stunning 2BHK makeover. Every detail—from the layout to the color palette—was thoughtfully done.\n - Neha & Kunal Dey, Kolkata",
    content: (
        <div className="flex h-full w-full items-center justify-center text-white">
          <img
            src="/customer profile/kunal and neha.avif"
            width={300}
            height={300}
            className="h-full w-full object-contain object-fill rounded-md "
            alt="linear board demo"
          />
        </div>
      ),
  },
  {
    title: "⭐⭐⭐⭐",
    description:
      "What really stood out was the personalized consultation. The designers were patient, listened to all our ideas, and gave practical suggestions. The final outcome reflected our style while adding a professional touch.\n — Priya Singh, Mumbai",
      content: (
        <div className="flex h-full w-full items-center justify-center text-white">
          <img
            src="/customer profile/priya singh.jpeg"
            width={300}
            height={300}
            className="h-full w-full object-contain object-fill rounded-md "
            alt="linear board demo"
          />
        </div>
      ),
  },
];
export function CustomerReview() {
  return (
    <div className="w-full py-4 whitespace-pre-line">
      <StickyScroll content={content} />
    </div>
  );
}
