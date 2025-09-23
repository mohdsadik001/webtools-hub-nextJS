import React from 'react';

const Textarea = React.forwardRef(({ value, onChange, ariaLabel, placeholder, rows = 6, error = false, ...props }, ref) => {
  const baseStyles = 'w-full border rounded-lg p-4 font-mono resize-none text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 transition';
  const errorStyles = error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-primary';

  return (
    <textarea
      ref={ref}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      aria-label={ariaLabel}
      className={`${baseStyles} ${errorStyles}`}
      {...props}
    />
  );
});

export default Textarea;
