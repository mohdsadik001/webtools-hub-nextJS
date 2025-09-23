'use client';

export default function LoadingSpinner({ 
  size = 'large', 
  className = "",
  fullScreen = false 
}) {
  const sizes = {
    small: 'h-6 w-6',
    medium: 'h-12 w-12',
    large: 'h-32 w-32'
  };

  const spinnerClasses = `animate-spin rounded-full border-b-2 border-primary ${sizes[size]} ${className}`;
  
  const content = <div className={spinnerClasses} role="status" aria-label="Loading" />;

  if (fullScreen) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        {content}
      </div>
    );
  }

  return content;
}
