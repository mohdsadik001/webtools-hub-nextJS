'use client';
import Link from 'next/link';
import { User, Settings, LogOut } from 'lucide-react';

export default function ProfileDropdown({ 
  user, 
  isOpen, 
  onToggle, 
  onClose, 
  onLogout,
  isMobile = false 
}) {
  if (!user) return null;

  return (
    <div className={`profile-dropdown relative ${isMobile ? 'w-full' : ''}`}>
      <button
        onClick={onToggle}
        className={`flex items-center gap-2 px-3 py-2 rounded-md border border-gray-300 hover:border-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors ${
          isMobile ? 'w-full justify-center' : 'bg-white'
        }`}
        aria-expanded={isOpen}
      >
        <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-sm font-medium">
          {user.name ? user.name.charAt(0).toUpperCase() : <User className="w-4 h-4" />}
        </div>
        <span className="text-sm font-medium text-gray-700 max-w-24 truncate">
          {user.name || 'User'}
        </span>
        <svg 
          className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {isOpen && (
        <div className={`absolute bg-white border border-gray-200 rounded-md shadow-lg py-2 z-50 ${
          isMobile ? 'left-0 right-0 top-full mt-1' : 'right-0 top-full mt-1 w-48'
        }`}>
          <div className="px-4 py-2 border-b border-gray-100">
            <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
            <p className="text-xs text-gray-500 truncate">{user.email}</p>
          </div>
          
          <Link
            href="/profile"
            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
            onClick={onClose}
          >
            <Settings className="w-4 h-4" />
            Profile
          </Link>
          
          <Link
            href="/dashboard"
            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
            onClick={onClose}
          >
            <User className="w-4 h-4" />
            Dashboard
          </Link>
          
          <button
            onClick={onLogout}
            className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 text-left"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
