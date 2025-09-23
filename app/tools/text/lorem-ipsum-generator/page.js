"use client";
<<<<<<< HEAD
import React, { useState } from "react";
import { loremWordPool } from "../../../../assets/data";
import { useTranslation } from "react-i18next";
import { Scissors, Brush, Clipboard } from "lucide-react";
=======
import React from 'react';
import LoremIpsumGenerator from '@/components/tools/LoremIpsumGenerator';
>>>>>>> test

const LoremIpsumGeneratorPage = () => <LoremIpsumGenerator />;

<<<<<<< HEAD
  const generateSentence = (avgWords) => {
    const length = Math.max(
      6,
      Math.round(avgWords + (Math.random() - 0.5) * 6)
    );
    const words = Array.from({ length }, () => {
      const word =
        loremWordPool[Math.floor(Math.random() * loremWordPool.length)];
      return word.toLowerCase();
    });
    words[0] = words[0][0].toUpperCase() + words[0].slice(1);
    return words.join(" ") + ".";
  };

  const startWithClassic = true;
  const classicStart =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ";
  const generateParagraph = (avgSentences, avgWords, isFirst = true) => {
    const sentenceCount = Math.max(
      2,
      Math.round(avgSentences + (Math.random() - 0.5) * 2)
    );
    const para = Array.from({ length: sentenceCount }, () =>
      generateSentence(avgWords)
    ).join(" ");
    return isFirst && startWithClassic ? classicStart + para : para;
  };

  const generateLorem = () => {
    const paras = Array.from({ length: paragraphs }, () =>
      generateParagraph(avgSentences, avgWords)
    );
    setOutput(paras);
  };

  const { t } = useTranslation("common");

  return (
    <div className="mt-2 md:mt-8 flex flex-col px-3 sm:px-6 md:px-10 lg:px-20 xl:px-32 py-4 mx-auto w-full">
      {/* Heading */}
      <div className="flex flex-col items-end self-start md:mb-4">
        <p className="text-xl md:text-3xl font-semibold uppercase break-words">{t("loremIpsum")}</p>
        <div className="w-10 sm:w-24 h-0.5 bg-primary rounded-full mt-1"></div>
      </div>

      {/* Input Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-5 w-full">
        <div>
          <label
            htmlFor="paragraphs-input"
            className="block mb-1 font-medium text-sm sm:text-base"
          >
            {t("paragraphCountPlaceholder")}
          </label>
          <input
            id="paragraphs-input"
            onChange={(e) => setParagraphs(Number(e.target.value))}
            className="border border-gray-400 px-2 py-2 sm:py-3 rounded outline-primary w-full text-sm sm:text-base"
            type="number"
            placeholder={t("paragraphCountPlaceholder")}
          />
        </div>
        <div>
          <label
            htmlFor="sentences-input"
            className="block mb-1 font-medium text-sm sm:text-base"
          >
            {t("sentenceCountPlaceholder")}
          </label>
          <input
            id="sentences-input"
            onChange={(e) => setAvgSentences(Number(e.target.value))}
            className="border border-gray-400 px-2 py-2 sm:py-3 rounded outline-primary w-full text-sm sm:text-base"
            type="number"
            placeholder={t("sentenceCountPlaceholder")}
          />
        </div>
        <div>
          <label
            htmlFor="words-input"
            className="block mb-1 font-medium text-sm sm:text-base"
          >
            {t("wordCountPlaceholder")}
          </label>
          <input
            id="words-input"
            onChange={(e) => setAvgWords(Number(e.target.value))}
            className="border border-gray-400 px-2 py-2 sm:py-3 rounded outline-primary w-full text-sm sm:text-base"
            type="number"
            placeholder={t("wordCountPlaceholder")}
          />
        </div>
        <div className="flex items-end">
          <button
            onClick={generateLorem}
            className="flex gap-2 items-center justify-center cursor-pointer w-full px-2 py-2 sm:py-3 rounded bg-primary hover:bg-primary-dull transition text-white text-base sm:text-lg"
          >
            <i className="ri-pencil-line"></i>
            {t("generateBtn")}
          </button>
        </div>
      </div>

      {/* Output Box */}
      <div className="border border-gray-400 px-2 sm:px-4 py-2 text-sm sm:text-base md:text-lg font-light rounded mt-5 outline-none text-justify min-h-[30vh] max-h-[50vh] overflow-auto transition-all duration-200 bg-white">
        <p className="text-xs sm:text-sm mb-2 text-gray-400">
          {t("loremIpsumTextLabel")}
        </p>
        {output.map((para, idx) => (
          <p key={idx} className="mb-3 leading-relaxed">
            {para}
          </p>
        ))}
      </div>

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

    </div>
  );
};

export default LoremIpsumGeneretor;
=======
export default LoremIpsumGeneratorPage;
>>>>>>> test
