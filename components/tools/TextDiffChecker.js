"use client";
import React, { useState } from "react";
import { diffWords, diffChars } from "diff";
import { useTranslation } from "react-i18next";
import { ClipboardCopy, FileDown, Type, FileDiff } from "lucide-react";

import Button from '@/components/ui/buttons/Button';
import Textarea from '@/components/ui/Textarea';
import useClipboard from '@/hooks/useClipboard';

const TextDiffChecker = () => {
  const [textA, setTextA] = useState("");
  const [textB, setTextB] = useState("");
  const [diffResult, setDiffResult] = useState([]);
  const [diffMode, setDiffMode] = useState("word");
  const { copied, copy } = useClipboard();

  const { t } = useTranslation("common");

  const generateDiff = () => {
    const diff = diffMode === "word" ? diffWords(textA, textB) : diffChars(textA, textB);
    setDiffResult(diff);
  };

  const copyToClipboard = () => {
    let plainText = "";
    diffResult.forEach((part) => {
      if (part.added) plainText += `[Added: ${part.value}]`;
      else if (part.removed) plainText += `[Removed: ${part.value}]`;
      else plainText += part.value;
    });
    copy(plainText);
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
      <h2 id="diff-checker-title" className="text-2xl sm:text-3xl font-bold text-primary text-left mb-6">
        📝 {t("textDiffCheckerTitle")}
      </h2>

      {/* Input areas */}
      <section
        className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6"
        aria-labelledby="diff-checker-title"
      >
        <div>
          <label htmlFor="original-text" className="block mb-2 font-medium">
            {t("originalTextPlaceholder")}
          </label>
          <Textarea
            id="original-text"
            value={textA}
            onChange={(e) => setTextA(e.target.value)}
            placeholder={t("originalTextPlaceholder")}
            rows={8}
            ariaLabel={t("originalTextPlaceholder")}
          />
        </div>

        <div>
          <label htmlFor="modified-text" className="block mb-2 font-medium">
            {t("modifiedTextPlaceholder")}
          </label>
          <Textarea
            id="modified-text"
            value={textB}
            onChange={(e) => setTextB(e.target.value)}
            placeholder={t("modifiedTextPlaceholder")}
            rows={8}
            ariaLabel={t("modifiedTextPlaceholder")}
          />
        </div>
      </section>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mb-6">
        <Button
          onClick={generateDiff}
          variant="primary"
          icon={FileDiff}
          ariaLabel={t("compareBtn")}
        >
          {t("compareBtn")}
        </Button>

        <Button
          onClick={copyToClipboard}
          disabled={!diffResult.length}
          variant={diffResult.length ? 'secondary' : 'muted'}
          icon={ClipboardCopy}
          ariaLabel={t("copyDiffBtn")}
        >
          {copied ? t("copiedBtn") : t("copyDiffBtn")}
        </Button>

        <Button
          onClick={exportToFile}
          disabled={!diffResult.length}
          variant={diffResult.length ? 'secondary' : 'muted'}
          icon={FileDown}
          ariaLabel={t("exportDiffBtn")}
        >
          {t("exportDiffBtn")}
        </Button>

        <div className="flex items-center">
          <label htmlFor="diff-mode" className="mr-2 text-sm font-medium">
            {t("diffMode")}
          </label>
          <select
            id="diff-mode"
            value={diffMode}
            onChange={(e) => setDiffMode(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="word">{t("wordLevelDiffOption")}</option>
            <option value="char">{t("charLevelDiffOption")}</option>
          </select>
        </div>
      </div>

      {/* Diff result */}
      {diffResult.length > 0 && (
        <section
          className="grid grid-cols-1  md:grid-cols-2 gap-4 bg-gray-50 border border-gray-300 p-4 rounded-lg h-50 overflow-auto"
          aria-live="polite"
        >
          <div>
            <h3 className="font-semibold mb-2 text-center">
              {t("originalTextLabel")}
            </h3>
            <div className="whitespace-pre-wrap border p-3 rounded bg-white text-sm font-mono h-[80%] overflow-auto">
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
            <div className="whitespace-pre-wrap border p-3 rounded bg-white text-sm font-mono h-[80%]  overflow-auto">
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
