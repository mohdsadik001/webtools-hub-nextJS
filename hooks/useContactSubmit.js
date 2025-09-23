'use client';
import { ContactService } from '../services/contactService';
import { validateContactForm } from '../utils/contactValidation';

export function useContactSubmit(formState, t) {
  const {
    formData,
    form,
    setStatus,
    setLoading,
    setFieldErrors,
    resetForm
  } = formState;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(t("sending"));

    // Validate form
    const { errors, isValid } = validateContactForm(formData);
    if (!isValid) {
      setFieldErrors(errors);
      setStatus('');
      setLoading(false);
      return;
    }

    try {
      const result = await ContactService.sendContactEmail(form.current, t);
      
      if (result.success) {
        setStatus(result.message);
        resetForm();
      } else {
        setStatus(result.message);
      }
    } catch (error) {
      console.error('Contact form error:', error);
      setStatus(t("messageFailed"));
    } finally {
      setLoading(false);
    }
  };

  return { handleSubmit };
}
