'use client';

export default function AuthHeader({ 
  icon: Icon, 
  title, 
  subtitle, 
  className = "" 
}) {
  return (
    <div className={`text-center mb-8 ${className}`}>
      <div className="mx-auto w-16 h-16 bg-gradient-to-r from-primary to-primary-dull rounded-full flex items-center justify-center mb-4">
        <Icon className="w-8 h-8 text-white" aria-hidden="true" />
      </div>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        {title}
      </h1>
      <p className="text-gray-600">
        {subtitle}
      </p>
    </div>
  );
}
