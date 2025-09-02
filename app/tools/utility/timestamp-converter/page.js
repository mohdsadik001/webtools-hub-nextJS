"use client";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Clock, Copy, Download } from "lucide-react"; // ✅ Next icons

const TimestampConverter = () => {
  const [timestamp, setTimestamp] = useState(Math.floor(Date.now() / 1000));
  const [dateStr, setDateStr] = useState("");
  const { t } = useTranslation("common");

  useEffect(() => {
    convertToDate(timestamp);
  }, []);

  const convertToDate = (ts) => {
    const d = new Date(ts * 1000);
    setDateStr(d.toLocaleString());
  };

  const convertToTimestamp = (date) => {
    const ts = Math.floor(new Date(date).getTime() / 1000);
    setTimestamp(ts);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`${timestamp} = ${dateStr}`);
      alert(t("copiedAlert"));
    } catch {
      alert(t("copyFailedAlert"));
    }
  };

  const handleExport = () => {
    const blob = new Blob([`${timestamp} = ${dateStr}`], {
      type: "text/plain",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "timestamp.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleNow = () => {
    const now = Math.floor(Date.now() / 1000);
    setTimestamp(now);
    convertToDate(now);
  };

  return (
    <main
      className="px-4 py-8 md:px-10 lg:px-16 xl:px-24 max-w-4xl mx-auto mt-2 md:mt-8 bg-white rounded-xl shadow-lg"
      role="main"
      aria-label={t("timestampConverterTitle")}
    >
      <h1
        className="text-xl md:text-3xl font-bold text-center text-primary mb-8"
        tabIndex="0"
      >
        {t("timestampConverterTitle")}
      </h1>

      <div className="space-y-6">
        {/* Unix Timestamp Input */}
        <div>
          <label
            htmlFor="timeStampInput"
            className="block text-base font-medium mb-1"
          >
            {t("unixTimestampLabel")}
          </label>
          <input
            id="timeStampInput"
            type="number"
            aria-describedby="unixHelp"
            className="w-full border border-gray-300 px-4 py-3 rounded-lg text-lg outline-primary focus:ring-2 focus:ring-primary"
            value={timestamp}
            onChange={(e) => {
              const value = e.target.value;
              setTimestamp(value);
              convertToDate(value);
            }}
          />
        </div>

        {/* Human Readable Input */}
        <div>
          <label
            htmlFor="humanReadable"
            className="block text-base font-medium mb-1"
          >
            {t("humanReadableDateLabel")}
          </label>
          <input
            id="humanReadable"
            type="datetime-local"
            className="w-full border border-gray-300 px-4 py-3 rounded-lg text-lg outline-primary focus:ring-2 focus:ring-primary"
            value={new Date(timestamp * 1000).toISOString().slice(0, 16)}
            onChange={(e) => convertToTimestamp(e.target.value)}
          />
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row flex-wrap gap-2 md:gap-4 w-full justify-center items-center mt-6">
          <button
            onClick={handleNow}
            className="flex items-center justify-center gap-2 px-5 py-3 bg-blue-600 text-white text-sm sm:text-base rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition w-full sm:w-auto"
            aria-label={t("useCurrentTimeBtn")}
          >
            <Clock size={18} aria-hidden="true" />
            {t("useCurrentTimeBtn")}
          </button>

          <button
            onClick={handleCopy}
            className="flex items-center justify-center gap-2 px-5 py-3 bg-primary text-white text-sm sm:text-base rounded-lg hover:bg-primary-dull focus:outline-none focus:ring-2 focus:ring-primary transition w-full sm:w-auto"
            aria-label={t("copyBtn")}
          >
            <Copy size={18} aria-hidden="true" />
            {t("copyBtn")}
          </button>

          <button
            onClick={handleExport}
            className="flex items-center justify-center gap-2 px-5 py-3 border border-primary text-primary text-sm sm:text-base rounded-lg hover:bg-primary hover:text-white focus:outline-none focus:ring-2 focus:ring-primary transition w-full sm:w-auto"
            aria-label={t("exportBtn")}
          >
            <Download size={18} aria-hidden="true" />
            {t("exportBtn")}
          </button>
        </div>

        
      </div>
    </main>
  );
};

export default TimestampConverter;
