"use client";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Copy, Trash2, Download } from "lucide-react"; 

const Base64Encoder = () => {
  const [text, setText] = useState("");
  const [encoded, setEncoded] = useState("");
  const [copyMsg, setCopyMsg] = useState("");

  const { t } = useTranslation("common");

  const handleEncode = (input) => {
    try {
      const encodedText = btoa(unescape(encodeURIComponent(input)));
      setEncoded(encodedText);
    } catch {
      setEncoded(t("encodingFailed"));
    }
  };

  const handleChange = (e) => {
    const input = e.target.value;
    setText(input);
    handleEncode(input);
  };

  const handleCopy = () => {
    if (!encoded) return;
    navigator.clipboard.writeText(encoded);
    setCopyMsg(t("copiedAlert"));
    setTimeout(() => setCopyMsg(""), 1500);
  };

  const handleClear = () => {
    setText("");
    setEncoded("");
    setCopyMsg("");
  };

  const handleDownload = () => {
    if (!encoded) return;
    const blob = new Blob([encoded], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "base64-output.txt";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <main className="px-2 md:px-6 lg:px-8 xl:px-32 py-2">
      <h2 className="text-2xl sm:text-3xl font-bold text-left text-primary mb-6" id="encoder-heading">{t("base64EncoderTitle")}</h2>

      {/* Input */}
      <label
        htmlFor="encoder-input"
        className="sr-only"
      >
        {t("inputPlaceholder")}
      </label>
      <textarea
        id="encoder-input"
        value={text}
        onChange={handleChange}
        placeholder={t("inputPlaceholder")}
        rows={6}
        className="w-full border border-gray-300 rounded p-4 text-base sm:text-lg focus:outline-primary resize-none"
        aria-describedby="encoder-heading"
      />

      {/* Action buttons */}
      <div className="flex flex-wrap gap-3 mt-4" role="group" aria-label="encoder actions">
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 bg-primary text-white px-3 sm:px-4 py-2 rounded hover:bg-primary-dull transition text-sm sm:text-base"
          aria-label={t("copyBtn")}
        >
          <Copy size={18} aria-hidden="true" /> {t("copyBtn")}
        </button>

        <button
          onClick={handleClear}
          className="flex items-center gap-2 bg-red-500 text-white px-3 sm:px-4 py-2 rounded hover:bg-red-600 transition text-sm sm:text-base"
          aria-label={t("clearBtn")}
        >
          <Trash2 size={18} aria-hidden="true" /> {t("clearBtn")}
        </button>

        <button
          onClick={handleDownload}
          className="flex items-center gap-2 bg-green-600 text-white px-3 sm:px-4 py-2 rounded hover:bg-green-700 transition text-sm sm:text-base"
          aria-label={t("downloadBtn")}
        >
          <Download size={18} aria-hidden="true" /> {t("downloadBtn")}
        </button>
      </div>

      {/* Encoded output */}
      <section className="mt-6" aria-labelledby="output-label">
        <label
          id="output-label"
          className="block font-semibold mb-2 text-gray-700"
        >
          {t("encodedOutputLabel")}
        </label>
        <div
          className="bg-gray-100 border border-gray-300 rounded p-4 text-sm font-mono break-all select-all"
          role="textbox"
          aria-readonly="true"
        >
          {encoded || t("outputPlaceholder")}
        </div>

        {/* Live region for copy confirmation */}
        {copyMsg && (
          <p className="text-green-600 mt-2" aria-live="polite">
            {copyMsg}
          </p>
        )}
      </section>
    </main>
  );
};

export default Base64Encoder;
