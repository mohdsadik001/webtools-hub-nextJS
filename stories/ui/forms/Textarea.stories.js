// stories/ui/Textarea.stories.js
import { useState } from 'react';
import Textarea from '@/components/ui/Textarea';

export default {
  title: 'UI/Forms/Textarea',
  tags: ['autodocs'],
  component: Textarea,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Textarea component used for multi-line text input in tools like JSON validator and text processors.',
      },
    },
  },
  argTypes: {
    rows: {
      control: { type: 'number', min: 3, max: 15 },
    },
    placeholder: {
      control: 'text',
    },
    disabled: {
      control: 'boolean',
    },
    error: {
      control: 'boolean',
    },
  },
  args: {
    rows: 6,
    placeholder: 'Enter your text here...',
  },
};

export const Default = {};

export const Sizes = {
  render: () => (
    <div className="space-y-4 w-96">
      <div>
        <label className="block text-sm font-medium mb-1 text-gray-700">Small (3 rows)</label>
        <Textarea rows={3} placeholder="Small textarea..." />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1 text-gray-700">Medium (6 rows)</label>
        <Textarea rows={6} placeholder="Medium textarea..." />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1 text-gray-700">Large (10 rows)</label>
        <Textarea rows={10} placeholder="Large textarea..." />
      </div>
    </div>
  ),
};

export const ToolUsageExamples = {
  render: function ToolExamples() {
    const [jsonText, setJsonText] = useState('{\n  "name": "WebTools Hub",\n  "version": "1.0.0"\n}');
    const [caseText, setCaseText] = useState('This is SAMPLE text for CASE conversion testing.');
    
    const isValidJson = (text) => {
      try {
        JSON.parse(text);
        return true;
      } catch {
        return false;
      }
    };

    return (
      <div className="space-y-6 max-w-2xl">
        <h3 className="text-lg font-semibold text-gray-800">Tool Usage Examples</h3>
        
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700">JSON Validator Tool</label>
          <Textarea
            value={jsonText}
            onChange={(e) => setJsonText(e.target.value)}
            rows={6}
            placeholder='{\n  "key": "value"\n}'
            error={!isValidJson(jsonText)}
            className={`font-mono text-sm ${isValidJson(jsonText) ? 'border-green-500' : 'border-red-500'}`}
          />
          <p className={`text-sm mt-1 ${isValidJson(jsonText) ? 'text-green-600' : 'text-red-600'}`}>
            {isValidJson(jsonText) ? '✅ Valid JSON syntax' : '❌ Invalid JSON - check syntax'}
          </p>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700">Text Case Converter Tool</label>
          <Textarea
            value={caseText}
            onChange={(e) => setCaseText(e.target.value)}
            rows={4}
            placeholder="Enter text to convert case..."
            className="resize-none"
          />
          <div className="flex flex-wrap gap-2 mt-2">
            <button 
              onClick={() => setCaseText(caseText.toUpperCase())}
              className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              UPPERCASE
            </button>
            <button 
              onClick={() => setCaseText(caseText.toLowerCase())}
              className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              lowercase
            </button>
            <button 
              onClick={() => setCaseText(caseText.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' '))}
              className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              Title Case
            </button>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Examples showing how textareas are used in your actual WebTools Hub tools.',
      },
    },
  },
};

export const States = {
  render: () => (
    <div className="space-y-4 w-96">
      <div>
        <label className="block text-sm font-medium mb-1 text-gray-700">Normal</label>
        <Textarea placeholder="Normal state" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1 text-gray-700">Error</label>
        <Textarea error placeholder="Error state" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1 text-gray-700">Disabled</label>
        <Textarea disabled placeholder="Disabled state" />
      </div>
    </div>
  ),
};
