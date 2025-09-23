// configs/units.js
export const areaUnits = (t) => [
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

export const lengthUnits = {
  mm: 0.001,
  cm: 0.01,
  m: 1,
  km: 1000,
  in: 0.0254,
  ft: 0.3048,
  yd: 0.9144,
  mi: 1609.34,
};

export const massUnits = [
  { key: "milligram", value: "mg", factor: 0.001, descKey: "milligramDesc" },
  { key: "gram", value: "g", factor: 1, descKey: "gramDesc" },
  { key: "kilogram", value: "kg", factor: 1000, descKey: "kilogramDesc" },
  { key: "metricTon", value: "t", factor: 1_000_000, descKey: "metricTonDesc" },
  { key: "ounce", value: "oz", factor: 28.3495, descKey: "ounceDesc" },
  { key: "pound", value: "lb", factor: 453.592, descKey: "poundDesc" },
  { key: "usTon", value: "us_ton", factor: 907_185, descKey: "usTonDesc" },
];

export const timeUnits = [
  { label: "Milliseconds", value: "ms", factor: 1 },
  { label: "Seconds", value: "s", factor: 1000 },
  { label: "Minutes", value: "min", factor: 1000 * 60 },
  { label: "Hours", value: "hr", factor: 1000 * 60 * 60 },
  { label: "Days", value: "day", factor: 1000 * 60 * 60 * 24 },
  { label: "Weeks", value: "week", factor: 1000 * 60 * 60 * 24 * 7 },
  { label: "Years", value: "year", factor: 1000 * 60 * 60 * 24 * 365.25 },
];
