import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import { AppContextProvider } from "@/app/Context/AppContext";
import "./i18n";
import ClientLayout from "@/components/ClientLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const metadata = {
  title: "WebTools Hub - All Online Tools in One Box",
  description:
    "WebTools Hub is a free all-in-one toolbox with text tools, converters, generators, and utilities to make your life easier. Explore tools without bookmark clutter.",
  keywords:
    "online tools, text tools, converters, generators, utilities, free web tools, WebTools Hub",
  authors: [{ name: "Mohd Sadik", url: "https://webtools-hub.vercel.app/" }],
  creator: "Mohd Sadik",
  publisher: "WebTools Hub",
  openGraph: {
    type: "website",
    title: "WebTools Hub - All Online Tools in One Box",
    description:
      "WebTools Hub is a free all-in-one toolbox for text tools, converters, generators, and utilities.",
    url: "https://webtools-hub.vercel.app/",
    siteName: "WebTools Hub",
  },
  robots: {
    index: true,
    follow: true,
  },
};
export default function RootLayout({ children }) {
  return (
    <html lang="en"> 
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ClientLayout>
          <AppContextProvider>
            <Navbar />
            <main>{children}</main>
          </AppContextProvider>
        </ClientLayout>
      </body>
    </html>
  );
}
