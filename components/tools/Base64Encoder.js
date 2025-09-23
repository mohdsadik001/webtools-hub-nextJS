"use client";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Copy, Trash2, Download } from "lucide-react";

import Button from '@/components/ui/buttons/Button';
import Textarea from '@/components/ui/Textarea';
import useClipboard from '@/hooks/useClipboard';

const Base64Encoder = () => {
  const [text, setText] = useState("");
  const [encoded, setEncoded] = useState("");
  const { copied, copy } = useClipboard();

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

  const handleClear = () => {
    setText("");
    setEncoded("");
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
      <h2 className="text-2xl sm:text-3xl font-bold text-left text-primary mb-6" id="encoder-heading">
        {t("base64EncoderTitle")}
      </h2>

      {/* Input */}
      <label htmlFor="encoder-input" className="sr-only">
        {t("inputPlaceholder")}
      </label>
      <Textarea
        id="encoder-input"
        value={text}
        onChange={handleChange}
        placeholder={t("inputPlaceholder")}
        rows={6}
        ariaLabel={t("inputPlaceholder")}
      />

      {/* Action buttons */}
      <div className="flex flex-wrap gap-3 mt-4" role="group" aria-label="encoder actions">
        <Button
          onClick={() => copy(encoded)}
          disabled={!encoded}
          variant={encoded ? 'primary' : 'muted'}
          icon={Copy}
          ariaLabel={t("copyBtn")}
        >
          {copied ? t("copiedAlert") : t("copyBtn")}
        </Button>

        <Button
          onClick={handleClear}
          disabled={!text && !encoded}
          variant={text || encoded ? 'danger' : 'muted'}
          icon={Trash2}
          ariaLabel={t("clearBtn")}
        >
          {t("clearBtn")}
        </Button>

        <Button
          onClick={handleDownload}
          disabled={!encoded}
          variant={encoded ? 'success' : 'muted'}
          icon={Download}
          ariaLabel={t("downloadBtn")}
        >
          {t("downloadBtn")}
        </Button>
      </div>

      {/* Encoded output */}
      <section className="mt-6" aria-labelledby="output-label">
        <label id="output-label" className="block font-semibold mb-2 text-gray-700">
          {t("encodedOutputLabel")}
        </label>
        <div
          className="bg-gray-100 border border-gray-300 rounded p-4 text-sm font-mono break-all select-all"
          role="textbox"
          aria-readonly="true"
        >
          {encoded || t("outputPlaceholder")}
        </div>
      </section>
    </main>
  );
};

export default Base64Encoder;
