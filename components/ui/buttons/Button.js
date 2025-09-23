import React from 'react';

const Button = React.forwardRef(({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  disabled = false, 
  icon: Icon, 
  ariaLabel,
  className = '',
  ...props 
}, ref) => {
  
  // Base styles without conflicting properties
  const baseStyles = 'inline-flex items-center justify-center rounded font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none cursor-pointer';
  
  // Variants with proper styling (no conflicts)
  const variants = {
    primary: 'bg-primary text-white border-2 border-primary hover:bg-primary-dull hover:border-primary-dull focus:ring-primary shadow-sm',
    secondary: 'bg-transparent text-primary border-2 border-primary hover:bg-primary hover:text-white focus:ring-primary',
    danger: 'bg-red-600 text-white border-2 border-red-600 hover:bg-red-700 hover:border-red-700 focus:ring-red-500 shadow-sm',
    success: 'bg-green-600 text-white border-2 border-green-600 hover:bg-green-700 hover:border-green-700 focus:ring-green-500 shadow-sm',
    muted: 'bg-gray-300 text-gray-600 border-2 border-gray-300 cursor-not-allowed shadow-none',
    outline: 'bg-transparent text-gray-700 border-2 border-gray-300 hover:bg-gray-50 hover:border-gray-400 focus:ring-gray-500',
  };
  
  // Size configurations
  const sizes = {
    xs: 'px-2 py-1 text-xs min-h-[28px]',
    sm: 'px-3 py-1.5 text-sm min-h-[32px]',
    md: 'px-4 py-2 text-base min-h-[40px]',
    lg: 'px-6 py-3 text-lg min-h-[48px]',
    xl: 'px-8 py-4 text-xl min-h-[56px]',
  };
  
  // Icon sizes based on button size
  const iconSizes = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4', 
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
    xl: 'w-6 h-6',
  };

  // Combine all classes
  const computedClass = [
    baseStyles,
    variants[variant] || variants.primary,
    sizes[size] || sizes.md,
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      ref={ref}
      className={computedClass}
      aria-label={ariaLabel}
      disabled={disabled || variant === 'muted'}
      type="button"
      {...props}
    >
      {Icon && (
        <Icon 
          className={`${iconSizes[size]} ${children ? 'mr-2' : ''}`} 
          aria-hidden="true" 
        />
      )}
      {children}
    </button>
  );
});

// Add display name for debugging
Button.displayName = 'Button';

export default Button;
