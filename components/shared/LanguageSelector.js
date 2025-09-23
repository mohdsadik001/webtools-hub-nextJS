"use client";
import i18n from "../../app/i18n";

const LanguageSelector = () => {
  const languages = [
    {
      name: "English",
      lang_code: "en",
      flag: "🇺🇸",
    },
    {
      name: "हिन्दी",
      lang_code: "hi",
      flag: "🇮🇳",
    },
    {
      name: "Français",
      lang_code: "fr",
      flag: "🇫🇷",
    },
    {
      name: "اردو",
      lang_code: "ur",
      flag: "🇵🇰",
    },
  ];

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
<<<<<<< HEAD:components/LanguageSelector.js
=======
    document.documentElement.lang = lang;
    document.documentElement.dir = ["ur", "ar", "fa", "he"].includes(lang)
      ? "rtl"
      : "ltr";
>>>>>>> test:components/shared/LanguageSelector.js
  };

  return (
    <select
      className="p-2 rounded border text-black"
      name="lang"
      id="lang"
<<<<<<< HEAD:components/LanguageSelector.js
      value={i18n.language} 
=======
      value={i18n.language}
>>>>>>> test:components/shared/LanguageSelector.js
      onChange={(e) => changeLanguage(e.target.value)}
    >
      {languages.map((lang) => (
        <option key={lang.lang_code} value={lang.lang_code}>
          {lang.flag} {lang.name}
        </option>
      ))}
    </select>
  );
};

export default LanguageSelector;
