'use client';
import { useTranslation } from 'react-i18next';
import { Send } from 'lucide-react';

// Hooks and utilities
import { useContactForm } from '../../hooks/useContactForm';
import { useContactSubmit } from '../../hooks/useContactSubmit';

// Components
import ContactHeader from './ContactHeader';
import ContactFormFields from './ContactFormFields';
import SubmitButton from '../ui/buttons/SubmitButton';
import StatusMessage from '../ui/StatusMessage';

// Configuration
import { contactFormFields } from '../../config/contactFormConfig';

export default function ContactForm() {
  const { t } = useTranslation('common');
  const formState = useContactForm();
  const { handleSubmit } = useContactSubmit(formState, t);

  const {
    formData,
    status,
    loading,
    fieldErrors,
    form,
    handleChange
  } = formState;

  // Determine status message type
  const getStatusType = () => {
    if (status === t("sending")) return 'info';
    if (status === t("messageSent")) return 'success';
    if (status === t("messageFailed")) return 'error';
    return 'info';
  };

  return (
    <div className="mt-16 px-6 md:px-16 lg:px-24 xl:px-32 py-10">
      <ContactHeader 
        title={t("contact")}
        subtitle="Get in touch with us. We'd love to hear from you!"
      />

      <div className="max-w-full mx-auto">
        <form 
          ref={form} 
          onSubmit={handleSubmit} 
          className="space-y-6"
          noValidate
        >
          <ContactFormFields
            fields={contactFormFields}
            formData={formData}
            fieldErrors={fieldErrors}
            onChange={handleChange}
            disabled={loading}
            t={t}
          />

          <SubmitButton
            loading={loading}
            disabled={loading}
            loadingText={t("sending")}
            icon={Send}
            className="w-full"
          >
            {t("sendMessage")}
          </SubmitButton>
        </form>

        {status && (
          <StatusMessage 
            type={getStatusType()}
            message={status}
            className="mt-6"
          />
        )}
      </div>
    </div>
  );
}
