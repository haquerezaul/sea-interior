// src/components/QuoteEstimator/EstimatorLayout.tsx

'use client';

import React, { useEffect, useRef, useState } from 'react';
import RoomSection from './RoomSection';
import QuoteSummary from './QuoteSummary';
import MrDesignerChatbot from '../MrDesignerChatbot';
import { generateQuotePDF } from '@/lib/generateQuotePDF';

// Types
export type PricingItem = {
  category: string;
  subcategory: string;
  style: string;
  unitType: string;
  unitPrice: number;
};

export type SelectedItem = {
  category: string;
  subcategory: string;
  style: string;
  unitType: string;
  unitPrice: number;
  quantity: number;
};

export default function EstimatorLayout() {
  const [data, setData] = useState<PricingItem[]>([]);
  const [groupedData, setGroupedData] = useState<Record<string, PricingItem[]>>({});
  const [loading, setLoading] = useState(true);
  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([]);
  const [chatOpen, setChatOpen] = useState(false);
  const [userDetails, setUserDetails] = useState<any | null>(null);
  const downloadTriggered = useRef(false);

  // Fetch pricing data
  useEffect(() => {
    async function fetchPricing() {
      try {
        const res = await fetch('/api/quote/prices');
        const json = await res.json();
        setData(json.data);
      } catch (err) {
        console.error('Failed to load pricing data:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchPricing();
  }, []);

  // Group data into categories
  useEffect(() => {
    const grouped: Record<string, PricingItem[]> = {};
    data.forEach((item) => {
      if (!grouped[item.category]) grouped[item.category] = [];
      grouped[item.category].push(item);
    });
    setGroupedData(grouped);
  }, [data]);

  // Handle selection changes
  const handleItemUpdate = (updatedItem: SelectedItem) => {
    setSelectedItems((prevItems) => {
      const existingIndex = prevItems.findIndex(
        (item) =>
          item.category === updatedItem.category &&
          item.subcategory === updatedItem.subcategory &&
          item.style === updatedItem.style
      );

      if (updatedItem.quantity === 0) {
        return prevItems.filter((_, index) => index !== existingIndex);
      }

      if (existingIndex !== -1) {
        const updated = [...prevItems];
        updated[existingIndex] = updatedItem;
        return updated;
      } else {
        return [...prevItems, updatedItem];
      }
    });
  };

  // Triggered on PDF Download button
  const handleDownloadClick = () => {
    const stored = localStorage.getItem('sea_user_info');
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed?.name && parsed?.phone && parsed?.location && parsed?.pincode) {
        generatePDF(parsed);
        return;
      }
    }
    setChatOpen(true);
    downloadTriggered.current = true;
  };

  // Callback after chatbot collects user info
  const handleUserDetailsCollected = (user: any) => {
    setUserDetails(user);
  };

  // Generate PDF after data is available
  useEffect(() => {
    if (userDetails && downloadTriggered.current) {
      generatePDF(userDetails);
      downloadTriggered.current = false;
    }
  }, [userDetails, selectedItems]);

  // PDF Generator
  const generatePDF = (user: any) => {
    const grouped = selectedItems.reduce((acc, item) => {
      if (!acc[item.category]) acc[item.category] = [];
      acc[item.category].push({
        name: `${item.subcategory} (${item.style})`,
        quantity: item.quantity,
        unitCost: item.unitPrice,
      });
      return acc;
    }, {} as Record<string, any[]>);

    const total = selectedItems.reduce(
      (sum, item) => sum + item.unitPrice * item.quantity,
      0
    );

    generateQuotePDF({
      user,
      homeType: 'Custom',
      carpetArea: 'Not specified',
      groupedItems: grouped,
      total,
    });
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;

  return (
    <>
      <div className="max-w-6xl mx-auto px-4 pt-24 text-center space-y-6">
        <h1 className="text-2xl font-bold text-teal-700 mb-4">Interior Quote Estimator</h1>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b pb-4">
          <button
            onClick={handleDownloadClick}
            className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md w-fit"
          >
            Download Estimate PDF
          </button>

          <QuoteSummary selectedItems={selectedItems} />
        </div>

        {Object.entries(groupedData).map(([category, items]) => (
          <RoomSection
            key={category}
            category={category}
            items={items}
            onItemChange={handleItemUpdate}
          />
        ))}
      </div>

      {chatOpen && (
        <MrDesignerChatbot
          mode="collect-only"
          position="centered"
          onComplete={(user) => {
            setUserDetails(user);
            setChatOpen(false);
          }}
        />
      )}
    </>
  );
}
