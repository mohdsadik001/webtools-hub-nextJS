"use client";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Copy,
  RefreshCcw,
  Shield,
  CheckCircle2,
} from "lucide-react"; // ✅ Lucide icons

const PasswordGenerator = () => {
  const [length, setLength] = useState(16);
  const [includeUpper, setIncludeUpper] = useState(true);
  const [includeLower, setIncludeLower] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [password, setPassword] = useState("");
  const [copyMsg, setCopyMsg] = useState("");

  const { t } = useTranslation("common");

  const upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowerChars = "abcdefghijklmnopqrstuvwxyz";
  const numberChars = "0123456789";
  const symbolChars = "!@#$%^&*()_+-=[]{}|;:',.<>/?";

  const generatePassword = () => {
    let charPool = "";
    if (includeUpper) charPool += upperChars;
    if (includeLower) charPool += lowerChars;
    if (includeNumbers) charPool += numberChars;
    if (includeSymbols) charPool += symbolChars;

    if (!charPool) {
      setPassword("");
      return;
    }

    let generated = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charPool.length);
      generated += charPool[randomIndex];
    }
    setPassword(generated);
  };

  const copyToClipboard = () => {
    if (!password) return;
    navigator.clipboard.writeText(password);
    setCopyMsg(t("copiedAlert"));
    setTimeout(() => setCopyMsg(""), 1500);
  };

  // Strength indicator
  const getStrength = () => {
    let score = 0;
    if (includeUpper) score++;
    if (includeLower) score++;
    if (includeNumbers) score++;
    if (includeSymbols) score++;
    if (length >= 12) score++;

    if (score <= 2) return { label: t("strengthWeak"), color: "text-red-600" };
    if (score === 3 || score === 4)
      return { label: t("strengthMedium"), color: "text-yellow-600" };
    if (score === 5)
      return { label: t("strengthStrong"), color: "text-green-600" };
  };

  const strength = getStrength();

  return (
    <main
      className="min-h-[92vh] flex flex-col justify-center items-center bg-gradient-to-br from-indigo-50 to-purple-100 dark:from-gray-900 dark:to-gray-800 px-4 py-12"
      aria-labelledby="password-generator-title"
    >
      <section className="bg-white dark:bg-gray-900 shadow-xl rounded-2xl p-8 max-w-lg w-full transition">
        {/* Title */}
        <h2
          id="password-generator-title"
          className="text-3xl font-bold text-center text-primary mb-6"
        >
          {t("passwordGeneratorTitle")}
        </h2>

        {/* Length Slider */}
        <div className="mb-6">
          <label
            htmlFor="length"
            className="block font-semibold mb-2 text-gray-800 dark:text-gray-200"
          >
            {t("passwordLengthLabel")}: <span>{length}</span>
          </label>
          <input
            type="range"
            id="length"
            min={8}
            max={32}
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full accent-primary"
            aria-valuemin={8}
            aria-valuemax={32}
            aria-valuenow={length}
            aria-label={t("passwordLengthLabel")}
          />
        </div>

        {/* Checkboxes */}
        <fieldset className="grid grid-cols-2 gap-4 mb-6">
          <legend className="sr-only">{t("optionsLegend")}</legend>

          <label className="flex items-center gap-2 text-gray-700 dark:text-gray-200">
            <input
              type="checkbox"
              checked={includeUpper}
              onChange={() => setIncludeUpper((prev) => !prev)}
              className="accent-purple-600"
              aria-label={t("includeUppercaseLabel")}
            />
            {t("includeUppercaseLabel")}
          </label>

          <label className="flex items-center gap-2 text-gray-700 dark:text-gray-200">
            <input
              type="checkbox"
              checked={includeLower}
              onChange={() => setIncludeLower((prev) => !prev)}
              className="accent-purple-600"
              aria-label={t("includeLowercaseLabel")}
            />
            {t("includeLowercaseLabel")}
          </label>

          <label className="flex items-center gap-2 text-gray-700 dark:text-gray-200">
            <input
              type="checkbox"
              checked={includeNumbers}
              onChange={() => setIncludeNumbers((prev) => !prev)}
              className="accent-purple-600"
              aria-label={t("includeNumbersLabel")}
            />
            {t("includeNumbersLabel")}
          </label>

          <label className="flex items-center gap-2 text-gray-700 dark:text-gray-200">
            <input
              type="checkbox"
              checked={includeSymbols}
              onChange={() => setIncludeSymbols((prev) => !prev)}
              className="accent-purple-600"
              aria-label={t("includeSymbolsLabel")}
            />
            {t("includeSymbolsLabel")}
          </label>
        </fieldset>

        {/* Generate Button */}
        <button
          onClick={generatePassword}
          className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 cursor-pointer text-white py-3 rounded-lg font-semibold transition focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          aria-label={t("generatePasswordBtn")}
        >
          <RefreshCcw className="w-5 h-5" />
          {t("generatePasswordBtn")}
        </button>

        {/* Password Display */}
        {password && (
          <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-between font-mono text-lg break-all select-all">
            <span className="truncate">{password}</span>
            <button
              onClick={copyToClipboard}
              className="ml-4 flex items-center gap-1 text-white hover:bg-primary/90 bg-primary px-3 py-2 rounded cursor-pointer transition focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              aria-label={t("copyBtn")}
            >
              <Copy className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Strength Indicator */}
        {password && (
          <p
            className={`mt-3 text-center font-semibold flex items-center justify-center gap-2 ${strength.color}`}
          >
            <Shield className="w-5 h-5" />
            {t("strengthLabel")}: {strength.label}
          </p>
        )}

        {/* Copy Alert */}
        <div
          role="status"
          aria-live="polite"
          className="text-center mt-2 text-sm text-green-600 h-4"
        >
          {copyMsg && (
            <span className="flex items-center justify-center gap-1">
              <CheckCircle2 className="w-4 h-4" /> {copyMsg}
            </span>
          )}
        </div>
      </section>
    </main>
  );
};

export default PasswordGenerator;
