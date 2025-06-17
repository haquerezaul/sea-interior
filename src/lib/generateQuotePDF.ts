// utils/generateQuotePDF.ts
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import logoBase64 from "@/lib/ logoBase64"; // Ensure this file exports a Base64 JPEG string

interface PDFInput {
  user: {
    name: string;
    email: string;
    phone: string;
    location: string;
  };
  homeType: string;
  carpetArea: string;
  groupedItems: Record<string, any[]>;
  total: number;
}

export const generateQuotePDF = ({ user, homeType, carpetArea, groupedItems, total }: PDFInput) => {
  const doc = new jsPDF();

  doc.addImage(logoBase64, "JPEG", 150, 10, 40, 20);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.setTextColor("#000");
  doc.text("Sea Interior", 14, 20);

  // doc.setFontSize(16);
  // doc.text("Interior Design Estimate", 14, 20);

  doc.setFontSize(12);
  doc.setTextColor("#000");
  doc.text(`Name: ${user.name}`, 14, 30);
  doc.text(`Phone: ${user.phone}`, 14, 36);
  doc.text(`Email: ${user.email}`, 14, 42);
  doc.text(`Location: ${user.location}`, 14, 48);
  doc.text(`Home Type: ${homeType}`, 14, 54);
  doc.text(`Carpet Area: ${carpetArea} sqft`, 14, 60);

  let yPos = 70;

  Object.entries(groupedItems).forEach(([section, items]) => {
    doc.setFontSize(13);
    doc.text(section, 14, yPos);
    yPos += 6;

    autoTable(doc, {
      startY: yPos,
      head: [["Particulars", "Quantity", "Unit Cost", "Amount"]],
      body: (items || []).map((item) => [
        item.name,
        item.quantity,
        "Rs. " + item.unitCost.toLocaleString("en-IN", { maximumFractionDigits: 0 }),
        "Rs. " + (item.quantity * item.unitCost).toLocaleString("en-IN", { maximumFractionDigits: 0 }),
      ]),
      margin: { left: 14 },
      theme: "plain",
      styles: {
        fontSize: 10,
        textColor: "#000",
        lineColor: "#14b8a6",
        lineWidth: 0.1
      },
      headStyles: {
        fillColor: "#14b8a6",
        textColor: "#000",
        fontStyle: "bold"
      },
    });

    yPos = (doc as any).lastAutoTable.finalY + 10;
  });

  doc.setFontSize(14);
  doc.setTextColor("#000");
  doc.text("Grand Total: Rs. " + total.toLocaleString("en-IN", { maximumFractionDigits: 0 }), 14, yPos + 10);

  doc.setFontSize(10);
  doc.setTextColor("#000");
  doc.text("Thank you for choosing Sea Interior. Let’s bring life to your space!", 14, 285);

  doc.save(`Interior_Estimate_${user.name.replace(/\s+/g, "_")}.pdf`);
};
