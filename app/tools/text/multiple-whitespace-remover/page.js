"use client";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Scissors, Brush, Clipboard } from "lucide-react";

const MultipleWhiteSpaceRemover = () => {
  const [text, setText] = useState("");
  const { t } = useTranslation("common");

  const removeExtraSpaces = () => {
    const cleanText = text.replace(/\s+/g, " ").trim();
    setText(cleanText);
  };

  return (
    <main className="mt-2 md:mt-8 flex flex-col px-4 sm:px-6 md:px-16 lg:px-24 xl:px-32 py-4 w-full">
      {/* Header */}
      <div className="flex flex-col items-end self-start md:mb-4">
        <h1 id="white-space-remover-title" className="text-lg md:text-3xl font-semibold uppercase" >{t("multipleWhiteSpaceRemover")}</h1>
        <div className="w-24 h-0.5 bg-primary rounded-full self-end"></div>
      </div>

      {/* Textarea with accessibility */}
      <label
        htmlFor="white-space-remover-input"
        className="sr-only"
      >
        {t("textareaPlaceholder")}
      </label>
      <textarea
        id="white-space-remover-input"
        aria-labelledby="white-space-remover-title"
        aria-describedby="character-count"
        onChange={(e) => setText(e.target.value)}
        className="border border-gray-400 px-4 py-2 text-base md:text-lg font-light rounded mt-4 outline-primary text-justify resize-y w-full"
        value={text}
        placeholder={t("textareaPlaceholder")}
        rows={10}
      ></textarea>

      {/* Character Count */}
      <p
        id="character-count"
        className="text-sm mt-2 text-gray-600"
      >
        {text.length} {t("charactersCount")}
      </p>

      {/* Remove spaces button */}
      <button
        onClick={removeExtraSpaces}
        className="flex gap-3 items-center justify-center cursor-pointer w-full px-6 py-3 mt-3 bg-primary hover:bg-primary-dull transition text-white rounded-lg text-base md:text-lg"
        aria-label={t("removeMultipleSpacesBtn")}
      >
        <Scissors className="w-5 h-5" aria-hidden="true" />
        {t("removeMultipleSpacesBtn")}
      </button>

      {/* Reset & Copy buttons */}
      <div className="flex flex-col sm:flex-row items-center mt-4 gap-3 w-full">
        {/* Reset */}
        <button
          onClick={() => setText("")}
          className="flex gap-3 items-center justify-center cursor-pointer w-full px-6 py-3 bg-primary hover:bg-primary-dull transition text-white rounded text-base md:text-lg"
          aria-label={t("resetBtn")}
        >
          <Brush className="w-5 h-5" aria-hidden="true" />
          {t("resetBtn")}
        </button>

        {/* Copy */}
        <button
          onClick={() =>
            navigator.clipboard
              .writeText(text)
              .then(() => alert(t("copiedAlert")))
          }
          className="flex gap-3 items-center justify-center cursor-pointer w-full px-6 py-3 bg-primary hover:bg-primary-dull transition text-white rounded text-base md:text-lg"
          aria-label={t("copyTextBtn")}
        >
          <Clipboard className="w-5 h-5" aria-hidden="true" />
          {t("copyTextBtn")}
        </button>
      </div>
    </main>
  );
};

export default MultipleWhiteSpaceRemover;
