import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import { AppContextProvider } from "@/components/Context/AppContext";
import "./i18n";
import ClientLayout from "@/components/ClientLayout"; // ✅


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "WebTools Hub - Free Online Tools",
  description: "Free online tools for text conversion, currency conversion, unit converters, color picker, qr code generator, and more",
};

export default function RootLayout({ children }) {
  return (
    <ClientLayout>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AppContextProvider>
          <Navbar />
          {children}
        </AppContextProvider>
      </body>
    </ClientLayout>
  );
}
