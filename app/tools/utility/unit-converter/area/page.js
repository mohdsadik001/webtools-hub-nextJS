"use client"
import React, { useState, useEffect } from "react";
import Select from "react-select";
import { useTranslation } from "react-i18next";

// Base unit is square meter
const areaUnits = (t) => [
  { label: t("squareMillimeter"), value: "mm2", factor: 0.000001 },
  { label: t("squareCentimeter"), value: "cm2", factor: 0.0001 },
  { label: t("squareMeter"), value: "m2", factor: 1 },
  { label: t("squareKilometer"), value: "km2", factor: 1e6 },
  { label: t("squareInch"), value: "in2", factor: 0.00064516 },
  { label: t("squareFoot"), value: "ft2", factor: 0.092903 },
  { label: t("squareYard"), value: "yd2", factor: 0.836127 },
  { label: t("acre"), value: "acre", factor: 4046.86 },
  { label: t("hectare"), value: "ha", factor: 10000 },
];

const AreaConverter = () => {
  const { t } = useTranslation();

  const [inputValue, setInputValue] = useState(1);
  const [fromUnit, setFromUnit] = useState("m2");
  const [toUnit, setToUnit] = useState("ft2");
  const [convertedValue, setConvertedValue] = useState(0);

  useEffect(() => {
    convertArea();
  }, [inputValue, fromUnit, toUnit]);

  const convertArea = () => {
    const from = areaUnits(t).find((u) => u.value === fromUnit);
    const to = areaUnits(t).find((u) => u.value === toUnit);
    if (!from || !to) return;
    const valueInM2 = parseFloat(inputValue) * from.factor;
    const result = valueInM2 / to.factor;
    setConvertedValue(result);
  };

  const swapUnits = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  };

  return (
    <div className="mt-16 px-6 md:px-16 lg:px-24 xl:px-32 py-6">
      <h2 className="text-3xl font-bold text-center text-primary mb-6">
        📐 {t("areaConverterTitle")}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center mb-4">
        <input
          type="number"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="border border-gray-400 px-4 py-1.5 rounded outline-primary w-full"
          placeholder={t("enterArea")}
        />

        <Select
          options={areaUnits(t).map((u) => ({ label: u.label, value: u.value }))}
          value={areaUnits(t).find((opt) => opt.value === fromUnit)}
          onChange={(selected) => setFromUnit(selected.value)}
          className="w-full"
          classNamePrefix="select"
        />

        <Select
          options={areaUnits(t).map((u) => ({ label: u.label, value: u.value }))}
          value={areaUnits(t).find((opt) => opt.value === toUnit)}
          onChange={(selected) => setToUnit(selected.value)}
          className="w-full"
          classNamePrefix="select"
        />
      </div>

      <div className="flex justify-center mb-4">
        <button
          onClick={swapUnits}
          className="text-sm text-white hover:underline flex items-center gap-1 bg-primary px-4 py-2 rounded cursor-pointer"
        >
          🔄 {t("swapUnits")}
        </button>
      </div>

      <div className="text-center text-xl font-semibold text-gray-700">
        {inputValue} {fromUnit} ={" "}
        <span className="text-primary font-bold">{convertedValue.toFixed(6)}</span> {toUnit}
      </div>
    </div>
  );
};

export default AreaConverter;
