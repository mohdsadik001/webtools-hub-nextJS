'use client';
import Link from 'next/link';
import SearchBar from './SearchBar';
import AuthButtons from './AuthButtons';
import LanguageSelector from '../shared/LanguageSelector';

export default function MobileMenu({ 
  isOpen, 
  navItems, 
  onClose, 
  searchQuery, 
  onSearchChange,
  profileDropdownOpen,
  setProfileDropdownOpen 
}) {
  if (!isOpen) return null;

  return (
    <div className="absolute top-[8vh] left-0 w-full bg-white shadow-md border-t border-gray-200 flex flex-col items-start px-6 py-4 space-y-4 sm:hidden z-50">
      {navItems?.map((item) => (
        <Link
          key={item.id}
          href={item.path}
          className="w-full hover:text-primary focus:text-primary focus:outline-none focus:ring-2 focus:ring-primary rounded px-2 py-1"
          onClick={onClose}
        >
          {item.title}
        </Link>
      ))}
      
      {/* Mobile Search */}
      <SearchBar
        value={searchQuery}
        onChange={onSearchChange}
        isMobile={true}
      />
      
      {/* Mobile Language Selector */}
      <div className="w-full">
        <LanguageSelector />
      </div>
      
      {/* Mobile Auth Buttons */}
      <div className="w-full pt-2 border-t border-gray-200">
        <AuthButtons 
          isMobile={true}
          profileDropdownOpen={profileDropdownOpen}
          setProfileDropdownOpen={setProfileDropdownOpen}
          onMenuClose={onClose}
        />
      </div>
    </div>
  );
}
