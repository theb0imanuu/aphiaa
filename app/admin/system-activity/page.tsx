'use client';

import { useEffect, useState } from 'react';

type LogEntry = {
  id: number;
  action: string;
  timestamp: string;
  userId: number;
  userEmail: string;
};

export default function SystemActivityPage() {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await fetch('/api/admin/system-activity');
        if (!response.ok) {
          throw new Error('Failed to fetch system activity logs');
        }
        const data: LogEntry[] = await response.json();
        setLogs(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unexpected error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">System Activity Logs</h1>
      {loading && <p>Loading logs...</p>}
      {error && <p className="text-red-600">{error}</p>}
      {!loading && !error && (
        <div className="overflow-auto bg-white shadow-md rounded-md">
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2">ID</th>
                <th className="border border-gray-300 px-4 py-2">Action</th>
                <th className="border border-gray-300 px-4 py-2">Timestamp</th>
                <th className="border border-gray-300 px-4 py-2">User ID</th>
                <th className="border border-gray-300 px-4 py-2">User Email</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2 text-center">{log.id}</td>
                  <td className="border border-gray-300 px-4 py-2">{log.action}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">{new Date(log.timestamp).toLocaleString()}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">{log.userId}</td>
                  <td className="border border-gray-300 px-4 py-2">{log.userEmail}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
