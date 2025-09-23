// import React from 'react';

// const Input = React.forwardRef(({ value, onChange, type = 'text', placeholder, ariaLabel, error = false, ...props }, ref) => {
//   const baseStyles = 'w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 transition';
//   const errorStyles = error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-primary';

//   return (
//     <input
//       ref={ref}
//       type={type}
//       value={value}
//       onChange={onChange}
//       placeholder={placeholder}
//       aria-label={ariaLabel}
//       className={`${baseStyles} ${errorStyles}`}
//       {...props}
//     />
//   );
// });

// export default Input;

'use client';
import React, { useState } from 'react';
import { Eye, EyeOff, AlertCircle, Check } from 'lucide-react';

const Input = React.forwardRef(({ 
  // Basic props
  type = 'text',
  value,
  onChange,
  placeholder,
  disabled = false,
  readOnly = false,
  checked, 
  
  // Styling variants
  variant = 'default',
  size = 'md',
  
  // State props  
  error = false,
  success = false,
  loading = false,
  
  // Label and help text
  label,
  helperText,
  errorText,
  successText,
  required = false,
  
  // Icons and addons
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  leftAddon,
  rightAddon,
  
  // Password specific
  showPasswordToggle = false,
  
  // Form props
  id,
  name,
  autoComplete,
  
  // Accessibility
  ariaLabel,
  ariaDescribedBy,
  
  // Custom styling
  className = '',
  containerClassName = '',
  labelClassName = '',
  
  ...props 
}, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  
  // Determine actual input type
  const inputType = type === 'password' ? (showPassword ? 'text' : 'password') : type;
  
  // Generate unique ID if not provided
  const inputId = id || `input-${Math.random().toString(36).substring(2, 9)}`;
  
  
  // Base styling system (rest of the component remains the same)
  const variants = {
    default: 'border border-gray-300 bg-white hover:border-gray-400 focus:border-primary focus:ring-primary',
    filled: 'border-0 bg-gray-100 hover:bg-gray-200 focus:bg-white focus:ring-primary focus:ring-2',
    outlined: 'border-2 border-gray-300 bg-transparent hover:border-gray-400 focus:border-primary',
    minimal: 'border-0 border-b-2 border-gray-300 bg-transparent rounded-none hover:border-gray-400 focus:border-primary px-0'
  };
  
  const sizes = {
    xs: 'px-2 py-1 text-xs min-h-[28px]',
    sm: 'px-3 py-1.5 text-sm min-h-[32px]',
    md: 'px-4 py-2 text-base min-h-[40px]',
    lg: 'px-4 py-3 text-lg min-h-[48px]',
    xl: 'px-6 py-4 text-xl min-h-[56px]',
  };
  
  const iconSizes = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
    xl: 'w-7 h-7',
  };
  
  // State-based styling
  let stateStyles = variants[variant];
  if (error || errorText) {
    stateStyles = 'border border-red-500 bg-red-50 focus:border-red-500 focus:ring-red-500';
  } else if (success || successText) {
    stateStyles = 'border border-green-500 bg-green-50 focus:border-green-500 focus:ring-green-500';
  }
  
  // Calculate padding adjustments for icons/addons
  const hasLeftIcon = LeftIcon || leftAddon;
  const hasRightIcon = RightIcon || rightAddon || (type === 'password' && showPasswordToggle);
  
  let paddingAdjustments = '';
  if (hasLeftIcon) paddingAdjustments += ' pl-10';
  if (hasRightIcon) paddingAdjustments += ' pr-10';
  
  // Final input classes
  const inputClasses = [
    'w-full rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-opacity-50',
    stateStyles,
    sizes[size],
    paddingAdjustments,
    disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-text',
    loading ? 'animate-pulse' : '',
    className
  ].filter(Boolean).join(' ');
  
  const containerClasses = [
    'w-full',
    containerClassName
  ].filter(Boolean).join(' ');
  
  const labelClasses = [
    'block text-sm font-medium text-gray-700 mb-1',
    labelClassName
  ].filter(Boolean).join(' ');
  
  // Helper text logic
  const getHelperText = () => {
    if (errorText) return { text: errorText, type: 'error' };
    if (successText) return { text: successText, type: 'success' };
    if (helperText) return { text: helperText, type: 'help' };
    return null;
  };
  
  const helperInfo = getHelperText();
  
  return (
    <div className={containerClasses}>
      {/* Label */}
      {label && (
        <label 
          htmlFor={inputId}
          className={labelClasses}
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      {/* Input Container */}
      <div className="relative">
        {/* Left Icon/Addon */}
        {LeftIcon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <LeftIcon className={`${iconSizes[size]} text-gray-400`} aria-hidden="true" />
          </div>
        )}
        
        {leftAddon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-500 text-sm">{leftAddon}</span>
          </div>
        )}
        
        {/* Main Input */}
        <input
          ref={ref}
          id={inputId}
          name={name}
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          required={required}
          autoComplete={autoComplete}
          aria-label={ariaLabel}
          aria-describedby={helperInfo ? `${inputId}-helper` : ariaDescribedBy}
          aria-invalid={error || errorText ? 'true' : 'false'}
          className={inputClasses}
          {...props}
        />
        
        {/* Password Toggle */}
        {type === 'password' && showPasswordToggle && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-gray-600 focus:outline-none focus:text-gray-600 transition-colors"
            aria-label={showPassword ? `Hide password` : `Show password`}
          >
            {showPassword ? (
              <EyeOff className={`${iconSizes[size]} text-gray-400`} aria-hidden="true" />
            ) : (
              <Eye className={`${iconSizes[size]} text-gray-400`} aria-hidden="true" />
            )}
          </button>
        )}
        
        {/* Right Icon/Addon */}
        {RightIcon && !(type === 'password' && showPasswordToggle) && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <RightIcon className={`${iconSizes[size]} text-gray-400`} aria-hidden="true" />
          </div>
        )}
        
        {rightAddon && !(type === 'password' && showPasswordToggle) && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <span className="text-gray-500 text-sm">{rightAddon}</span>
          </div>
        )}
        
        {/* Success/Error Icons */}
        {(success || successText) && !RightIcon && !(type === 'password' && showPasswordToggle) && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <Check className={`${iconSizes[size]} text-green-500`} aria-hidden="true" />
          </div>
        )}
      </div>
      
      {/* Helper Text */}
      {helperInfo && (
        <p 
          id={`${inputId}-helper`}
          className={`mt-1 text-sm flex items-center gap-1 ${
            helperInfo.type === 'error' ? 'text-red-600' : 
            helperInfo.type === 'success' ? 'text-green-600' : 
            'text-gray-500'
          }`}
          role={helperInfo.type === 'error' ? 'alert' : undefined}
        >
          {helperInfo.type === 'error' && <AlertCircle className="w-4 h-4 flex-shrink-0" aria-hidden="true" />}
          {helperInfo.type === 'success' && <Check className="w-4 h-4 flex-shrink-0" aria-hidden="true" />}
          {helperInfo.text}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
