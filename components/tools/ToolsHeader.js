'use client';

export default function ToolsHeader({ 
  title,
  subtitle = '',
  showUnderline = true,
  className = ''
}) {
  return (
    <header className={`flex flex-col items-start self-start ${className}`}>
      <h1 className="text-2xl md:text-3xl font-semibold uppercase">{title}</h1>
      {showUnderline && <div className="w-24 h-0.5 bg-primary rounded-full mt-1"></div>}
      {subtitle && <p className="mt-2 text-gray-600">{subtitle}</p>}
    </header>
  );
}
