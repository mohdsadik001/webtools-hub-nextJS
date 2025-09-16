import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, AlertCircle, User, Building, IdCard } from 'lucide-react';

export default function PanCardValidator  () {
  const [panNumber, setPanNumber] = useState('');
  const [isValid, setIsValid] = useState(null);
  const [validationDetails, setValidationDetails] = useState({});
  const [panInfo, setPanInfo] = useState({});
  const [announcement, setAnnouncement] = useState('');


  // PAN card structure and validation rules
  const panStructure = {
    positions: [
      { index: 0, type: 'letter', description: 'First letter (A-Z)', pattern: /[A-Z]/ },
      { index: 1, type: 'letter', description: 'Second letter (A-Z)', pattern: /[A-Z]/ },
      { index: 2, type: 'letter', description: 'Third letter (A-Z)', pattern: /[A-Z]/ },
      { index: 3, type: 'letter', description: 'Fourth letter (A-Z)', pattern: /[A-Z]/ },
      { index: 4, type: 'letter', description: 'Fifth letter (A-Z)', pattern: /[A-Z]/ },
      { index: 5, type: 'digit', description: 'First digit (0-9)', pattern: /[0-9]/ },
      { index: 6, type: 'digit', description: 'Second digit (0-9)', pattern: /[0-9]/ },
      { index: 7, type: 'digit', description: 'Third digit (0-9)', pattern: /[0-9]/ },
      { index: 8, type: 'digit', description: 'Fourth digit (0-9)', pattern: /[0-9]/ },
      { index: 9, type: 'letter', description: 'Check digit letter (A-Z)', pattern: /[A-Z]/ }
    ]
  };

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
      panStructure.positions.forEach(pos => {
        const char = upperPAN[pos.index];
        if (pos.type === 'letter' && !pos.pattern.test(char)) {
          letterPositionsValid = false;
        } else if (pos.type === 'digit' && !pos.pattern.test(char)) {
          digitPositionsValid = false;
        }
      });
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


  const getValidationIcon = () => {
    if (isValid === null) return <IdCard className="w-5 h-5 text-gray-400" />;
    if (isValid) return <CheckCircle className="w-5 h-5 text-green-500" />;
    return <XCircle className="w-5 h-5 text-red-500" />;
  };

  const getInputBorderColor = () => {
    if (isValid === null) return 'border-gray-300 focus:border-blue-500 focus:ring-blue-500';
    if (isValid) return 'border-green-500 focus:border-green-500 focus:ring-green-500';
    return 'border-red-500 focus:border-red-500 focus:ring-red-500';
  };

  const getCategoryIcon = (isIndividual) => {
    return isIndividual ? <User className="w-4 h-4" /> : <Building className="w-4 h-4" />;
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-2 sm:p-4 md:p-6 lg:p-8 rounded">
      
      {/* Screen reader announcements */}
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {announcement}
      </div>
      
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-2">
            <IdCard className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" aria-hidden="true" />
            PAN Card Validator
          </h1>
          <p className="text-sm sm:text-base text-gray-600 px-4">
            Validate PAN numbers using official Income Tax Department format with detailed analysis
          </p>
          <div className="mt-4 flex justify-center">
            <div className="bg-blue-100 border border-blue-200 rounded-lg p-2 text-xs sm:text-sm text-blue-800">
              🇮🇳 Follows official IT Department PAN structure
            </div>
          </div>
        </header>

        <main>
          <section 
            className="bg-white rounded-xl shadow-lg p-4 sm:p-6 mb-6"
            role="main"
            aria-labelledby="validator-heading"
          >
            <h2 id="validator-heading" className="sr-only">PAN Number Validation Form</h2>
            

            {/* PAN Number Input */}
            <div className="mb-6">
              <label 
                htmlFor="pan" 
                className="block text-sm sm:text-base font-medium text-gray-700 mb-2"
              >
                <IdCard className="w-4 h-4 inline mr-1" aria-hidden="true" />
                Enter PAN Number
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="pan"
                  value={panNumber}
                  onChange={handlePANChange}
                  placeholder='ABCDE1234F'
                  aria-describedby={panNumber ? 'validation-status pan-details' : 'pan-description'}
                  aria-invalid={isValid === false ? 'true' : 'false'}
                  className={`w-full px-3 sm:px-4 py-3 pr-12 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-1 transition-colors text-sm sm:text-base font-mono tracking-wider ${getInputBorderColor()}`}
                  autoComplete="off"
                />
                <div 
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  aria-hidden="true"
                >
                  {getValidationIcon()}
                </div>
              </div>
              
              <p id="pan-description" className="sr-only">
                Enter a 10-character PAN number with 5 letters, 4 digits, and 1 letter
              </p>
              
              {panNumber && (
                <div id="validation-status" className="mt-2">
                  {isValid === true && (
                    <p className="text-green-600 text-sm flex items-center">
                      <CheckCircle className="w-4 h-4 mr-1 flex-shrink-0" aria-hidden="true" />
                      <span>Valid PAN number for {panInfo.applicantCategory}!</span>
                    </p>
                  )}
                  {isValid === false && (
                    <p className="text-red-600 text-sm flex items-center">
                      <XCircle className="w-4 h-4 mr-1 flex-shrink-0" aria-hidden="true" />
                      <span>Invalid PAN number format</span>
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* PAN Information */}
            {panNumber && isValid && Object.keys(panInfo).length > 0 && (
              <section 
                className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4"
                aria-labelledby="pan-info-heading"
              >
                <h3 
                  id="pan-info-heading" 
                  className="text-base sm:text-lg font-semibold text-blue-800 mb-3 flex items-center"
                >
                  {getCategoryIcon(panInfo.isIndividual)}
                  <span className="ml-2">PAN Information</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-blue-700">Applicant Type:</span>
                    <span className="ml-2 text-blue-800">{panInfo.applicantCategory}</span>
                  </div>
                  <div>
                    <span className="font-medium text-blue-700">Area Code:</span>
                    <span className="ml-2 font-mono text-blue-800">{panInfo.areaCode}</span>
                  </div>
                  <div>
                    <span className="font-medium text-blue-700">Sequence:</span>
                    <span className="ml-2 font-mono text-blue-800">{panInfo.sequenceNumber}</span>
                  </div>
                  <div>
                    <span className="font-medium text-blue-700">Check Digit:</span>
                    <span className="ml-2 font-mono text-blue-800">{panInfo.checkDigit}</span>
                  </div>
                  <div className="md:col-span-2">
                    <span className="font-medium text-blue-700">Description:</span>
                    <span className="ml-2 text-blue-800">{panInfo.description}</span>
                  </div>
                </div>
              </section>
            )}

            {/* Validation Details */}
            {panNumber && (
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
                  id="pan-details"
                  className="grid grid-cols-1 lg:grid-cols-2 gap-3"
                  role="list"
                  aria-label="PAN validation criteria"
                >
                  {[
                    { key: 'hasCorrectLength', label: 'Exactly 10 characters long' },
                    { key: 'hasValidFormat', label: 'Follows LLLLLNNNNL pattern' },
                    { key: 'hasCorrectLetterPositions', label: 'Letters in correct positions (1-5, 10)' },
                    { key: 'hasCorrectDigitPositions', label: 'Digits in correct positions (6-9)' },
                    { key: 'followsOfficialPattern', label: 'Matches official IT Dept pattern' },
                    { key: 'hasValidChecksum', label: 'Passes basic validation checks' }
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
                className="w-5 h-5 mr-2 text-blue-600 flex-shrink-0" 
                aria-hidden="true" 
              />
              PAN Card Information
            </h3>
            
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-800 mb-2">🔒 Privacy & Security</h4>
                <ul className="text-sm text-blue-700 space-y-1 pl-4">
                  <li>• All validation is performed locally in your browser</li>
                  <li>• No PAN numbers are sent to external servers</li>
                  <li>• Use the visibility toggle to protect sensitive information</li>
                  <li>• Clear your validated numbers before sharing your screen</li>
                </ul>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-medium text-green-800 mb-2">📋 PAN Structure (ABCDE1234F)</h4>
                <ul className="text-sm text-green-700 space-y-1 pl-4">
                  <li>• <strong>First 3 letters (ABC):</strong> Alphabetic series (area code)</li>
                  <li>• <strong>4th letter (D):</strong> Applicant category (P=Individual, C=Company, etc.)</li>
                  <li>• <strong>5th letter (E):</strong> First letter of surname/entity name</li>
                  <li>• <strong>Next 4 digits (1234):</strong> Sequential number</li>
                  <li>• <strong>Last letter (F):</strong> Check digit for validation</li>
                </ul>
              </div>

              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <h4 className="font-medium text-orange-800 mb-2">👥 Applicant Categories</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-orange-700">
                  {Object.entries(applicantCategories).map(([code, description]) => (
                    <div key={code} className="flex items-center">
                      <span className="font-mono bg-orange-200 px-2 py-1 rounded mr-2">{code}</span>
                      <span>{description}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <h4 className="font-medium text-purple-800 mb-2">✅ Validation Rules</h4>
                <ul className="text-sm text-purple-700 space-y-1 pl-4">
                  <li>• Must be exactly 10 characters long</li>
                  <li>• First 5 characters must be letters (A-Z)</li>
                  <li>• Next 4 characters must be digits (0-9)</li>
                  <li>• Last character must be a letter (A-Z)</li>
                  <li>• Follows official Income Tax Department format</li>
                  <li>• Case insensitive (converted to uppercase)</li>
                </ul>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

