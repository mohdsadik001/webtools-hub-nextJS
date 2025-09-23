'use client';
import Link from 'next/link';

export default function DesktopNavigation({ navItems }) {
  return (
    <div className="hidden sm:flex items-center gap-8 text-black">
      {navItems?.map((item) => (
        <Link
          key={item.id}
          href={item.path}
          className="hover:text-primary focus:text-primary focus:outline-none focus:ring-2 focus:ring-primary rounded px-2 py-1"
        >
          {item.title}
        </Link>
      ))}
    </div>
  );
}
