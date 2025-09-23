'use client';
import { useState, useRef } from 'react';

export function useSignUpForm(initialValues = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
}) {
  const [formData, setFormData] = useState(initialValues);
  const [fieldErrors, setFieldErrors] = useState({});
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState(null);
  
  const recaptchaRef = useRef();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear errors when user starts typing
    setError('');
    if (fieldErrors[name]) {
      setFieldErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleRecaptchaChange = (token) => {
    setRecaptchaToken(token);
    setError('');
  };

  const handleRecaptchaExpired = () => {
    setRecaptchaToken(null);
  };

  const resetForm = () => {
    setFormData(initialValues);
    setFieldErrors({});
    setError('');
    setSuccess('');
    setRecaptchaToken(null);
    recaptchaRef.current?.reset();
  };

  return {
    formData,
    fieldErrors,
    error,
    success,
    loading,
    recaptchaToken,
    recaptchaRef,
    setFieldErrors,
    setError,
    setSuccess,
    setLoading,
    setRecaptchaToken,
    handleChange,
    handleRecaptchaChange,
    handleRecaptchaExpired,
    resetForm
  };
}
