// src/app/full-home/page.tsx

"use client";

import React from "react";
import EstimatorLayout from "@/components/FullHomeEstimator/EstimatorLayout";

const FullHomeEstimatorPage = () => {
  return (
    <div>
         <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black/40 to-transparent z-0 pointer-events-none" />
      <EstimatorLayout />
    </div>
  );
};

export default FullHomeEstimatorPage;
