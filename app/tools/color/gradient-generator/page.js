"use client";
import React, { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Plus, X, Copy, Download } from "lucide-react";

const directions = [
  { labelKey: "directionToRight", value: "to right" },
  { labelKey: "directionToLeft", value: "to left" },
  { labelKey: "directionToBottom", value: "to bottom" },
  { labelKey: "directionToTop", value: "to top" },
  { labelKey: "direction45deg", value: "45deg" },
  { labelKey: "direction135deg", value: "135deg" },
  { labelKey: "direction225deg", value: "225deg" },
  { labelKey: "direction315deg", value: "315deg" },
  { labelKey: "directionRadial", value: "radial" },
];

const GradientGenerator = () => {
  const { t } = useTranslation("common");
  const [colors, setColors] = useState(["#ff0000", "#0000ff"]);
  const [direction, setDirection] = useState("to right");
  const previewRef = useRef();

  const handleColorChange = (index, value) => {
    const newColors = [...colors];
    newColors[index] = value;
    setColors(newColors);
  };

  const addColor = () => {
    if (colors.length < 6) setColors([...colors, "#ffffff"]);
  };

  const removeColor = (index) => {
    if (colors.length > 2) {
      setColors(colors.filter((_, i) => i !== index));
    }
  };

  const gradientCss =
    direction === "radial"
      ? `radial-gradient(circle, ${colors.join(", ")})`
      : `linear-gradient(${direction}, ${colors.join(", ")})`;

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
    } catch (err) {
      alert(t("exportFailedAlert"));
      console.error(err);
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

      {/* Direction Selector */}
      <section className="mb-8">
        <h2 className="sr-only">{t("directionLabel")}</h2>
        <div className="flex flex-wrap justify-center gap-3">
          {directions.map((dir) => (
            <button
              key={dir.value}
              onClick={() => setDirection(dir.value)}
              className={`px-4 py-2 rounded-lg border text-sm md:text-base transition focus:outline-none focus:ring-2 focus:ring-primary ${
                direction === dir.value
                  ? "bg-primary text-white border-primary"
                  : "bg-gray-50 text-gray-700 border-gray-300 hover:bg-primary hover:text-white"
              }`}
              aria-pressed={direction === dir.value}
            >
              {t(dir.labelKey)}
            </button>
          ))}
        </div>
      </section>

      {/* Color Pickers */}
      <section className="mb-8">
        <h2 className="sr-only">{t("colorPickersLabel")}</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {colors.map((color, i) => (
            <div key={i} className="flex items-center gap-2">
              <input
                type="color"
                value={color}
                onChange={(e) => handleColorChange(i, e.target.value)}
                className="w-10 h-10 md:w-16 md:h-12 outline-none cursor-pointer  focus:ring-2 focus:ring-primary"
                aria-label={`${t("colorLabel")} ${i + 1}`}
              />
              <button
                onClick={() => removeColor(i)}
                disabled={colors.length <= 2}
                className={`p-2 rounded-lg border ${
                  colors.length <= 2
                    ? "opacity-40 cursor-not-allowed"
                    : "text-red-600 border-red-300 hover:bg-red-50 focus:ring-2 focus:ring-red-400"
                }`}
                aria-label={t("removeColorBtn")}
              >
                <X size={18} aria-hidden="true" />
              </button>
            </div>
          ))}
          <button
            onClick={addColor}
            disabled={colors.length >= 6}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border border-primary text-primary text-sm md:text-base transition ${
              colors.length >= 6
                ? "opacity-40 cursor-not-allowed"
                : "hover:bg-primary hover:text-white focus:ring-2 focus:ring-primary"
            }`}
            aria-label={t("addColorBtn")}
          >
            <Plus size={18} aria-hidden="true" />
            {t("addColorBtn")}
          </button>
        </div>
      </section>

      {/* Gradient Preview */}
      <section className="mb-8">
        <h2 className="sr-only">{t("gradientPreviewLabel")}</h2>
        <div
          ref={previewRef}
          className="rounded-xl h-56 shadow-md border border-gray-200"
          style={{ background: gradientCss }}
          role="img"
          aria-label={t("gradientPreviewLabel")}
        ></div>
      </section>

      {/* CSS Code + Actions */}
      <section>
        <h2 className="sr-only">{t("cssCodeLabel")}</h2>
        <div className="flex flex-col md:flex-row gap-4 items-start">
          <textarea
            readOnly
            className="flex-grow border w-full md:w-fit border-gray-300 rounded-lg p-3 font-mono text-sm resize-none h-24 shadow-sm focus:ring-2 focus:ring-primary"
            value={`background: ${gradientCss};`}
            aria-label={t("cssCodeLabel")}
          />
          <div className="flex gap-3">
            <button
              onClick={copyCss}
              className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg text-sm md:text-base hover:bg-primary-dull focus:ring-2 focus:ring-primary"
              aria-label={t("copyCssBtn")}
            >
              <Copy size={18} aria-hidden="true" />
              {t("copyCssBtn")}
            </button>
            <button
              onClick={exportAsImage}
              className="flex items-center gap-2 border border-primary text-primary px-4 py-2 rounded-lg text-sm md:text-base hover:bg-primary hover:text-white focus:ring-2 focus:ring-primary"
              aria-label={t("exportPngBtn")}
            >
              <Download size={18} aria-hidden="true" />
              {t("exportPngBtn")}
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default GradientGenerator;
