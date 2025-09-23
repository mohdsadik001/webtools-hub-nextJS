'use client';
import Button from './Button';

export default function SubmitButton({ 
  children = 'Submit',
  loading = false,
  disabled = false,
  loadingText = 'Processing...',
  icon: Icon,
  className = "",
  variant = 'primary',
  ...props 
}) {
  return (
    <Button
      type="submit"
      variant={variant}
      disabled={disabled}
      loading={loading}
      icon={Icon}
      className={`w-full ${className}`}
      {...props}
    >
      {loading ? loadingText : children}
    </Button>
  );
}
