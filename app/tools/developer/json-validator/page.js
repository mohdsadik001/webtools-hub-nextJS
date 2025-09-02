"use client";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Copy,
  Download,
  FileJson,
  FileText,
  Trash2,
} from "lucide-react"; // ✅ Lucide icons

const JsonValidator = () => {
  const [input, setInput] = useState("");
  const [formattedJson, setFormattedJson] = useState("");
  const [error, setError] = useState("");
  const { t } = useTranslation("common");

  const validateJson = (text) => {
    try {
      const parsed = JSON.parse(text);
      const pretty = JSON.stringify(parsed, null, 2);
      setFormattedJson(pretty);
      setError("");
    } catch (err) {
      setFormattedJson("");
      setError(t("invalidJsonAlert") + err.message);
    }
  };

  const handleChange = (e) => {
    const text = e.target.value; 
    setInput(text);
    validateJson(text);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(formattedJson);
    alert(t("copiedAlert"));
  };

  const exportFile = (type) => {
    const blob = new Blob([formattedJson], {
      type: type === "json" ? "application/json" : "text/plain",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `formatted.${type}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const clearFields = () => {
    setInput("");
    setFormattedJson("");
    setError("");
  };

  return (
    <main
      className="max-w-5xl mx-auto p-4 md:p-6 mt-2 md:mt-8 bg-white dark:bg-gray-900 rounded-2xl shadow-lg transition"
      aria-labelledby="json-validator-title"
  >
      {/* Title */}
      <h2 id="json-validator-title" className="text-xl md:text-3xl font-bold text-center text-primary mb-6">{t("jsonValidatorTitle")}</h2>

      {/* Input Section */}
      <label htmlFor="json-input" className="sr-only">
        {t("inputPlaceholder")}
      </label>
      <textarea
        id="json-input"
        value={input}
        onChange={handleChange}
        placeholder={t("inputPlaceholder")}
        rows={10}
        aria-invalid={!!error}
        className="w-full border border-gray-300 dark:border-gray-700 rounded-lg p-4 text-sm font-mono resize-none focus:outline-none focus:ring-2 focus:ring-primary bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
      />

      {/* Error Message */}
      {error && (
        <div
          className="mt-4 p-3 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded text-sm font-medium"
          role="alert"
        >
          {error}
        </div>
      )}

      {/* Output Section */}
      {formattedJson && (
        <section className="mt-6">
          <h3 className="text-lg font-semibold mb-2">
            {t("formattedJsonLabel")}
          </h3>
          <pre
            className="bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg p-4 text-sm font-mono overflow-auto max-h-80"
            tabIndex={0}
          >
            {formattedJson}
          </pre>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 mt-4">
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              aria-label={t("copyBtn")}
            >
              <Copy className="w-4 h-4" />
              {t("copyBtn")}
            </button>
            <button
              onClick={() => exportFile("json")}
              className="flex items-center gap-2 border border-primary text-primary px-4 py-2 rounded-lg hover:bg-primary hover:text-white transition focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              aria-label={t("exportJsonBtn")}
            >
              <FileJson className="w-4 h-4" />
              {t("exportJsonBtn")}
            </button>
            <button
              onClick={() => exportFile("txt")}
              className="flex items-center gap-2 border border-primary text-primary px-4 py-2 rounded-lg hover:bg-primary hover:text-white transition focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              aria-label={t("exportTxtBtn")}
            >
              <FileText className="w-4 h-4" />
              {t("exportTxtBtn")}
            </button>
          </div>
        </section>
      )}

      {/* Clear Button */}
      {(input || formattedJson) && (
        <div className="mt-6 text-center">
          <button
            onClick={clearFields}
            className="flex items-center gap-2 px-6 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-400 dark:border-gray-600 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
            aria-label={t("clearAllBtn")}
          >
            <Trash2 className="w-4 h-4" />
            {t("clearAllBtn")}
          </button>
        </div>
      )}
    </main>
  );
};

export default JsonValidator;
