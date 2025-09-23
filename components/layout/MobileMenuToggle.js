'use client';
import { Menu, X } from 'lucide-react';

import Button from '../ui/buttons/Button';

export default function MobileMenuToggle({ isOpen, onToggle }) {
  return (
    <Button
      onClick={onToggle}
      icon={isOpen ? X : Menu}
      aria-label={isOpen ? 'Close menu' : 'Open menu'}
      className="sm:hidden"
      variant="secondary"
      size="medium"
    />
  );
}
