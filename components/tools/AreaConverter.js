"use client";
import React, { useState, useEffect } from "react";
import Select from "react-select";
import { useTranslation } from "react-i18next";

import Button from '@/components/ui/buttons/Button';
import Input from '@/components/ui/Input';
import { areaUnits } from '@/config/units';

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
        <Input
          type="number"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={t("enterArea")}
          ariaLabel={t("enterArea")}
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
        <Button
          onClick={swapUnits}
          variant="primary"
          ariaLabel={t("swapUnits")}
        >
          🔄 {t("swapUnits")}
        </Button>
      </div>

      <div className="text-center text-xl font-semibold text-gray-700">
        {inputValue} {fromUnit} ={" "}
        <span className="text-primary font-bold">{convertedValue.toFixed(6)}</span> {toUnit}
      </div>
    </div>
  );
};

export default AreaConverter;
