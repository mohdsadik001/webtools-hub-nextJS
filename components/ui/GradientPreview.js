import React, { forwardRef } from 'react';

const GradientPreview = forwardRef(({ gradientCss, label }, ref) => (
  <div
    ref={ref}
    className="rounded-xl h-56 shadow-md border border-gray-200"
    style={{ background: gradientCss }}
    role="img"
    aria-label={label}
  />
));

export default GradientPreview;
