"use client";

import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Sidebar() {
  const router = useRouter();

  const logout = async () => {
    try {
      const response = await fetch('/api/logout', { method: 'POST' });

      if (response.ok) {
        router.push('/login');
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <aside className="w-64 bg-white shadow-lg p-6 flex flex-col justify-between h-screen">
      <h2 className="aphiaa-title px-5 py-5">aphiaa</h2>
      <nav className="space-y-4">
        <Link href="/admin">
          <button className="w-full text-left text-lg text-gray-700 bg-white py-2 px-4 rounded hover:bg-gray-800 hover:text-white transition">
            Dashboard
          </button>
        </Link>
        <Link href="/admin/system-activity">
          <button className="w-full text-left text-lg text-gray-700 bg-white py-2 px-4 rounded hover:bg-gray-800 hover:text-white transition">
            System Activity
          </button>
        </Link>
        <Link href="/admin/user-management">
          <button className="w-full text-left text-lg text-gray-700 bg-white py-2 px-4 rounded hover:bg-gray-800 hover:text-white transition">
            User Management
          </button>
        </Link>
      </nav>
      <div className="mt-auto px-4 py-4 bg-white border-t border-gray-700">
        <button
          onClick={logout}
          className="w-full text-left text-lg text-gray-700 bg-white py-2 px-4 rounded hover:bg-red-700 hover:text-white transition"
        >
          Logout
        </button>
      </div>
    </aside>
  );
}
