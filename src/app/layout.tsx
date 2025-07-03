import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Manrope } from "next/font/google";



import NavbarComponent from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsappButton";
import ChatbotButton from "@/components/ui/ChatbotButton";
import MrDesignerChatbot from "@/components/MrDesignerChatbot";

const manropeFont = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Sea-Interior",
  description: "Transforming Spaces with Elegance",
  icons: {
    icon: "/favicon3.png",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={` ${manropeFont.className} antialiased `}
      >
        <div className="relative">
      <div className="absolute top-6 left-0 w-full z-50">
          < NavbarComponent />
          </div>
        {children}
        </div>
        < Footer />
        <WhatsAppButton/>
        <MrDesignerChatbot/>
      </body>
    </html>
  );
}
