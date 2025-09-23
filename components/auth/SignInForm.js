"use client";
// Icons
import { Mail, Lock, ArrowRight  } from "lucide-react";

// Hooks and utilities
import { useSignInForm } from "@/hooks/useSignInForm";
import { useSignInSubmit } from "@/hooks/useSignInSubmit";

// Components
import AuthHeader from "@/components/auth/AuthHeader";
import StatusMessage from "@/components/ui/StatusMessage";
import SubmitButton from "@/components/ui/buttons/SubmitButton";
import AuthFooter from "@/components/auth/AuthFooter";
import ForgotPasswordLink from "@/components/auth/ForgotPasswordLink";
import ReCaptcha from "@/components/backend/ReCaptcha";
import Input from "../ui/Input";


export default function SignInForm() {
  
  const formState = useSignInForm();
  const { handleSubmit } = useSignInSubmit(formState);

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
    handleRecaptchaExpired,
  } = formState;

  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <AuthHeader
          icon={Lock}
          title="Welcome Back"
          subtitle="Sign in to access your account"
        />

        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 p-8">
          <div role="status" aria-live="polite" className="sr-only">
            {error && `Error: ${error}`}
            {success && `Success: ${success}`}
            {loading && "Signing in, please wait..."}
          </div>

          <StatusMessage type="error" message={error} />
          <StatusMessage type="success" message={success} />

          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          
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

            <div className="flex justify-left py-2">
              <ReCaptcha
                ref={recaptchaRef}
                onVerify={handleRecaptchaChange}
                onExpired={handleRecaptchaExpired}
              />
            </div>

            <ForgotPasswordLink />

            <SubmitButton
              loading={loading}
              disabled={!recaptchaToken || loading}
              loadingText="Signing you in..."
              icon={ArrowRight}
            >
              Sign In
            </SubmitButton>
          </form>
        </div>

        <AuthFooter
          primaryText="Don't have an account?"
          linkText="Create one now"
          linkHref="/auth/signup"
          showTerms={true}
        />
      </div>
    </div>
  );
}
