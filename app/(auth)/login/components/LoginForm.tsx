'use client';

import { useState } from 'react';
import axios  from 'axios';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('/api/auth/login', { email, password });
      console.log('Login successful:', response.data);

      const { token, role } = response.data;

      // Save the token to localStorage (or cookie) for session management
      localStorage.setItem('token', token);

      // Redirect based on the role
      if (role === 'admin') {
        router.push('/admin');
      } else {
        router.push('/users');
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || 'An error occurred');
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {error && <p className="text-red-600">{error}</p>}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-accent focus:border-accent"
          placeholder="Enter your email"
          required
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-accent focus:border-accent"
          placeholder="Enter your password"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-accent text-white font-medium py-2 rounded-md hover:bg-blue-700 transition"
        disabled={loading}
      >
        {loading ? 'Logging in...' : 'Log In'}
      </button>
    </form>
  );
}
