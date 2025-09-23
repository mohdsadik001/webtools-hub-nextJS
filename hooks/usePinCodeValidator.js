import { useState, useEffect } from 'react';
import { pinCodeCountries } from '@/config/countries';

export function usePinCodeValidator() {
  const [pinCode, setPinCode] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('india');
  const [isValid, setIsValid] = useState(null);
  const [validationDetails, setValidationDetails] = useState({});
  const [pinCodeInfo, setPinCodeInfo] = useState({});
  const [announcement, setAnnouncement] = useState('');

  const validatePinCode = (code, country) => {
    const details = {
      hasCorrectLength: false,
      matchesPattern: false,
      hasValidFormat: false,
      hasValidStructure: false
    };

    if (!code.trim()) {
      return { isValid: null, details, info: {} };
    }

    const countryConfig = pinCodeCountries[country];
    const cleanCode = code.trim().toUpperCase();

    // Check length
    if (Array.isArray(countryConfig.length)) {
      details.hasCorrectLength = countryConfig.length.includes(cleanCode.replace(/\s|-/g, '').length);
    } else {
      details.hasCorrectLength = cleanCode.replace(/\s|-/g, '').length === countryConfig.length;
    }

    // Check pattern
    details.matchesPattern = countryConfig.pattern.test(cleanCode);
    
    // For format validation (basic check)
    details.hasValidFormat = details.matchesPattern;
    
    // Structure validation (more detailed)
    details.hasValidStructure = details.matchesPattern && details.hasCorrectLength;

    const isValid = Object.values(details).every(Boolean);
    
    // Extract PIN code information
    let info = {};
    if (isValid && country === 'india') {
      const firstDigit = cleanCode[0];
      info = {
        region: countryConfig.regions[firstDigit] || 'Unknown region',
        postalCircle: firstDigit,
        subRegion: cleanCode[1],
        sortingDistrict: cleanCode[2],
        deliveryOffice: cleanCode.substring(3)
      };
    } else if (isValid && country === 'usa') {
      const firstDigit = cleanCode[0];
      info = {
        region: countryConfig.regions[firstDigit] || 'Unknown region',
        nationalArea: firstDigit,
        sectionalCenter: cleanCode.substring(1, 3),
        deliveryArea: cleanCode.substring(3, 5),
        extension: cleanCode.length > 5 ? cleanCode.substring(6) : null
      };
    } else if (isValid) {
      info = {
        country: countryConfig.name,
        format: countryConfig.format,
        cleanCode: cleanCode
      };
    }

    return { isValid, details, info };
  };

  useEffect(() => {
    const result = validatePinCode(pinCode, selectedCountry);
    setIsValid(result.isValid);
    setValidationDetails(result.details);
    setPinCodeInfo(result.info);
    
    // Announce validation status for screen readers
    if (pinCode) {
      if (result.isValid === true) {
        setAnnouncement(`Valid ${pinCodeCountries[selectedCountry].name} PIN code`);
      } else if (result.isValid === false) {
        setAnnouncement(`Invalid ${pinCodeCountries[selectedCountry].name} PIN code format`);
      }
    } else {
      setAnnouncement('');
    }
  }, [pinCode, selectedCountry]);

  const handlePinCodeChange = (e) => {
    let value = e.target.value;
    
    // Country-specific formatting
    if (selectedCountry === 'india' || selectedCountry === 'usa' || selectedCountry === 'germany') {
      // Only allow digits for these countries
      value = value.replace(/\D/g, '');
    } else if (selectedCountry === 'uk') {
      // Allow letters, numbers, and spaces for UK
      value = value.replace(/[^A-Za-z0-9\s]/g, '').toUpperCase();
    } else if (selectedCountry === 'canada') {
      // Allow letters, numbers, and spaces for Canada
      value = value.replace(/[^A-Za-z0-9\s]/g, '').toUpperCase();
    }
    
    // Limit length based on country
    const maxLength = Array.isArray(pinCodeCountries[selectedCountry].length) 
      ? Math.max(...pinCodeCountries[selectedCountry].length) + 2 // +2 for spaces/hyphens
      : pinCodeCountries[selectedCountry].length + 2;
    
    if (value.length <= maxLength) {
      setPinCode(value);
    }
  };

  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);
    setPinCode(''); // Clear input when country changes
  };

  return {
    pinCode,
    selectedCountry,
    isValid,
    validationDetails,
    pinCodeInfo,
    announcement,
    handlePinCodeChange,
    handleCountryChange,
    countries: pinCodeCountries
  };
}
