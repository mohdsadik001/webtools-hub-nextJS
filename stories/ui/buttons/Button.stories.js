import Button from '../../../components/ui/buttons/Button';
import { 
  Play, 
  Download, 
  Trash2, 
  Copy, 
  Save, 
  Edit, 
  Plus, 
  Minus,
  Check,
  X,
  ArrowRight,
  Search,
  Heart,
  Star,
  Settings
} from 'lucide-react';

export default {
  title: 'UI/Buttons/Button',
  tags: ['autodocs'],
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Main button component used throughout WebTools Hub with Tailwind styling and custom CSS variables.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'danger', 'success', 'muted', 'outline'],
      description: 'Button style variant',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'primary' },
      },
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Button size',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'md' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the button',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    children: {
      control: 'text',
      description: 'Button text content',
    },
    ariaLabel: {
      control: 'text',
      description: 'Accessibility label for screen readers',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
    onClick: { action: 'clicked' },
  },
  args: {
    children: 'Button',
  },
};

// Basic variants
export const Primary = {
  args: {
    children: 'Primary Button',
    variant: 'primary',
  },
};

export const Secondary = {
  args: {
    children: 'Secondary Button',
    variant: 'secondary',
  },
};

export const Danger = {
  args: {
    children: 'Delete Item',
    variant: 'danger',
  },
};

export const Success = {
  args: {
    children: 'Save Changes',
    variant: 'success',
  },
};

export const Muted = {
  args: {
    children: 'Muted Button',
    variant: 'muted',
  },
};

export const Outline = {
  args: {
    children: 'Outline Button',
    variant: 'outline',
  },
};

// All variants showcase
export const AllVariants = {
  render: () => (
    <div className="flex flex-wrap gap-4 p-4">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="danger">Danger</Button>
      <Button variant="success">Success</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="muted">Muted</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All available button variants with your custom Tailwind styling.',
      },
    },
  },
};

// Size variations
export const AllSizes = {
  render: () => (
    <div className="flex flex-col gap-4 items-start p-4">
      <Button size="xs">Extra Small</Button>
      <Button size="sm">Small</Button>
      <Button size="md">Medium (Default)</Button>
      <Button size="lg">Large</Button>
      <Button size="xl">Extra Large</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All available button sizes from xs to xl.',
      },
    },
  },
};

// With icons using your component API
export const WithIcons = {
  render: () => (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4">
      <Button icon={Plus}>Add Item</Button>
      <Button variant="secondary" icon={Edit}>Edit</Button>
      <Button variant="danger" icon={Trash2}>Delete</Button>
      <Button variant="success" icon={Save}>Save</Button>
      <Button variant="outline" icon={Download}>Download</Button>
      <Button variant="outline" icon={Copy}>Copy</Button>
      <Button icon={Search}>Search</Button>
      <Button variant="secondary" icon={Settings}>Settings</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Buttons with icons using the icon prop from your component API.',
      },
    },
  },
};

// Icon only buttons (no text)
export const IconOnly = {
  render: () => (
    <div className="flex gap-3 p-4">
      <Button icon={Play} ariaLabel="Play video" />
      <Button variant="secondary" icon={Edit} ariaLabel="Edit item" />
      <Button variant="danger" icon={Trash2} ariaLabel="Delete item" />
      <Button variant="success" icon={Check} ariaLabel="Confirm action" />
      <Button variant="outline" icon={Heart} ariaLabel="Add to favorites" />
      <Button icon={Star} ariaLabel="Add to favorites" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Icon-only buttons require ariaLabel for accessibility. Notice how icons are properly sized.',
      },
    },
  },
};

// Different icon sizes based on button size
export const IconSizes = {
  render: () => (
    <div className="flex flex-col gap-4 items-start p-4">
      <Button size="xs" icon={Plus}>Extra Small</Button>
      <Button size="sm" icon={Plus}>Small</Button>
      <Button size="md" icon={Plus}>Medium</Button>
      <Button size="lg" icon={Plus}>Large</Button>
      <Button size="xl" icon={Plus}>Extra Large</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Icons automatically scale with button sizes using your iconSizes configuration.',
      },
    },
  },
};

// Disabled states
export const DisabledStates = {
  render: () => (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4">
      <div className="space-y-2">
        <p className="text-sm font-medium text-gray-600">Normal States</p>
        <Button>Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="danger">Danger</Button>
      </div>
      <div className="space-y-2">
        <p className="text-sm font-medium text-gray-600">Disabled States</p>
        <Button disabled>Primary</Button>
        <Button variant="secondary" disabled>Secondary</Button>
        <Button variant="danger" disabled>Danger</Button>
      </div>
      <div className="space-y-2">
        <p className="text-sm font-medium text-gray-600">Muted (Always Disabled)</p>
        <Button variant="muted">Muted Button</Button>
        <Button variant="muted" icon={Settings}>With Icon</Button>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Disabled states show opacity reduction and cursor changes. Muted variant is always disabled.',
      },
    },
  },
};

// Real WebTools Hub usage examples
export const WebToolsUsageExamples = {
  args: {
    variant: "muted"
  },
  render:() => (
    <div className="space-y-8 p-6 bg-gray-50 rounded-lg max-w-4xl">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">WebTools Hub Tool Examples</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* JSON Validator Tool */}
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <h4 className="font-medium text-sm text-gray-600 mb-3">JSON Validator</h4>
          <div className="space-y-2">
            <Button size="sm" className="w-full" icon={Copy}>
              Copy JSON
            </Button>
            <Button variant="success" size="sm" className="w-full" icon={Download}>
              Export JSON
            </Button>
            <Button variant="danger" size="sm" className="w-full" icon={Trash2}>
              Clear All
            </Button>
          </div>
        </div>

        {/* Password Generator */}
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <h4 className="font-medium text-sm text-gray-600 mb-3">Password Generator</h4>
          <div className="space-y-2">
            <Button className="w-full" icon={Play}>
              Generate Password
            </Button>
            <Button variant="secondary" size="sm" className="w-full" icon={Copy}>
              Copy Password
            </Button>
            <Button variant="outline" size="sm" className="w-full" icon={Settings}>
              Settings
            </Button>
          </div>
        </div>


        {/* Text Tools */}
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <h4 className="font-medium text-sm text-gray-600 mb-3">Text Tools</h4>
          <div className="space-y-2">
            <Button variant="outline" size="sm" className="w-full rounded-full hover:bg-primary hover:text-white">
              UPPERCASE
            </Button>
            <Button variant="outline" size="sm" className="w-full rounded-full hover:bg-primary hover:text-white">
              lowercase
            </Button>
            <Button variant="outline" size="sm" className="w-full rounded-full hover:bg-primary hover:text-white">
              Title Case
            </Button>
          </div>
        </div>

        {/* Converter Tools */}
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <h4 className="font-medium text-sm text-gray-600 mb-3">Converters</h4>
          <div className="space-y-2">
            <Button variant="secondary" className="w-full" icon={ArrowRight}>
              Convert
            </Button>
            <Button variant="outline" size="sm" className="w-full">
              🔄 Swap Units
            </Button>
          </div>
        </div>

        {/* Form Actions */}
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <h4 className="font-medium text-sm text-gray-600 mb-3">Form Actions</h4>
          <div className="space-y-2">
            <Button variant="success" className="w-full" icon={Save}>
              Save Changes
            </Button>
            <Button variant="outline" size="sm" className="w-full">
              Cancel
            </Button>
            <Button variant="danger" size="sm" className="w-full" icon={Trash2}>
              Reset Form
            </Button>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters:{
    docs: {
      description: {
        story: 'Real examples of how buttons are used throughout your WebTools Hub application with proper variants and icons.',
      },
    },
  }
};

// Custom className example
export const CustomStyling = {
  render: () => (
    <div className="flex flex-wrap gap-4 p-4">
      <Button className="shadow-lg transform hover:scale-105">
        Enhanced Shadow
      </Button>
      <Button variant="secondary" className="rounded-full px-6">
        Rounded Full
      </Button>
      <Button variant="outline" className="border-dashed border-2">
        Dashed Border
      </Button>
      <Button className="bg-gradient-to-r from-purple-500 to-pink-500 border-0">
        Gradient
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Examples showing how to extend styling with the className prop.',
      },
    },
  },
};

// Interactive playground
export const Interactive = {
  args: {
    children: 'Interactive Button',
    variant: 'primary',
    size: 'md',
    disabled: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive button - try different props in the controls panel below to see your styling in action!',
      },
    },
  },
};

// Focus states demonstration
export const FocusStates = {
  render: () => (
    <div className="space-y-4 p-4">
      <p className="text-sm text-gray-600 mb-4">
        Tab through these buttons to see focus ring styles:
      </p>
      <div className="flex flex-wrap gap-4">
        <Button>Primary Focus</Button>
        <Button variant="secondary">Secondary Focus</Button>
        <Button variant="danger">Danger Focus</Button>
        <Button variant="success">Success Focus</Button>
        <Button variant="outline">Outline Focus</Button>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Focus ring styles for keyboard navigation accessibility. Each variant has proper focus:ring colors.',
      },
    },
  },
};
