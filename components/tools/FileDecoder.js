"use client";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Upload, X, Copy, Download } from "lucide-react";

import Button from '@/components/ui/buttons/Button';
import useClipboard from '@/hooks/useClipboard';

const FileDecoder = () => {
  const [decodedContent, setDecodedContent] = useState("");
  const [isImage, setIsImage] = useState(false);
  const [file, setFile] = useState(null);
  const { copied, copy } = useClipboard();

  const { t } = useTranslation("common");

  const handleFileChange = (file) => {
    if (!file) return;
    setFile(file);

    const reader = new FileReader();
    reader.onload = () => {
      try {
        const base64Str = reader.result;
        const decoded = decodeURIComponent(escape(atob(base64Str)));
        setDecodedContent(decoded);
        setIsImage(false);
      } catch {
        setDecodedContent(`data:image/*;base64,${reader.result}`);
        setIsImage(true);
      }
    };
    reader.readAsText(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    handleFileChange(droppedFile);
  };

  const handleRemove = () => {
    setDecodedContent("");
    setIsImage(false);
    setFile(null);
  };

  const handleDownload = () => {
    if (!decodedContent) return;
    const blob = new Blob([decodedContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = file ? `${file.name}-decoded.txt` : "decoded.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-2xl mx-auto mt-6 p-6 bg-white rounded-2xl shadow-lg">
      <h3 className="text-2xl font-semibold mb-4 text-gray-800">
        {t("fileDecoderTitle")}
      </h3>

      {/* Upload + Drag & Drop */}
      {!file ? (
        <label
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          className="flex flex-col items-center justify-center w-full p-8 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition"
          aria-label="Upload or drag and drop file"
        >
          <Upload className="w-10 h-10 text-gray-500 mb-3" aria-hidden="true" />
          <p className="text-gray-600">{t("dragDropText")}</p>
          <input
            type="file"
            accept=".txt,.b64"
            className="hidden"
            onChange={(e) => handleFileChange(e.target.files[0])}
          />
        </label>
      ) : (
        <div className="flex items-center justify-between bg-gray-100 p-3 rounded-lg mb-4">
          <span className="text-sm text-gray-700 truncate">{file.name}</span>
          <Button
            onClick={handleRemove}
            variant="danger"
            size="sm"
            icon={X}
            ariaLabel="Remove file"
          />
        </div>
      )}

      {/* Output Section */}
      {decodedContent && (
        <div className="mt-4 border rounded-lg p-4 bg-gray-50">
          <h4 className="font-medium mb-2 text-gray-800">
            {t("decodedOutputLabel")}
          </h4>
          {isImage ? (
            <img
              src={decodedContent}
              alt="Decoded Preview"
              className="max-w-full rounded-lg"
            />
          ) : (
            <div
              className="whitespace-pre-wrap break-words font-mono text-sm bg-white p-3 rounded border max-h-64 overflow-y-auto"
              role="textbox"
              aria-readonly="true"
            >
              {decodedContent}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 mt-4">
            <Button
              onClick={() => copy(decodedContent)}
              variant="primary"
              icon={Copy}
              ariaLabel="Copy decoded content"
            >
              {copied ? t("copiedAlert") : t("copyBtn")}
            </Button>

            <Button
              onClick={handleDownload}
              variant="success"
              icon={Download}
              ariaLabel="Download decoded content"
            >
              {t("downloadBtn")}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileDecoder;
