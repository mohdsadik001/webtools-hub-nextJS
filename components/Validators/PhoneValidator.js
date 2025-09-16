import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Phone, AlertCircle, Globe } from 'lucide-react';

export default function PhoneValidator () {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('auto');
  const [validationResult, setValidationResult] = useState(null);
  const [announcement, setAnnouncement] = useState('');

  // Country configurations with validation patterns
  const countries = {
    india: {
      name: 'India',
      code: '+91',
      flag: '🇮🇳',
      patterns: [
        /^(\+91|91|0)?[6-9]\d{9}$/,
        /^(\+91[\s-]?)?[6-9]\d{9}$/,
        /^(\+91[\s-]?)?[6-9][\s-]?\d{4}[\s-]?\d{5}$/
      ],
      format: '+91 XXXXX XXXXX',
      rules: [
        'Must start with digits 6-9',
        '10 digits after country code',
        'Can include +91 country code',
        'May include spaces or hyphens'
      ],
      examples: ['+91 98765 43210', '9876543210', '+91-9876543210']
    },
    usa: {
      name: 'United States',
      code: '+1',
      flag: '🇺🇸',
      patterns: [
        /^(\+1|1)?[\s-]?\(?[2-9]\d{2}\)?[\s-]?[2-9]\d{2}[\s-]?\d{4}$/,
        /^(\+1[\s-]?)?[2-9]\d{2}[\s-]?[2-9]\d{2}[\s-]?\d{4}$/
      ],
      format: '+1 (XXX) XXX-XXXX',
      rules: [
        'Area code must start with 2-9',
        'Exchange code must start with 2-9',
        '10 digits total',
        'Can include +1 country code',
        'May include parentheses, spaces, or hyphens'
      ],
      examples: ['+1 (555) 123-4567', '555-123-4567', '+1 555 123 4567']
    },
    uk: {
      name: 'United Kingdom',
      code: '+44',
      flag: '🇬🇧',
      patterns: [
        /^(\+44|44|0)?[1-9]\d{8,9}$/,
        /^(\+44[\s-]?|0)?[1-9]\d{8,9}$/,
        /^(\+44[\s-]?|0)?[1-9][\s-]?\d{3,4}[\s-]?\d{6}$/
      ],
      format: '+44 XXXX XXXXXX',
      rules: [
        'Must start with 1-9 (after country code)',
        '10-11 digits total',
        'Can start with +44 or 0',
        'May include spaces or hyphens'
      ],
      examples: ['+44 20 7946 0958', '020 7946 0958', '+44-20-7946-0958']
    },
    canada: {
      name: 'Canada',
      code: '+1',
      flag: '🇨🇦',
      patterns: [
        /^(\+1|1)?[\s-]?\(?[2-9]\d{2}\)?[\s-]?[2-9]\d{2}[\s-]?\d{4}$/,
        /^(\+1[\s-]?)?[2-9]\d{2}[\s-]?[2-9]\d{2}[\s-]?\d{4}$/
      ],
      format: '+1 (XXX) XXX-XXXX',
      rules: [
        'Same format as US numbers',
        'Area code must start with 2-9',
        'Exchange code must start with 2-9',
        '10 digits total',
        'Can include +1 country code'
      ],
      examples: ['+1 (416) 555-0123', '416-555-0123', '+1 416 555 0123']
    },
    australia: {
      name: 'Australia',
      code: '+61',
      flag: '🇦🇺',
      patterns: [
        /^(\+61|61|0)?[2-9]\d{8}$/,
        /^(\+61[\s-]?|0)?[2-9][\s-]?\d{4}[\s-]?\d{4}$/,
        /^(\+61[\s-]?|0)?[2-9][\s-]?\d{8}$/
      ],
      format: '+61 X XXXX XXXX',
      rules: [
        'Must start with 2-9 (after country code)',
        '9 digits after area code',
        'Can start with +61 or 0',
        'May include spaces or hyphens'
      ],
      examples: ['+61 2 9876 5432', '02 9876 5432', '+61-2-9876-5432']
    }
  };

  const validatePhone = (phone, country) => {
    if (!phone.trim()) return { isValid: null, matchedCountry: null, details: {} };

    const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
    
    if (country === 'auto') {
      // Auto-detect country by trying all patterns
      for (const [countryKey, countryData] of Object.entries(countries)) {
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
      const countryData = countries[country];
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


  const getValidationIcon = () => {
    if (validationResult?.isValid === null) return <Phone className="w-5 h-5 text-gray-400" />;
    if (validationResult?.isValid) return <CheckCircle className="w-5 h-5 text-green-500" />;
    return <XCircle className="w-5 h-5 text-red-500" />;
  };

  const getInputBorderColor = () => {
    if (validationResult?.isValid === null) return 'border-gray-300 focus:border-blue-500 focus:ring-blue-500';
    if (validationResult?.isValid) return 'border-green-500 focus:border-green-500 focus:ring-green-500';
    return 'border-red-500 focus:border-red-500 focus:ring-red-500';
  };

  return (
    <div className="bg-gradient-to-br from-purple-50 to-blue-100 p-2 sm:p-4 md:p-6 lg:p-8 rounded">
      {/* Screen reader announcements */}

      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {announcement}
      </div>
      
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-2">
            <Phone className="w-6 h-6 sm:w-8 sm:h-8" aria-hidden="true" />
            Phone Number Validator
          </h1>
          <p className="text-sm sm:text-base text-gray-600 px-4">
            Validate phone numbers from multiple countries
          </p>
        </header>

        <main>
          <section 
            className="bg-white rounded-xl shadow-lg p-4 sm:p-6 mb-6"
            role="main"
            aria-labelledby="validator-heading"
          >
            <h2 id="validator-heading" className="sr-only">Phone Number Validation Form</h2>
            
            {/* Country Selection */}
            <div className="mb-6">
              <label 
                htmlFor="country-select" 
                className="block text-sm sm:text-base font-medium text-gray-700 mb-2"
              >
                <Globe className="w-4 h-4 inline mr-1" aria-hidden="true" />
                Select Country (or Auto-detect)
              </label>
              <select
                id="country-select"
                value={selectedCountry}
                onChange={handleCountryChange}
                className="w-full px-3 sm:px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm sm:text-base"
                aria-describedby="country-description"
              >
                <option value="auto">🌍 Auto-detect Country</option>
                {Object.entries(countries).map(([key, country]) => (
                  <option key={key} value={key}>
                    {country.flag} {country.name} ({country.code})
                  </option>
                ))}
              </select>
              <p id="country-description" className="sr-only">
                Choose a specific country or let the system auto-detect the country from the phone number format
              </p>
            </div>

            {/* Phone Number Input */}
            <div className="mb-6">
              <label 
                htmlFor="phone" 
                className="block text-sm sm:text-base font-medium text-gray-700 mb-2"
              >
                Enter Phone Number
              </label>
              <div className="relative">
                <input
                  type="tel"
                  id="phone"
                  value={phoneNumber}
                  onChange={handlePhoneChange}
                  placeholder={selectedCountry !== 'auto' ? countries[selectedCountry]?.format : '+XX XXX XXX XXXX'}
                  aria-describedby={phoneNumber ? 'validation-status phone-details' : 'phone-description'}
                  aria-invalid={validationResult?.isValid === false ? 'true' : 'false'}
                  className={`w-full px-3 sm:px-4 py-3 pr-12 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-1 transition-colors text-sm sm:text-base ${getInputBorderColor()}`}
                  autoComplete="tel"
                />
                <div 
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  aria-hidden="true"
                >
                  {getValidationIcon()}
                </div>
              </div>
              
              <p id="phone-description" className="sr-only">
                Enter a phone number to validate its format for the selected country
              </p>
              
              {phoneNumber && (
                <div id="validation-status" className="mt-2">
                  {validationResult?.isValid === true && (
                    <p className="text-green-600 text-sm flex items-center">
                      <CheckCircle className="w-4 h-4 mr-1 flex-shrink-0" aria-hidden="true" />
                      <span>Valid {validationResult.details.country} phone number!</span>
                    </p>
                  )}
                  {validationResult?.isValid === false && (
                    <p className="text-red-600 text-sm flex items-center">
                      <XCircle className="w-4 h-4 mr-1 flex-shrink-0" aria-hidden="true" />
                      <span>Invalid phone number format</span>
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Validation Details */}
            {phoneNumber && selectedCountry !== 'auto' && (
              <section 
                className="border-t pt-6"
                aria-labelledby="validation-details-heading"
              >
                <h3 
                  id="validation-details-heading" 
                  className="text-base sm:text-lg font-semibold text-gray-800 mb-4"
                >
                  {countries[selectedCountry].flag} {countries[selectedCountry].name} Format Rules
                </h3>
                <div 
                  id="phone-details"
                  className="bg-gray-50 rounded-lg p-4"
                >
                  <div className="mb-4">
                    <p className="text-sm sm:text-base text-gray-700 mb-2">
                      <strong>Expected Format:</strong> {countries[selectedCountry].format}
                    </p>
                    <p className="text-sm sm:text-base text-gray-700">
                      <strong>Country Code:</strong> {countries[selectedCountry].code}
                    </p>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="text-sm sm:text-base font-medium text-gray-800 mb-2">Validation Rules:</h4>
                    <ul className="text-sm text-gray-600 space-y-1 pl-4">
                      {countries[selectedCountry].rules.map((rule, index) => (
                        <li key={index}>• {rule}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-sm sm:text-base font-medium text-gray-800 mb-2">Valid Examples:</h4>
                    <ul className="text-sm text-gray-600 space-y-1 pl-4">
                      {countries[selectedCountry].examples.map((example, index) => (
                        <li key={index} className="font-mono">• {example}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>
            )}
          </section>
        </main>
      </div>
    </div>
  );
};