// stories/ui/FormField.stories.js
import { useState } from 'react';
import FormField from '@/components/ui/FormField';

export default {
  title: 'UI/Forms/FormField',
  tags: ['autodocs'],
  component: FormField,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Complete form field component with label, input, and error message support.',
      },
    },
  },
};

export const TextFieldExample = {
  render: function TextExample() {
    const [value, setValue] = useState('');
    const [error, setError] = useState('');

    const handleChange = (e) => {
      setValue(e.target.value);
      if (e.target.value.length < 3) {
        setError('Minimum 3 characters required');
      } else {
        setError('');
      }
    };

    return (
      <div className="w-80">
        <FormField
          label="Username"
          name="username"
          value={value}
          onChange={handleChange}
          error={error}
          placeholder="Enter username..."
          required
        />
      </div>
    );
  },
};

export const EmailFieldExample = {
  render: function EmailExample() {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    const handleChange = (e) => {
      setEmail(e.target.value);
      if (e.target.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.target.value)) {
        setError('Please enter a valid email address');
      } else {
        setError('');
      }
    };

    return (
      <div className="w-80">
        <FormField
          label="Email Address"
          name="email"
          type="email"
          value={email}
          onChange={handleChange}
          error={error}
          placeholder="user@example.com"
          required
        />
      </div>
    );
  },
};

export const FormExamples = {
  render: function FormExamples() {
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      phone: '',
      message: ''
    });
    const [errors, setErrors] = useState({});

    const handleChange = (field) => (e) => {
      setFormData(prev => ({ ...prev, [field]: e.target.value }));
      // Clear error when user starts typing
      if (errors[field]) {
        setErrors(prev => ({ ...prev, [field]: '' }));
      }
    };

    const validate = () => {
      const newErrors = {};
      if (!formData.name.trim()) newErrors.name = 'Name is required';
      if (!formData.email.trim()) newErrors.email = 'Email is required';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Invalid email format';
      }
      if (formData.phone && !/^[6-9]\d{9}$/.test(formData.phone.replace(/\D/g, ''))) {
        newErrors.phone = 'Invalid Indian phone number';
      }
      
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };

    return (
      <div className="max-w-lg p-6 bg-white rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Contact Form Example</h3>
        
        <div className="space-y-4">
          <FormField
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={handleChange('name')}
            error={errors.name}
            placeholder="John Doe"
            required
          />

          <FormField
            label="Email Address"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange('email')}
            error={errors.email}
            placeholder="john@example.com"
            required
          />

          <FormField
            label="Phone Number"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange('phone')}
            error={errors.phone}
            placeholder="9876543210"
          />

          <FormField
            label="Message"
            name="message"
            as="textarea"
            rows={4}
            value={formData.message}
            onChange={handleChange('message')}
            error={errors.message}
            placeholder="Your message..."
          />

          <button
            onClick={validate}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
          >
            Validate Form
          </button>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Complete form example showing validation states and error handling.',
      },
    },
  },
};
