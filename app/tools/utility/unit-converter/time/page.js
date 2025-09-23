// "use client"
// import React, { useState, useEffect } from "react";
// import { useTranslation } from "react-i18next";
// import Select from "react-select";

// const timeUnits = [
//   { label: "Milliseconds", value: "ms", factor: 1 },
//   { label: "Seconds", value: "s", factor: 1000 },
//   { label: "Minutes", value: "min", factor: 1000 * 60 },
//   { label: "Hours", value: "hr", factor: 1000 * 60 * 60 },
//   { label: "Days", value: "day", factor: 1000 * 60 * 60 * 24 },
//   { label: "Weeks", value: "week", factor: 1000 * 60 * 60 * 24 * 7 },
//   { label: "Years", value: "year", factor: 1000 * 60 * 60 * 24 * 365.25 },
// ];

// const TimeConverter = () => {
//   const { t } = useTranslation("common");

//   const [inputValue, setInputValue] = useState(1);
//   const [fromUnit, setFromUnit] = useState("s");
//   const [toUnit, setToUnit] = useState("min");
//   const [convertedValue, setConvertedValue] = useState(0);
//   const [exportMsg, setExportMsg] = useState("");

//   const getUnitLabel = (value) =>
//     t(timeUnits.find((u) => u.value === value)?.label || "");

//   useEffect(() => {
//     convertTime();
//   }, [inputValue, fromUnit, toUnit]);

//   const convertTime = () => {
//     const from = timeUnits.find((unit) => unit.value === fromUnit);
//     const to = timeUnits.find((unit) => unit.value === toUnit);
//     if (!from || !to) return;
//     const inMs = parseFloat(inputValue) * from.factor;
//     const result = inMs / to.factor;
//     setConvertedValue(result);
//   };

//   const swapUnits = () => {
//     setFromUnit(toUnit);
//     setToUnit(fromUnit);
//   };

//   const handleExport = () => {
//     const resultText = `${inputValue} ${getUnitLabel(fromUnit)} = ${convertedValue} ${getUnitLabel(toUnit)}`;
//     const blob = new Blob([resultText], { type: "text/plain;charset=utf-8" });
//     const url = window.URL.createObjectURL(blob);
//     const link = document.createElement("a");
//     link.href = url;
//     link.download = "time-conversion.txt";
//     link.click();
//     setExportMsg(t("Exported!"));
//     setTimeout(() => setExportMsg(""), 2000);
//   };

//   const unitOptions = timeUnits.map((u) => ({
//     value: u.value,
//     label: t(u.label),
//   }));

//   return (
//     <div className="mt-16 px-6 md:px-16 lg:px-24 xl:px-32 py-6">
//       <h2 className="text-3xl font-bold text-center text-primary mb-6">
//         ⏱️ {t("timeConverterTitle")}
//       </h2>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center mb-4">
//         <input
//           type="number"
//           value={inputValue}
//           onChange={(e) => setInputValue(e.target.value)}
//           className="border border-gray-400 px-4 py-1.5 rounded outline-primary w-full"
//           placeholder={t("timePlaceholder")}
//         />

//         <Select
//           options={unitOptions}
//           value={unitOptions.find((opt) => opt.value === fromUnit)}
//           onChange={(selected) => setFromUnit(selected.value)}
//           className="w-full"
//           classNamePrefix="select"
//         />

//         <Select
//           options={unitOptions}
//           value={unitOptions.find((opt) => opt.value === toUnit)}
//           onChange={(selected) => setToUnit(selected.value)}
//           className="w-full"
//           classNamePrefix="select"
//         />
//       </div>

//       <div className="flex justify-center mb-4">
//         <button
//           onClick={swapUnits}
//           className="text-sm text-white hover:underline flex items-center gap-1 bg-primary px-4 py-2 rounded cursor-pointer"
//         >
//           🔄 {t("swapUnits")}
//         </button>
//       </div>

//       <div className="text-center text-xl font-semibold text-gray-700 mb-4">
//         {inputValue} {getUnitLabel(fromUnit)} ={" "}
//         <span className="text-primary font-bold">{convertedValue}</span>{" "}
//         {getUnitLabel(toUnit)}
//       </div>

//       <div className="flex justify-center">
//         <button
//           onClick={handleExport}
//           className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dull text-sm"
//         >
//           🧾 {t("exportResult")}
//         </button>
//       </div>

//       {exportMsg && (
//         <p className="text-center text-green-600 mt-2 text-sm">{exportMsg}</p>
//       )}
//     </div>
//   );
// };

// export default TimeConverter;


"use client";
import React from 'react';
import TimeConverter from '@/components/tools/TimeConverter';

const TimeConverterPage = () => <TimeConverter />;

export default TimeConverterPage;
