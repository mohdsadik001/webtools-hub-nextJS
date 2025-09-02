"use client";

import { useRef, useState } from "react";
import QRCode from "react-qr-code";
import { toPng, toJpeg } from "html-to-image";
import { useTranslation } from "react-i18next";
import { Download, QrCode as QrIcon } from "lucide-react"; // ✅ Lucide Icons

export default function QrCodeGenerator() {
  const [text, setText] = useState("");
  const qrRef = useRef(null);
  const { t } = useTranslation("common");

  const downloadQR = async (format = "png") => {
    if (!text) return alert(t("emptyInputAlert"));

    const node = qrRef.current;
    try {
      const dataUrl =
        format === "jpeg" ? await toJpeg(node) : await toPng(node);

      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = `qr-code.${format}`;
      link.click();
    } catch (error) {
      console.error("Download error", error);
    }
  };

  return (
    <div className="mt-2 md:mt-8 px-4 md:px-12 lg:px-20 xl:px-32 py-6 flex flex-col items-center text-center">
      {/* Accessible Title */}
      <h1
        className="text-2xl md:text-4xl font-bold uppercase mb-6 flex items-center gap-2"
        aria-label={t("qrCodeGeneratorTitle")}
      >
        <QrIcon className="w-7 h-7 text-primary" aria-hidden="true" />
        {t("qrCodeGeneratorTitle")}
      </h1>

      {/* Input Field */}
      <label htmlFor="qr-input" className="sr-only">
        {t("inputPlaceholder")}
      </label>
      <input
        id="qr-input"
        type="text"
        placeholder={t("inputPlaceholder")}
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="border border-gray-400 px-4 py-3 rounded-lg w-full max-w-md outline-primary focus:ring-2 focus:ring-primary mb-6"
        aria-describedby="qr-helper-text"
      />
      <p id="qr-helper-text" className="text-sm text-gray-500 mb-4">
        {t("qrCodeWillAppear")}
      </p>

      {/* QR Preview */}
      <div
        ref={qrRef}
        className="bg-white p-6 rounded-xl shadow-md transition-all duration-300"
        role="img"
        aria-label={text ? t("qrGeneratedFor", { text }) : t("qrCodeWillAppear")}
      >
        {text ? (
          <QRCode value={text} size={220} aria-hidden="true" />
        ) : (
          <p className="text-gray-400 text-sm">{t("qrCodeWillAppear")}</p>
        )}
      </div>

      {/* Buttons */}
      <div className="flex flex-wrap gap-4 mt-8 justify-center">
        <button
          onClick={() => downloadQR("png")}
          className="flex items-center gap-2 bg-black text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 transition-all"
          aria-label={t("exportAsPngBtn")}
        >
          <Download className="w-5 h-5" aria-hidden="true" />
          {t("exportAsPngBtn")}
        </button>
        <button
          onClick={() => downloadQR("jpeg")}
          className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-lg hover:bg-primary-dull focus:ring-2 focus:ring-primary-dull transition-all"
          aria-label={t("exportAsJpegBtn")}
        >
          <Download className="w-5 h-5" aria-hidden="true" />
          {t("exportAsJpegBtn")}
        </button>
      </div>
    </div>
  );
}
