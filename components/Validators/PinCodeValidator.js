import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, MapPin, AlertCircle, Globe, Search } from 'lucide-react';

export default function PinCodeValidator ()  {
  const [pinCode, setPinCode] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('india');
  const [isValid, setIsValid] = useState(null);
  const [validationDetails, setValidationDetails] = useState({});
  const [pinCodeInfo, setPinCodeInfo] = useState({});
  const [announcement, setAnnouncement] = useState('');
  const [showCodes, setShowCodes] = useState(true);

  // Country-specific PIN code configurations
  const countries = {
    india: {
      name: 'India',
      code: 'IN',
      flag: '🇮🇳',
      pattern: /^[1-9][0-9]{5}$/,
      length: 6,
      format: 'NNNNNN',
      description: '6-digit postal code',
      example: '110001',
      rules: [
        'Must be exactly 6 digits',
        'Cannot start with 0',
        'First digit indicates postal region',
        'Second digit indicates sub-region',
        'Third digit indicates sorting district'
      ],
      regions: {
        '1': 'Delhi, Haryana, Punjab, Himachal Pradesh, Jammu & Kashmir, Chandigarh',
        '2': 'Uttar Pradesh, Uttarakhand',
        '3': 'Rajasthan, Gujarat, Daman & Diu, Dadra & Nagar Haveli',
        '4': 'Maharashtra, Madhya Pradesh, Chhattisgarh, Goa',
        '5': 'Andhra Pradesh, Telangana, Karnataka',
        '6': 'Tamil Nadu, Kerala, Pondicherry, Lakshadweep',
        '7': 'West Bengal, Odisha, Arunachal Pradesh',
        '8': 'Bihar, Jharkhand, Assam, Meghalaya, Manipur, Mizoram, Nagaland, Tripura, Sikkim',
        '9': 'Army Postal Service, Field Post Office'
      }
    },
    usa: {
      name: 'United States',
      code: 'US',
      flag: '🇺🇸',
      pattern: /^[0-9]{5}(-[0-9]{4})?$/,
      length: [5, 10],
      format: 'NNNNN or NNNNN-NNNN',
      description: '5-digit ZIP code or ZIP+4',
      example: '90210 or 90210-1234',
      rules: [
        'Must be 5 digits or 5+4 digits with hyphen',
        'Can include optional 4-digit extension',
        'First digit indicates national area',
        'Second and third digits indicate sectional center',
        'Fourth and fifth digits indicate delivery area'
      ],
      regions: {
        '0': 'Connecticut, Massachusetts, Maine, New Hampshire, New Jersey, Puerto Rico, Rhode Island, Vermont, Virgin Islands, APO Europe, FPO Europe',
        '1': 'Delaware, New York, Pennsylvania',
        '2': 'District of Columbia, Maryland, North Carolina, South Carolina, Virginia, West Virginia',
        '3': 'Alabama, Florida, Georgia, Mississippi, Tennessee, APO Americas, FPO Americas',
        '4': 'Indiana, Kentucky, Michigan, Ohio',
        '5': 'Iowa, Minnesota, Montana, North Dakota, South Dakota, Wisconsin',
        '6': 'Illinois, Kansas, Missouri, Nebraska',
        '7': 'Arkansas, Louisiana, Oklahoma, Texas',
        '8': 'Arizona, Colorado, Idaho, New Mexico, Nevada, Utah, Wyoming',
        '9': 'Alaska, American Samoa, California, Guam, Hawaii, Marshall Islands, Federated States of Micronesia, Northern Mariana Islands, Oregon, Palau, Washington, APO Pacific, FPO Pacific'
      }
    },
    uk: {
      name: 'United Kingdom',
      code: 'GB',
      flag: '🇬🇧',
      pattern: /^[A-Z]{1,2}[0-9R][0-9A-Z]?\s?[0-9][A-Z]{2}$/i,
      length: [6, 7, 8],
      format: 'A9 9AA, A99 9AA, AA9 9AA, AA99 9AA',
      description: 'UK postal code',
      example: 'SW1A 1AA or M1 1AA',
      rules: [
        'Format: Area + District + Sector + Unit',
        'Area: 1-2 letters (London areas use single letters)',
        'District: 1-2 characters (numbers, sometimes ending with letter)',
        'Sector: Single digit',
        'Unit: Two letters'
      ]
    },
    canada: {
      name: 'Canada',
      code: 'CA',
      flag: '🇨🇦',
      pattern: /^[ABCEGHJKLMNPRSTVXY][0-9][ABCEGHJKLMNPRSTVWXYZ]\s?[0-9][ABCEGHJKLMNPRSTVWXYZ][0-9]$/i,
      length: [6, 7],
      format: 'A9A 9A9',
      description: '6-character postal code',
      example: 'K1A 0A6 or M5V3L9',
      rules: [
        'Format: Letter-Number-Letter Number-Letter-Number',
        'First letter indicates province/territory',
        'Does not use letters D, F, I, O, Q, U',
        'Space is optional but recommended'
      ]
    },
    germany: {
      name: 'Germany',
      code: 'DE',
      flag: '🇩🇪',
      pattern: /^[0-9]{5}$/,
      length: 5,
      format: 'NNNNN',
      description: '5-digit postal code',
      example: '10115',
      rules: [
        'Must be exactly 5 digits',
        'First digit indicates broad geographic area',
        'First two digits indicate postal region',
        'Last three digits indicate delivery area'
      ]
    }
  };

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

    const countryConfig = countries[country];
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
        setAnnouncement(`Valid ${countries[selectedCountry].name} PIN code`);
      } else if (result.isValid === false) {
        setAnnouncement(`Invalid ${countries[selectedCountry].name} PIN code format`);
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
    const maxLength = Array.isArray(countries[selectedCountry].length) 
      ? Math.max(...countries[selectedCountry].length) + 2 // +2 for spaces/hyphens
      : countries[selectedCountry].length + 2;
    
    if (value.length <= maxLength) {
      setPinCode(value);
    }
  };

  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);
    setPinCode(''); // Clear input when country changes
  };


  const toggleVisibility = () => {
    setShowCodes(!showCodes);
    setAnnouncement(showCodes ? 'PIN codes hidden' : 'PIN codes visible');
  };

  const maskPinCode = (code) => {
    if (code.length <= 3) return code;
    const visibleChars = Math.ceil(code.length / 3);
    return code.substring(0, visibleChars) + 'X'.repeat(code.length - visibleChars);
  };

  const getValidationIcon = () => {
    if (isValid === null) return <MapPin className="w-5 h-5 text-gray-400" />;
    if (isValid) return <CheckCircle className="w-5 h-5 text-green-500" />;
    return <XCircle className="w-5 h-5 text-red-500" />;
  };

  const getInputBorderColor = () => {
    if (isValid === null) return 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500';
    if (isValid) return 'border-green-500 focus:border-green-500 focus:ring-green-500';
    return 'border-red-500 focus:border-red-500 focus:ring-red-500';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-100 p-2 sm:p-4 md:p-6 lg:p-8">
      {/* Screen reader announcements */}
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {announcement}
      </div>
      
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-2">
            <MapPin className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" aria-hidden="true" />
            PIN Code Validator
          </h1>
          <p className="text-sm sm:text-base text-gray-600 px-4">
            Validate postal codes from multiple countries with detailed geographic information
          </p>
          <div className="mt-4 flex justify-center">
            <div className="bg-green-100 border border-green-200 rounded-lg p-2 text-xs sm:text-sm text-green-800">
              🌍 Supports India, USA, UK, Canada, and Germany
            </div>
          </div>
        </header>

        <main>
          <section 
            className="bg-white rounded-xl shadow-lg p-4 sm:p-6 mb-6"
            role="main"
            aria-labelledby="validator-heading"
          >
            <h2 id="validator-heading" className="sr-only">PIN Code Validation Form</h2>
            
            {/* Country Selection */}
            <div className="mb-6">
              <label 
                htmlFor="country-select" 
                className="block text-sm sm:text-base font-medium text-gray-700 mb-2"
              >
                <Globe className="w-4 h-4 inline mr-1" aria-hidden="true" />
                Select Country
              </label>
              <select
                id="country-select"
                value={selectedCountry}
                onChange={handleCountryChange}
                className="w-full px-3 sm:px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors text-sm sm:text-base"
                aria-describedby="country-description"
              >
                {Object.entries(countries).map(([key, country]) => (
                  <option key={key} value={key}>
                    {country.flag} {country.name} - {country.description}
                  </option>
                ))}
              </select>
              <p id="country-description" className="sr-only">
                Choose a country to validate postal codes according to its specific format
              </p>
            </div>

            {/* PIN Code Input */}
            <div className="mb-6">
              <label 
                htmlFor="pincode" 
                className="block text-sm sm:text-base font-medium text-gray-700 mb-2"
              >
                <MapPin className="w-4 h-4 inline mr-1" aria-hidden="true" />
                Enter {countries[selectedCountry].name} PIN Code
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="pincode"
                  value={pinCode}
                  onChange={handlePinCodeChange}
                  placeholder={`${countries[selectedCountry].format} (e.g., ${countries[selectedCountry].example})`}
                  aria-describedby={pinCode ? 'validation-status pincode-details' : 'pincode-description'}
                  aria-invalid={isValid === false ? 'true' : 'false'}
                  className={`w-full px-3 sm:px-4 py-3 pr-12 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-1 transition-colors text-sm sm:text-base font-mono tracking-wider ${getInputBorderColor()}`}
                  autoComplete="postal-code"
                />
                <div 
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  aria-hidden="true"
                >
                  {getValidationIcon()}
                </div>
              </div>
              
              <p id="pincode-description" className="sr-only">
                Enter a postal code in the format {countries[selectedCountry].format} for {countries[selectedCountry].name}
              </p>
              
              {pinCode && (
                <div id="validation-status" className="mt-2">
                  {isValid === true && (
                    <p className="text-green-600 text-sm flex items-center">
                      <CheckCircle className="w-4 h-4 mr-1 flex-shrink-0" aria-hidden="true" />
                      <span>Valid {countries[selectedCountry].name} PIN code!</span>
                    </p>
                  )}
                  {isValid === false && (
                    <p className="text-red-600 text-sm flex items-center">
                      <XCircle className="w-4 h-4 mr-1 flex-shrink-0" aria-hidden="true" />
                      <span>Invalid PIN code format for {countries[selectedCountry].name}</span>
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* PIN Code Information */}
            {pinCode && isValid && Object.keys(pinCodeInfo).length > 0 && (
              <section 
                className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4"
                aria-labelledby="pincode-info-heading"
              >
                <h3 
                  id="pincode-info-heading" 
                  className="text-base sm:text-lg font-semibold text-green-800 mb-3 flex items-center"
                >
                  <Search className="w-5 h-5 mr-2" aria-hidden="true" />
                  Geographic Information
                </h3>
                
                {selectedCountry === 'india' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-green-700">Postal Circle:</span>
                      <span className="ml-2 text-green-800">{pinCodeInfo.postalCircle}</span>
                    </div>
                    <div>
                      <span className="font-medium text-green-700">Sub-Region:</span>
                      <span className="ml-2 text-green-800">{pinCodeInfo.subRegion}</span>
                    </div>
                    <div>
                      <span className="font-medium text-green-700">Sorting District:</span>
                      <span className="ml-2 text-green-800">{pinCodeInfo.sortingDistrict}</span>
                    </div>
                    <div>
                      <span className="font-medium text-green-700">Delivery Office:</span>
                      <span className="ml-2 font-mono text-green-800">{pinCodeInfo.deliveryOffice}</span>
                    </div>
                    <div className="md:col-span-2">
                      <span className="font-medium text-green-700">Region:</span>
                      <span className="ml-2 text-green-800">{pinCodeInfo.region}</span>
                    </div>
                  </div>
                )}

                {selectedCountry === 'usa' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-green-700">National Area:</span>
                      <span className="ml-2 text-green-800">{pinCodeInfo.nationalArea}</span>
                    </div>
                    <div>
                      <span className="font-medium text-green-700">Sectional Center:</span>
                      <span className="ml-2 text-green-800">{pinCodeInfo.sectionalCenter}</span>
                    </div>
                    <div>
                      <span className="font-medium text-green-700">Delivery Area:</span>
                      <span className="ml-2 text-green-800">{pinCodeInfo.deliveryArea}</span>
                    </div>
                    {pinCodeInfo.extension && (
                      <div>
                        <span className="font-medium text-green-700">Extension:</span>
                        <span className="ml-2 font-mono text-green-800">{pinCodeInfo.extension}</span>
                      </div>
                    )}
                    <div className="md:col-span-2">
                      <span className="font-medium text-green-700">Region:</span>
                      <span className="ml-2 text-green-800">{pinCodeInfo.region}</span>
                    </div>
                  </div>
                )}

                {!['india', 'usa'].includes(selectedCountry) && (
                  <div className="text-sm text-green-700">
                    <p><strong>Country:</strong> {pinCodeInfo.country}</p>
                    <p><strong>Format:</strong> {pinCodeInfo.format}</p>
                    <p><strong>Code:</strong> <span className="font-mono">{pinCodeInfo.cleanCode}</span></p>
                  </div>
                )}
              </section>
            )}

            {/* Validation Details */}
            {pinCode && (
              <section 
                className="border-t pt-6"
                aria-labelledby="validation-details-heading"
              >
                <h3 
                  id="validation-details-heading" 
                  className="text-base sm:text-lg font-semibold text-gray-800 mb-4"
                >
                  {countries[selectedCountry].flag} {countries[selectedCountry].name} Validation Details
                </h3>
                <div 
                  id="pincode-details"
                  className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-6"
                  role="list"
                  aria-label="PIN code validation criteria"
                >
                  {[
                    { key: 'hasCorrectLength', label: `Correct length (${countries[selectedCountry].format})` },
                    { key: 'matchesPattern', label: 'Matches country pattern' },
                    { key: 'hasValidFormat', label: 'Valid format structure' },
                    { key: 'hasValidStructure', label: 'Complete validation passed' }
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

                {/* Country-specific rules */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-800 mb-3">Validation Rules for {countries[selectedCountry].name}</h4>
                  <ul className="text-sm text-gray-600 space-y-1 pl-4">
                    {countries[selectedCountry].rules.map((rule, index) => (
                      <li key={index}>• {rule}</li>
                    ))}
                  </ul>
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
                className="w-5 h-5 mr-2 text-green-600 flex-shrink-0" 
                aria-hidden="true" 
              />
              Postal Code Information
            </h3>
            
            <div className="space-y-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-medium text-green-800 mb-2">🔒 Privacy & Security</h4>
                <ul className="text-sm text-green-700 space-y-1 pl-4">
                  <li>• All validation is performed locally in your browser</li>
                  <li>• No PIN codes are sent to external servers</li>
                  <li>• Use the visibility toggle to protect sensitive information</li>
                  <li>• Geographic information is based on public postal standards</li>
                </ul>
              </div>


              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <h4 className="font-medium text-orange-800 mb-2">📮 About PIN Codes</h4>
                <div className="text-sm text-orange-700 space-y-2">
                  <p>
                    PIN codes (Postal Index Numbers) or ZIP codes are numerical codes used by postal 
                    services to identify geographic regions for efficient mail delivery. Each country 
                    has its own format and structure.
                  </p>
                  <p>
                    <strong>India:</strong> 6-digit codes where the first digit represents the postal region, 
                    second digit represents the sub-region, and third digit represents the sorting district.
                  </p>
                  <p>
                    <strong>USA:</strong> 5-digit ZIP codes with optional 4-digit extensions (ZIP+4) for 
                    more precise location identification.
                  </p>
                </div>
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <h4 className="font-medium text-purple-800 mb-2">✅ Validation Features</h4>
                <ul className="text-sm text-purple-700 space-y-1 pl-4">
                  <li>• Real-time validation as you type</li>
                  <li>• Country-specific format checking</li>
                  <li>• Geographic information extraction</li>
                  <li>• Multiple country support</li>
                  <li>• Privacy-focused local validation</li>
                </ul>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};
