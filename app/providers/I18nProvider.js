"use client";

import { useEffect } from "react";
import { useTranslation } from "react-i18next";

export default function I18nProvider({ children }) {
  const { i18n } = useTranslation();

  const getDir = (lang) => {
    if (["ar", "ur", "fa", "he"].includes(lang)) return "rtl";
    return "ltr";
  };

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = i18n.language;
      document.documentElement.dir = getDir(i18n.language);
    }
  }, [i18n.language]);

  return <>{children}</>;
}
