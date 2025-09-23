'use client';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import FormField from './FormField';

export default function PasswordInput({ 
  id,
  name,
  label,
  placeholder,
  value,
  onChange,
  error,
  required = false,
  autoComplete = "new-password",
  disabled = false,
  icon: Icon,
  showToggle = true,
  className = ""
}) {
  const [showPassword, setShowPassword] = useState(false);

  const toggleVisibility = () => setShowPassword(!showPassword);

  return (
    <FormField
      id={id}
      name={name}
      type={showPassword ? 'text' : 'password'}
      label={label}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      error={error}
      required={required}
      autoComplete={autoComplete}
      disabled={disabled}
      icon={Icon}
      className={className}
      inputClassName={showToggle ? 'pr-12' : ''}
    >
      {showToggle && (
        <button
          type="button"
          onClick={toggleVisibility}
          className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-gray-600 focus:outline-none focus:text-gray-600 transition-colors"
          aria-label={showPassword ? `Hide ${label?.toLowerCase()}` : `Show ${label?.toLowerCase()}`}
        >
          {showPassword ? (
            <EyeOff className="w-5 h-5 text-gray-400" aria-hidden="true" />
          ) : (
            <Eye className="w-5 h-5 text-gray-400" aria-hidden="true" />
          )}
        </button>
      )}
    </FormField>
  );
}
