"use client";

import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import { Copy, Download } from "lucide-react";
import Button from "../ui/buttons/Button";
import DirectionSelector from "@/components/ui/DirectionSelector";
import ColorPicker from "../ui/ColorPicker";
import GradientPreview from "../ui/GradientPreview";
import { gradientDirections } from "@/config/directions";
import { useGradient } from "../../hooks/useGradient";
import Textarea from "../ui/Textarea";

const GradientGenerator = () => {
  const { t } = useTranslation("common");
  const {
    colors,
    direction,
    setDirection,
    addColor,
    removeColor,
    updateColor,
    gradientCss,
  } = useGradient();

  const previewRef = useRef();

  const copyCss = () => {
    navigator.clipboard.writeText(`background: ${gradientCss};`);
    alert(t("copiedAlert"));
  };

  const exportAsImage = async () => {
    if (!previewRef.current) return;
    try {
      const htmlToImage = (await import("html-to-image")).default;
      const dataUrl = await htmlToImage.toPng(previewRef.current);
      const link = document.createElement("a");
      link.download = "gradient.png";
      link.href = dataUrl;
      link.click();
    } catch {
      alert(t("exportFailedAlert"));
    }
  };

  return (
    <main
      className="max-w-5xl mx-auto p-4 md:p-10 bg-white rounded-2xl shadow-lg"
      role="main"
      aria-label={t("gradientGeneratorTitle")}
    >
      <h1 className="text-2xl md:text-3xl font-bold mb-8 text-center text-primary" tabIndex="0">
        {t("gradientGeneratorTitle")}
      </h1>

      <section className="mb-8">
        <DirectionSelector direction={direction} setDirection={setDirection} directions={gradientDirections} />
      </section>

      <section className="mb-8">
        <ColorPicker colors={colors} updateColor={updateColor} removeColor={removeColor} addColor={addColor} />
      </section>

      <section className="mb-8" aria-label={t("gradientPreviewLabel")}>
        <GradientPreview ref={previewRef} gradientCss={gradientCss} label={t("gradientPreviewLabel")} />
      </section>

      <section aria-label={t("cssCodeLabel")}>
        <div className="flex flex-col md:flex-row gap-4 items-start">
          <Textarea
            readOnly
            className="flex-grow border w-full md:w-fit border-gray-300 rounded-lg p-3 font-mono text-sm resize-none h-24 shadow-sm focus:ring-2 focus:ring-primary"
            value={`background: ${gradientCss};`}
            aria-label={t("cssCodeLabel")}
          />
          <div className="flex gap-3">
            <Button onClick={copyCss} variant="primary" className='gap-3' aria-label={t("copyCssBtn")}>
              <Copy size={18} aria-hidden="true" />
              {t("copyCssBtn")}
            </Button>
            <Button variant="primary" onClick={exportAsImage} className='gap-3' aria-label={t("exportPngBtn")}>
              <Download  size={18} aria-hidden="true" />
              {t("exportPngBtn")}
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default GradientGenerator;
