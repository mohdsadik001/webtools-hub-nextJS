"use client";
import Link from "next/link";
import { useTranslation } from "react-i18next";

const categories = [
  {
    key: "textTools",
    path: "/tools/text",
    icon: "📝",
  },
  {
    key: "colorTools",
    path: "/tools/color",
    icon: "🎨",
  },
  {
    key: "developerTools",
    path: "/tools/developer",
    icon: "💻",
  },
  {
    key: "financeTools",
    path: "/tools/finance",
    icon: "💸",
  },
  {
    key: "utilityTools",
    path: "/tools/utility",
    icon: "🛠️",
  },
];

export default function Categories() {
  const { t } = useTranslation("common");

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-8 text-primary">
        {t("categories")}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {categories.map((cat) => (
          <Link
            key={cat.key}
            href={cat.path}
            className="flex items-center gap-4 p-6 bg-white rounded-lg shadow hover:shadow-lg transition border border-gray-100 hover:border-primary"
          >
            <span className="text-3xl">{cat.icon}</span>
            <span className="text-lg font-semibold text-black">
              {t(cat.key)}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
