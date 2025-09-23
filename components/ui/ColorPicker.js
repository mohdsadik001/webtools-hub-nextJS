import React from 'react';
import Button from './buttons/Button';
import { X } from 'lucide-react';

const ColorPicker = ({ colors, updateColor, removeColor, addColor }) => {
  return (
    <div className="flex flex-wrap justify-center gap-4">
      {colors.map((color, i) => (
        <div key={i} className="flex items-center gap-2">
          <input
            type="color"
            value={color}
            onChange={(e) => updateColor(i, e.target.value)}
            className="w-10 h-10 md:w-16 md:h-12 outline-none cursor-pointer focus:ring-2 focus:ring-primary"
            aria-label={`Color ${i + 1}`}
          />
          <Button
            onClick={() => removeColor(i)}
            disabled={colors.length <= 2}
            variant="outline"
            size="md"
            aria-label="Remove Color"
        
          >
            <X size={16} />
          </Button>
        </div>
      ))}
      <Button
        onClick={addColor}
        disabled={colors.length >= 6}
        variant="outline-primary"
        size="md"
        aria-label="Add Color"
      >
        <span className="mr-2">+</span> Add Color
      </Button>
    </div>
  );
};

export default ColorPicker;
