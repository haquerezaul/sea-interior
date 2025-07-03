"use client";

import React, { useEffect, useState } from "react";
import { FullHomeFormData } from "./types";
import Step1_HomeType from "./Step1_HomeType";
import Step2_Furniture from "./Step2_Furniture";
import Step3_Services from "./Step3_Services";
import Step4_Quote from "./Step4_Quote";

interface PriceItem {
  category: string;
  subcategory: string;
  style: string;
  unitPrice: number;
}

export default function EstimatorLayout() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FullHomeFormData>({
    homeType: "",
    carpetArea: "",
    furniture: {},
    services: {
      list: {},
      flooring: {},
    },
    userInfo: {
      name: "",
      phone: "",
      location: "",
      pincode: "",
    },
  });

  const [groupedFurniture, setGroupedFurniture] = useState<Record<string, string[]>>({});
  const [serviceCategories, setServiceCategories] = useState<string[]>([]);
  const [flooringOptions, setFlooringOptions] = useState<string[]>([]);

  useEffect(() => {
    async function fetchAndGroup() {
      try {
        const res = await fetch("/api/quote/prices");
        const json = await res.json();
        const data: PriceItem[] = json.data;

        const furnitureRaw: Record<string, string[]> = {};
        const servicesSet = new Set<string>();
        const flooringSet = new Set<string>();

        data.forEach((item) => {
          const cat = item.category;
          const sub = item.subcategory;

          if (cat === "Services") {
            servicesSet.add(sub);
          } else if (cat === "Flooring") {
            flooringSet.add(sub);
          } else {
            if (!furnitureRaw[cat]) furnitureRaw[cat] = [];
            if (!furnitureRaw[cat].includes(sub)) {
              furnitureRaw[cat].push(sub);
            }
          }
        });

        // 🔁 Expand Bedroom based on BHK
        const expandedFurniture: Record<string, string[]> = {};

        Object.entries(furnitureRaw).forEach(([cat, subs]) => {
          if (cat === "Bedroom") {
            const match = formData.homeType.match(/(\d+)/);
            const bhkCount = match ? parseInt(match[1]) : 1;

            for (let i = 1; i <= bhkCount; i++) {
              expandedFurniture[`Bedroom ${i}`] = subs;
            }
          } else {
            expandedFurniture[cat] = subs;
          }
        });

        setGroupedFurniture(expandedFurniture);
        setServiceCategories(Array.from(servicesSet));
        setFlooringOptions(Array.from(flooringSet));
      } catch (err) {
        console.error("Failed to fetch or process data", err);
      }
    }

    fetchAndGroup();
  }, [formData.homeType]); // 🧠 Re-run when homeType changes

  return (
    <div className="pt-24 bg-teal-50 min-h-screen">
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold text-center mb-8 text-teal-600 z-10">
          Full Home Interior Quote Estimator
        </h1>

        <div className="mb-8 flex justify-between text-black">
          {["Home Type", "Furniture", "Services", "Quote"].map((label, idx) => (
            <div
              key={label}
              className={`flex-1 text-center border-b-2 pb-2 ${
                step === idx + 1 ? "border-green-600 font-semibold" : "border-gray-300"
              }`}
            >
              {idx + 1}. {label}
            </div>
          ))}
        </div>

        {step === 1 && (
          <Step1_HomeType
            formData={formData}
            setFormData={setFormData}
            next={() => setStep(2)}
          />
        )}
        {step === 2 && (
          <Step2_Furniture
            formData={formData}
            setFormData={setFormData}
            next={() => setStep(3)}
            prev={() => setStep(1)}
            groupedFurniture={groupedFurniture}
          />
        )}
        {step === 3 && (
          <Step3_Services
            formData={formData}
            setFormData={setFormData}
            next={() => setStep(4)}
            prev={() => setStep(2)}
            serviceList={serviceCategories}
            flooringOptions={flooringOptions}
          />
        )}
        {step === 4 && (
          <Step4_Quote
            formData={formData}
            setFormData={setFormData}
            prev={() => setStep(3)}
          />
        )}
      </div>
    </div>
  );
}
