'use client'

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

const Navbar = () => {
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  return (
    <nav role="navigation" aria-label="Main Navigation" className="bg-gray-800 p-4 text-white flex justify-between items-center">
      <div className="flex space-x-4">
        <Link href="/dashboard" aria-label="Go to Dashboard" className="hover:bg-gray-700 p-2 rounded">
          Dashboard
        </Link>
        <Link href="/profile" aria-label="Go to Profile" className="hover:bg-gray-700 p-2 rounded">
          Profile
        </Link>
      </div>
      <div>
        <button
          className="hover:bg-red-700 p-2 rounded"
          aria-label="Logout"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
