'use client';
import { useState, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import ReCaptcha from '@/components/backend/ReCaptcha';
import { Eye, EyeOff, Mail, Lock, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';

export default function SignIn() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});
  
  const recaptchaRef = useRef();
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // Clear errors when user starts typing
    setError('');
    if (fieldErrors[name]) {
      setFieldErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleRecaptchaChange = (token) => {
    setRecaptchaToken(token);
    setError('');
  };

  const handleRecaptchaExpired = () => {
    setRecaptchaToken(null);
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    // Validate form
    if (!validateForm()) {
      setLoading(false);
      return;
    }

    if (!recaptchaToken) {
      setError('Please complete the reCAPTCHA verification');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          recaptchaToken,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Login successful! Redirecting...');
        setTimeout(() => {
          router.push('/dashboard');
          router.refresh();
        }, 1000);
      } else {
        setError(data.error || 'Login failed. Please try again.');
        recaptchaRef.current?.reset();
        setRecaptchaToken(null);
      }
    } catch (error) {
      setError('Network error. Please check your connection and try again.');
      recaptchaRef.current?.reset();
      setRecaptchaToken(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-primary to-primary-dull rounded-full flex items-center justify-center mb-4">
            <Lock className="w-8 h-8 text-white" aria-hidden="true" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-600">
            Sign in to access your account
          </p>
        </div>

        {/* Main Form Card */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 p-8">
          {/* Status Messages */}
          <div role="status" aria-live="polite" className="sr-only">
            {error && `Error: ${error}`}
            {success && `Success: ${success}`}
            {loading && 'Signing in, please wait...'}
          </div>

          {/* Error Message */}
          {error && (
            <div 
              className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3"
              role="alert"
              aria-describedby="error-message"
            >
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <p id="error-message" className="text-red-700 text-sm font-medium">
                  {error}
                </p>
              </div>
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div 
              className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3"
              role="alert"
              aria-describedby="success-message"
            >
              <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <p id="success-message" className="text-green-700 text-sm font-medium">
                  {success}
                </p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            {/* Email Field */}
            <div className="space-y-2">
              <label 
                htmlFor="email" 
                className="block text-sm font-semibold text-gray-700"
              >
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="w-5 h-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`block w-full pl-10 pr-3 py-3 border rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200 ${
                    fieldErrors.email 
                      ? 'border-red-300 bg-red-50 focus:ring-red-500 focus:border-red-500' 
                      : 'border-gray-300 bg-white hover:border-gray-400'
                  }`}
                  placeholder="Enter your email address"
                  aria-describedby={fieldErrors.email ? 'email-error' : undefined}
                  aria-invalid={fieldErrors.email ? 'true' : 'false'}
                />
              </div>
              {fieldErrors.email && (
                <p id="email-error" className="text-red-600 text-sm flex items-center gap-1" role="alert">
                  <AlertCircle className="w-4 h-4" aria-hidden="true" />
                  {fieldErrors.email}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label 
                htmlFor="password" 
                className="block text-sm font-semibold text-gray-700"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="w-5 h-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`block w-full pl-10 pr-12 py-3 border rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200 ${
                    fieldErrors.password 
                      ? 'border-red-300 bg-red-50 focus:ring-red-500 focus:border-red-500' 
                      : 'border-gray-300 bg-white hover:border-gray-400'
                  }`}
                  placeholder="Enter your password"
                  aria-describedby={fieldErrors.password ? 'password-error' : undefined}
                  aria-invalid={fieldErrors.password ? 'true' : 'false'}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-gray-600 focus:outline-none focus:text-gray-600 transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5 text-gray-400" aria-hidden="true" />
                  ) : (
                    <Eye className="w-5 h-5 text-gray-400" aria-hidden="true" />
                  )}
                </button>
              </div>
              {fieldErrors.password && (
                <p id="password-error" className="text-red-600 text-sm flex items-center gap-1" role="alert">
                  <AlertCircle className="w-4 h-4" aria-hidden="true" />
                  {fieldErrors.password}
                </p>
              )}
            </div>

            {/* reCAPTCHA */}
            <div className="flex justify-center py-2">
              <ReCaptcha
                ref={recaptchaRef}
                onVerify={handleRecaptchaChange}
                onExpired={handleRecaptchaExpired}
              />
            </div>

            {/* Forgot Password Link */}
            <div className="flex justify-end">
              <Link 
                href="/auth/forgot-password" 
                className="text-sm font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded px-1 py-1 transition-colors"
              >
                Forgot your password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || !recaptchaToken}
              className={`w-full flex items-center justify-center gap-3 py-3 px-4 border border-transparent rounded-lg text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 ${
                loading || !recaptchaToken
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-primary text-white hover:bg-primary-dull active:from-blue-800 active:to-purple-800 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 cursor-pointer'
              }`}
              aria-describedby="submit-button-status"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" />
                  <span>Signing you in...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <svg 
                    className="w-5 h-5 transition-transform group-hover:translate-x-1" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </>
              )}
            </button>
            
            <div id="submit-button-status" className="sr-only">
              {loading && 'Form is being submitted, please wait'}
              {!recaptchaToken && 'Please complete reCAPTCHA to enable sign in button'}
            </div>
          </form>
        </div>

        {/* Sign Up Link */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <Link 
              href="/auth/signup" 
              className="font-semibold text-blue-600 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded px-1 py-1 transition-colors"
            >
              Create one now
            </Link>
          </p>
        </div>

        {/* Additional Help Text */}
        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500">
            By signing in, you agree to our{' '}
            <Link href="/terms" className="underline hover:text-gray-700 focus:text-gray-700">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href="/privacy" className="underline hover:text-gray-700 focus:text-gray-700">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
