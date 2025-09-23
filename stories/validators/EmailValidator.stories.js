import EmailValidator from '@/components/Validators/EmailValidator';

export default {
  title: 'DataValidators/EmailValidator',
  component: EmailValidator,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Email validation tool with real-time validation and detailed feedback.',
      },
    },
  },
};

export const Default = {
  parameters: {
    docs: {
      description: {
        story: 'Default email validator ready for input.',
      },
    },
  },
};

export const ValidEmailDemo = {
  render: () => <EmailValidator />,
  play: async ({ canvasElement }) => {
    const input = canvasElement.querySelector('input[type="email"]');
    if (input) {
      input.value = 'user@webtools-hub.com';
      input.dispatchEvent(new Event('input', { bubbles: true }));
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Email validator showing valid email with success feedback.',
      },
    },
  },
};

export const InvalidEmailDemo = {
  render: () => <EmailValidator />,
  play: async ({ canvasElement }) => {
    const input = canvasElement.querySelector('input[type="email"]');
    if (input) {
      input.value = 'invalid-email@';
      input.dispatchEvent(new Event('input', { bubbles: true }));
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Email validator showing invalid email with error feedback.',
      },
    },
  },
};

export const ValidationExamples = {
  render: () => (
    <div className="max-w-4xl p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Email Validation Examples</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold mb-4 text-green-700">✅ Valid Emails</h3>
          <div className="space-y-2">
            {[
              'user@example.com',
              'test.email@domain.co.uk',
              'user+tag@company.org',
              'firstname.lastname@subdomain.example.com'
            ].map(email => (
              <div key={email} className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <code className="text-green-800 font-mono">{email}</code>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-4 text-red-700">❌ Invalid Emails</h3>
          <div className="space-y-2">
            {[
              'invalid-email',
              '@missing-local.com',
              'missing-at-sign.com',
              'double@@signs.com'
            ].map(email => (
              <div key={email} className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <code className="text-red-800 font-mono">{email}</code>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Reference examples of valid and invalid email formats.',
      },
    },
  },
};
