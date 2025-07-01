import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    const jwt = new JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: process.env.GOOGLE_PRIVATE_KEY!.replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const doc = new GoogleSpreadsheet(process.env.GOOGLE_QUOTE_SHEET_ID!, jwt);
    await doc.loadInfo();

    const sheet = doc.sheetsByTitle["Sheet1"]; // ✅ This is the correct tab name
    const rows = await sheet.getRows();
    console.log("First row sample:", rows[0]);

    const pricingData = rows.map((row: any) => ({
        category: row._rawData[0],
        subcategory: row._rawData[1],
        style: row._rawData[2],
        unitType: row._rawData[3],
        unitPrice: parseFloat(row._rawData[4]),
      }));
      
    return NextResponse.json({ data: pricingData });

  } catch (error: any) {
    console.error("Pricing API Error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
