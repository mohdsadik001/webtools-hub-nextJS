"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/app/Context/AppContext";
import LanguageSelector from "./LanguageSelector";
import { useTranslation } from "react-i18next";
import { Menu, X, Search, User, LogOut, Settings } from "lucide-react";

const Navbar = () => {
  const { t } = useTranslation("navbar");
  const router = useRouter();
  const { searchQuery, setSearchQuery } = useAppContext();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check authentication status
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      // Replace this with your actual auth check logic
      const response = await fetch('/api/auth/verify-token');
      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      // Replace this with your actual logout logic
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
      });
      
      if (response.ok) {
        setUser(null);
        setProfileDropdownOpen(false);
        setMenuOpen(false);
        router.push('/');
        router.refresh();
      }
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  useEffect(() => {
    if (searchQuery.length > 0) {
      router.push("/tools");
    }
  }, [searchQuery, router]);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileDropdownOpen && !event.target.closest('.profile-dropdown')) {
        setProfileDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [profileDropdownOpen]);

  const navItems = Object.values(t("navItems", { returnObjects: true }));

  // Authentication buttons component
  const AuthButtons = ({ isMobile = false }) => {
    if (loading) {
      return (
        <div className={`${isMobile ? 'w-full space-y-2' : 'flex items-center gap-3'}`}>
          <div className={`bg-gray-200 animate-pulse rounded-md ${isMobile ? 'h-10 w-full' : 'h-9 w-16'}`}></div>
          <div className={`bg-gray-200 animate-pulse rounded-md ${isMobile ? 'h-10 w-full' : 'h-9 w-20'}`}></div>
        </div>
      );
    }

    if (user) {
      return (
        <div className={`profile-dropdown relative ${isMobile ? 'w-full' : ''}`}>
          <button
            onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
            className={`flex items-center gap-2 px-3 py-2 rounded-md border border-gray-300 hover:border-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors ${isMobile ? 'w-full justify-center' : 'bg-white'}`}
            aria-controls="profile-menu"
            aria-expanded={profileDropdownOpen}
            aria-label={`User profile - ${user.name || 'User'}`}
          >
            <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-sm font-medium">
              {user.name ? user.name.charAt(0).toUpperCase() : <User className="w-4 h-4" />}
            </div>
            <span className="text-sm font-medium text-gray-700 max-w-24 truncate">
              {user.name || 'User'}
            </span>
            <svg 
              className={`w-4 h-4 text-gray-500 transition-transform ${profileDropdownOpen ? 'rotate-180' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          {profileDropdownOpen && (
            <div
              id="profile-menu"
              className={`absolute bg-white border border-gray-200 rounded-md shadow-lg py-2 z-50 ${isMobile ? 'left-0 right-0 top-full mt-1' : 'right-0 top-full mt-1 w-48'}`}
              role="menu"
              aria-label="User profile menu"
            >
              <div className="px-4 py-2 border-b border-gray-100">
                <p className="text-sm font-medium text-gray-900 truncate">{user.name || 'User'}</p>
                <p className="text-xs text-gray-500 truncate">{user.email || 'user@example.com'}</p>
              </div>
              
              <Link
                href="/profile"
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 focus:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary rounded-sm mx-1"
                role="menuitem"
                onClick={() => {
                  setProfileDropdownOpen(false);
                  setMenuOpen(false);
                }}
              >
                <Settings className="w-4 h-4" aria-hidden="true" />
                Profile
              </Link>
              
              <Link
                href="/dashboard"
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 focus:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary rounded-sm mx-1"
                role="menuitem"
                onClick={() => {
                  setProfileDropdownOpen(false);
                  setMenuOpen(false);
                }}
              >
                <User className="w-4 h-4" aria-hidden="true" />
                Dashboard
              </Link>
              
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 focus:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 text-left rounded-sm mx-1"
                role="menuitem"
              >
                <LogOut className="w-4 h-4" aria-hidden="true" />
                Logout
              </button>
            </div>
          )}
        </div>
      );
    }

    return (
      <div className={`${isMobile ? 'w-full space-y-2' : 'flex items-center gap-3'}`}>
        <Link
          href="/auth/signin"
          className={`border border-gray-300 text-gray-700 hover:border-primary hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors rounded-md font-medium ${isMobile ? 'w-full py-3 px-4 text-center block' : 'px-4 py-2 text-sm'}`}
          aria-label="Sign in to your account"
          onClick={() => setMenuOpen(false)}
        >
          Login
        </Link>
        <Link
          href="/auth/signup"
          className={`bg-primary text-white hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors rounded-md font-medium ${isMobile ? 'w-full py-3 px-4 text-center block' : 'px-4 py-2 text-sm'}`}
          aria-label="Create a new account"
          onClick={() => setMenuOpen(false)}
        >
          Sign Up
        </Link>
      </div>
    );
  };

  return (
    <nav
      className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 relative transition-all h-[8vh]"
      role="navigation"
      aria-label={t("common.navigation")}
    >
      {/* Website Logo */}
      <button
        onClick={() => router.push("/")}
        className="text-2xl sm:text-3xl font-semibold cursor-pointer text-black focus:outline-none focus:ring-2 focus:ring-primary rounded"
        aria-label={t("common.goHome")}
      >
        <span className="text-primary font-bold">WebTools</span> Hub
      </button>

      {/* Desktop Nav Links */}
      <div className="hidden sm:flex items-center gap-8 text-black">
        {navItems.map((item) => (
          <Link
            key={item.id}
            href={item.path}
            className="hover:text-primary focus:text-primary focus:outline-none focus:ring-2 focus:ring-primary rounded px-2 py-1"
          >
            {item.title}
          </Link>
        ))}
      </div>

      {/* Desktop Right Side: Search + Language Selector + Auth Buttons */}
      <div className="hidden lg:flex items-center gap-4">
        <div className="flex items-center text-sm gap-2 border border-gray-300 px-4 rounded-full w-80 focus-within:border-primary transition-colors">
          <input
            onChange={(e) => setSearchQuery(e.target.value)}
            className="py-2 w-full bg-transparent outline-none placeholder-gray-500"
            type="text"
            placeholder={t("common.searchPlaceholder")}
            aria-label={t("common.searchPlaceholder")}
          />
          <Search className="w-5 h-5 text-gray-500" aria-hidden="true" />
        </div>
        <LanguageSelector />
        <AuthButtons />
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="sm:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        aria-controls="mobile-menu"
        aria-expanded={menuOpen}
        aria-label={menuOpen ? t("common.closeMenu") : t("common.openMenu")}
      >
        {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Menu (Dropdown) */}
      {menuOpen && (
        <div
          id="mobile-menu"
          className="absolute top-[8vh] left-0 w-full bg-white shadow-md border-t border-gray-200 flex flex-col items-start px-6 py-4 space-y-4 sm:hidden z-50"
          role="menu"
          aria-label={t("common.navigation")}
        >
          {navItems.map((item) => (
            <Link
              key={item.id}
              href={item.path}
              className="w-full hover:text-primary focus:text-primary focus:outline-none focus:ring-2 focus:ring-primary rounded px-2 py-1"
              role="menuitem"
              onClick={() => setMenuOpen(false)}
            >
              {item.title}
            </Link>
          ))}
          
          {/* Mobile Search */}
          <div className="flex items-center text-sm gap-2 border border-gray-300 px-3 py-2 rounded-full w-full focus-within:border-primary transition-colors">
            <input
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent outline-none placeholder-gray-500"
              type="text"
              placeholder={t("common.searchPlaceholder")}
              aria-label={t("common.searchPlaceholder")}
            />
            <Search className="w-5 h-5 text-gray-500" aria-hidden="true" />
          </div>
          
          {/* Mobile Language Selector */}
          <div className="w-full">
            <LanguageSelector />
          </div>
          
          {/* Mobile Auth Buttons */}
          <div className="w-full pt-2 border-t border-gray-200">
            <AuthButtons isMobile={true} />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
