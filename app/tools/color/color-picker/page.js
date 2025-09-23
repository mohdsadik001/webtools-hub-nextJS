"use client";
import Button from "@/components/ui/buttons/Button";
import { Copy } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function ColorPickerPage() {
  const [color, setColor] = useState("#3498db");
  const { t } = useTranslation("common");

  return (
    <div className="max-w-md mx-auto py-10 shadow-lg px-4">
      <h1 className="text-2xl font-bold text-center mb-6 text-primary">
        {t("colorPicker")}
      </h1>
      <div className="flex flex-col items-center gap-6">
        <input
          type="color"
          value={color}
          onChange={e => setColor(e.target.value)}
          className="w-32 h-32 rounded shadow border"
        />
        <div className="flex flex-col items-center gap-2 ">
          <span className="text-lg font-mono">{color}</span>
          <Button
          icon={Copy}
          variant="primary"
            onClick={() => {
              navigator.clipboard.writeText(color);
              alert(t("copied"));
            }}

          >
            {t("copyColor")}
          </Button>
        </div>
        <div
          className="w-full h-16 rounded shadow"
          style={{ background: color }}
        />
      </div>
    </div>
  );
}
