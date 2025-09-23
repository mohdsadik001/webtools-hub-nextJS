import { useState, useEffect } from 'react';

export function usePanValidator() {
  const [panNumber, setPanNumber] = useState('');
  const [isValid, setIsValid] = useState(null);
  const [validationDetails, setValidationDetails] = useState({});
  const [panInfo, setPanInfo] = useState({});
  const [announcement, setAnnouncement] = useState('');

  // Fourth character meanings (applicant category)
  const applicantCategories = {
    'P': 'Individual',
    'C': 'Company',
    'H': 'HUF (Hindu Undivided Family)',
    'F': 'Firm/Partnership',
    'A': 'Association of Persons (AOP)',
    'T': 'Trust',
    'B': 'Body of Individuals (BOI)',
    'L': 'Local Authority',
    'J': 'Artificial Juridical Person',
    'G': 'Government',
    'K': 'Krish (Special Category)'
  };

  // Fifth character meanings (first letter of surname/entity name)
  const getApplicantInfo = (fourthChar, fifthChar) => {
    const category = applicantCategories[fourthChar] || 'Unknown Category';
    const isIndividual = fourthChar === 'P';
    
    return {
      category,
      isIndividual,
      description: isIndividual 
        ? `Individual with surname starting with '${fifthChar}'`
        : `${category} entity with name starting with '${fifthChar}'`
    };
  };

  const validatePAN = (number) => {
    const details = {
      hasCorrectLength: false,
      hasValidFormat: false,
      hasCorrectLetterPositions: false,
      hasCorrectDigitPositions: false,
      followsOfficialPattern: false,
      hasValidChecksum: false
    };

    if (!number) {
      return { isValid: null, details, info: {} };
    }

    const upperPAN = number.toUpperCase().trim();

    // Check length (must be exactly 10 characters)
    details.hasCorrectLength = upperPAN.length === 10;

    // Check basic format (5 letters, 4 digits, 1 letter)
    const basicPattern = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    details.hasValidFormat = basicPattern.test(upperPAN);

    // Check each position individually
    let letterPositionsValid = true;
    let digitPositionsValid = true;
    
    if (upperPAN.length === 10) {
      // Check positions 0-4 and 9 are letters
      for (let i = 0; i < 5; i++) {
        if (!/[A-Z]/.test(upperPAN[i])) letterPositionsValid = false;
      }
      if (!/[A-Z]/.test(upperPAN[9])) letterPositionsValid = false;
      
      // Check positions 5-8 are digits
      for (let i = 5; i < 9; i++) {
        if (!/[0-9]/.test(upperPAN[i])) digitPositionsValid = false;
      }
    }

    details.hasCorrectLetterPositions = letterPositionsValid;
    details.hasCorrectDigitPositions = digitPositionsValid;

    // Check official PAN pattern
    const officialPattern = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    details.followsOfficialPattern = officialPattern.test(upperPAN);

    // Simple checksum validation (basic pattern matching)
    // Note: PAN doesn't have a complex checksum like Aadhaar
    details.hasValidChecksum = details.hasValidFormat && 
                              !['AAAAA0000A', 'BBBBB1111B'].includes(upperPAN);

    const isValid = Object.values(details).every(Boolean);
    
    // Extract PAN information
    let info = {};
    if (upperPAN.length >= 5) {
      const fourthChar = upperPAN[3];
      const fifthChar = upperPAN[4];
      const applicantInfo = getApplicantInfo(fourthChar, fifthChar);
      
      info = {
        applicantCategory: applicantInfo.category,
        isIndividual: applicantInfo.isIndividual,
        description: applicantInfo.description,
        areaCode: upperPAN.substring(0, 3),
        sequenceNumber: upperPAN.substring(5, 9),
        checkDigit: upperPAN[9]
      };
    }

    return { isValid, details, info };
  };

  useEffect(() => {
    const result = validatePAN(panNumber);
    setIsValid(result.isValid);
    setValidationDetails(result.details);
    setPanInfo(result.info);
    
    // Announce validation status for screen readers
    if (panNumber) {
      if (result.isValid === true) {
        setAnnouncement(`Valid PAN number for ${result.info.applicantCategory}`);
      } else if (result.isValid === false) {
        setAnnouncement('Invalid PAN number format');
      }
    } else {
      setAnnouncement('');
    }
  }, [panNumber]);

  const handlePANChange = (e) => {
    let value = e.target.value;
    
    // Remove spaces and limit to 10 characters
    value = value.replace(/\s/g, '').substring(0, 10);
    value = value.toUpperCase();
    
    setPanNumber(value);
  };

  return {
    panNumber,
    isValid,
    validationDetails,
    panInfo,
    announcement,
    handlePANChange,
    applicantCategories
  };
}
