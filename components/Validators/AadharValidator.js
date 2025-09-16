import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, CreditCard, AlertCircle} from 'lucide-react';

export default function AadhaarValidator ()  {
  const [aadhaarNumber, setAadhaarNumber] = useState('');
  const [isValid, setIsValid] = useState(null);
  const [validationDetails, setValidationDetails] = useState({});
  const [announcement, setAnnouncement] = useState('');

  // Aadhaar validation using Verhoeff algorithm
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


  const getValidationIcon = () => {
    if (isValid === null) return <CreditCard className="w-5 h-5 text-gray-400" />;
    if (isValid) return <CheckCircle className="w-5 h-5 text-green-500" />;
    return <XCircle className="w-5 h-5 text-red-500" />;
  };

  const getInputBorderColor = () => {
    if (isValid === null) return 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500';
    if (isValid) return 'border-green-500 focus:border-green-500 focus:ring-green-500';
    return 'border-red-500 focus:border-red-500 focus:ring-red-500';
  };

  return (
    <div className="rounded bg-gradient-to-br from-orange-50 to-green-100 p-2 sm:p-4 md:p-6 lg:p-8">
      {/* Screen reader announcements */}
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {announcement}
      </div>
      
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-2">
            <CreditCard className="w-6 h-6 sm:w-8 sm:h-8 text-orange-600" aria-hidden="true" />
            Aadhaar Number Validator
          </h1>
          <p className="text-sm sm:text-base text-gray-600 px-4">
            Validate Aadhaar numbers using official UIDAI algorithms with privacy protection
          </p>
          <div className="mt-4 flex justify-center">
            <div className="bg-orange-100 border border-orange-200 rounded-lg p-2 text-xs sm:text-sm text-orange-800">
              🇮🇳 Follows official UIDAI validation standards
            </div>
          </div>
        </header>

        <main>
          <section 
            className="bg-white rounded-xl shadow-lg p-4 sm:p-6 mb-6"
            role="main"
            aria-labelledby="validator-heading"
          >
            <h2 id="validator-heading" className="sr-only">Aadhaar Number Validation Form</h2>

            {/* Aadhaar Number Input */}
            <div className="mb-6">
              <label 
                htmlFor="aadhaar" 
                className="block text-sm sm:text-base font-medium text-gray-700 mb-2"
              >
                <CreditCard className="w-4 h-4 inline mr-1" aria-hidden="true" />
                Enter Aadhaar Number
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="aadhaar"
                  value={aadhaarNumber}
                  onChange={handleAadhaarChange}
                  placeholder='1234 5678 9012'
                  aria-describedby={aadhaarNumber ? 'validation-status aadhaar-details' : 'aadhaar-description'}
                  aria-invalid={isValid === false ? 'true' : 'false'}
                  className={`w-full px-3 sm:px-4 py-3 pr-12 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-1 transition-colors text-sm sm:text-base font-mono ${getInputBorderColor()}`}
                  autoComplete="off"
                  inputMode="numeric"
                />
                <div 
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  aria-hidden="true"
                >
                  {getValidationIcon()}
                </div>
              </div>
              
              <p id="aadhaar-description" className="sr-only">
                Enter a 12-digit Aadhaar number for validation using official UIDAI algorithms
              </p>
              
              {aadhaarNumber && (
                <div id="validation-status" className="mt-2">
                  {isValid === true && (
                    <p className="text-green-600 text-sm flex items-center">
                      <CheckCircle className="w-4 h-4 mr-1 flex-shrink-0" aria-hidden="true" />
                      <span>Valid Aadhaar number!</span>
                    </p>
                  )}
                  {isValid === false && (
                    <p className="text-red-600 text-sm flex items-center">
                      <XCircle className="w-4 h-4 mr-1 flex-shrink-0" aria-hidden="true" />
                      <span>Invalid Aadhaar number</span>
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Validation Details */}
            {aadhaarNumber && (
              <section 
                className="border-t pt-6"
                aria-labelledby="validation-details-heading"
              >
                <h3 
                  id="validation-details-heading" 
                  className="text-base sm:text-lg font-semibold text-gray-800 mb-4"
                >
                  Validation Details
                </h3>
                <div 
                  id="aadhaar-details"
                  className="grid grid-cols-1 lg:grid-cols-2 gap-3"
                  role="list"
                  aria-label="Aadhaar validation criteria"
                >
                  {[
                    { key: 'hasCorrectLength', label: 'Exactly 12 digits' },
                    { key: 'containsOnlyDigits', label: 'Contains only numeric digits' },
                    { key: 'doesNotStartWithZeroOrOne', label: 'Does not start with 0 or 1' },
                    { key: 'hasValidFormat', label: 'Follows valid format pattern' },
                    { key: 'passesChecksumValidation', label: 'Passes Verhoeff checksum algorithm' }
                  ].map(({ key, label }) => (
                    <div 
                      key={key} 
                      className="flex items-start sm:items-center p-3 rounded-lg bg-gray-50"
                      role="listitem"
                    >
                      <div className="flex-shrink-0 mt-0.5 sm:mt-0">
                        {validationDetails[key] ? (
                          <CheckCircle 
                            className="w-4 h-4 text-green-500 mr-2" 
                            aria-label="Valid"
                          />
                        ) : (
                          <XCircle 
                            className="w-4 h-4 text-red-500 mr-2" 
                            aria-label="Invalid"
                          />
                        )}
                      </div>
                      <span 
                        className={`text-sm sm:text-base ${validationDetails[key] ? 'text-green-700' : 'text-red-700'}`}
                      >
                        {label}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </section>

          {/* Information Section */}
          <section 
            className="bg-white rounded-xl shadow-lg p-4 sm:p-6"
            aria-labelledby="info-heading"
          >
            <h3 
              id="info-heading" 
              className="text-base sm:text-lg font-semibold text-gray-800 mb-4 flex items-center"
            >
              <AlertCircle 
                className="w-5 h-5 mr-2 text-orange-600 flex-shrink-0" 
                aria-hidden="true" 
              />
              Aadhaar Validation Information
            </h3>
            
            <div className="space-y-4">
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <h4 className="font-medium text-orange-800 mb-2">🔒 Privacy & Security</h4>
                <ul className="text-sm text-orange-700 space-y-1 pl-4">
                  <li>• All validation is performed locally in your browser</li>
                  <li>• No Aadhaar numbers are sent to external servers</li>
                </ul>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-800 mb-2">🔍 Validation Rules</h4>
                <ul className="text-sm text-blue-700 space-y-1 pl-4">
                  <li>• Must be exactly 12 digits long</li>
                  <li>• Cannot start with 0 or 1 (as per UIDAI guidelines)</li>
                  <li>• Must pass the Verhoeff checksum algorithm</li>
                  <li>• Uses the same validation as official UIDAI systems</li>
                </ul>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

