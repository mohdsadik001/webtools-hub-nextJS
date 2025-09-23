'use client';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

export default function StatusMessage({ 
  type = 'error', // 'error' | 'success' | 'info' | 'warning'
  message, 
  className = "" 
}) {
  if (!message) return null;

  const variants = {
    error: {
      container: 'bg-red-50 border-red-200 text-red-700',
      icon: AlertCircle,
      iconColor: 'text-red-500'
    },
    success: {
      container: 'bg-green-50 border-green-200 text-green-700',
      icon: CheckCircle2,
      iconColor: 'text-green-500'
    },
    info: {
      container: 'bg-blue-50 border-blue-200 text-blue-700',
      icon: AlertCircle,
      iconColor: 'text-blue-500'
    },
    warning: {
      container: 'bg-yellow-50 border-yellow-200 text-yellow-700',
      icon: AlertCircle,
      iconColor: 'text-yellow-500'
    }
  };

  const { container, icon: Icon, iconColor } = variants[type];

  return (
    <div 
      className={`mb-6 p-4 border rounded-lg flex items-start gap-3 ${container} ${className}`}
      role="alert"
      aria-describedby={`${type}-message`}
    >
      <Icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${iconColor}`} aria-hidden="true" />
      <div>
        <p id={`${type}-message`} className="text-sm font-medium">
          {message}
        </p>
      </div>
    </div>
  );
}
