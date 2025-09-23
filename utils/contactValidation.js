export const validateContactForm = (formData) => {
  const errors = {};
  
  // Name validation
  if (!formData.user_name?.trim()) {
    errors.user_name = 'Name is required';
  } else if (formData.user_name.trim().length < 2) {
    errors.user_name = 'Name must be at least 2 characters';
  }
  
  // Email validation
  if (!formData.user_email) {
    errors.user_email = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.user_email)) {
    errors.user_email = 'Please enter a valid email address';
  }
  
  // Message validation
  if (!formData.message?.trim()) {
    errors.message = 'Message is required';
  } else if (formData.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters';
  }
  
  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};
