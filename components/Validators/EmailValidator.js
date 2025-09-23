// import React, { useState, useEffect } from 'react';
// import { CheckCircle, XCircle, Mail, AlertCircle } from 'lucide-react';

// export default function EmailValidator  ()  {
//   const [email, setEmail] = useState('');
//   const [isValid, setIsValid] = useState(null);
//   const [validationDetails, setValidationDetails] = useState({});


//   // Comprehensive email validation function
//   const validateEmail = (email) => {
//     const details = {
//       hasAtSymbol: false,
//       hasValidFormat: false,
//       hasValidDomain: false,
//       hasValidLocalPart: false,
//       isNotTooLong: false,
//       hasNoConsecutiveDots: false,
//       hasValidCharacters: false
//     };

//     if (!email) {
//       return { isValid: null, details };
//     }

//     // Check for @ symbol
//     details.hasAtSymbol = email.includes('@') && email.split('@').length === 2;

//     if (!details.hasAtSymbol) {
//       return { isValid: false, details };
//     }

//     const [localPart, domain] = email.split('@');

//     // Check local part (before @)
//     details.hasValidLocalPart = localPart.length > 0 && localPart.length <= 64;

//     // Check domain part (after @)
//     details.hasValidDomain = domain.length > 0 && domain.includes('.') && 
//                             !domain.startsWith('.') && !domain.endsWith('.');

//     // Check overall length
//     details.isNotTooLong = email.length <= 254;

//     // Check for consecutive dots
//     details.hasNoConsecutiveDots = !email.includes('..');

//     // Check for valid characters (basic check)
//     const validEmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
//     details.hasValidCharacters = validEmailRegex.test(email);

//     // More comprehensive regex for final validation
//     const comprehensiveRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
//     details.hasValidFormat = comprehensiveRegex.test(email);

//     const isValid = Object.values(details).every(Boolean);
//     return { isValid, details };
//   };

//   useEffect(() => {
//     const result = validateEmail(email);
//     setIsValid(result.isValid);
//     setValidationDetails(result.details);
//   }, [email]);

//   const handleEmailChange = (e) => {
//     setEmail(e.target.value);
//   };


//   const getValidationIcon = () => {
//     if (isValid === null) return <Mail className="w-5 h-5 text-gray-400" />;
//     if (isValid) return <CheckCircle className="w-5 h-5 text-green-500" />;
//     return <XCircle className="w-5 h-5 text-red-500" />;
//   };

//   const getInputBorderColor = () => {
//     if (isValid === null) return 'border-gray-300 focus:border-blue-500 focus:ring-blue-500';
//     if (isValid) return 'border-green-500 focus:border-green-500 focus:ring-green-500';
//     return 'border-red-500 focus:border-red-500 focus:ring-red-500';
//   };

//   return (
//     <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-4 rounded">
//       <div className="max-w-4xl mx-auto">
//         <div className="text-center mb-8">
//           <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-2">
//             <Mail className="w-6 h-6 sm:w-8 sm:h-8" aria-hidden="true" />
//             Email Validator
//           </h1>
//           <p className="text-gray-600">Validate email addresses with detailed feedback</p>
//         </div>

//         <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
//           <div className="mb-6">
//             <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
//               Enter Email Address
//             </label>
//             <div className="relative">
//               <input
//                 type="email"
//                 id="email"
//                 value={email}
//                 onChange={handleEmailChange}
//                 placeholder="example@domain.com"
//                 className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors ${getInputBorderColor()}`}
//               />
//               <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
//                 {getValidationIcon()}
//               </div>
//             </div>
            
//             {email && (
//               <div className="mt-2">
//                 {isValid === true && (
//                   <p className="text-green-600 text-sm flex items-center">
//                     <CheckCircle className="w-4 h-4 mr-1" />
//                     Valid email address!
//                   </p>
//                 )}
//                 {isValid === false && (
//                   <p className="text-red-600 text-sm flex items-center">
//                     <XCircle className="w-4 h-4 mr-1" />
//                     Invalid email address
//                   </p>
//                 )}
//               </div>
//             )}
//           </div>

//           {email && (
//             <div className="border-t pt-6">
//               <h3 className="text-lg font-semibold text-gray-800 mb-4">Validation Details</h3>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//                 {[
//                   { key: 'hasAtSymbol', label: 'Contains @ symbol' },
//                   { key: 'hasValidLocalPart', label: 'Valid local part (before @)' },
//                   { key: 'hasValidDomain', label: 'Valid domain part (after @)' },
//                   { key: 'hasValidCharacters', label: 'Valid characters only' },
//                   { key: 'isNotTooLong', label: 'Appropriate length (≤254 chars)' },
//                   { key: 'hasNoConsecutiveDots', label: 'No consecutive dots' },
//                   { key: 'hasValidFormat', label: 'Matches email format' }
//                 ].map(({ key, label }) => (
//                   <div key={key} className="flex items-center">
//                     {validationDetails[key] ? (
//                       <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
//                     ) : (
//                       <XCircle className="w-4 h-4 text-red-500 mr-2" />
//                     )}
//                     <span className={validationDetails[key] ? 'text-green-700' : 'text-red-700'}>
//                       {label}
//                     </span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>



//         <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
//           <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
//             <AlertCircle className="w-5 h-5 mr-2 text-blue-600" />
//             Email Validation Rules
//           </h3>
//           <div className="text-sm text-gray-600 space-y-2">
//             <p>• Must contain exactly one @ symbol</p>
//             <p>• Local part (before @) must be 1-64 characters</p>
//             <p>• Domain must contain at least one dot and valid characters</p>
//             <p>• Total length must not exceed 254 characters</p>
//             <p>• No consecutive dots allowed</p>
//             <p>• Only valid email characters permitted</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };






import React from 'react';
import { CheckCircle, XCircle, Mail, AlertCircle } from 'lucide-react';

import Input from '@/components/ui/Input';
import { useEmailValidator } from '@/hooks/useEmailValidator';

export default function EmailValidator() {
  const {
    email,
    isValid,
    validationDetails,
    handleEmailChange
  } = useEmailValidator();

  const getValidationIcon = () => {
    if (isValid === null) return <Mail className="w-5 h-5 text-gray-400" />;
    if (isValid) return <CheckCircle className="w-5 h-5 text-green-500" />;
    return <XCircle className="w-5 h-5 text-red-500" />;
  };

  const getInputBorderColor = () => {
    if (isValid === null) return 'border-gray-300 focus:border-blue-500 focus:ring-blue-500';
    if (isValid) return 'border-green-500 focus:border-green-500 focus:ring-green-500';
    return 'border-red-500 focus:border-red-500 focus:ring-red-500';
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-4 rounded">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-2">
            <Mail className="w-6 h-6 sm:w-8 sm:h-8" aria-hidden="true" />
            Email Validator
          </h1>
          <p className="text-gray-600">Validate email addresses with detailed feedback</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="mb-6">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Enter Email Address
            </label>
            <div className="relative">
              <Input
                id="email"
                type="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="example@domain.com"
                className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors ${getInputBorderColor()}`}
                ariaLabel="Enter Email Address"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                {getValidationIcon()}
              </div>
            </div>
            
            {email && (
              <div className="mt-2">
                {isValid === true && (
                  <p className="text-green-600 text-sm flex items-center">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Valid email address!
                  </p>
                )}
                {isValid === false && (
                  <p className="text-red-600 text-sm flex items-center">
                    <XCircle className="w-4 h-4 mr-1" />
                    Invalid email address
                  </p>
                )}
              </div>
            )}
          </div>

          {email && (
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Validation Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  { key: 'hasAtSymbol', label: 'Contains @ symbol' },
                  { key: 'hasValidLocalPart', label: 'Valid local part (before @)' },
                  { key: 'hasValidDomain', label: 'Valid domain part (after @)' },
                  { key: 'hasValidCharacters', label: 'Valid characters only' },
                  { key: 'isNotTooLong', label: 'Appropriate length (≤254 chars)' },
                  { key: 'hasNoConsecutiveDots', label: 'No consecutive dots' },
                  { key: 'hasValidFormat', label: 'Matches email format' }
                ].map(({ key, label }) => (
                  <div key={key} className="flex items-center">
                    {validationDetails[key] ? (
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    ) : (
                      <XCircle className="w-4 h-4 text-red-500 mr-2" />
                    )}
                    <span className={validationDetails[key] ? 'text-green-700' : 'text-red-700'}>
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <AlertCircle className="w-5 h-5 mr-2 text-blue-600" />
            Email Validation Rules
          </h3>
          <div className="text-sm text-gray-600 space-y-2">
            <p>• Must contain exactly one @ symbol</p>
            <p>• Local part (before @) must be 1-64 characters</p>
            <p>• Domain must contain at least one dot and valid characters</p>
            <p>• Total length must not exceed 254 characters</p>
            <p>• No consecutive dots allowed</p>
            <p>• Only valid email characters permitted</p>
          </div>
        </div>
      </div>
    </div>
  );
}
