// Phone Number Countries
export const phoneCountries = {
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


// Pincode Countries

export const pinCodeCountries = {
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
      '0': 'Connecticut, Massachusetts, Maine, New Hampshire, New Jersey, Puerto Rico, Rhode Island, Vermont, Virgin Islands',
      '1': 'Delaware, New York, Pennsylvania',
      '2': 'District of Columbia, Maryland, North Carolina, South Carolina, Virginia, West Virginia',
      '3': 'Alabama, Florida, Georgia, Mississippi, Tennessee',
      '4': 'Indiana, Kentucky, Michigan, Ohio',
      '5': 'Iowa, Minnesota, Montana, North Dakota, South Dakota, Wisconsin',
      '6': 'Illinois, Kansas, Missouri, Nebraska',
      '7': 'Arkansas, Louisiana, Oklahoma, Texas',
      '8': 'Arizona, Colorado, Idaho, New Mexico, Nevada, Utah, Wyoming',
      '9': 'Alaska, American Samoa, California, Guam, Hawaii, Marshall Islands, Oregon, Washington'
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
