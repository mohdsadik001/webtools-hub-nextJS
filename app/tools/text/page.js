"use client";
import Link from "next/link";
import { useTranslation } from "react-i18next";

const textTools = [
  {
    key: "text-case-converter",
    labelKey: "Text Case Converter",
    path: "/tools/text/text-case-converter",
    icon: "🔠",
  },
  {
    key: "text-counter",
    labelKey: "Text Counter",
    path: "/tools/text/text-counter",
    icon: "🔢",
  },
  {
    key: "lorem-ipsum-generator",
    labelKey: "Lorem Ipsum Generator",
    path: "/tools/text/lorem-ipsum-generator",
    icon: "📄",
  },
  {
    key: "multiple-whitespace-remover",
    labelKey: "Multiple Whitespace Remover",
    path: "/tools/text/multiple-whitespace-remover",
    icon: "🚫",
  },
  {
    key: "text-diff-checker",
    labelKey: "Text Diff Checker",
    path: "/tools/text/text-diff-checker",
    icon: "📝",
  },
];

export default function TextToolsPage() {
  const { t } = useTranslation("common");

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-8 text-primary">
        {t("textCounter")}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {textTools.map((tool) => (
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
