"use client";
import { useRef, useState } from "react";
import QRCode from "react-qr-code";
import { toPng, toJpeg } from "html-to-image";
import { useTranslation } from "react-i18next";
import { Download, QrCode as QrIcon } from "lucide-react";

import Button from '@/components/ui/buttons/Button';
import Input from '@/components/ui/Input';

const QrCodeGenerator = () => {
  const [text, setText] = useState("");
  const qrRef = useRef(null);
  const { t } = useTranslation("common");

  const downloadQR = async (format = "png") => {
    if (!text) return alert(t("emptyInputAlert"));

    const node = qrRef.current;
    try {
      const dataUrl = format === "jpeg" ? await toJpeg(node) : await toPng(node);

      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = `qr-code.${format}`;
      link.click();
    } catch (error) {
      console.error("Download error", error);
    }
  };

  return (
    <main className="mt-2 md:mt-8 px-4 md:px-12 lg:px-20 xl:px-32 py-6 flex flex-col items-center text-center">
      {/* Accessible Title */}
      <h1
        className="text-2xl md:text-4xl font-bold uppercase mb-6 flex items-center gap-2"
        aria-label={t("qrCodeGeneratorTitle")}
      >
        <QrIcon className="w-7 h-7 text-primary" aria-hidden="true" />
        {t("qrCodeGeneratorTitle")}
      </h1>

      {/* Input Field */}
      <div className="w-full max-w-md mb-6">
        <label htmlFor="qr-input" className="sr-only">
          {t("inputPlaceholder")}
        </label>
        <Input
          id="qr-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={t("inputPlaceholder")}
          ariaLabel={t("inputPlaceholder")}
        />
      </div>

      <label htmlFor="qrCode" className="block mb-4 font-medium">
        {text && t("qrGeneratedFor")}
      </label>

      {/* QR Preview */}
      <div
        ref={qrRef}
        className="bg-white p-6 rounded-xl shadow-md transition-all duration-300 mb-8"
        role="img"
        aria-label={text ? t("qrGeneratedFor", { text }) : t("qrCodeWillAppear")}
      >
        {text ? (
          <QRCode value={text} size={250} aria-hidden="true" />
        ) : (
          <p className="text-gray-400 text-sm">{t("qrCodeWillAppear")}</p>
        )}
      </div>

      {/* Buttons */}
      <div className="flex flex-wrap gap-4 justify-center">
        <Button
          onClick={() => downloadQR("png")}
          disabled={!text}
          variant={text ? 'primary' : 'muted'}
          icon={Download}
          ariaLabel={t("exportAsPngBtn")}
        >
          {t("exportAsPngBtn")}
        </Button>

        <Button
          onClick={() => downloadQR("jpeg")}
          disabled={!text}
          variant={text ? 'secondary' : 'muted'}
          icon={Download}
          ariaLabel={t("exportAsJpegBtn")}
        >
          {t("exportAsJpegBtn")}
        </Button>
      </div>
    </main>
  );
};

export default QrCodeGenerator;
