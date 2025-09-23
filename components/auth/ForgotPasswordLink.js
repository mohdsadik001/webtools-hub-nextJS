'use client';
import Link from 'next/link';

export default function ForgotPasswordLink({ 
  href = '/auth/forgot-password',
  className = "" 
}) {
  return (
    <div className={`flex justify-end ${className}`}>
      <Link 
        href={href} 
        className="text-sm font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded px-1 py-1 transition-colors"
      >
        Forgot your password?
      </Link>
    </div>
  );
}
