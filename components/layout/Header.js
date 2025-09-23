


'use client';
import { useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { useAppContext } from '@/app/Context/AppContext';
import { useTranslation } from 'react-i18next';

// Component imports
import Logo from './Logo';
import SearchBar from './SearchBar';
import DesktopNavigation from './DesktopNavigation';
import AuthButtons from './AuthButtons';
import MobileMenu from './MobileMenu';
import MobileMenuToggle from './MobileMenuToggle';
import LanguageSelector from '../shared/LanguageSelector';

const Header = () => {
  const { t } = useTranslation('navbar');
  const router = useRouter();
  const { searchQuery, setSearchQuery } = useAppContext();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const navRef = useRef(null);

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        setProfileDropdownOpen(false);
      }
    };

    if (menuOpen || profileDropdownOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [menuOpen, profileDropdownOpen]);


  useEffect(() => {
    if (menuOpen) {
      const firstLink = navRef.current?.querySelector('[data-mobile-menu] a');
      firstLink?.focus();
    }
  }, [menuOpen]);

  useEffect(() => {
    if (searchQuery.length > 0) {
      router.push('/tools');
    }
    
  }, [searchQuery, router]);

  const navItems = Object.values(t('navItems', { returnObjects: true }));

  const handleSearchChange = (e) => setSearchQuery(e.target.value);
  const handleMenuClose = () => setMenuOpen(false);

  return (
    <header role="banner">
      <nav 
        ref={navRef}
        className="flex items-center justify-between px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 py-3 sm:py-4 border-b border-gray-300 relative transition-all min-h-[64px] lg:min-h-[72px]"
        role="navigation"
        aria-label="Main navigation"
      >
        {/* Skip to main content link */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-primary text-white px-4 py-2 rounded-md z-50 focus:outline-none focus:ring-2 focus:ring-white"
        >
          Skip to main content
        </a>

        {/* Website Logo */}
        <Logo className="flex-shrink-0" />

        {/* Desktop Nav Links */}
        <DesktopNavigation 
          navItems={navItems} 
          className="hidden md:flex items-center gap-6 lg:gap-8 text-black"
        />

        {/* Desktop Right Side: Search + Language Selector + Auth Buttons */}
        <div className="hidden lg:flex items-center gap-3 xl:gap-4 flex-shrink-0">
          <SearchBar
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-64 xl:w-80"
          />
          <LanguageSelector />
          <AuthButtons
            profileDropdownOpen={profileDropdownOpen}
            setProfileDropdownOpen={setProfileDropdownOpen}
          />
        </div>

        {/* Mobile Menu Button */}
        <MobileMenuToggle
          isOpen={menuOpen}
          onToggle={() => setMenuOpen(!menuOpen)}
          className="md:hidden"
        />

        {/* Mobile Menu */}
        <MobileMenu
          isOpen={menuOpen}
          navItems={navItems}
          onClose={handleMenuClose}
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          profileDropdownOpen={profileDropdownOpen}
          setProfileDropdownOpen={setProfileDropdownOpen}
        />

        {/* Live region for announcements */}
        <div 
          role="status" 
          aria-live="polite" 
          aria-atomic="true" 
          className="sr-only"
          id="nav-announcements"
        >
          {menuOpen && 'Navigation menu opened'}
          {!menuOpen && 'Navigation menu closed'}
        </div>
      </nav>
    </header>
  );
};

export default Header;
