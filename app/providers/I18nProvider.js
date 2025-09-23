
"use client";
import i18n from "../i18n";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function I18nProvider({ children }) {
  const [mounted, setMounted] = useState(false);
  const { i18n, ready } = useTranslation();
  
  const getDir = (lang) => {
    if (["ar", "ur", "fa", "he"].includes(lang)) return "rtl";
    return "ltr";
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && ready && typeof document !== "undefined") {
      document.documentElement.lang = i18n.language;
      document.documentElement.dir = getDir(i18n.language);
    }
  }, [i18n.language, mounted, ready]);

  return <>{children}</>;
}
