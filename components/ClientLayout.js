"use client";

import { useTranslation } from "react-i18next";

export default function ClientLayout({ children }) {
  const { i18n } = useTranslation();

  // ✅ Manual fallback for dir
  const getDir = (lang) => {
    if (["ar", "ur", "fa", "he"].includes(lang)) return "rtl";
    return "ltr";
  };

  return (
    <html lang={i18n.language} dir={getDir(i18n.language)}>
      {children}
    </html>
  );
}
