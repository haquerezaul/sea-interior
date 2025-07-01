import { NextRequest, NextResponse } from 'next/server';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

export async function POST(req: NextRequest) {
  try {
    const { name, phone, location, pincode, lead_source } = await req.json();
    console.log("📩 Data received:", { name, phone, location, pincode, lead_source });

    const jwt = new JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: process.env.GOOGLE_PRIVATE_KEY!.replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID!, jwt);
    await doc.loadInfo();
    console.log("📄 Spreadsheet title:", doc.title);

    const sheet = doc.sheetsByTitle["Sheet1"];
    if (!sheet) throw new Error("❌ Sheet1 not found!");

    console.log("✅ Sheet1 found. Adding row...");
    await sheet.addRow({
      Name: name,
      Phone: phone,
      Location: location,
      Pincode: pincode,
      Lead_Source: lead_source,
    });

    console.log("✅ Row added successfully");
    return NextResponse.json({ message: 'User data saved!' });

  } catch (error: any) {
    console.error('❌ Save user error:', error.message);
    return NextResponse.json({ error: error.message || 'Something went wrong' }, { status: 500 });
  }
}
