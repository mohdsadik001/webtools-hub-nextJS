
'use client';
import { useSession, signOut } from 'next-auth/react';
import { useEffect } from 'react';
import Button from '@/components/ui/buttons/Button';
import LinkButton from '@/components/ui/buttons/LinkButton';
import ProfileDropdown from './ProfileDropdown';

export default function AuthButtons({ 
  isMobile = false, 
  profileDropdownOpen, 
  setProfileDropdownOpen,
  onMenuClose 
}) {
  const { data: session, status } = useSession();

  const handleLogout = async () => {
    try {
      await signOut({ 
        callbackUrl: '/',
        redirect: true 
      });
      setProfileDropdownOpen(false);
      onMenuClose?.();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

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
  }, [profileDropdownOpen, setProfileDropdownOpen]);

  if (status === 'loading') {
    return (
      <div className={`${isMobile ? 'w-full space-y-2' : 'flex items-center gap-3'}`}>
        <div className={`bg-gray-200 animate-pulse rounded-md ${isMobile ? 'h-10 w-full' : 'h-9 w-16'}`}></div>
        <div className={`bg-gray-200 animate-pulse rounded-md ${isMobile ? 'h-10 w-full' : 'h-9 w-20'}`}></div>
      </div>
    );
  }

  if (session?.user) {
    return (
      <ProfileDropdown
        user={session.user}
        isOpen={profileDropdownOpen}
        onToggle={() => setProfileDropdownOpen(!profileDropdownOpen)}
        onClose={() => {
          setProfileDropdownOpen(false);
          onMenuClose?.();
        }}
        onLogout={handleLogout}
        isMobile={isMobile}
      />
    );
  }

  return (
    <div className={`${isMobile ? 'w-full space-y-2' : 'flex items-center gap-3'}`}>
      <LinkButton
        href="/auth/signin"
        variant="secondary"
        size={isMobile ? 'large' : 'medium'}
        className={isMobile ? 'w-full' : ''}
        onClick={onMenuClose}
      >
        Sign In
      </LinkButton>
      <LinkButton
        href="/auth/signup"
        variant="primary"
        size={isMobile ? 'large' : 'medium'}
        className={isMobile ? 'w-full' : ''}
        onClick={onMenuClose}
      >
        Sign Up
      </LinkButton>
    </div>
  );
}
