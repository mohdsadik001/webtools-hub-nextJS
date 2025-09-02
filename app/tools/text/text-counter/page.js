"use client";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const TextCounter = () => {
  const [text, setText] = useState("");
  const [charsCount, setCharsCount] = useState(0);
  const [wordsCount, setWordsCount] = useState(0);
  const [sentenceCount, setSentenceCount] = useState(0);

  const { t } = useTranslation("common");

  useEffect(() => {
    const cleanText = text || "";

    // Characters
    setCharsCount(cleanText.length);

    // Words
    setWordsCount(cleanText.trim().split(/\s+/).filter(Boolean).length);

    // Sentences
    setSentenceCount(
      (cleanText.match(/[^.!?]+[.!?]+["']?\s*/g) || []).length
    );
  }, [text]);

  return (
    <main
      className="mt-2 md:mt-8 flex flex-col px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 py-6"
      aria-labelledby="textCounterHeading"
    >
      {/* Heading */}
      <header className="flex flex-col items-end self-start md:mb-4">
        <h1 id="textCounterHeading" className="text-xl md:text-3xl font-semibold uppercase">{t("textCounter")}</h1>
        <div className="w-12 sm:w-16 h-0.5 bg-primary rounded-full"></div>
      </header>

      {/* Textarea Input */}
      <label htmlFor="text-input" className="sr-only">
        {t("textareaPlaceholder")}
      </label>
      <textarea
        id="text-input"
        onChange={(e) => setText(e.target.value)}
        className="w-full border border-gray-400 px-3 sm:px-4 py-2 sm:py-3 text-base sm:text-lg lg:text-xl font-light rounded mt-4 outline-primary resize-y"
        placeholder={t("textareaPlaceholder")}
        aria-describedby="textStats"
        rows={10}
      ></textarea>

      {/* Stats Section */}
      <section
        id="textStats"
        aria-live="polite"
        className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-6 mt-2"
      >
        {/* Characters */}
        <div className="p-4 flex flex-col items-center justify-around border border-primary rounded hover:bg-primary/10 focus-within:ring-2 focus-within:ring-primary">
          <p className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            {charsCount}
          </p>
          <p className="text-base sm:text-lg lg:text-xl">
            {charsCount === 1 ? t("characterSingular") : t("characterPlural")}
          </p>
        </div>

        {/* Words */}
        <div className="p-4 flex flex-col items-center justify-around border border-primary rounded hover:bg-primary/10 focus-within:ring-2 focus-within:ring-primary">
          <p className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            {wordsCount}
          </p>
          <p className="text-base sm:text-lg lg:text-xl">
            {wordsCount === 1 ? t("wordSingular") : t("wordPlural")}
          </p>
        </div>

        {/* Sentences */}
        <div className="p-4 flex flex-col items-center justify-around border border-primary rounded hover:bg-primary/10 focus-within:ring-2 focus-within:ring-primary">
          <p className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            {sentenceCount}
          </p>
          <p className="text-base sm:text-lg lg:text-xl">
            {sentenceCount === 1
              ? t("sentenceSingular")
              : t("sentencePlural")}
          </p>
        </div>
      </section>
    </main>
  );
};

export default TextCounter;
