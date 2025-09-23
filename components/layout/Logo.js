'use client';
import { useRouter } from 'next/navigation';

export default function Logo({ className = "" }) {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push('/')}
      className={`text-2xl sm:text-3xl font-semibold cursor-pointer text-black focus:outline-none focus:ring-2 focus:ring-primary rounded ${className}`}
    >
      <span className="text-primary font-bold">WebTools</span> Hub
    </button>
  );
}
