"use client";
import { useState } from "react";

export default function ColorPickerPage() {
  const [color, setColor] = useState("#3498db");

  return (
    <div className="max-w-md mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold text-center mb-6 text-primary">
        🎨 Color Picker
      </h1>
      <div className="flex flex-col items-center gap-6">
        <input
          type="color"
          value={color}
          onChange={e => setColor(e.target.value)}
          className="w-32 h-32 rounded shadow border"
        />
        <div className="flex flex-col items-center gap-2">
          <span className="text-lg font-mono">{color}</span>
          <button
            onClick={() => {
              navigator.clipboard.writeText(color);
              alert("Copied!");
            }}
            className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dull transition"
          >
            Copy Color
          </button>
        </div>
        <div
          className="w-full h-16 rounded shadow"
          style={{ background: color }}
        />
      </div>
    </div>
  );
}
