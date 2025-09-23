'use client';
import Link from 'next/link';

export default function AuthFooter({ 
  primaryText,
  linkText,
  linkHref,
  showTerms = true,
  className = "" 
}) {
  return (
    <div className={`mt-6 text-center space-y-4 ${className}`}>
      <div>
        <p className="text-sm text-gray-600">
          {primaryText}{' '}
          <Link 
            href={linkHref} 
            className="font-semibold text-primary hover:text-primary-dull focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded px-1 py-1 transition-colors"
          >
            {linkText}
          </Link>
        </p>
      </div>

      {showTerms && (
        <div>
          <p className="text-xs text-gray-500">
            By creating an account, you agree to our{' '}
            <Link href="/terms" className="underline hover:text-gray-700 focus:text-gray-700">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href="/privacy" className="underline hover:text-gray-700 focus:text-gray-700">
              Privacy Policy
            </Link>
          </p>
        </div>
      )}
    </div>
  );
}
