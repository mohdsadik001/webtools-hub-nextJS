// import { useState } from 'react';
// import Input from '../../../components/ui/Input';

// export default {
//   title: 'UI/Forms/Input',
//   tags: ['autodocs'],
//   component: Input,
//   parameters: {
//     layout: 'centered',
//   },
//   argTypes: {
//     type: {
//       control: 'select',
//       options: ['text', 'email', 'password', 'number', 'tel', 'url', 'search'],
//     },
//     placeholder: {
//       control: 'text',
//     },
//     disabled: {
//       control: 'boolean',
//     },
//     error: {
//       control: 'boolean',
//     },
//     ariaLabel: {
//       control: 'text',
//     },
//     onChange: { action: 'changed' },
//   },
// };

// export const Default = {
//   args: {
//     placeholder: 'Enter text...',
//   },
// };

// export const InputTypes = {
//   render: () => (
//     <div className="space-y-4 w-80">
//       <div>
//         <label className="block text-sm font-medium mb-1">Text Input</label>
//         <Input type="text" placeholder="Enter text..." />
//       </div>
//       <div>
//         <label className="block text-sm font-medium mb-1">Email Input</label>
//         <Input type="email" placeholder="user@example.com" />
//       </div>
//       <div>
//         <label className="block text-sm font-medium mb-1">Password Input</label>
//         <Input type="password" placeholder="••••••••" />
//       </div>
//       <div>
//         <label className="block text-sm font-medium mb-1">Number Input</label>
//         <Input type="number" placeholder="123" />
//       </div>
//       <div>
//         <label className="block text-sm font-medium mb-1">Phone Input</label>
//         <Input type="tel" placeholder="+1 (555) 123-4567" />
//       </div>
//       <div>
//         <label className="block text-sm font-medium mb-1">URL Input</label>
//         <Input type="url" placeholder="https://example.com" />
//       </div>
//       <div>
//         <label className="block text-sm font-medium mb-1">Search Input</label>
//         <Input type="search" placeholder="Search..." />
//       </div>
//     </div>
//   ),
// };

// export const States = {
//   render: () => (
//     <div className="space-y-4 w-80">
//       <div>
//         <label className="block text-sm font-medium mb-1">Normal State</label>
//         <Input placeholder="Normal input" />
//       </div>
//       <div>
//         <label className="block text-sm font-medium mb-1">Disabled State</label>
//         <Input disabled placeholder="Disabled input" />
//       </div>
//       <div>
//         <label className="block text-sm font-medium mb-1">Error State</label>
//         <Input error placeholder="Error input" />
//         <p className="text-red-600 text-sm mt-1">This field is required</p>
//       </div>
//       <div>
//         <label className="block text-sm font-medium mb-1">With Value</label>
//         <Input defaultValue="Filled input" />
//       </div>
//     </div>
//   ),
// };

// export const ValidatorExamples = {
//   render: function ValidatorExamples() {
//     const [email, setEmail] = useState('');
//     const [phone, setPhone] = useState('');
//     const [pan, setPan] = useState('');
    
//     const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
//     const phoneValid = /^[6-9]\d{9}$/.test(phone.replace(/\D/g, ''));
//     const panValid = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(pan);
    
//     return (
//       <div className="space-y-6 w-96 p-4 bg-gray-50 rounded-lg">
//         <h3 className="text-lg font-semibold">Validator Tool Examples</h3>
        
//         <div>
//           <label className="block text-sm font-medium mb-1">Email Validator</label>
//           <Input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             placeholder="user@example.com"
//             error={email && !emailValid}
//             className={email && emailValid ? 'border-green-500' : ''}
//           />
//           {email && (
//             <p className={`text-sm mt-1 ${emailValid ? 'text-green-600' : 'text-red-600'}`}>
//               {emailValid ? 'Valid email' : 'Invalid email format'}
//             </p>
//           )}
//         </div>
        
//         <div>
//           <label className="block text-sm font-medium mb-1">Phone Validator</label>
//           <Input
//             type="tel"
//             value={phone}
//             onChange={(e) => setPhone(e.target.value)}
//             placeholder="9876543210"
//             error={phone && !phoneValid}
//             className={phone && phoneValid ? 'border-green-500' : ''}
//           />
//           {phone && (
//             <p className={`text-sm mt-1 ${phoneValid ? 'text-green-600' : 'text-red-600'}`}>
//               {phoneValid ? 'Valid Indian phone number' : 'Invalid phone number'}
//             </p>
//           )}
//         </div>
        
//         <div>
//           <label className="block text-sm font-medium mb-1">PAN Card Validator</label>
//           <Input
//             type="text"
//             value={pan}
//             onChange={(e) => setPan(e.target.value.toUpperCase().slice(0, 10))}
//             placeholder="ABCDE1234F"
//             error={pan && !panValid}
//             className={`font-mono tracking-wider ${pan && panValid ? 'border-green-500' : ''}`}
//           />
//           {pan && (
//             <p className={`text-sm mt-1 ${panValid ? 'text-green-600' : 'text-red-600'}`}>
//               {panValid ? 'Valid PAN format' : 'Invalid PAN format'}
//             </p>
//           )}
//         </div>
//       </div>
//     );
//   },
//   parameters: {
//     docs: {
//       description: {
//         story: 'Examples showing how inputs are used in your validator tools with real-time validation.',
//       },
//     },
//   },
// };

// export const ControlledInput = {
//   render: function ControlledExample() {
//     const [value, setValue] = useState('');
    
//     return (
//       <div className="w-80">
//         <label className="block text-sm font-medium mb-1">Controlled Input</label>
//         <Input 
//           value={value}
//           onChange={(e) => setValue(e.target.value)}
//           placeholder="Type something..."
//         />
//         <p className="text-sm text-gray-600 mt-2">
//           Current value: <code>{value || '(empty)'}</code>
//         </p>
//         <p className="text-sm text-gray-500 mt-1">
//           Character count: {value.length}
//         </p>
//       </div>
//     );
//   },
// };

// export const Interactive = {
//   args: {
//     placeholder: 'Type here...',
//     type: 'text',
//     error: false,
//     disabled: false,
//   },
// };



// stories/ui/Input.stories.js
import { useState } from 'react';
import Input from '@/components/ui/Input';
import { Mail, User, Lock, Search, Phone, DollarSign, Calendar, MapPin, Eye, Settings } from 'lucide-react';

export default {
  title: 'UI/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Universal Input Component

A comprehensive input component that handles all input types and variations with consistent styling and behavior.

## Features
- ✅ Multiple variants (default, filled, outlined, minimal)
- ✅ Size options (xs, sm, md, lg, xl)
- ✅ State management (error, success, loading)
- ✅ Icon support (left/right icons)
- ✅ Addon support (text prefixes/suffixes)
- ✅ Password toggle functionality
- ✅ Label and helper text
- ✅ Full accessibility support
- ✅ Form integration ready

## Usage Guidelines
- Use \`default\` variant for standard forms
- Use \`filled\` for modern, card-based layouts
- Use \`outlined\` for emphasis and distinction
- Use \`minimal\` for clean, minimal designs
- Always provide labels for accessibility
- Use helper text for guidance and validation feedback
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'filled', 'outlined', 'minimal'],
      description: 'Visual style variant',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'default' },
        category: 'Appearance',
      },
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Input size',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'md' },
        category: 'Appearance',
      },
    },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'tel', 'url', 'search'],
      description: 'Input type',
      table: {
        category: 'Form',
      },
    },
    label: {
      control: 'text',
      description: 'Input label',
      table: {
        category: 'Content',
      },
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
      table: {
        category: 'Content',
      },
    },
    helperText: {
      control: 'text',
      description: 'Helper text below input',
      table: {
        category: 'Content',
      },
    },
    errorText: {
      control: 'text',
      description: 'Error message',
      table: {
        category: 'Validation',
      },
    },
    successText: {
      control: 'text',
      description: 'Success message',
      table: {
        category: 'Validation',
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the input',
      table: {
        category: 'State',
      },
    },
    required: {
      control: 'boolean',
      description: 'Mark as required field',
      table: {
        category: 'Form',
      },
    },
    showPasswordToggle: {
      control: 'boolean',
      description: 'Show password visibility toggle (password type only)',
      table: {
        category: 'Password',
      },
    },
  },
  args: {
    placeholder: 'Enter text...',
  },
};

// Basic variants
export const Default = {
  args: {
    label: 'Default Input',
    placeholder: 'Enter text...',
  },
};

export const Variants = {
  render: () => (
    <div className="space-y-6 w-80">
      <Input
        variant="default"
        label="Default Variant"
        placeholder="Default styling..."
      />
      <Input
        variant="filled"
        label="Filled Variant"
        placeholder="Filled background..."
      />
      <Input
        variant="outlined"
        label="Outlined Variant"
        placeholder="Outlined border..."
      />
      <Input
        variant="minimal"
        label="Minimal Variant"
        placeholder="Minimal underline..."
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different visual styles for various design contexts.',
      },
    },
  },
};

export const Sizes = {
  render: () => (
    <div className="space-y-4 w-80">
      <Input size="xs" placeholder="Extra small (xs)" />
      <Input size="sm" placeholder="Small (sm)" />
      <Input size="md" placeholder="Medium (md) - default" />
      <Input size="lg" placeholder="Large (lg)" />
      <Input size="xl" placeholder="Extra large (xl)" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Available sizes from extra small to extra large.',
      },
    },
  },
};

export const WithIcons = {
  render: () => (
    <div className="space-y-4 w-80">
      <Input
        label="Email Address"
        type="email"
        placeholder="user@example.com"
        leftIcon={Mail}
      />
      <Input
        label="Full Name"
        placeholder="John Doe"
        leftIcon={User}
      />
      <Input
        label="Phone Number"
        type="tel"
        placeholder="(555) 123-4567"
        leftIcon={Phone}
      />
      <Input
        label="Search"
        type="search"
        placeholder="Search..."
        leftIcon={Search}
        rightIcon={Settings}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Icons can be placed on the left or right side of the input.',
      },
    },
  },
};

export const WithAddons = {
  render: () => (
    <div className="space-y-4 w-80">
      <Input
        label="Price"
        type="number"
        placeholder="0.00"
        leftAddon="$"
        rightAddon="USD"
      />
      <Input
        label="Website URL"
        type="url"
        placeholder="mysite"
        leftAddon="https://"
        rightAddon=".com"
      />
      <Input
        label="Discount Code"
        placeholder="Enter code"
        rightAddon="Apply"
      />
      <Input
        label="Phone"
        type="tel"
        placeholder="123-456-7890"
        leftAddon="+1"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Text addons can be used as prefixes or suffixes.',
      },
    },
  },
};

export const PasswordInput = {
  render: () => (
    <div className="space-y-4 w-80">
      <Input
        label="Password"
        type="password"
        placeholder="••••••••••••"
        showPasswordToggle
        leftIcon={Lock}
        helperText="Must be at least 8 characters"
      />
      <Input
        label="Confirm Password"
        type="password"
        placeholder="••••••••••••"
        showPasswordToggle
        leftIcon={Lock}
        successText="Passwords match!"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Password inputs with visibility toggle functionality.',
      },
    },
  },
};

export const ValidationStates = {
  render: () => (
    <div className="space-y-4 w-80">
      <Input
        label="Normal State"
        placeholder="Normal input"
        helperText="This is helper text"
      />
      <Input
        label="Success State"
        placeholder="Valid input"
        successText="Great! This looks good."
      />
      <Input
        label="Error State"
        placeholder="Invalid input"
        errorText="This field is required"
      />
      <Input
        label="Disabled State"
        placeholder="Disabled input"
        disabled
        helperText="This field is disabled"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different validation and interaction states.',
      },
    },
  },
};

export const FormFields = {
  render: () => (
    <div className="space-y-4 w-80">
      <Input
        label="Full Name"
        placeholder="John Doe"
        required
        leftIcon={User}
      />
      <Input
        label="Email Address"
        type="email"
        placeholder="user@example.com"
        required
        leftIcon={Mail}
        helperText="We'll never share your email"
      />
      <Input
        label="Phone Number"
        type="tel"
        placeholder="(555) 123-4567"
        leftIcon={Phone}
        helperText="Optional - for account recovery"
      />
      <Input
        label="Date of Birth"
        type="date"
        leftIcon={Calendar}
      />
      <Input
        label="Location"
        placeholder="City, State"
        leftIcon={MapPin}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Complete form fields with labels, icons, and helper text.',
      },
    },
  },
};

export const InteractiveValidation = {
  render: function InteractiveValidation() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValid = emailRegex.test(email);
    const isPasswordStrong = password.length >= 8 && /[A-Z]/.test(password) && /[0-9]/.test(password);
    const passwordsMatch = password === confirmPassword && password.length > 0;

    return (
      <div className="space-y-4 w-80">
        <Input
          label="Email Address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="user@example.com"
          leftIcon={Mail}
          errorText={email && !isEmailValid ? "Please enter a valid email" : ""}
          successText={email && isEmailValid ? "Valid email address!" : ""}
          required
        />
        
        <Input
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••••••"
          leftIcon={Lock}
          showPasswordToggle
          errorText={password && !isPasswordStrong ? "Password must be 8+ chars with uppercase and number" : ""}
          successText={password && isPasswordStrong ? "Strong password!" : ""}
          required
        />
        
        <Input
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="••••••••••••"
          leftIcon={Lock}
          showPasswordToggle
          errorText={confirmPassword && !passwordsMatch ? "Passwords don't match" : ""}
          successText={confirmPassword && passwordsMatch ? "Passwords match!" : ""}
          required
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Real-time validation example showing interactive feedback.',
      },
    },
  },
};

export const ToolUsageExamples = {
  render: function ToolExamples() {
    const [jsonInput, setJsonInput] = useState('{"name": "test"}');
    const [phoneInput, setPhoneInput] = useState('');
    const [emailInput, setEmailInput] = useState('');
    
    // Simple validation
    const isValidJson = (str) => {
      try { JSON.parse(str); return true; } catch { return false; }
    };
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput);
    const isValidPhone = /^[6-9]\d{9}$/.test(phoneInput.replace(/\D/g, ''));

    return (
      <div className="space-y-6 max-w-2xl">
        <h3 className="text-lg font-semibold">WebTools Hub Tool Examples</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium mb-3 text-gray-700">JSON Validator Tool</h4>
            <Input
              label="JSON Input"
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              placeholder='{"key": "value"}'
              variant="filled"
              errorText={!isValidJson(jsonInput) ? "Invalid JSON syntax" : ""}
              successText={isValidJson(jsonInput) ? "Valid JSON!" : ""}
              helperText="Enter JSON to validate"
            />
          </div>
          
          <div>
            <h4 className="font-medium mb-3 text-gray-700">Email Validator Tool</h4>
            <Input
              label="Email Address"
              type="email"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              placeholder="user@example.com"
              leftIcon={Mail}
              variant="outlined"
              errorText={emailInput && !isValidEmail ? "Invalid email format" : ""}
              successText={emailInput && isValidEmail ? "Valid email!" : ""}
            />
          </div>
          
          <div>
            <h4 className="font-medium mb-3 text-gray-700">Phone Validator Tool</h4>
            <Input
              label="Indian Phone Number"
              type="tel"
              value={phoneInput}
              onChange={(e) => setPhoneInput(e.target.value)}
              placeholder="9876543210"
              leftIcon={Phone}
              rightAddon="+91"
              errorText={phoneInput && !isValidPhone ? "Invalid phone number" : ""}
              successText={phoneInput && isValidPhone ? "Valid phone!" : ""}
            />
          </div>
          
          <div>
            <h4 className="font-medium mb-3 text-gray-700">Currency Converter Tool</h4>
            <Input
              label="Amount"
              type="number"
              placeholder="100"
              leftAddon="$"
              rightAddon="USD"
              variant="minimal"
              helperText="Enter amount to convert"
            />
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Real-world examples showing how the Input component is used in WebTools Hub applications.',
      },
    },
  },
};

// Interactive playground
export const Playground = {
  args: {
    label: 'Interactive Input',
    placeholder: 'Try different props...',
    helperText: 'Use the controls below to customize',
    variant: 'default',
    size: 'md',
    type: 'text',
    required: false,
    disabled: false,
    showPasswordToggle: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive playground - use the controls panel below to experiment with different configurations.',
      },
    },
  },
};
