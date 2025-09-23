'use client';
import { UserPlus,User, Mail, Lock } from 'lucide-react';

// Hooks and utilities
import { useSignUpForm } from '../../hooks/useSignUpForm';
import { useSignUpSubmit } from '../../hooks/useSignUpSubmit';

// Components
import AuthHeader from './AuthHeader';
import StatusMessage from '../ui/StatusMessage';
import SubmitButton from '../ui/buttons/SubmitButton';
import AuthFooter from './AuthFooter';
import ReCaptcha from '@/components/backend/ReCaptcha';

// Configuration
import Input from '../ui/Input';
import PasswordStrength from '../ui/PasswordStrength';

export default function SignUpForm() {
  const formState = useSignUpForm();
  const { handleSubmit } = useSignUpSubmit(formState);

  const {
    formData,
    fieldErrors,
    error,
    success,
    loading,
    recaptchaToken,
    recaptchaRef,
    handleChange,
    handleRecaptchaChange,
    handleRecaptchaExpired
  } = formState;

  return (
    <div className="bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <AuthHeader
          icon={UserPlus}
          title="Join WebTools Hub"
          subtitle="Create your account and get started"
        />

        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 p-8">
          <div role="status" aria-live="polite" className="sr-only">
            {error && `Error: ${error}`}
            {success && `Success: ${success}`}
            {loading && 'Creating account, please wait...'}
          </div>

          <StatusMessage type="error" message={error} />
          <StatusMessage type="success" message={success} />

           <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            
            {/* Full Name Field */}
            <Input
              id="name"
              name="name"
              type="text"
              label="Full Name"
              placeholder="John Doe"
              value={formData.name || ''}
              onChange={handleChange}
              errorText={fieldErrors.name}
              required
              disabled={loading}
              leftIcon={User}
              autoComplete="name"
            />

            {/* Email Field */}
            <Input
              id="email"
              name="email"
              type="email"
              label="Email Address"
              placeholder="user@example.com"
              value={formData.email || ''}
              onChange={handleChange}
              errorText={fieldErrors.email}
              required
              disabled={loading}
              leftIcon={Mail}
              autoComplete="email"
              size='md'
            />

            {/* Password Field */}
            <Input
              id="password"
              name="password"
              type="password"
              label="Password"
              placeholder="••••••••••••"
              value={formData.password || ''}
              onChange={handleChange}
              errorText={fieldErrors.password}
              required
              disabled={loading}
              leftIcon={Lock}
              showPasswordToggle
              autoComplete="new-password"
              helperText="Must be at least 8 characters"
            />
            <PasswordStrength password={formData["password"]} />

            {/* Confirm Password Field */}
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              label="Confirm Password"
              placeholder="••••••••••••"
              value={formData.confirmPassword || ''}
              onChange={handleChange}
              errorText={fieldErrors.confirmPassword}
              successText={
                formData.confirmPassword && 
                formData.password === formData.confirmPassword && 
                !fieldErrors.confirmPassword 
                  ? "Passwords match!" 
                  : ""
              }
              required
              disabled={loading}
              leftIcon={Lock}
              showPasswordToggle
              autoComplete="new-password"
            />

            {/* ReCaptcha */}
            <div className="flex justify-left py-2 w-full">
              <ReCaptcha
                ref={recaptchaRef}
                onVerify={handleRecaptchaChange}
                onExpired={handleRecaptchaExpired}
                className="w-full"
              />
            </div>

            {/* Submit Button */}
            <SubmitButton
              loading={loading}
              disabled={!recaptchaToken || loading}
              loadingText="Creating your account..."
              icon={UserPlus}
              className="w-full"
            >
              Create Account
            </SubmitButton>
          </form>
        </div>

        <AuthFooter
          primaryText="Already have an account?"
          linkText="Sign in here"
          linkHref="/auth/signin"
          showTerms={true}
        />
      </div>
    </div>
  );
}
