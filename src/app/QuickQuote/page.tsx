import React from "react";
import EstimatorLayout from "@/components/QuoteEstimator/EstimatorLayout";

const QuickQuotePage = () => {
  return (

    <div className="min-h-screen p-4 ">
           <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black/40 to-transparent z-0 pointer-events-none" />
      <EstimatorLayout />
    </div>
  );
};

export default QuickQuotePage;
