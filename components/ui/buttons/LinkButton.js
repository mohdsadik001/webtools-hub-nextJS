'use client';
import Link from 'next/link';
import Button from './Button';

export default function LinkButton({ 
  href,
  children,
  external = false,
  ...props 
}) {
  const linkProps = external 
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : {};

  return (
    <Link href={href} {...linkProps}>
      <Button {...props}>
        {children}
      </Button>
    </Link>
  );
}
