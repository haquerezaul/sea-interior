"use client";

import React, { useState, useEffect } from "react";
import { generateQuotePDF } from "@/lib/generateQuotePDF";

interface QuoteStepProps {
  formData: any;
  setFormData: (data: any) => void;
  prev: () => void;
}

const QuoteStep: React.FC<QuoteStepProps> = ({ formData, setFormData, prev }) => {
  const { homeType, carpetArea, furniture, services, userInfo } = formData;
  const [showEstimate, setShowEstimate] = useState(false);
  const [saving, setSaving] = useState(false);
  const [unitPrices, setUnitPrices] = useState<Record<string, number>>({});

  useEffect(() => {
    async function fetchPrices() {
      try {
        const res = await fetch('/api/quote/prices');
        const json = await res.json();
        const priceMap: Record<string, number> = {};
        json.data.forEach((item: any) => {
          priceMap[item.subcategory] = item.unitPrice;
        });
        setUnitPrices(priceMap);
      } catch (err) {
        console.error('Failed to fetch dynamic prices:', err);
      }
    }
    fetchPrices();
  }, []);

  const flattenFurniture = (data: any) => {
    const items: any[] = [];
    Object.entries(data || {}).forEach(([section, values]: [string, any]) => {
      Object.entries(values || {}).forEach(([name, value]) => {
        if (typeof value === "number" && value > 0) {
          items.push({
            category: section,
            name,
            quantity: value,
            unitCost: unitPrices[name] || 1000,
          });
        } else if (typeof value === "string" && unitPrices[value]) {
          items.push({
            category: section,
            name: `${name}: ${value}`,
            quantity: 1,
            unitCost: unitPrices[value],
          });
        }
      });
    });
    return items;
  };

  const furnitureItems = flattenFurniture(furniture);

  const serviceItems = Array.isArray(services?.list)
    ? services.list.map((s: string) => ({
        category: "Services",
        name: s,
        quantity: parseFloat(carpetArea) || 1000,
        unitCost: unitPrices[s] || 100,
      }))
    : [];

  const flooringItems =
    services.flooring && services.flooring !== "None"
      ? [
          {
            category: "Flooring",
            name: services.flooring,
            quantity: parseFloat(carpetArea) || 1000,
            unitCost: unitPrices[services.flooring] || 100,
          },
        ]
      : [];

  const estimateItems = [...furnitureItems, ...serviceItems, ...flooringItems];

  const grouped = estimateItems.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, any[]>);

  const grandTotal = estimateItems.reduce(
    (sum, item) => sum + item.quantity * item.unitCost,
    0
  );

  const handleSaveToSheet = async () => {
    setSaving(true);
    try {
      const payload = {
        name: userInfo.name,
        phone: userInfo.phone,
        location: userInfo.location,
        pincode: userInfo.pincode || "",
        lead_source: "budget_calculator",
      };
      await fetch("/api/save-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch (err) {
      console.error("Failed to save user info to sheet:", err);
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
      groupedItems: grouped,
      total: grandTotal,
    });
  };

  const handleWhatsApp = async () => {
    await handleSaveToSheet();
    const msg = `Hey! I want to add some life to my space. My estimate details:\n\nHome Type: ${homeType}\nCarpet Area: ${carpetArea} sqft\nTotal Budget: ₹${grandTotal}\nName: ${userInfo.name}\nLocation: ${userInfo.location}`;
    const phone = "7439315210";
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
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
            className="w-full p-2 border rounded text-black hover:border-teal-700 focus:outline-none focus:border-teal-700"
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
            className="w-full p-2 border rounded text-black hover:border-teal-700 focus:outline-none focus:border-teal-700"
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
            className="w-full p-2 border rounded text-black hover:border-teal-700 focus:outline-none focus:border-teal-700"
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
        {Object.entries(grouped).map(([section, items]) => (
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
                {Array.isArray(items) &&
                  items.map((item: any, idx: number) => (
                    <tr key={idx}>
                      <td className="border text-black p-2">{item.name}</td>
                      <td className="border text-black p-2">{item.quantity}</td>
                      <td className="border text-black p-2">
                        ₹
                        {item.unitCost.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </td>
                      <td className="border text-black p-2">
                        ₹
                        {(item.quantity * item.unitCost).toLocaleString(
                          undefined,
                          {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          }
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>

      <div className="text-right text-teal-700 text-xl font-bold mt-6">
        Grand Total:{" "}
        <span className="text-teal-700">
          ₹
          {grandTotal.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </span>
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

export default QuoteStep;
