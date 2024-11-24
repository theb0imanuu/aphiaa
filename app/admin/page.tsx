'use client';

import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function AdminDashboard() {
  const [activeUsers, setActiveUsers] = useState(0);
  const [loginData, setLoginData] = useState<number[]>([]);
  const [labels, setLabels] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/admin/dashboard-data');
        if (!response.ok) {
          throw new Error('Failed to fetch dashboard data');
        }

        const data = await response.json();
        setActiveUsers(data.activeUsers);
        setLoginData(data.loginCounts);
        setLabels(data.labels);
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

    fetchData();
  }, []);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Logins',
        data: loginData,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: { grid: { display: false } },
      y: { beginAtZero: true },
    },
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      {loading && <p>Loading data...</p>}
      {error && <p className="text-red-600">{error}</p>}
      {!loading && !error && (
        <>
          <div className="flex flex-col items-center md:flex-row gap-4 mb-6">
            <div className="bg-white shadow-md p-6 rounded-md w-full md:w-1/3">
              <h2 className="text-lg font-semibold mb-2">Currently Logged-In Users</h2>
              <p className="text-3xl font-bold">{activeUsers}</p>
            </div>
          </div>
          <div className="bg-white shadow-md p-6 rounded-md">
            <h2 className="text-lg font-semibold mb-4">Login Timeline</h2>
            <Bar data={chartData} options={chartOptions} />
          </div>
        </>
      )}
    </div>
  );
}
