"use client";
import React, { useState } from "react";
import { diffWords, diffChars } from "diff";
import { useTranslation } from "react-i18next";
import { ClipboardCopy, FileDown, Type, FileDiff } from "lucide-react"; // ✅ lucide icons

const TextDiffChecker = () => {
  const [textA, setTextA] = useState("");
  const [textB, setTextB] = useState("");
  const [diffResult, setDiffResult] = useState([]);
  const [diffMode, setDiffMode] = useState("word");

  const { t } = useTranslation("common");

  const generateDiff = () => {
    const diff =
      diffMode === "word" ? diffWords(textA, textB) : diffChars(textA, textB);
    setDiffResult(diff);
  };

  const copyToClipboard = () => {
    let plainText = "";
    diffResult.forEach((part) => {
      if (part.added) plainText += `[Added: ${part.value}]`;
      else if (part.removed) plainText += `[Removed: ${part.value}]`;
      else plainText += part.value;
    });

    navigator.clipboard.writeText(plainText);
    alert(t("diffCopiedAlert"));
  };

  const exportToFile = () => {
    let plainText = "";
    diffResult.forEach((part) => {
      if (part.added) plainText += `[Added: ${part.value}]`;
      else if (part.removed) plainText += `[Removed: ${part.value}]`;
      else plainText += part.value;
    });

    const blob = new Blob([plainText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "diff-result.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <main className="mt-2 md:mt-8 px-4 sm:px-6 md:px-12 lg:px-24 xl:px-32 py-2">
      {/* Title */}
      <h2 id="diff-checker-title" className="text-2xl sm:text-3xl font-bold text-primary text-left mb-6" >📝 {t("textDiffCheckerTitle")}</h2>

      {/* Input areas */}
      <section
        className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6"
        aria-labelledby="diff-checker-title"
      >
        <label htmlFor="original-text" className="sr-only">
          {t("originalTextPlaceholder")}
        </label>
        <textarea
          id="original-text"
          value={textA}
          onChange={(e) => setTextA(e.target.value)}
          placeholder={t("originalTextPlaceholder")}
          className="w-full border border-gray-300 rounded-lg p-4 text-base focus:outline-primary resize-y min-h-[150px]"
          rows={8}
        />

        <label htmlFor="modified-text" className="sr-only">
          {t("modifiedTextPlaceholder")}
        </label>
        <textarea
          id="modified-text"
          value={textB}
          onChange={(e) => setTextB(e.target.value)}
          placeholder={t("modifiedTextPlaceholder")}
          className="w-full border border-gray-300 rounded-lg p-4 text-base focus:outline-primary resize-y min-h-[150px]"
          rows={8}
        />
      </section>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mb-6">
        <button
          onClick={generateDiff}
          className="flex items-center gap-2 bg-primary text-white px-5 py-2 rounded-lg hover:bg-primary-dull transition text-sm sm:text-base"
          aria-label={t("compareBtn")}
        >
          <FileDiff className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
          {t("compareBtn")}
        </button>

        <button
          onClick={copyToClipboard}
          disabled={!diffResult.length}
          className={`flex items-center gap-2 px-5 py-2 rounded-lg border text-sm sm:text-base ${
            diffResult.length
              ? "border-primary text-primary hover:bg-primary hover:text-white transition cursor-pointer"
              : "border-gray-300 text-gray-400 cursor-not-allowed"
          }`}
          aria-disabled={!diffResult.length}
          aria-label={t("copyDiffBtn")}
        >
          <ClipboardCopy className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
          {t("copyDiffBtn")}
        </button>

        <button
          onClick={exportToFile}
          disabled={!diffResult.length}
          className={`flex items-center gap-2 px-5 py-2 rounded-lg border text-sm sm:text-base ${
            diffResult.length
              ? "border-primary text-primary hover:bg-primary hover:text-white transition cursor-pointer"
              : "border-gray-300 text-gray-400 cursor-not-allowed"
          }`}
          aria-disabled={!diffResult.length}
          aria-label={t("exportDiffBtn")}
        >
          <FileDown className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
          {t("exportDiffBtn")}
        </button>

        <label htmlFor="diff-mode" className="sr-only">
          {t("diffMode")}
        </label>
        <select
          id="diff-mode"
          value={diffMode}
          onChange={(e) => setDiffMode(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm sm:text-base"
        >
          <option value="word">{t("wordLevelDiffOption")}</option>
          <option value="char">{t("charLevelDiffOption")}</option>
        </select>
      </div>

      {/* Diff result */}
      {diffResult.length > 0 && (
        <section
          className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 border border-gray-300 p-4 rounded-lg max-h-[500px] overflow-auto"
          aria-live="polite"
        >
          <div>
            <h3 className="font-semibold mb-2 text-center">
              {t("originalTextLabel")}
            </h3>
            <div className="whitespace-pre-wrap border p-3 rounded bg-white text-sm font-mono h-full overflow-auto">
              {diffResult.map((part, i) =>
                part.removed ? (
                  <mark
                    key={i}
                    className="bg-red-200 text-red-900 line-through px-1 rounded"
                  >
                    {part.value}
                  </mark>
                ) : (
                  <span key={i}>{part.value}</span>
                )
              )}
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2 text-center">
              {t("modifiedTextLabel")}
            </h3>
            <div className="whitespace-pre-wrap border p-3 rounded bg-white text-sm font-mono h-full overflow-auto">
              {diffResult.map((part, i) =>
                part.added ? (
                  <mark
                    key={i}
                    className="bg-green-200 text-green-900 px-1 rounded"
                  >
                    {part.value}
                  </mark>
                ) : (
                  <span key={i}>{part.value}</span>
                )
              )}
            </div>
          </div>
        </section>
      )}
    </main>
  );
};

export default TextDiffChecker;
