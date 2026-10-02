import { Inter } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

export const metadata = {
  title: "Smart Education Platform | Intelligent Campus Management",
  description:
    "AI-powered academic timetable generator and smart classroom hub for modern campuses."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans bg-slate-50 text-slate-800">
        <AppProvider>
          <Navbar />
          <main className="flex-1 pb-16">{children}</main>
          <Footer />
          <ChatWidget />
        </AppProvider>
      </body>
    </html>
  );
}
