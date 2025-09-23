'use client';
import { useSearchParams } from 'next/navigation';
import { AuthService } from '../services/authService';
import { validateSignInForm } from '@/utils/SignInValidation';

export function useSignInSubmit(formState) {
  const searchParams = useSearchParams();
  
  const {
    formData,
    recaptchaToken,
    recaptchaRef,
    setFieldErrors,
    setError,
    setSuccess,
    setLoading,
    setRecaptchaToken
  } = formState;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    // Validate form
    const { errors, isValid } = validateSignInForm(formData);
    if (!isValid) {
      setFieldErrors(errors);
      setLoading(false);
      return;
    }

    // Check reCAPTCHA
    if (!recaptchaToken) {
      setError('Please complete the reCAPTCHA verification');
      setLoading(false);
      return;
    }

    try {
      const result = await AuthService.signInUser({
        email: formData.email,
        password: formData.password,
        recaptchaToken: recaptchaToken,
      });

      if (result?.error) {
        setError(result.error);
        recaptchaRef.current?.reset();
        setRecaptchaToken(null);
      } else if (result?.ok) {
        setSuccess('Login successful! Redirecting...');
        const callbackUrl = searchParams.get('callbackUrl') || '/tools';
        
        setTimeout(() => {
          window.location.href = callbackUrl;
        }, 1000);
      }

    } catch (error) {
      setError('Network error. Please try again.');
      recaptchaRef.current?.reset();
      setRecaptchaToken(null);
    } finally {
      setLoading(false);
    }
  };

  return { handleSubmit };
}
