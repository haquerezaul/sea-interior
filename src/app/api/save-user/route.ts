import { NextRequest, NextResponse } from 'next/server';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

export async function POST(req: NextRequest) {
  try {
    const { name, phone, location, pincode } = await req.json();

    const jwt = new JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: process.env.GOOGLE_PRIVATE_KEY!.replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID!, jwt);
    await doc.loadInfo(); // can fail
    const sheet = doc.sheetsByIndex[0];
    await sheet.addRow({ Name: name, Phone: phone, Location: location, Pincode: pincode });

    return NextResponse.json({ message: 'User data saved!' });

  } catch (error: any) {
    console.error('Save user error:', error.message);
    return NextResponse.json({ error: error.message || 'Something went wrong' }, { status: 500 });
  }
}
