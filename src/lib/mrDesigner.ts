import { GoogleGenerativeAI } from "@google/generative-ai";
import OpenAI from "openai";

const SEA_INTERIOR_CONTEXT = `
Sea Interior is a Kolkata-based interior design company offering:
- Renovation, full home planning, furniture, painting
- False ceiling, electrical, plumbing, flooring

Serving:
- 1–4 BHK homes, offices, gym spaces

Known for:
- Trendy yet affordable designs (modular, luxury, full-home)
- 10+ years experience | 500+ spaces done | Client-centric approach
📍 Based in Kolkata
`;

const SIGN_OFF = `\n\nFor more details <a href="https://wa.me/917439301042" target="_blank" rel="noopener noreferrer" style="color:#0a9273;text-decoration:underline;">WhatsApp me at +91 74393 01042</a>.`;

const SYSTEM_PROMPT = `
You are Mr. Designer — a fun, friendly, AI interior assistant for Sea Interior.
Tone:
- Friendly, slightly humorous, Hinglish-English mix
- Sound like a smart friend (not robotic)
- Keep responses SHORT (3–5 lines)
- Ask only ONE question at a time

Guidelines:
- Give personalized interior advice using Sea Interior’s services
- Use casual phrases like: “Bilkul!”, “Don’t worry yaar”, “Ho jayega!”
- END with "${SIGN_OFF}" ONLY after data collection (not every reply)
`;

export async function getMrDesignerReply(userMessage: string) {
  const aiProvider = process.env.AI_PROVIDER;

  // ✅ Gemini Integration
  if (aiProvider === "gemini") {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: "You are Mr. Designer from Sea Interior. Follow the tone and instructions strictly." }],
        },
        {
          role: "model",
          parts: [{ text: "Namaste! Mr. Designer here 😎. Bataye kya help chahiye design ke liye?" }],
        },
      ],
      generationConfig: { temperature: 0.8 },
    });

    const result = await chat.sendMessage(
      `${SEA_INTERIOR_CONTEXT}\n\n${SYSTEM_PROMPT}\n\nUser said: ${userMessage}`
    );
    const response = await result.response;
    const text = (await response.text()).trim();
    return text || "Oops! Kuch issue aa gaya. Dubara try karein?";
  }

  // ✅ Groq (LLaMA 3) Integration
  if (aiProvider === "groq") {
    const openai = new OpenAI({
      apiKey: process.env.GROQ_API_KEY!,
      baseURL: "https://api.groq.com/openai/v1",
    });

    const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
      {
        role: "system",
        content: `${SYSTEM_PROMPT}\n${SEA_INTERIOR_CONTEXT}`,
      },
      {
        role: "user",
        content: userMessage,
      },
    ];

    const completion = await openai.chat.completions.create({
      model: "llama3-70b-8192",
      messages,
      temperature: 0.8,
      max_tokens: 300,
    });

    const reply = completion.choices[0]?.message?.content?.trim();
    return reply || "Oops! Reply generate nahi hua. Thoda wait karke try karo.";
  }

  // ❌ Fallback Error
  throw new Error("Invalid AI_PROVIDER. Set it to 'gemini' or 'groq' in .env");
}
