import React from "react";
import { CalendarCheck, HandCoins, Package, PackageOpen } from "lucide-react";

const benefits = [
  {
    icon: <CalendarCheck className="h-10 w-10  text-teal-600 mb-4 " />,
    title: "Save Time",
    description:
      "Realistic 3D model & top professional help to take the guesswork out of the designing process.",
  },
  {
    icon: <HandCoins className="h-10 w-10 text-teal-600  mb-4" />,
    title: "Save Money",
    description:
      "Top talent for up to 80% less than traditional interior design & trade discounts of 5% to 45% at the top vendors.",
  },
  {
    icon: <PackageOpen className="h-10 w-10 text-teal-600 mb-4" />,
    title: "Convenient & Stress Free",
    description:
      "A fun and easy white-glove service including everything from design to convenient ordering.",
  },
];

const BenefitsCards: React.FC = () => {
  return (
    <div className="w-full bg-white py-16 px-4 md:px-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {benefits.map((benefit, index) => (
          <div
            key={index}
            className="rounded-xl border border-gray-200 p-6 text-center shadow-sm hover:shadow-md transition-all"
          >
            <div className="flex justify-center">{benefit.icon}</div>
            <h3 className="text-xl font-serif font-semibold text-zinc-800 mb-2">
              {benefit.title}
            </h3>
            <p className="text-sm text-zinc-600 leading-relaxed">
              {benefit.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BenefitsCards;