'use client';
import { Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function SearchBar({ 
  value, 
  onChange, 
  isMobile = false,
  className = "" 
}) {
  const { t } = useTranslation('navbar');

  return (
    <div className={`flex items-center text-sm gap-2 border border-gray-300 px-3 py-2 rounded-full focus-within:border-primary transition-colors ${
      isMobile ? 'w-full' : 'w-80 px-4'
    } ${className}`}>
      <input
        onChange={onChange}
        value={value}
        className="w-full bg-transparent outline-none placeholder-gray-500"
        type="text"
        placeholder={t('common.searchPlaceholder') || 'Search tools...'}
      />
      <Search className="w-5 h-5 text-gray-500" />
    </div>
  );
}
