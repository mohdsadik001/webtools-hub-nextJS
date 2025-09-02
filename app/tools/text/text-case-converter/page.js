"use client";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const TextCaseConverter = () => {
  const { t } = useTranslation("common");
  const [text, setText] = useState("");

  const upperCase = () => setText(text.toUpperCase());
  const sentenceCase = () => 
    setText(
      text
        .toLowerCase()
        .replace(/([.?!]\s*|^)([a-z])/g, (match, sep, char) => sep + char.toUpperCase())
    );
  const lowerCase = () => setText(text.toLowerCase());
  const titleCase = () =>
    setText(
      text
        .toLowerCase()
        .split(" ")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ")
    );
  const inverseCase = () =>
    setText(
      text
        .split("")
        .map((c) => (c === c.toLowerCase() ? c.toUpperCase() : c.toLowerCase()))
        .join("")
    );
  const mixedCase = () => {
    let result = "";
    for (let i = 0; i < text.length; i++) {
      result += i % 2 === 0 ? text[i].toLowerCase() : text[i].toUpperCase();
    }
    setText(result);
  };

  return (
    <main className="mt-2 md:mt-8 flex flex-col px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 py-4" role="main" aria-labelledby="case-converter-heading">
      {/* Title Section */}
      <div className="flex flex-col items-end self-start mb-4">
        <h1 id="case-converter-heading" className="text-2xl md:text-3xl font-semibold uppercase">{t("caseConverterTitle")}</h1>
        <div className="w-24 h-0.5 bg-primary rounded-full mt-1"></div>
      </div>

      {/* Buttons Section */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 w-full mt-5" role="group" aria-label={t("caseOptions")}>
        <button onClick={sentenceCase} className="focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer px-2 py-2 bg-white hover:bg-primary hover:text-white border-2 border-primary transition text-primary rounded-full text-base sm:text-lg">{t("sentenceCaseBtn")}</button>
        <button onClick={upperCase} className="focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer    px-2 py-2 bg-white hover:bg-primary hover:text-white border-2 border-primary transition text-primary rounded-full text-base sm:text-lg">{t("upperCaseBtn")}</button>
        <button onClick={lowerCase} className="focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer    px-2 py-2 bg-white hover:bg-primary hover:text-white border-2 border-primary transition text-primary rounded-full text-base sm:text-lg">{t("lowerCaseBtn")}</button>
        <button onClick={titleCase} className="focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer    px-2 py-2 bg-white hover:bg-primary hover:text-white border-2 border-primary transition text-primary rounded-full text-base sm:text-lg">{t("titleCaseBtn")}</button>
        <button onClick={mixedCase} className="focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer    px-2 py-2 bg-white hover:bg-primary hover:text-white border-2 border-primary transition text-primary rounded-full text-base sm:text-lg">{t("mixedCaseBtn")}</button>
        <button onClick={inverseCase} className="focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer  px-2 py-2 bg-white hover:bg-primary hover:text-white border-2 border-primary transition text-primary rounded-full text-base sm:text-lg">{t("inverseCaseBtn")}</button>
      </div>

      {/* Textarea Section */}
      <div className="mt-6 w-full">
        <label htmlFor="text-case-input" className="block mb-2 font-medium text-lg">{t("textareaPlaceholder")}</label>
        <textarea id="text-case-input" onChange={(e) => setText(e.target.value)} className="border border-gray-400 px-4 py-2 text-base sm:text-lg font-light rounded-md outline-primary text-justify w-full resize-y" value={text} placeholder={t("textareaPlaceholder")} required rows={10} aria-describedby="character-count" ></textarea>
      </div>

      {/* Character Count */}
      <p id="character-count" className="mt-2 text-sm text-gray-600">{text.length} {t("charactersCount")}</p>

      {/* Reset + Copy Buttons */}
      <div className="flex flex-col sm:flex-row items-center mt-4 gap-3 w-full">
        <button onClick={() => setText("")} className="flex gap-2 items-center justify-center cursor-pointer w-full sm:w-1/2 px-6 py-2 bg-primary hover:bg-primary-dull transition text-white rounded-md text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-primary" aria-label={t("resetBtn")}><i className="ri-brush-2-line" aria-hidden="true"></i>{t("resetBtn")}</button>
        <button onClick={() => navigator.clipboard.writeText(text).then(() => alert(t("copiedAlert")))} className="flex gap-2 items-center justify-center cursor-pointer w-full sm:w-1/2 px-6 py-2 bg-primary hover:bg-primary-dull transition text-white rounded-md text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-primary" aria-label={t("copyTextBtn")} ><i className="ri-clipboard-line" aria-hidden="true"></i>{t("copyTextBtn")}</button>
      </div>
    </main>
  );
};

export default TextCaseConverter;
