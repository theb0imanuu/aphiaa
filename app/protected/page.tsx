'use client';

import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ProtectedPage() {
  const { user, isAuthenticated} = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/login'); 
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) return <p>Loading...</p>;

  return <div>Welcome to the protected page, {user?.email}</div>;
}
