"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/app/Context/AppContext"; // adjust path if needed
import LanguageSelector from "./LanguageSelector";
import { useTranslation } from "react-i18next";
import { Menu, X, Search } from "lucide-react"; // ✅ Next icons

const Navbar = () => {
  const { searchQuery, setSearchQuery } = useAppContext();
  const router = useRouter();
  const { t } = useTranslation(["navbar", "common"]);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (searchQuery.length > 0) {
      router.push("/tools");
    }
  }, [searchQuery, router]);



  return (
    <main
      className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 relative transition-all h-[8vh]"
      role="navigation"
      aria-label={t("common:navigation")}
    >
      {/* Website Logo */}
      <button
        onClick={() => router.push("/")}
        className="text-2xl sm:text-3xl font-semibold cursor-pointer text-black focus:outline-none focus:ring-2 focus:ring-primary rounded"
        aria-label={t("common:goHome")}
      >
        <span className="text-primary font-bold">WebTools</span> Hub
      </button>

      {/* Desktop Nav Links */}
      <div className="hidden sm:flex items-center gap-8 text-black">
        <Link href="/" className="hover:text-primary focus:text-primary focus:outline-none">
          {t("home")}
        </Link>
        <Link href="/tools" className="hover:text-primary focus:text-primary focus:outline-none">
          {t("tools")}
        </Link>
        <Link href="/categories" className="hover:text-primary focus:text-primary focus:outline-none">
          {t("categories")}
        </Link>
        <Link href="/contact" className="hover:text-primary focus:text-primary focus:outline-none">
          {t("contact")}
        </Link>
        <Link href="/blogs" className="hover:text-primary focus:text-primary focus:outline-none">
          {t("blogs")}
        </Link>
      </div>

      {/* Desktop Right Side: Search + Language Selector */}
      <div className="hidden lg:flex items-center gap-4">
        <div className="flex items-center text-sm gap-2 border border-gray-300 px-4 rounded-full w-80">
          <input
            onChange={(e) => setSearchQuery(e.target.value)}
            className="py-2 w-full bg-transparent outline-none placeholder-gray-500"
            type="text"
            placeholder={t("common:searchPlaceholder")}
            aria-label={t("common:searchPlaceholder")}
          />
          <Search className="w-5 h-5 text-gray-500" aria-hidden="true" />
        </div>
        {/* ✅ Desktop Language Selector */}
        <LanguageSelector />
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="sm:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        aria-controls="mobile-menu"
        aria-expanded={menuOpen}
        aria-label={menuOpen ? t("common:closeMenu") : t("common:openMenu")}
      >
        {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Menu (Dropdown) */}
      {menuOpen && (
        <div
          id="mobile-menu"
          className="absolute top-[8vh] left-0 w-full bg-white shadow-md border-t border-gray-200 flex flex-col items-start px-6 py-4 space-y-4 sm:hidden z-50"
          role="menu"
          aria-label={t("common:mobileMenu")}
        >
          <Link
            href="/"
            className="w-full hover:text-primary focus:text-primary focus:outline-none"
            role="menuitem"
            onClick={() => setMenuOpen(false)}
          >
            {t("home")}
          </Link>
          <Link
            href="/tools"
            className="w-full hover:text-primary focus:text-primary focus:outline-none"
            role="menuitem"
            onClick={() => setMenuOpen(false)}
          >
            {t("tools")}
          </Link>
          <Link
            href="/categories"
            className="w-full hover:text-primary focus:text-primary focus:outline-none"
            role="menuitem"
            onClick={() => setMenuOpen(false)}
          >
            {t("categories")}
          </Link>
          <Link
            href="/contact"
            className="w-full hover:text-primary focus:text-primary focus:outline-none"
            role="menuitem"
            onClick={() => setMenuOpen(false)}
          >
            {t("contact")}
          </Link>

          {/* Mobile Search */}
          <div className="flex items-center text-sm gap-2 border border-gray-300 px-3 py-2 rounded-full w-full">
            <input
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent outline-none placeholder-gray-500"
              type="text"
              placeholder={t("common:searchPlaceholder")}
              aria-label={t("common:searchPlaceholder")}
            />
            <Search className="w-5 h-5 text-gray-500" aria-hidden="true" />
          </div>

          {/* ✅ Mobile Language Selector */}
          <div className="w-full">
            <LanguageSelector />
          </div>
        </div>
      )}
    </main>
  );
};

export default Navbar;
