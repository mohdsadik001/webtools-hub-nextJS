"use client";
import React, { useState, useEffect } from "react";
import Select from "react-select";
import { useTranslation } from "react-i18next";

// Base unit: gram (g)
const massUnits = [
  { key: "milligram", value: "mg", factor: 0.001, descKey: "milligramDesc" },
  { key: "gram", value: "g", factor: 1, descKey: "gramDesc" },
  { key: "kilogram", value: "kg", factor: 1000, descKey: "kilogramDesc" },
  { key: "metricTon", value: "t", factor: 1_000_000, descKey: "metricTonDesc" },
  { key: "ounce", value: "oz", factor: 28.3495, descKey: "ounceDesc" },
  { key: "pound", value: "lb", factor: 453.592, descKey: "poundDesc" },
  { key: "usTon", value: "us_ton", factor: 907_185, descKey: "usTonDesc" },
];

const MassConverter = () => {
  const { t } = useTranslation("common");

  const [inputValue, setInputValue] = useState(1);
  const [fromUnit, setFromUnit] = useState("g");
  const [toUnit, setToUnit] = useState("kg");
  const [convertedValue, setConvertedValue] = useState(0);

  useEffect(() => {
    convertMass();
  }, [inputValue, fromUnit, toUnit]);

  const convertMass = () => {
    const from = massUnits.find((unit) => unit.value === fromUnit);
    const to = massUnits.find((unit) => unit.value === toUnit);
    if (!from || !to) return;
    const valueInGrams = parseFloat(inputValue) * from.factor;
    const result = valueInGrams / to.factor;
    setConvertedValue(result);
  };

  const swapUnits = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  };

  const getDescription = (unitValue) => {
    const unit = massUnits.find((u) => u.value === unitValue);
    return unit ? t(unit.descKey) : "";
  };

  const unitOptions = massUnits.map((u) => ({
    label: t(u.key),
    value: u.value,
  }));

  return (
    <div className="mt-16 px-6 md:px-16 lg:px-24 xl:px-32 py-6">
      <h2 className="text-3xl font-bold text-center text-primary mb-6">
        ⚖️ {t("massConverterTitle")}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start mb-4">
        {/* Input Field */}
        <div className="flex flex-col">
          <input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="border border-gray-400 px-4 py-1.5 rounded outline-primary w-full"
            placeholder={t("enterMass")}
          />
        </div>

        {/* From Unit Selector */}
        <div className="flex flex-col">
          <Select
            options={unitOptions}
            value={unitOptions.find((opt) => opt.value === fromUnit)}
            onChange={(selected) => setFromUnit(selected.value)}
            className="w-full"
            classNamePrefix="select"
          />
          <p className="text-xs text-gray-600 mt-1 min-h-[36px]">
            {getDescription(fromUnit)}
          </p>
        </div>

        {/* To Unit Selector */}
        <div className="flex flex-col">
          <Select
            options={unitOptions}
            value={unitOptions.find((opt) => opt.value === toUnit)}
            onChange={(selected) => setToUnit(selected.value)}
            className="w-full"
            classNamePrefix="select"
          />
          <p className="text-xs text-gray-600 mt-1 min-h-[36px]">
            {getDescription(toUnit)}
          </p>
        </div>
      </div>

      {/* Swap Button */}
      <div className="flex justify-center mb-4">
        <button
          onClick={swapUnits}
          className="text-sm text-white hover:underline flex items-center gap-1 bg-primary px-4 py-2 rounded cursor-pointer"
        >
          🔄 {t("swapUnits")}
        </button>
      </div>

      {/* Conversion Result */}
      <div className="text-center text-xl font-semibold text-gray-700">
        {inputValue} {fromUnit} ={" "}
        <span className="text-primary font-bold">
          {convertedValue.toFixed(6)}
        </span>{" "}
        {toUnit}
      </div>
    </div>
  );
};

export default MassConverter;
