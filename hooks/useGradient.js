import { useState } from "react";

export function useGradient(initialColors = ["#ff0000", "#0000ff"], initialDirection = "to right") {
  const [colors, setColors] = useState(initialColors);
  const [direction, setDirection] = useState(initialDirection);

  const addColor = () => {
    if (colors.length < 6) setColors([...colors, "#ffffff"]);
  };

  const removeColor = (index) => {
    if (colors.length > 2) setColors(colors.filter((_, i) => i !== index));
  };

  const updateColor = (index, color) => {
    const newColors = [...colors];
    newColors[index] = color;
    setColors(newColors);
  };

  const gradientCss =
    direction === "radial"
      ? `radial-gradient(circle, ${colors.join(", ")})`
      : `linear-gradient(${direction}, ${colors.join(", ")})`;

  return {
    colors,
    direction,
    setDirection,
    addColor,
    removeColor,
    updateColor,
    gradientCss,
  };
}
