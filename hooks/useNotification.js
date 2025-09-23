import { useState, useRef, useEffect } from 'react';

export function useNotification(timeout = 3000) {
  const [notification, setNotification] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [notificationType, setNotificationType] = useState('success');
  const notificationTimeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      if (notificationTimeoutRef.current) {
        clearTimeout(notificationTimeoutRef.current);
      }
    };
  }, []);

  const showNotification = (message, type = 'success') => {
    setNotification(message);
    setNotificationType(type);
    setIsVisible(true);
    
    if (notificationTimeoutRef.current) {
      clearTimeout(notificationTimeoutRef.current);
    }
    
    notificationTimeoutRef.current = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => setNotification(''), 300);
    }, timeout);
  };

  const hideNotification = () => {
    setIsVisible(false);
    setTimeout(() => setNotification(''), 300);
  };

  // Notification component to render
  const NotificationComponent = () => {
    if (!isVisible || !notification) return null;

    const getNotificationStyles = () => {
      const baseStyles = 'fixed top-4 right-4 px-4 py-3 rounded-lg shadow-lg z-50 max-w-sm transition-all duration-300';
      const typeStyles = {
        success: 'bg-green-600 text-white',
        error: 'bg-red-600 text-white',
        info: 'bg-blue-600 text-white',
        warning: 'bg-yellow-600 text-white',
      };
      
      return `${baseStyles} ${typeStyles[notificationType]} ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
      }`;
    };

    const getIcon = () => {
      switch (notificationType) {
        case 'success':
          return (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          );
        case 'error':
          return (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          );
        case 'info':
          return (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          );
        case 'warning':
          return (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          );
        default:
          return null;
      }
    };

    return (
      <>
        {/* Screen Reader Announcement */}
        <div aria-live="polite" aria-atomic="true" className="sr-only" role="status">
          {notification}
        </div>

        {/* Visual Notification */}
        <div 
          className={getNotificationStyles()}
          role="alert"
          aria-live="off" // Handled by sr-only div above
        >
          <div className="flex items-center gap-2">
            <svg 
              className="w-5 h-5 flex-shrink-0" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              aria-hidden="true"
            >
              {getIcon()}
            </svg>
            <span className="text-sm font-medium">{notification}</span>
            
            {/* Close button */}
            <button
              onClick={hideNotification}
              className="ml-auto text-white hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent rounded p-1"
              aria-label="Close notification"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </>
    );
  };

  return {
    notification,
    isVisible,
    notificationType,
    showNotification,
    hideNotification,
    NotificationComponent
  };
}
