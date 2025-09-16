"use client";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Upload,
  Copy,
  Trash2,
  Download,
} from "lucide-react"; 

const FileToBase64 = () => {
  const [file, setFile] = useState(null);
  const [base64, setBase64] = useState("");
  const [dragActive, setDragActive] = useState(false);

  const { t } = useTranslation("common");

  // 📂 Handle file selection
  const handleFileChange = (file) => {
    if (!file) return;
    setFile(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setBase64(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // 📂 File input
  const handleInputChange = (e) => {
    handleFileChange(e.target.files[0]);
  };

  // 📂 Drag and drop
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  // 📋 Copy Base64
  const handleCopy = () => {
    navigator.clipboard.writeText(base64);
  };

  // 🗑️ Remove file
  const handleRemove = () => {
    setFile(null);
    setBase64("");
  };

  // ⬇️ Download Base64 as txt
  const handleDownload = () => {
    const blob = new Blob([base64], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${file?.name || "file"}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-2xl">
      <h2 className="text-2xl font-bold text-center text-primary mb-6">{t("fileToBase64Title")}</h2>

      {/* Upload Area */}
      <div
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition 
          ${dragActive ? "border-primary bg-primary/10" : "border-gray-300 bg-gray-50"}`}
      >
        <input
          id="file-upload"
          type="file"
          onChange={handleInputChange}
          className="hidden"
          aria-label={t("uploadFileAria")}
        />
        <label
          htmlFor="file-upload"
          className="flex flex-col items-center justify-center space-y-3"
        >
          <Upload className="w-10 h-10 text-primary" />
          <span className="text-gray-600 font-medium">
            {t("dragDropText")}
          </span>
          <span className="text-sm text-gray-500">{t("orClickBrowse")}</span>
        </label>
      </div>

      {/* File Info & Output */}
      {file && (
        <div className="mt-6 space-y-4">
          <p className="text-sm text-gray-700">
            <strong>{t("fileLabel")}</strong>: {file.name}
          </p>

          {/* Output box */}
          <div
            className="bg-gray-100 p-4 rounded-md border text-xs font-mono overflow-y-auto max-h-60"
            aria-live="polite"
          >
            {base64}
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-3 mt-3">
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg shadow hover:bg-primary/90 transition"
              aria-label={t("copyBase64Btn")}
            >
              <Copy size={18} /> {t("copy")}
            </button>

            <button
              onClick={handleDownload}
              className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700 transition"
              aria-label={t("downloadBase64Btn")}
            >
              <Download size={18} /> {t("download")}
            </button>

            <button
              onClick={handleRemove}
              className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg shadow hover:bg-red-700 transition"
              aria-label={t("removeFileBtn")}
            >
              <Trash2 size={18} /> {t("remove")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileToBase64;
