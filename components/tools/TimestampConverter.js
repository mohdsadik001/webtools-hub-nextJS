"use client";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Clock, Copy, Download } from "lucide-react";

import Button from '@/components/ui/buttons/Button';
import Input from '@/components/ui/Input';
import useClipboard from '@/hooks/useClipboard';

const TimestampConverter = () => {
  const [timestamp, setTimestamp] = useState(Math.floor(Date.now() / 1000));
  const [dateStr, setDateStr] = useState("");
  const { t } = useTranslation("common");
  const { copied, copy } = useClipboard();

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
          <Input
            id="timeStampInput"
            type="number"
            value={timestamp}
            onChange={(e) => {
              const value = e.target.value;
              setTimestamp(value);
              convertToDate(value);
            }}
            ariaLabel={t("unixTimestampLabel")}
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
          <Input
            id="humanReadable"
            type="datetime-local"
            value={new Date(timestamp * 1000).toISOString().slice(0, 16)}
            onChange={(e) => convertToTimestamp(e.target.value)}
            ariaLabel={t("humanReadableDateLabel")}
          />
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row flex-wrap gap-2 md:gap-4 w-full justify-center items-center mt-6">
          <Button
            onClick={handleNow}
            variant="primary"
            icon={Clock}
            ariaLabel={t("useCurrentTimeBtn")}
            className="w-full sm:w-auto flex items-center justify-center bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold"
          >
            {t("useCurrentTimeBtn")}
          </Button>

          <Button
            onClick={() => copy(`${timestamp} = ${dateStr}`)}
            variant="secondary"
            icon={Copy}
            ariaLabel={t("copyBtn")}
            className="w-full sm:w-auto flex items-center justify-center bg-primary text-white px-4 py-2 rounded-lg font-semibold"
          >
            {copied ? t("copiedAlert") : t("copyBtn")}
          </Button>

          <Button
            onClick={handleExport}
            variant="secondary"
            icon={Download}
            ariaLabel={t("exportBtn")}
            className="w-full sm:w-auto flex items-center justify-center bg-primary text-white px-4 py-2 rounded-lg font-semibold"
          >
            {t("exportBtn")}
          </Button>
        </div>
      </div>
    </main>
  );
};

export default TimestampConverter;
