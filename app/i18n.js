"use client";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// *Importing English Translation
import commonEn from "../locales/en/common.json";
import navbarEn from "../locales/en/navbar.json";
import toolsEn from "../locales/en/tools.json";
import heroEn from "../locales/en/hero.json";

// *Importing Hindi Translation
import commonHi from "../locales/hi/common.json";
import navbarHi from "../locales/hi/navbar.json";
import toolsHi from "../locales/hi/tools.json";
import heroHi from "../locales/hi/hero.json";

// *Importing Urdu Translation
import commonUr from "../locales/ur/common.json";
import navbarUr from "../locales/ur/navbar.json";
import toolsUr from "../locales/ur/tools.json";
import heroUr from "../locales/ur/hero.json";

// *Importing French Translation
import commonFr from "../locales/fr/common.json";
import navbarFr from "../locales/fr/navbar.json";
import toolsFr from "../locales/fr/tools.json";
import heroFr from "../locales/fr/hero.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    debug: process.env.NODE_ENV === "development",
    resources: {
      en: { common: commonEn, navbar: navbarEn, tools: toolsEn, hero: heroEn },
      hi: { common: commonHi, navbar: navbarHi, tools: toolsHi, hero: heroHi },
      ur: { common: commonUr, navbar: navbarUr, tools: toolsUr, hero: heroUr },
      fr: { common: commonFr, navbar: navbarFr, tools: toolsFr, hero: heroFr },
    },
    defaultNS: "common",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
