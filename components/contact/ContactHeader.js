'use client';

export default function ContactHeader({ title, subtitle, className = "" }) {
  return (
    <div className={`mb-8 ${className}`}>
      <h2 className="text-3xl font-bold text-primary mb-2">
        📬 {title}
      </h2>
      {subtitle && (
        <p className="text-gray-600 text-lg">
          {subtitle}
        </p>
      )}
    </div>
  );
}
