'use client';

export default function EmptyState({ 
  icon: Icon,
  title,
  description,
  action,
  className = "" 
}) {
  return (
    <div className={`col-span-full flex flex-col items-center justify-center py-12 px-4 ${className}`}>
      {Icon && (
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <Icon className="w-8 h-8 text-gray-400" />
        </div>
      )}
      
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        {title}
      </h3>
      
      {description && (
        <p className="text-gray-600 text-center text-base md:text-lg mb-6 max-w-sm">
          {description}
        </p>
      )}
      
      {action && (
        <div>
          {action}
        </div>
      )}
    </div>
  );
}
