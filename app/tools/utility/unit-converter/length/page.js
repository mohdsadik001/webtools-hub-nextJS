"use client"
import React, { useState, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import Select from "react-select";

// Units and conversion factors
const unitToMeter = {
  mm: 0.001,
  cm: 0.01,
  m: 1,
  km: 1000,
  in: 0.0254,
  ft: 0.3048,
  yd: 0.9144,
  mi: 1609.34,
};

const LengthConverter = () => {
  const { t } = useTranslation("common");
  const [inputValue, setInputValue] = useState(1);
  const [fromUnit, setFromUnit] = useState("m");
  const [toUnit, setToUnit] = useState("cm");
  const [convertedValue, setConvertedValue] = useState(0);

  // ✅ Options depend on language (regenerate on language change)
  const options = useMemo(
    () =>
      Object.keys(unitToMeter).map((unit) => ({
        value: unit,
        label: t(`lengthUnits.${unit}`), // translation key
      })),
    [t] // re-run when language changes
  );


  useEffect(() => {
    convertLength();
  }, [inputValue, fromUnit, toUnit]);

  const convertLength = () => {
    const meters = parseFloat(inputValue) * unitToMeter[fromUnit];
    const result = meters / unitToMeter[toUnit];
    setConvertedValue(result);
  };

  const swapUnits = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  };

  const unitDescriptions = t("lengthUnitDescriptions", { returnObjects: true });

  return (
    <div className="mt-10 px-4 md:px-16 lg:px-24 xl:px-32 py-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-primary">
        {t("lengthConverterTitle")}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center mb-4">
        <input
          type="number"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="border border-gray-300 px-4 py-1.5 rounded outline-primary w-full"
          placeholder={t("lengthPlaceholder")}
        />

        <Select
          options={options}
          value={options.find((opt) => opt.value === fromUnit)}
          onChange={(opt) => setFromUnit(opt.value)}
          className="w-full"
        />

        <Select
          options={options}
          value={options.find((opt) => opt.value === toUnit)}
          onChange={(opt) => setToUnit(opt.value)}
          className="w-full"
        />
      </div>

      <div className="flex justify-center mt-2 mb-6">
        <button
          onClick={swapUnits}
          className="text-sm text-white hover:underline flex items-center gap-1 bg-primary px-4 py-2 rounded cursor-pointer"
        >
          🔄 {t("swapUnits")}
        </button>
      </div>

      <div className="text-center text-2xl font-semibold text-primary">
        {inputValue} {t(`units.${fromUnit}`)} = {convertedValue.toFixed(2)}{" "}
        {t(`lengthUnits.${toUnit}`)}
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-center text-sm text-gray-600">
        <p>
          <strong>{t(`lengthUnits.${fromUnit}`)}</strong>:{" "}
          {unitDescriptions[fromUnit]}
        </p>
        <p>
          <strong>{t(`lengthUnits.${toUnit}`)}</strong>: {unitDescriptions[toUnit]}
        </p>
      </div>
    </div>
  );
};

export default LengthConverter;
