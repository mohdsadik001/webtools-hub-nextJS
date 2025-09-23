import { useState } from 'react';
import Notification from '../../components/ui/Notification';
import Button from '../../components/ui/buttons/Button';

export default {
  title: 'UI/Notification',
  component: Notification,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Notification component for displaying success, error, warning, and info messages.',
      },
    },
  },
  argTypes: {
    message: {
      control: 'text',
    },
    type: {
      control: 'select',
      options: ['success', 'error', 'warning', 'info'],
    },
    isVisible: {
      control: 'boolean',
    },
  },
};

export const Success = {
  args: {
    message: 'Operation completed successfully!',
    type: 'success',
    isVisible: true,
  },
};

export const Error = {
  args: {
    message: 'An error occurred. Please try again.',
    type: 'error',
    isVisible: true,
  },
};

export const Warning = {
  args: {
    message: 'This action cannot be undone.',
    type: 'warning',
    isVisible: true,
  },
};

export const Info = {
  args: {
    message: 'Your password will expire in 7 days.',
    type: 'info',
    isVisible: true,
  },
};

export const AllTypes = {
  render: () => (
    <div className="space-y-4 w-80">
      <Notification
        message="JSON validation completed successfully!"
        type="success"
        isVisible={true}
      />
      <Notification
        message="Invalid JSON syntax detected"
        type="error"
        isVisible={true}
      />
      <Notification
        message="Password strength is weak"
        type="warning"
        isVisible={true}
      />
      <Notification
        message="Password copied to clipboard"
        type="info"
        isVisible={true}
      />
    </div>
  ),
};

export const ToolNotifications = {
  render: function ToolNotifications() {
    const [notifications, setNotifications] = useState([]);

    const addNotification = (message, type) => {
      const id = Date.now();
      setNotifications(prev => [...prev, { id, message, type, isVisible: true }]);
      
      // Auto remove after 3 seconds
      setTimeout(() => {
        setNotifications(prev => prev.map(n => n.id === id ? { ...n, isVisible: false } : n));
        setTimeout(() => {
          setNotifications(prev => prev.filter(n => n.id !== id));
        }, 300);
      }, 3000);
    };

    return (
      <div className="w-96">
        <div className="mb-6 space-y-2">
          <h3 className="text-lg font-semibold text-gray-800">Tool Notification Examples</h3>
          <div className="flex flex-wrap gap-2">
            <Button 
              size="sm" 
              onClick={() => addNotification('JSON copied to clipboard!', 'success')}
            >
              JSON Copy Success
            </Button>
            <Button 
              size="sm" 
              variant="danger"
              onClick={() => addNotification('Invalid JSON format', 'error')}
            >
              JSON Error
            </Button>
            <Button 
              size="sm" 
              variant="secondary"
              onClick={() => addNotification('Password generated', 'info')}
            >
              Password Info
            </Button>
            <Button 
              size="sm" 
              onClick={() => addNotification('Weak password detected', 'warning')}
            >
              Password Warning
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          {notifications.map(notification => (
            <Notification
              key={notification.id}
              message={notification.message}
              type={notification.type}
              isVisible={notification.isVisible}
            />
          ))}
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive example showing notifications as used in your tools.',
      },
    },
  },
};
