'use client';

import { useState } from 'react';
import axios from 'axios';

export default function UserManagement() {
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerRole, setRegisterRole] = useState('user');
  const [registerError, setRegisterError] = useState('');

  const [changeEmail, setChangeEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [changeError, setChangeError] = useState('');

  const [removeEmail, setRemoveEmail] = useState('');
  const [removeError, setRemoveError] = useState('');

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegisterError('');

    try {
      await axios.post('/api/admin/register', {
        email: registerEmail,
        password: registerPassword,
        role: registerRole,
      });
      setRegisterEmail('');
      setRegisterPassword('');
      setRegisterRole('user');
      alert('User registered successfully');
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setRegisterError(err.response?.data?.message || 'An error occurred');
      } else {
        setRegisterError('An unexpected error occurred');
      }
    }
  };

  const handlePasswordChangeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setChangeError('');

    try {
      await axios.put('/api/admin/change-password', { email: changeEmail, password: newPassword });
      setChangeEmail('');
      setNewPassword('');
      alert('Password changed successfully');
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setChangeError(err.response?.data?.message || 'An error occurred');
      } else {
        setChangeError('An unexpected error occurred');
      }
    }
  };

  const handleUserRemoveSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setRemoveError('');

    try {
      await axios.delete('/api/admin/remove-user', { data: { email: removeEmail } });
      setRemoveEmail('');
      alert('User removed successfully');
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setRemoveError(err.response?.data?.message || 'An error occurred');
      } else {
        setRemoveError('An unexpected error occurred');
      }
    }
  };

  return (
    <div className="space-y-8">
      {/* Register New User Form */}
      <div className="bg-white p-6 rounded-md shadow-md">
        <h2 className="text-xl font-bold mb-4">Register New User</h2>
        {registerError && <p className="text-red-600">{registerError}</p>}
        <form onSubmit={handleRegisterSubmit} className="space-y-4">
          <div>
            <label htmlFor="register-email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="register-email"
              value={registerEmail}
              onChange={(e) => setRegisterEmail(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label htmlFor="register-password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="register-password"
              value={registerPassword}
              onChange={(e) => setRegisterPassword(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label htmlFor="register-role" className="block text-sm font-medium text-gray-700">
              Role
            </label>
            <select
              id="register-role"
              value={registerRole}
              onChange={(e) => setRegisterRole(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-accent text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Register User
          </button>
        </form>
      </div>

      {/* Change User Password Form */}
      <div className="bg-white p-6 rounded-md shadow-md">
        <h2 className="text-xl font-bold mb-4">Change User Password</h2>
        {changeError && <p className="text-red-600">{changeError}</p>}
        <form onSubmit={handlePasswordChangeSubmit} className="space-y-4">
          <div>
            <label htmlFor="change-email" className="block text-sm font-medium text-gray-700">
              User Email
            </label>
            <input
              type="email"
              id="change-email"
              value={changeEmail}
              onChange={(e) => setChangeEmail(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label htmlFor="new-password" className="block text-sm font-medium text-gray-700">
              New Password
            </label>
            <input
              type="password"
              id="new-password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-accent text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Change Password
          </button>
        </form>
      </div>

      {/* Remove User Form */}
      <div className="bg-white p-6 rounded-md shadow-md">
        <h2 className="text-xl font-bold mb-4">Remove User</h2>
        {removeError && <p className="text-red-600">{removeError}</p>}
        <form onSubmit={handleUserRemoveSubmit} className="space-y-4">
          <div>
            <label htmlFor="remove-email" className="block text-sm font-medium text-gray-700">
              User Email
            </label>
            <input
              type="email"
              id="remove-email"
              value={removeEmail}
              onChange={(e) => setRemoveEmail(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition"
          >
            Remove User
          </button>
        </form>
      </div>
    </div>
  );
}
