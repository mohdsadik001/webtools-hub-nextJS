import { Geist, Geist_Mono } from "next/font/google";
import { Inter } from "next/font/google";
import "./globals.css";
<<<<<<< HEAD
import Navbar from "../components/Navbar";
import { AppContextProvider } from "@/app/Context/AppContext";
import I18nProvider from "./providers/I18nProvider";
=======
import Header from "../components/layout/Header";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]/route";
import Providers from "./providers";
>>>>>>> test

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

<<<<<<< HEAD
=======
const inter = Inter({ subsets: ["latin"] });

>>>>>>> test
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

<<<<<<< HEAD
export default function RootLayout({ children }) {
  return (
    <html>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <I18nProvider>
          <AppContextProvider>
            <Navbar />
            <main>{children}</main>
          </AppContextProvider>
        </I18nProvider>
=======
export default async function RootLayout({ children, params }) {
  const { locale } = params || {};
  

  const session = await getServerSession(authOptions);

  return (
    <html lang={locale || 'en'}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased ${inter.className}`}
        suppressHydrationWarning={true}
      >

        <Providers session={session} locale={locale}>
          <Header />
          <main>{children}</main>
        </Providers>
>>>>>>> test
      </body>
    </html>
  );
}
