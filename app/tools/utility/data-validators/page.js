"use client";
import AadharValidator from "@/components/Validators/AadharValidator";
import EmailValidator from "@/components/Validators/EmailValidator";
import PanCardValidator from "@/components/Validators/PanCardValidator";
import PhoneValidator from "@/components/Validators/PhoneValidator";
import PinCodeValidator from "@/components/Validators/PinCodeValidator";

import { Phone, MailIcon, IdCard, MapPinCheckInside } from "lucide-react";
import { useState, useRef } from "react";
import { useTranslation } from "react-i18next";

export default function Validators() {
  const { t } = useTranslation("common");

  const tabs = [
    { key: "emailValidator", icon: <MailIcon className="w-4 h-4" />, component: <EmailValidator /> },
    { key: "phoneValidator", icon: <Phone className="w-4 h-4" />, component: <PhoneValidator /> },
    { key: "aadharValidator", icon: <IdCard className="w-4 h-4" />, component: <AadharValidator /> },
    { key: "panCardValidator", icon: <IdCard className="w-4 h-4" />, component: <PanCardValidator /> },
    { key: "pinCodeValidator", icon: <MapPinCheckInside className="w-4 h-4" />, component: <PinCodeValidator /> },
  ];

  const [activeTab, setActiveTab] = useState(0);
  const tabRefs = useRef([]); // store refs to tab buttons

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
      return;
    }
    e.preventDefault();
    setActiveTab(newIndex);
    // move focus to the new tab button
    tabRefs.current[newIndex]?.focus();
  };

  return (
    <div className="mt-2 md:mt-8 px-4 md:px-25 py-4">
      <h1
        className="text-2xl md:text-3xl font-bold text-left text-primary mb-6"
        tabIndex={0}
      >
        {t("validatorTitle")}
      </h1>

      {/* Tablist */}
      <div
        className="grid grid-cols-2 md:grid-cols-5 gap-2 md:gap-4 mb-6"
        role="tablist"
        aria-label="Validators Tabs"
      >
        {tabs.map((tab, index) => (
          <button
            key={tab.key}
            ref={(el) => (tabRefs.current[index] = el)}
            role="tab"
            aria-label={t(tab.key)}
            aria-selected={activeTab === index}
            aria-controls={`tab-panel-${index}`}
            id={`tab-${index}`}
            tabIndex={activeTab === index ? 0 : -1}
            onClick={() => {
              setActiveTab(index);
              tabRefs.current[index]?.focus();
            }}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className={`flex items-center justify-start md:justify-center gap-2 px-4 py-2 text-sm md:text-base border-b-2 transition focus:outline-none focus:ring-2 focus:ring-primary rounded-md ${
              activeTab === index
                ? "border-primary text-primary font-semibold"
                : "border-transparent text-gray-600 hover:text-primary"
            }`}
          >
            {tab.icon} {t(tab.key)}
          </button>
        ))}
      </div>

      {/* Tab Main Content */}
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
}
