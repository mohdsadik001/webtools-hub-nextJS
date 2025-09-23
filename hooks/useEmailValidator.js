import { useState, useEffect } from 'react';

export function useEmailValidator() {
  const [email, setEmail] = useState('');
  const [isValid, setIsValid] = useState(null);
  const [validationDetails, setValidationDetails] = useState({});

  // Comprehensive email validation function
  const validateEmail = (email) => {
    const details = {
      hasAtSymbol: false,
      hasValidFormat: false,
      hasValidDomain: false,
      hasValidLocalPart: false,
      isNotTooLong: false,
      hasNoConsecutiveDots: false,
      hasValidCharacters: false
    };

    if (!email) {
      return { isValid: null, details };
    }

    // Check for @ symbol
    details.hasAtSymbol = email.includes('@') && email.split('@').length === 2;

    if (!details.hasAtSymbol) {
      return { isValid: false, details };
    }

    const [localPart, domain] = email.split('@');

    // Check local part (before @)
    details.hasValidLocalPart = localPart.length > 0 && localPart.length <= 64;

    // Check domain part (after @)
    details.hasValidDomain = domain.length > 0 && domain.includes('.') && 
                            !domain.startsWith('.') && !domain.endsWith('.');

    // Check overall length
    details.isNotTooLong = email.length <= 254;

    // Check for consecutive dots
    details.hasNoConsecutiveDots = !email.includes('..');

    // Check for valid characters (basic check)
    const validEmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    details.hasValidCharacters = validEmailRegex.test(email);

    // More comprehensive regex for final validation
    const comprehensiveRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    details.hasValidFormat = comprehensiveRegex.test(email);

    const isValid = Object.values(details).every(Boolean);
    return { isValid, details };
  };

  useEffect(() => {
    const result = validateEmail(email);
    setIsValid(result.isValid);
    setValidationDetails(result.details);
  }, [email]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  return {
    email,
    isValid,
    validationDetails,
    handleEmailChange
  };
}
