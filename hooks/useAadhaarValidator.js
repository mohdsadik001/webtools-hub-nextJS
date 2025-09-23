import { useState, useEffect } from 'react';

export function useAadhaarValidator() {
  const [aadhaarNumber, setAadhaarNumber] = useState('');
  const [isValid, setIsValid] = useState(null);
  const [validationDetails, setValidationDetails] = useState({});
  const [announcement, setAnnouncement] = useState('');

  // Verhoeff algorithm tables
  const verhoeffTable = {
    multiplication: [
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      [1, 2, 3, 4, 0, 6, 7, 8, 9, 5],
      [2, 3, 4, 0, 1, 7, 8, 9, 5, 6],
      [3, 4, 0, 1, 2, 8, 9, 5, 6, 7],
      [4, 0, 1, 2, 3, 9, 5, 6, 7, 8],
      [5, 9, 8, 7, 6, 0, 4, 3, 2, 1],
      [6, 5, 9, 8, 7, 1, 0, 4, 3, 2],
      [7, 6, 5, 9, 8, 2, 1, 0, 4, 3],
      [8, 7, 6, 5, 9, 3, 2, 1, 0, 4],
      [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]
    ],
    permutation: [
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      [1, 5, 7, 6, 2, 8, 3, 0, 9, 4],
      [5, 8, 0, 3, 7, 9, 6, 1, 4, 2],
      [8, 9, 1, 6, 0, 4, 3, 5, 2, 7],
      [9, 4, 5, 3, 1, 2, 6, 8, 7, 0],
      [4, 2, 8, 6, 5, 7, 3, 9, 0, 1],
      [2, 7, 9, 3, 8, 0, 6, 4, 1, 5],
      [7, 0, 4, 6, 9, 1, 3, 2, 5, 8]
    ]
  };

  const verhoeffChecksum = (num) => {
    const digits = num.toString().split('').map(Number).reverse();
    let checksum = 0;
    
    for (let i = 0; i < digits.length; i++) {
      checksum = verhoeffTable.multiplication[checksum][verhoeffTable.permutation[i % 8][digits[i]]];
    }
    
    return checksum === 0;
  };

  const validateAadhaar = (number) => {
    const details = {
      hasCorrectLength: false,
      containsOnlyDigits: false,
      doesNotStartWithZeroOrOne: false,
      passesChecksumValidation: false,
      hasValidFormat: false
    };

    if (!number) {
      return { isValid: null, details };
    }

    // Remove spaces and hyphens for validation
    const cleanNumber = number.replace(/[\s-]/g, '');

    // Check length (must be exactly 12 digits)
    details.hasCorrectLength = cleanNumber.length === 12;

    // Check if contains only digits
    details.containsOnlyDigits = /^\d+$/.test(cleanNumber);

    // Check if doesn't start with 0 or 1 (as per UIDAI guidelines)
    details.doesNotStartWithZeroOrOne = cleanNumber.length > 0 && !['0', '1'].includes(cleanNumber[0]);

    // Check valid format (can have spaces in 4-4-4 pattern or continuous)
    const validFormats = [
      /^\d{4}\s\d{4}\s\d{4}$/, // 1234 5678 9012
      /^\d{4}-\d{4}-\d{4}$/, // 1234-5678-9012
      /^\d{12}$/ // 123456789012
    ];
    details.hasValidFormat = validFormats.some(pattern => pattern.test(number));

    // Verhoeff checksum validation
    if (details.hasCorrectLength && details.containsOnlyDigits) {
      details.passesChecksumValidation = verhoeffChecksum(cleanNumber);
    }

    const isValid = Object.values(details).every(Boolean);
    return { isValid, details, cleanNumber };
  };

  useEffect(() => {
    const result = validateAadhaar(aadhaarNumber);
    setIsValid(result.isValid);
    setValidationDetails(result.details);
    
    // Announce validation status for screen readers
    if (aadhaarNumber) {
      if (result.isValid === true) {
        setAnnouncement('Valid Aadhaar number');
      } else if (result.isValid === false) {
        setAnnouncement('Invalid Aadhaar number');
      }
    } else {
      setAnnouncement('');
    }
  }, [aadhaarNumber]);

  const handleAadhaarChange = (e) => {
    let value = e.target.value;
    
    // Remove all non-digits first
    value = value.replace(/\D/g, '');
    
    // Limit to 12 digits
    if (value.length > 12) {
      value = value.substring(0, 12);
    }
    
    // Add spaces in 4-4-4 format
    if (value.length > 4) {
      value = value.substring(0, 4) + ' ' + value.substring(4);
    }
    if (value.length > 9) {
      value = value.substring(0, 9) + ' ' + value.substring(9);
    }
    
    setAadhaarNumber(value);
  };

  return {
    aadhaarNumber,
    isValid,
    validationDetails,
    announcement,
    handleAadhaarChange
  };
}
