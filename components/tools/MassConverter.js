"use client";
import React, { useState, useEffect } from "react";
import Select from "react-select";
import { useTranslation } from "react-i18next";

import Button from '@/components/ui/buttons/Button';
import Input from '@/components/ui/Input';
import { massUnits } from '@/config/units';

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
          <Input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={t("enterMass")}
            ariaLabel={t("enterMass")}
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
        <Button
          onClick={swapUnits}
          variant="primary"
          ariaLabel={t("swapUnits")}
        >
          🔄 {t("swapUnits")}
        </Button>
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
