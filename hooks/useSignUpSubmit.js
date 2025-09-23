'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { AuthService } from '../services/authService';
import { validateSignUpForm } from '../utils/SignUpvalidation';

export function useSignUpSubmit(formState) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const {
    formData,
    recaptchaToken,
    recaptchaRef,
    setFieldErrors,
    setError,
    setSuccess,
    setLoading,
    setRecaptchaToken,
    resetForm
  } = formState;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    // Validate form
    const { errors, isValid } = validateSignUpForm(formData);
    if (!isValid) {
      setFieldErrors(errors);
      setLoading(false);
      return;
    }

    
    if (!recaptchaToken) {
      setError('Please complete the reCAPTCHA verification');
      setLoading(false);
      return;
    }

    try {
      await AuthService.signUp({
        name: formData.name.trim(),
        email: formData.email,
        password: formData.password,
        recaptchaToken: recaptchaToken,
      });


      setSuccess('Account created successfully! Signing you in...');
      
      const result = await AuthService.autoSignIn({
        email: formData.email,
        password: formData.password,
        recaptchaToken: recaptchaToken,
      });

      if (result?.error) {
        setSuccess('Account created! Please sign in with your credentials.');
        setTimeout(() => router.push('/auth/signin'), 2000);
      } else if (result?.ok) {
        setSuccess('Account created and signed in successfully! Redirecting...');
        resetForm();
        
        const callbackUrl = searchParams.get('callbackUrl') || '/tools';
        setTimeout(() => window.location.href = callbackUrl, 2000);
      }

    } catch (error) {
      console.error('Signup error:', error);
      setError(error.message || 'Network error. Please check your connection and try again.');
      recaptchaRef.current?.reset();
      setRecaptchaToken(null);
    } finally {
      setLoading(false);
    }
  };

  return { handleSubmit };
}
