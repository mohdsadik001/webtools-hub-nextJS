"use client";
import React, { useState, useRef } from "react";
import Base64Encoder from "@/components/Base64Encoder";
import Base64Decoder from "@/components/Base64Decoder";
import FileToBase64 from "@/components/FileToBase64";
import FileDecoder from "@/components/FileDecoder";
import { useTranslation } from "react-i18next";
import { Lock, Unlock, FileDown, FileUp } from "lucide-react";

const Base64Tabs = () => {
  const tabs = [
    { key: "encodeTextTab", icon: <Lock className="w-4 h-4" />, component: <Base64Encoder /> },
    { key: "decodeTextTab", icon: <Unlock className="w-4 h-4" />, component: <Base64Decoder /> },
    { key: "fileToBase64Tab", icon: <FileUp className="w-4 h-4" />, component: <FileToBase64 /> },
    { key: "fileDecoderTab", icon: <FileDown className="w-4 h-4" />, component: <FileDecoder /> },
  ];

  const [activeTab, setActiveTab] = useState(0);
  const tabRefs = useRef([]); // store references to tab buttons
  const { t } = useTranslation("common");

  // Keyboard navigation with focus management
  const handleKeyDown = (e, index) => {
    let newIndex = index;

    if (e.key === "ArrowRight") {
      newIndex = (index + 1) % tabs.length;
    } else if (e.key === "ArrowLeft") {
      newIndex = (index - 1 + tabs.length) % tabs.length;
    } else if (e.key === "Home") {
      newIndex = 0;
    } else if (e.key === "End") {
      newIndex = tabs.length - 1;
    } else {
      return; // exit for non-navigation keys
    }

    e.preventDefault();
    setActiveTab(newIndex);
    tabRefs.current[newIndex]?.focus(); // Move keyboard focus
  };

  return (
    <div className="mt-2 md:mt-8 px-4 md:px-25 py-4">
      {/* Title */}
      <h1
        className="text-2xl md:text-3xl font-bold text-left text-primary mb-6"
        tabIndex={0}
      >
        {t("base64ToolkitTitle")}
      </h1>

      {/* Tabs */}
      <div
        className="flex flex-wrap justify-center gap-2 md:gap-4 mb-6"
        role="tablist"
        aria-label="Base64 Converter Tabs"
      >
        {tabs.map((tab, index) => (
          <button
            key={tab.key}
            ref={(el) => (tabRefs.current[index] = el)} // save reference
            role="tab"
            aria-selected={activeTab === index}
            aria-controls={`tab-panel-${index}`}
            id={`tab-${index}`}
            tabIndex={activeTab === index ? 0 : -1}
            onClick={() => {
              setActiveTab(index);
              tabRefs.current[index]?.focus();
            }}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className={`flex items-center gap-2 px-4 py-2 text-sm md:text-base border-b-2 transition focus:outline-none focus:ring-2 focus:ring-primary rounded-md ${
              activeTab === index
                ? "border-primary text-primary font-semibold"
                : "border-transparent text-gray-600 hover:text-primary"
            }`}
          >
            {tab.icon}
            {t(tab.key)}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div
        id={`tab-panel-${activeTab}`}
        role="tabpanel"
        aria-labelledby={`tab-${activeTab}`}
        className="bg-white md:p-4 rounded-lg shadow-md"
      >
        {tabs[activeTab].component}
      </div>
    </div>
  );
};

export default Base64Tabs;
