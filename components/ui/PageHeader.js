'use client';

export default function PageHeader({ 
  title, 
  subtitle,
  showUnderline = true,
  alignment = 'left', // 'left' | 'center' | 'right'
  className = "" 
}) {
  const alignmentClasses = {
    left: 'items-start self-start',
    center: 'items-center self-center',
    right: 'items-end self-end'
  };

  return (
    <header className={`flex flex-col ${alignmentClasses[alignment]} ${className}`}>
      <div className="space-y-2">
        <h1 className="text-2xl md:text-3xl font-semibold uppercase">
          {title}
        </h1>
        {subtitle && (
          <p className="text-gray-600 text-sm md:text-base">
            {subtitle}
          </p>
        )}
      </div>
      {showUnderline && (
        <div className="w-24 h-0.5 bg-primary rounded-full mt-2"></div>
      )}
    </header>
  );
}
