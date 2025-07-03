'use client';

import React, { useEffect, useState } from "react";
import { generateQuotePDF } from "@/lib/generateQuotePDF";
import { FullHomeFormData } from "./types";

interface PriceItem {
  category: string;
  subcategory: string;
  style: string;
  unitPrice: number;
}

interface Props {
  formData: FullHomeFormData;
  setFormData: (data: FullHomeFormData) => void;
  prev: () => void;
}

const Step4_Quote: React.FC<Props> = ({ formData, setFormData, prev }) => {
  const { homeType, carpetArea, furniture, services, userInfo } = formData;

  const [unitPrices, setUnitPrices] = useState<Record<string, number>>({});
  const [groupedItems, setGroupedItems] = useState<Record<string, any[]>>({});
  const [grandTotal, setGrandTotal] = useState(0);
  const [showEstimate, setShowEstimate] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function fetchPrices() {
      try {
        const res = await fetch("/api/quote/prices");
        const json = await res.json();
        const map: Record<string, number> = {};
        json.data.forEach((item: PriceItem) => {
          const key = `${item.subcategory} (${item.style})`;
          map[key] = item.unitPrice;
        });
        setUnitPrices(map);
      } catch (err) {
        console.error("Failed to fetch prices", err);
      }
    }

    fetchPrices();
  }, []);

  useEffect(() => {
    const carpetQty = parseFloat(carpetArea) || 1000;
    const items: any[] = [];

    // Furniture
    Object.entries(furniture || {}).forEach(([room, itemsMap]) => {
      Object.entries(itemsMap).forEach(([itemName, { style, quantity }]) => {
        if (style && quantity > 0) {
          const key = `${itemName} (${style})`;
          items.push({
            category: room,
            name: key,
            quantity,
            unitCost: unitPrices[key] || 0,
          });
        }
      });
    });

    // Services
    Object.entries(services.list || {}).forEach(([serviceName, { style }]) => {
      if (style) {
        const key = `${serviceName} (${style})`;
        items.push({
          category: "Services",
          name: key,
          quantity: carpetQty,
          unitCost: unitPrices[key] || 0,
        });
      }
    });

    // Flooring
    Object.entries(services.flooring || {}).forEach(([flooringName, { style }]) => {
      if (style) {
        const key = `${flooringName} (${style})`;
        items.push({
          category: "Flooring",
          name: key,
          quantity: carpetQty,
          unitCost: unitPrices[key] || 0,
        });
      }
    });

    const grouped: Record<string, any[]> = {};
    items.forEach((item) => {
      if (!grouped[item.category]) grouped[item.category] = [];
      grouped[item.category].push(item);
    });

    setGroupedItems(grouped);
    setGrandTotal(items.reduce((sum, item) => sum + item.quantity * item.unitCost, 0));
  }, [furniture, services, unitPrices, carpetArea]);

  const handleSaveToSheet = async () => {
    setSaving(true);
    try {
      await fetch("/api/save-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: userInfo.name,
          phone: userInfo.phone,
          location: userInfo.location,
          pincode: userInfo.pincode || "",
          lead_source: "budget_calculator",
        }),
      });
    } catch (err) {
      console.error("Failed to save user info", err);
    } finally {
      setSaving(false);
    }
  };

  const handleDownload = async () => {
    await handleSaveToSheet();
    generateQuotePDF({
      user: userInfo,
      homeType,
      carpetArea,
      groupedItems,
      total: grandTotal,
    });
  };

  const handleWhatsApp = async () => {
    await handleSaveToSheet();
    const msg = `Hey! I want to add some life to my space. My estimate details:\n\nHome Type: ${homeType}\nCarpet Area: ${carpetArea} sqft\nTotal Budget: ₹${grandTotal.toLocaleString()}\nName: ${userInfo.name}\nLocation: ${userInfo.location}`;
    window.open(`https://wa.me/7439315210?text=${encodeURIComponent(msg)}`, "_blank");
  };

  if (!showEstimate) {
    return (
      <div>
        <h2 className="text-xl font-bold italic mb-4 text-black">
          Please fill in your details before viewing the estimate.
        </h2>
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            value={userInfo.name}
            onChange={(e) =>
              setFormData({
                ...formData,
                userInfo: { ...userInfo, name: e.target.value },
              })
            }
            className="w-full p-2 border rounded text-black"
          />
          <input
            type="text"
            placeholder="Phone"
            value={userInfo.phone}
            onChange={(e) =>
              setFormData({
                ...formData,
                userInfo: { ...userInfo, phone: e.target.value },
              })
            }
            className="w-full p-2 border rounded text-black"
          />
          <input
            type="text"
            placeholder="Location"
            value={userInfo.location}
            onChange={(e) =>
              setFormData({
                ...formData,
                userInfo: { ...userInfo, location: e.target.value },
              })
            }
            className="w-full p-2 border rounded text-black"
          />
          <button
            type="button"
            onClick={() => {
              if (userInfo.name && userInfo.phone && userInfo.location) {
                setShowEstimate(true);
              }
            }}
            className="bg-teal-600 text-white px-6 py-2 rounded"
          >
            Continue to Estimate
          </button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl text-black font-semibold mb-4">
        Your home interior estimate is almost ready!
      </h2>

      <div className="space-y-6">
        {Object.entries(groupedItems).map(([section, items]) => (
          <div key={section}>
            <h3 className="text-xl font-bold text-teal-600 mb-2">{section}</h3>
            <table className="w-full table-auto border border-gray-300 text-left text-sm">
              <thead className="bg-gray-100 text-black font-semibold">
                <tr>
                  <th className="border p-2">Particulars</th>
                  <th className="border p-2">Quantity</th>
                  <th className="border p-2">Unit Cost</th>
                  <th className="border p-2">Amount</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item: any, idx: number) => (
                  <tr key={idx}>
                    <td className="border text-black p-2">{item.name}</td>
                    <td className="border text-black p-2">{item.quantity}</td>
                    <td className="border text-black p-2">₹{item.unitCost.toLocaleString()}</td>
                    <td className="border text-black p-2">
                      ₹{(item.quantity * item.unitCost).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>

      <div className="text-right text-teal-700 text-xl font-bold mt-6">
        Grand Total: ₹{grandTotal.toLocaleString()}
      </div>

      <div className="mt-10 flex flex-col sm:flex-row gap-4">
        <button
          onClick={prev}
          className="bg-gray-300 text-gray-800 px-6 py-2 rounded-md"
        >
          Previous
        </button>
        <button
          onClick={handleDownload}
          className="bg-green-600 text-white px-6 py-2 rounded-md"
          disabled={saving}
        >
          {saving ? "Saving..." : "Download PDF"}
        </button>
        <button
          onClick={handleWhatsApp}
          className="bg-teal-600 text-white px-6 py-2 rounded-md"
          disabled={saving}
        >
          {saving ? "Saving..." : "Send on WhatsApp"}
        </button>
      </div>
    </div>
  );
};

export default Step4_Quote;
