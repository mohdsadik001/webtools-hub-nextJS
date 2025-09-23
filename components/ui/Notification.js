import React from 'react';

const Notification = ({ message, type = 'success', isVisible }) => {
  if (!isVisible) return null;

  const baseStyles = 'fixed top-4 right-4 px-4 py-3 rounded-lg shadow-lg max-w-sm transition-opacity duration-300 z-50';
  const typeStyles = {
    success: 'bg-green-600 text-white',
    error: 'bg-red-600 text-white',
    info: 'bg-blue-600 text-white',
  };

  return (
    <div
      role="alert"
      className={`${baseStyles} ${typeStyles[type]}`}
      aria-live="polite"
      aria-atomic="true"
    >
      {message}
    </div>
  );
};

export default Notification;
