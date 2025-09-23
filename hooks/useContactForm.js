'use client';
import { useState, useRef } from 'react';

export function useContactForm(initialValues = {
  user_name: '',
  user_email: '',
  message: ''
}) {
  const [formData, setFormData] = useState(initialValues);
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  
  const form = useRef();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear errors when user starts typing
    if (fieldErrors[name]) {
      setFieldErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const resetForm = () => {
    setFormData(initialValues);
    setFieldErrors({});
    setStatus('');
    form.current?.reset();
  };

  return {
    formData,
    status,
    loading,
    fieldErrors,
    form,
    setStatus,
    setLoading,
    setFieldErrors,
    handleChange,
    resetForm
  };
}
