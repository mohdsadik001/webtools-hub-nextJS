import { useState, useEffect } from 'react';
import { phoneCountries } from '@/config/countries';

export function usePhoneValidator() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('auto');
  const [validationResult, setValidationResult] = useState(null);
  const [announcement, setAnnouncement] = useState('');

  const validatePhone = (phone, country) => {
    if (!phone.trim()) return { isValid: null, matchedCountry: null, details: {} };

    const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
    
    if (country === 'auto') {
      // Auto-detect country by trying all patterns
      for (const [countryKey, countryData] of Object.entries(phoneCountries)) {
        const isValid = countryData.patterns.some(pattern => pattern.test(phone));
        if (isValid) {
          return {
            isValid: true,
            matchedCountry: countryKey,
            details: {
              country: countryData.name,
              format: countryData.format,
              cleanNumber: cleanPhone
            }
          };
        }
      }
      return { isValid: false, matchedCountry: null, details: { error: 'No matching country format found' } };
    } else {
      // Validate against specific country
      const countryData = phoneCountries[country];
      const isValid = countryData.patterns.some(pattern => pattern.test(phone));
      return {
        isValid,
        matchedCountry: isValid ? country : null,
        details: {
          country: countryData.name,
          format: countryData.format,
          cleanNumber: cleanPhone
        }
      };
    }
  };

  useEffect(() => {
    const result = validatePhone(phoneNumber, selectedCountry);
    setValidationResult(result);
    
    // Announce validation status for screen readers
    if (phoneNumber) {
      if (result.isValid === true) {
        setAnnouncement(`Valid ${result.details.country} phone number`);
      } else if (result.isValid === false) {
        setAnnouncement('Invalid phone number format');
      }
    } else {
      setAnnouncement('');
    }
  }, [phoneNumber, selectedCountry]);

  const handlePhoneChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);
  };

  return {
    phoneNumber,
    selectedCountry,
    validationResult,
    announcement,
    handlePhoneChange,
    handleCountryChange,
    countries: phoneCountries
  };
}
