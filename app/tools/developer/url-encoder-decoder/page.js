"use client";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Copy, Trash2, Lock, Unlock } from "lucide-react";

const UrlEncoderDecoder = () => {
  const [mode, setMode] = useState("encode"); // "encode" or "decode"
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [copySuccess, setCopySuccess] = useState("");

  const { t } = useTranslation("common");

  // Encode or decode based on mode
  const processText = (text) => {
    try {
      if (mode === "encode") {
        return encodeURIComponent(text);
      } else {
        return decodeURIComponent(text);
      }
    } catch (e) {
      return t("invalidInputAlert");
    }
  };

  const handleInputChange = (e) => {
    const val = e.target.value;
    setInput(val);
    setOutput(processText(val));
  };

  const handleModeChange = (newMode) => {
    setMode(newMode);
    setInput("");
    setOutput("");
    setCopySuccess("");
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output).then(() => {
      setCopySuccess(t("copiedBtn"));
      setTimeout(() => setCopySuccess(""), 2000);
    });
  };

  const clearFields = () => {
    setInput("");
    setOutput("");
    setCopySuccess("");
  };

  return (
    <main className="max-w-3xl mx-auto p-4 md:p-6 bg-white  rounded-2xl mt-2 md:mt-8 border border-gray-200">
      {/* Title */}
      <h1 className="text-xl md:text-3xl font-extrabold mb-6 text-center bg-gradient-to-r text-primary bg-clip-text">
        {t("urlEncoderDecoderTitle")}
      </h1>

      {/* Mode Switch */}
      <div
        role="group"
        aria-label="Encode or Decode selection"
        className="flex justify-center mb-4 md:mb-6 space-x-4"
      >
        <button
          onClick={() => handleModeChange("encode")}
          aria-pressed={mode === "encode"}
          className={`flex items-center gap-2 px-6 py-2 rounded-lg transition font-medium ${
            mode === "encode"
              ? "bg-primary text-white shadow-md"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          <Lock size={18} /> {t("encodeBtn")}
        </button>
        <button
          onClick={() => handleModeChange("decode")}
          aria-pressed={mode === "decode"}
          className={`flex items-center gap-2 px-6 py-2 rounded-lg transition font-medium ${
            mode === "decode"
              ? "bg-primary text-white shadow-md"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          <Unlock size={18} /> {t("decodeBtn")}
        </button>
      </div>

      {/* Input Area */}
      <textarea
        value={input}
        onChange={handleInputChange}
        rows={1}
        placeholder={
          mode === "encode"
            ? t("encodeInputPlaceholder")
            : t("decodeInputPlaceholder")
        }
        className="w-full border border-gray-300 rounded-lg p-4 mb-2 md:mb-6 resize-none focus:outline-none focus:ring-2 focus:ring-primary"
        aria-label={t("inputAreaLabel")}
      />

      {/* Result Area */}
      <div className="mb-2">
        <label
          htmlFor="result"
          className="block font-semibold mb-2 text-gray-700"
        >
          {t("resultLabel")}
        </label>
        <textarea
          id="result"
          readOnly
          value={output}
          rows={6}
          className="w-full border border-gray-300 rounded-lg p-4 resize-none bg-gray-50"
          aria-label={t("resultLabel")}
        />
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-3 sm:space-y-0 justify-center">
        <button
          onClick={copyToClipboard}
          disabled={!output}
          className={`flex items-center gap-2 justify-center px-6 py-2 rounded-lg border border-primary text-primary hover:bg-primary hover:text-white transition ${
            !output ? "opacity-50 cursor-not-allowed" : ""
          }`}
          aria-disabled={!output}
        >
          <Copy size={18} /> {t("copyResultBtn")}
        </button>

        <button
          onClick={clearFields}
          disabled={!input && !output}
          className={`flex items-center gap-2 justify-center px-6 py-2 rounded-lg border border-gray-400 text-gray-700 hover:bg-gray-200 transition ${
            !input && !output ? "opacity-50 cursor-not-allowed" : ""
          }`}
          aria-disabled={!input && !output}
        >
          <Trash2 size={18} /> {t("clearBtn")}
        </button>
      </div>

      {/* Copy Feedback */}
      {copySuccess && (
        <p
          role="status"
          aria-live="polite"
          className="text-center mt-4 text-green-600 font-medium"
        >
          ✅ {copySuccess}
        </p>
      )}
    </main>
  );
};

export default UrlEncoderDecoder;
