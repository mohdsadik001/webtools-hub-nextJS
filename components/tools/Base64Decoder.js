// "use client";
// import React, { useState } from "react";
// import { useTranslation } from "react-i18next";
// import { Copy, Trash2, Download } from "lucide-react";

// const Base64Decoder = () => {
//   const [base64Input, setBase64Input] = useState("");
//   const [decodedText, setDecodedText] = useState("");
//   const [copyMsg, setCopyMsg] = useState("");

//   const { t } = useTranslation("common");

//   const handleDecode = (text) => {
//     try {
//       const decoded = decodeURIComponent(escape(atob(text)));
//       setDecodedText(decoded);
//     } catch {
//       setDecodedText(t("invalidBase64Alert"));
//     }
//   };

//   const handleCopy = () => {
//     if (!decodedText) return;
//     navigator.clipboard.writeText(decodedText);
//     setCopyMsg(t("copiedAlert"));
//     setTimeout(() => setCopyMsg(""), 1500);
//   };

//   const handleClear = () => {
//     setBase64Input("");
//     setDecodedText("");
//     setCopyMsg("");
//   };

//   const handleDownload = () => {
//     if (!decodedText) return;
//     const blob = new Blob([decodedText], { type: "text/plain;charset=utf-8" });
//     const url = URL.createObjectURL(blob);
//     const link = document.createElement("a");
//     link.href = url;
//     link.download = "base64-decoded.txt";
//     link.click();
//     URL.revokeObjectURL(url);
//   };

//   return (
//     <div className="mt-2 px-2 md:px-16 lg:px-24 xl:px-32">
//       {/* Title */}
//       <h2 className="text-2xl md:text-3xl font-bold text-left text-primary mb-2 md:mb-6">{t("base64DecoderTitle")}</h2>

//       {/* Input */}
//       <label
//         htmlFor="decoder-input"
//         className="sr-only"
//       >
//         {t("inputPlaceholder")}
//       </label>
//       <textarea
//         id="decoder-input"
//         aria-label={t("inputPlaceholder")}
//         value={base64Input}
//         onChange={(e) => {
//           setBase64Input(e.target.value);
//           handleDecode(e.target.value);
//         }}
//         placeholder={t("inputPlaceholder")}
//         rows={6}
//         className="w-full border border-gray-300 rounded p-4 text-lg focus:outline-primary resize-none"
//       />

//       {/* Buttons */}
//       <div className="flex flex-wrap gap-4 mt-4">
//         <button
//           onClick={handleCopy}
//           aria-label={t("copyBtn")}
//           className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded hover:bg-primary-dull transition"
//         >
//           <Copy className="w-5 h-5" aria-hidden="true" />
//           {t("copyBtn")}
//         </button>

//         <button
//           onClick={handleClear}
//           aria-label={t("clearBtn")}
//           className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
//         >
//           <Trash2 className="w-5 h-5" aria-hidden="true" />
//           {t("clearBtn")}
//         </button>

//         <button
//           onClick={handleDownload}
//           aria-label={t("downloadBtn")}
//           className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
//         >
//           <Download className="w-5 h-5" aria-hidden="true" />
//           {t("downloadBtn")}
//         </button>
//       </div>

//       {/* Output */}
//       <div className="mt-6">
//         <label
//           htmlFor="decoder-output"
//           className="block font-semibold mb-2 text-gray-700"
//         >
//           {t("decodedOutputLabel")}
//         </label>
//         <div
//           id="decoder-output"
//           aria-live="polite"
//           className="bg-gray-100 border border-gray-300 rounded p-4 text-sm font-mono break-all select-all"
//         >
//           {decodedText || t("outputPlaceholder")}
//         </div>
//         {copyMsg && <p className="text-green-600 mt-2">{copyMsg}</p>}
//       </div>
//     </div>
//   );
// };

// export default Base64Decoder;


"use client";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Copy, Trash2, Download } from "lucide-react";

import Button from '@/components/ui/buttons/Button';
import Textarea from '@/components/ui/Textarea';
import useClipboard from '@/hooks/useClipboard';

const Base64Decoder = () => {
  const [base64Input, setBase64Input] = useState("");
  const [decodedText, setDecodedText] = useState("");
  const { copied, copy } = useClipboard();

  const { t } = useTranslation("common");

  const handleDecode = (text) => {
    try {
      const decoded = decodeURIComponent(escape(atob(text)));
      setDecodedText(decoded);
    } catch {
      setDecodedText(t("invalidBase64Alert"));
    }
  };

  const handleClear = () => {
    setBase64Input("");
    setDecodedText("");
  };

  const handleDownload = () => {
    if (!decodedText) return;
    const blob = new Blob([decodedText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "base64-decoded.txt";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="mt-2 px-2 md:px-16 lg:px-24 xl:px-32">
      {/* Title */}
      <h2 className="text-2xl md:text-3xl font-bold text-left text-primary mb-2 md:mb-6">
        {t("base64DecoderTitle")}
      </h2>

      {/* Input */}
      <label htmlFor="decoder-input" className="sr-only">
        {t("inputPlaceholder")}
      </label>
      <Textarea
        id="decoder-input"
        value={base64Input}
        onChange={(e) => {
          setBase64Input(e.target.value);
          handleDecode(e.target.value);
        }}
        placeholder={t("inputPlaceholder")}
        rows={6}
        ariaLabel={t("inputPlaceholder")}
      />

      {/* Buttons */}
      <div className="flex flex-wrap gap-4 mt-4">
        <Button
          onClick={() => copy(decodedText)}
          disabled={!decodedText}
          variant={decodedText ? 'primary' : 'muted'}
          icon={Copy}
          ariaLabel={t("copyBtn")}
        >
          {copied ? t("copiedAlert") : t("copyBtn")}
        </Button>

        <Button
          onClick={handleClear}
          disabled={!base64Input && !decodedText}
          variant={base64Input || decodedText ? 'danger' : 'muted'}
          icon={Trash2}
          ariaLabel={t("clearBtn")}
        >
          {t("clearBtn")}
        </Button>

        <Button
          onClick={handleDownload}
          disabled={!decodedText}
          variant={decodedText ? 'success' : 'muted'}
          icon={Download}
          ariaLabel={t("downloadBtn")}
        >
          {t("downloadBtn")}
        </Button>
      </div>

      {/* Output */}
      <div className="mt-6">
        <label htmlFor="decoder-output" className="block font-semibold mb-2 text-gray-700">
          {t("decodedOutputLabel")}
        </label>
        <div
          id="decoder-output"
          aria-live="polite"
          className="bg-gray-100 border border-gray-300 rounded p-4 text-sm font-mono break-all select-all"
        >
          {decodedText || t("outputPlaceholder")}
        </div>
      </div>
    </div>
  );
};

export default Base64Decoder;
