"use client";
import React, { useState, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import Select from "react-select";

import Button from '@/components/ui/buttons/Button';
import Input from '@/components/ui/Input';
import useClipboard from '@/hooks/useClipboard';

const TemperatureConverter = () => {
  const { t } = useTranslation("common");
  const [inputValue, setInputValue] = useState(0);
  const [fromUnit, setFromUnit] = useState("celsius");
  const [toUnit, setToUnit] = useState("fahrenheit");
  const [convertedValue, setConvertedValue] = useState("");
  const { copied, copy } = useClipboard();

  // 🔹 Dynamically translated options
  const unitOptions = useMemo(
    () => [
      { value: "celsius", label: t("tempretureUnits.celsius") },
      { value: "fahrenheit", label: t("tempretureUnits.fahrenheit") },
      { value: "kelvin", label: t("tempretureUnits.kelvin") },
    ],
    [t]
  );

  const unitSymbol = (unit) => {
    if (unit === "celsius") return "°C";
    if (unit === "fahrenheit") return "°F";
    if (unit === "kelvin") return "K";
  };

  useEffect(() => {
    convertTemperature();
  }, [inputValue, fromUnit, toUnit]);

  const convertTemperature = () => {
    let tempInC;
    if (fromUnit === "celsius") tempInC = parseFloat(inputValue);
    else if (fromUnit === "fahrenheit")
      tempInC = (parseFloat(inputValue) - 32) * (5 / 9);
    else if (fromUnit === "kelvin") tempInC = parseFloat(inputValue) - 273.15;

    let result;
    if (toUnit === "celsius") result = tempInC;
    else if (toUnit === "fahrenheit") result = tempInC * (9 / 5) + 32;
    else if (toUnit === "kelvin") result = tempInC + 273.15;

    setConvertedValue(result.toFixed(2));
  };

  const swapUnits = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  };

  const handleCopy = () => {
    const text = `${inputValue} ${unitSymbol(fromUnit)} = ${convertedValue} ${unitSymbol(toUnit)}`;
    copy(text);
  };

  const getTempIndicator = () => {
    const val = parseFloat(convertedValue);
    if (toUnit === "celsius") {
      if (val <= 0) return { emoji: "❄️", color: "text-blue-500" };
      if (val >= 35) return { emoji: "🔥", color: "text-red-500" };
    } else if (toUnit === "fahrenheit") {
      if (val <= 32) return { emoji: "❄️", color: "text-blue-500" };
      if (val >= 95) return { emoji: "🔥", color: "text-red-500" };
    } else if (toUnit === "kelvin") {
      if (val <= 273) return { emoji: "❄️", color: "text-blue-500" };
      if (val >= 308) return { emoji: "🔥", color: "text-red-500" };
    }
    return { emoji: "🌤️", color: "text-yellow-600" };
  };

  const { emoji, color } = getTempIndicator();

  return (
    <div className="mt-16 px-6 md:px-16 lg:px-24 xl:px-32 py-6">
      <h2 className="text-3xl font-bold text-center text-primary mb-6">
        {t("tempretureConverterTitle")}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center mb-4">
        <Input
          type="number"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={t("tempreturePlaceholder")}
          ariaLabel={t("tempreturePlaceholder")}
        />

        <Select
          options={unitOptions}
          value={unitOptions.find((opt) => opt.value === fromUnit)}
          onChange={(selected) => setFromUnit(selected.value)}
          className="w-full"
          classNamePrefix="select"
        />

        <Select
          options={unitOptions}
          value={unitOptions.find((opt) => opt.value === toUnit)}
          onChange={(selected) => setToUnit(selected.value)}
          className="w-full"
          classNamePrefix="select"
        />
      </div>

      <div className="flex justify-center mt-2 mb-4">
        <Button
          onClick={swapUnits}
          variant="primary"
          ariaLabel={t("swapUnits")}
        >
          🔄 {t("swapUnits")}
        </Button>
      </div>

      <div className="text-center text-xl font-semibold flex flex-col items-center gap-2">
        <div className={color}>
          {t("resultFormat", {
            inputValue,
            fromUnit: unitSymbol(fromUnit),
            convertedValue,
            toUnit: unitSymbol(toUnit),
            emoji,
          })}
        </div>
        
        <Button
          onClick={handleCopy}
          variant="secondary"
          size="sm"
          ariaLabel={t("copyButton")}
        >
          {copied ? t("copiedMsg") : t("copyButton")}
        </Button>
      </div>
    </div>
  );
};

export default TemperatureConverter;
