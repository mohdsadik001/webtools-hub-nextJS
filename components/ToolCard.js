"use client";
import { useAppContext } from "./Context/AppContext";
import { useTranslation } from "react-i18next";

const ToolCard = ({ tool }) => {
  const { router } = useAppContext(); // router instance from context
  const { t } = useTranslation("tools"); // namespace "tools"

  const handleNavigation = () => {
    router.push(`/tools/${tool.category.toLowerCase()}/${tool.slug}`);
  };

  return (
    <button
      onClick={handleNavigation}
      className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer group text-left focus:outline-none focus:ring-2 focus:ring-primary"
      role="listitem"
      aria-label={`Open ${t(`${tool.slug}.name`)}`}
    >
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center text-primary text-xl flex-shrink-0">
          {tool.image}
        </div>
        <div className="flex justify-between h-full flex-col">
          <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-primary-dull transition-colors">
            {t(`${tool.slug}.name`)}
          </h3>
          <p className="text-gray-600 text-sm mb-3">
            {t(`${tool.slug}.description`)}
          </p>
          <span className="text-xs text-primary align-bottom">Open →</span>
        </div>
      </div>
    </button>
  );
};

export default ToolCard;
