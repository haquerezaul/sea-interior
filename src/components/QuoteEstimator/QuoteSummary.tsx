// QuoteSummary.tsx

'use client';
import React, { useMemo } from 'react';

type SelectedItem = {
  category: string;
  subcategory: string;
  style: string;
  quantity: number;
  unitPrice: number;
  unitType: string;
};

type Props = {
  selectedItems: SelectedItem[];
};

const QuoteSummary: React.FC<Props> = ({ selectedItems }) => {
  const total = useMemo(() => {
    return selectedItems.reduce((sum, item) => {
      const qty = isNaN(item.quantity) ? 0 : item.quantity;
      return sum + qty * item.unitPrice;
    }, 0);
  }, [selectedItems]);

  if (selectedItems.length === 0) return null;

  return (
    <div className="mt-10 border-t pt-6 text-right">
      <h2 className="text-xl font-semibold text-teal-700">Estimated Total: ₹{total.toLocaleString()}</h2>
      <p className="text-sm text-gray-500">*This is an approximate cost based on your selections</p>
    </div>
  );
};

export default QuoteSummary;
