'use client';
import Button from './Button';

export default function IconButton({ 
  icon: Icon,
  'aria-label': ariaLabel,
  size = 'icon',
  variant = 'ghost',
  ...props 
}) {
  return (
    <Button
      size={size}
      variant={variant}
      leftIcon={Icon}
      aria-label={ariaLabel}
      {...props}
    />
  );
}
