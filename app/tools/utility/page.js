"use client";
import Link from "next/link";
import { useTranslation } from "react-i18next";

const utilityTools = [
  {
    key: "password-generator",
    labelKey: "Password Generator",
    path: "/tools/utility/password-generator",
    icon: "🔐",
  },
  {
    key: "qr-code-generator",
    labelKey: "QR Code Generator",
    path: "/tools/utility/qr-code-generator",
    icon: "📲",
  },
  {
    key: "timestamp-converter",
    labelKey: "Timestamp Converter",
    path: "/tools/utility/timestamp-converter",
    icon: "⏱️",
  },
];

export default function UtilityToolsPage() {
  const { t } = useTranslation("common");

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-8 text-primary">
        {t("utilityTools") || "Utility Tools"}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {utilityTools.map((tool) => (
          <Link
            key={tool.key}
            href={tool.path}
            className="flex items-center gap-4 p-6 bg-white rounded-lg shadow hover:shadow-lg transition border border-gray-100 hover:border-primary"
          >
            <span className="text-3xl">{tool.icon}</span>
            <span className="text-lg font-semibold">{tool.labelKey}</span>
          </Link>
        ))}
        </div>
        </div>
  );
}