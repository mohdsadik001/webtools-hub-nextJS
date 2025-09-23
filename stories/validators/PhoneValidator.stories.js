import PhoneValidator from '@/components/Validators/PhoneValidator';

export default {
  title: 'DataValidators/PhoneValidator',
  component: PhoneValidator,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Phone number validator supporting multiple countries with format validation.',
      },
    },
  },
};

export const Default = {
  parameters: {
    docs: {
      description: {
        story: 'Default phone validator with country selection.',
      },
    },
  },
};

export const IndianPhoneDemo = {
  render: () => <PhoneValidator />,
  play: async ({ canvasElement }) => {
    // Select India country
    const countrySelect = canvasElement.querySelector('select');
    if (countrySelect) {
      countrySelect.value = 'india';
      countrySelect.dispatchEvent(new Event('change', { bubbles: true }));
    }
    
    // Enter valid Indian phone number
    const input = canvasElement.querySelector('input[type="tel"]');
    if (input) {
      input.value = '9876543210';
      input.dispatchEvent(new Event('input', { bubbles: true }));
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Phone validator demonstrating Indian phone number validation.',
      },
    },
  },
};

export const USPhoneDemo = {
  render: () => <PhoneValidator />,
  play: async ({ canvasElement }) => {
    // Select USA country
    const countrySelect = canvasElement.querySelector('select');
    if (countrySelect) {
      countrySelect.value = 'usa';
      countrySelect.dispatchEvent(new Event('change', { bubbles: true }));
    }
    
    // Enter valid US phone number
    const input = canvasElement.querySelector('input[type="tel"]');
    if (input) {
      input.value = '+1 (555) 123-4567';
      input.dispatchEvent(new Event('input', { bubbles: true }));
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Phone validator demonstrating US phone number validation.',
      },
    },
  },
};
