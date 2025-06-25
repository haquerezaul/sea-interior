"use client";
import React, { useState } from "react";
import HomeTypeStep from "@/components/budget/HomeTypeStep";
import FurnitureStep from "@/components/budget/FurnitureStep";
import ServiceStep from "@/components/budget/ServiceStep";
import QuoteStep from "@/components/budget/QuoteStep";

const BudgetCalculatorPage = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    homeType: "",
    carpetArea: "",
    furniture: [], // ✅ This must be an array
    services: {
      list: [], // For checkboxes
      flooring: "", // For selected dropdown
    },
    userInfo: {
      name: "",
      email: "",
      phone: "",
      location: "",
    },
  });

  return (
    <div className="pt-24 bg-teal-50  min-h-screen  ">
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold text-center mb-8 text-teal-600 z-10">
          Home Interior Design Budget Calculator
        </h1>

        <div className="mb-8 flex justify-between text-black">
          {["Home Type", "Furniture", "Services", "Get Quote"].map((label, idx) => (
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

        {step === 1 && <HomeTypeStep formData={formData} setFormData={setFormData} next={() => setStep(2)} />}
        {step === 2 && <FurnitureStep formData={formData} setFormData={setFormData} next={() => setStep(3)} prev={() => setStep(1)} />}
        {step === 3 && <ServiceStep formData={formData} setFormData={setFormData} next={() => setStep(4)} prev={() => setStep(2)} />}
        {step === 4 && <QuoteStep formData={formData} setFormData={setFormData} prev={() => setStep(3)} />}
      </div>
    </div>
  );
};

export default BudgetCalculatorPage;
