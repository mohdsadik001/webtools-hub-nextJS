"use client";
import Link from "next/link";
import { useTranslation } from "react-i18next";

const developerTools = [
  {
    key: "base64-encoder",
    labelKey: "Base64 Encoder/Decoder",
    path: "/tools/developer/base64-encoder",
    icon: "🧬",
  },
  {
    key: "json-validator",
    labelKey: "JSON Validator",
    path: "/tools/developer/json-validator",
    icon: "🧾",
  },
  {
    key: "url-encoder-decoder",
    labelKey: "URL Encoder/Decoder",
    path: "/tools/developer/url-encoder-decoder",
    icon: "🔗",
  },
  // Add more developer tools here as needed
];

export default function DeveloperToolsPage() {
  const { t } = useTranslation("common");

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-8 text-primary">
        {t("developerTools") || "Developer Tools"}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {developerTools.map((tool) => (
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
