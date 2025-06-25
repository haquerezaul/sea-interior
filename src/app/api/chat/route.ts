import { NextRequest, NextResponse } from "next/server";
import { getMrDesignerReply } from "@/lib/mrDesigner";

export async function POST(req: NextRequest) {
  const { userMessage } = await req.json();

  try {
    const reply = await getMrDesignerReply(userMessage);
    return NextResponse.json({ text: reply });
  } catch (err: any) {
    console.error("Chatbot error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
