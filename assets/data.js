// Mock data for tools
export const featuredTools = [
  {
    id: 1,
    name: "JSON Converter",
    description:
      "Convert your JSON data to different formats like CSV, XML, and more",
    icon: "{}",
    category: "Coding",
    isNew: true,
  },
  {
    id: 2,
    name: "CSS Loader Generator",
    description: "Generate stunning CSS loaders for your website",
    icon: "⚡",
    category: "CSS",
    isNew: false,
  },
  {
    id: 3,
    name: "Scanned PDF Converter",
    description: "Convert scanned documents to editable text",
    icon: "📄",
    category: "PDF",
    isNew: false,
  },
  {
    id: 4,
    name: "AI Color Palette Generator",
    description: "Generate beautiful color palettes using AI",
    icon: "🎨",
    category: "Color",
    isNew: false,
  },
  {
    id: 5,
    name: "Tweet to Image Converter",
    description: "Convert tweets to beautiful images for sharing",
    icon: "🐦",
    category: "Social",
    isNew: false,
  },
  {
    id: 6,
    name: "Image Caption Generator",
    description: "Generate captions for your images automatically",
    icon: "📷",
    category: "Image",
    isNew: false,
  },
  {
    id: 7,
    name: "Twitter Ad Revenue Calculator",
    description: "Calculate potential ad revenue from Twitter",
    icon: "💰",
    category: "Social",
    isNew: false,
  },
  {
    id: 8,
    name: "Hashtag Analyzer",
    description: "Analyze hashtag performance and trends",
    icon: "#️⃣",
    category: "Social",
    isNew: false,
  },
];

export const textTools = [
  {
    id: "text-1",
    name: "Case Converter",
    description:
      "Convert your text to different cases like uppercase, lowercase, title case, and sentence case",
    icon: "Aa",
  },
  {
    id: "text-2",
    name: "Lorem Ipsum Generator",
    description: "Generate placeholder text with custom length and structure",
    icon: "📝",
  },
  {
    id: "text-3",
    name: "Letter Counter",
    description: "Count letters, words, and sentences in your text",
    icon: "🔢",
  },
  {
    id: "text-4",
    name: "Text to Handwriting Converter",
    description: "Convert your text to handwriting style",
    icon: "✍️",
  },
  {
    id: "text-5",
    name: "Bionic Reading Converter",
    description: "Convert your text to bionic reading format",
    icon: "👁️",
  },
  {
    id: "text-6",
    name: "Multiple Whitespace Remover",
    description: "Remove multiple whitespaces and clean up your text",
    icon: "🔧",
  },
  {
    id: "text-7",
    name: "Google Fonts Pair Finder",
    description: "Find perfect font pairings for your design projects",
    icon: "👥",
  },
];

export const imageTools = [
  {
    id: "image-1",
    name: "Image Dropper",
    description: "Drag and drop images to download them",
    icon: "🖼️",
  },
  {
    id: "image-2",
    name: "Image Filters",
    description:
      "Apply different filters to images and change color balance and saturation",
    icon: "🎭",
  },
  {
    id: "image-3",
    name: "Image Resizer",
    description: "Resize your images to any custom width and height",
    icon: "📏",
  },
  {
    id: "image-4",
    name: "Image Average Color Finder",
    description: "Extract the average color of an image",
    icon: "🎨",
  },
  {
    id: "image-5",
    name: "Image Color Extractor",
    description: "Extract accent colors from an image",
    icon: "🔍",
  },
  {
    id: "image-6",
    name: "Image Color Picker",
    description: "Pick any color from an image",
    icon: "🎯",
  },
  {
    id: "image-7",
    name: "SVG Blob Generator",
    description: "Generate unique SVG blobs for your designs",
    icon: "🌊",
  },
  {
    id: "image-8",
    name: "SVG Pattern Generator",
    description: "Create beautiful SVG patterns",
    icon: "🔶",
  },
  {
    id: "image-9",
    name: "Photo Censor",
    description: "Censor photos by adding blur or removing backgrounds",
    icon: "🔒",
  },
  {
    id: "image-10",
    name: "Cookie Disclaimer",
    description: "Add cookie disclaimer to your photos",
    icon: "🍪",
  },
];

export const categories = [
  {
    name: "Text Tools",
    slug: "text",
    count: textTools.length,
    color: "bg-blue-500",
    image:
      "https://images.unsplash.com/photo-1597392580448-c66fed635816?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHwyfHx0ZXh0JTIwdG9vbHN8ZW58MHx8fGJsdWV8MTc1MDc2NzY5MHww&ixlib=rb-4.1.0&q=85",
  },
  {
    name: "Image Tools",
    slug: "image",
    count: imageTools.length,
    color: "bg-purple-500",
    image:
      "https://images.pexels.com/photos/10988021/pexels-photo-10988021.jpeg",
  },
  {
    name: "CSS Tools",
    slug: "css",
    count: 8,
    color: "bg-green-500",
    image:
      "https://images.unsplash.com/photo-1591439657848-9f4b9ce436b9?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDN8MHwxfHNlYXJjaHwyfHxjb2RpbmclMjB0b29sc3xlbnwwfHx8Ymx1ZXwxNzUwNzY3NzAzfDA&ixlib=rb-4.1.0&q=85",
  },
  {
    name: "Coding Tools",
    slug: "coding",
    count: 6,
    color: "bg-yellow-500",
    image:
      "https://images.unsplash.com/photo-1712064136254-a86090d1110f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDN8MHwxfHNlYXJjaHwzfHxjb2RpbmclMjB0b29sc3xlbnwwfHx8Ymx1ZXwxNzUwNzY3NzAzfDA&ixlib=rb-4.1.0&q=85",
  },
  {
    name: "Color Tools",
    slug: "color",
    count: 5,
    color: "bg-red-500",
    image:
      "https://images.unsplash.com/photo-1588829608152-e7accc3c7eef?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDF8MHwxfHNlYXJjaHwxfHxjb2xvciUyMHBhbGV0dGV8ZW58MHx8fGJsdWV8MTc1MDc2NzcwOXww&ixlib=rb-4.1.0&q=85",
  },
  {
    name: "Social Media Tools",
    slug: "social-media",
    count: 4,
    color: "bg-pink-500",
    image:
      "https://images.unsplash.com/photo-1662070479020-73f77887c87c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2Mzl8MHwxfHNlYXJjaHwyfHxzb2NpYWwlMjBtZWRpYSUyMHRvb2xzfGVufDB8fHxibHVlfDE3NTA3Njc3MTd8MA&ixlib=rb-4.1.0&q=85",
  },
  {
    name: "Miscellaneous Tools",
    count: 3,
    color: "bg-indigo-500",
    image:
      "https://images.pexels.com/photos/16053029/pexels-photo-16053029.jpeg",
  },
];

export const allTools = [
  {
    name: "Text Case Converter",
    slug: "text-case-converter",
    category: "Text",
    image: "🔠",
    description: "Convert text to uppercase, lowercase, or sentence case.",
  },
  {
    name: "Lorem Ipsum Generator",
    slug: "lorem-ipsum-generator",
    category: "Text",
    image: "🔠",
    description: "Generates random lorem ipsum text.",
  },
  {
    name: "Text Counter",
    slug: "text-counter",
    category: "Text",
    image: "🔢",
    description: "Count characters, words and sentences in your text.",
  },
  {
    name: "Multiple White Spacec Remover",
    slug: "multiple-whitespace-remover",
    category: "Text",
    image: "✂️",
    description: "Removes Multiple Spaces from textr.",
  },
  {
    name: "Text Diff Checker",
    slug: "text-diff-checker",
    category: "Text",
    image: "🔍",
    description: "Compare two texts and highlight differences.",
  },
  {
    name: "Base64 Encoder",
    slug: "base64-encoder",
    category: "Developer",
    image: "🧬",
    description: "Encode text or files in Base64 format.",
  },
  {
    name: "Currency Converter",
    slug: "currency-converter",
    category: "finance",
    image: "💸",
    description: "Currency Converter.",
  },
  {
    name: "QR Code Generator",
    slug: "qr-code-generator",
    category: "Utility",
    image: "🔳",
    description: "Create QR codes from text or URLs.",
  },
  {
    name: "Unit Converter",
    slug: "unit-converter",
    category: "Utility",
    image: "📏",
    description: "Convert units like length, weight, and temperature.",
  },
  {
    name: "JSON Validator",
    slug: "json-validator",
    category: "Developer",
    image: "✅",
    description: "Check if your JSON is valid and formatted.",
  },
  {
    name: "Password Generator",
    slug: "password-generator",
    category: "Utility",
    image: "🔐",
    description: "Generate strong and secure passwords.",
  },
  {
    name: "URL Encoder/Decoder",
    slug: "url-encoder-decoder",
    category: "Developer",
    image: "🌐",
    description: "Encode or decode URLs for web usage.",
  },
  {
    name: "Timestamp Converter",
    slug: "timestamp-converter",
    category: "Utility",
    image: "⏱️",
    description: "Convert Unix timestamps to readable dates.",
  },
  {
    name: "Gradient Generator",
    slug: "gradient-generator",
    category: "Color",
    image: "🌈",
    description: "Create CSS gradients with custom colors.",
  },
  {
    name: "Color Picker",
    slug: "color-picker",
    category: "Color",
    image: "🎨",
    description: "Select and pick the color code.",
  },

];


export const loremWordPool = `
Lorem ipsum odor amet, consectetuer adipiscing elit. Nunc sem velit facilisi nam platea consectetur.
Congue placerat sapien gravida nisl aliquet. Himenaeos tempus hac pellentesque orci augue, gravida auctor at.
Sapien aptent tempus malesuada viverra commodo fringilla conubia leo lorem.
Nostra fringilla taciti inceptos inceptos mattis integer ex auctor.
Dolor neque adipiscing in metus potenti egestas odio pellentesque elementum.
Aprimis donec platea diam augue. Auctor torquent tortor vel augue suscipit litora.
`.split(/\s+/).filter(Boolean);
