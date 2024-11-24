'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement);

interface CustomerInteraction {
  time: string;
}

export default function UsersHome() {
  const [customerInteractions, setCustomerInteractions] = useState<CustomerInteraction[]>([]);
  const [salesCount, setSalesCount] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch customer interactions data for the graph
        const interactionsResponse = await axios.get('/api/customers/interaction-time');
        setCustomerInteractions(interactionsResponse.data);

        // Fetch sales count for the day
        const salesResponse = await axios.get('/api/sales/today');
        setSalesCount(salesResponse.data.count);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Prepare data for Chart.js
  const chartData = {
    labels: customerInteractions.map((interaction) => new Date(interaction.time).toLocaleTimeString()), // Extracting time
    datasets: [
      {
        label: 'Customer Interactions Over Time',
        data: customerInteractions.map(() => 1),
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
        fill: true,
      },
    ],
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">User Dashboard</h1>

      {/* Sales Card */}
      <div className="bg-white shadow-md rounded-lg p-6 mt-6">
        <h2 className="text-xl font-semibold">Sales Today</h2>
        <p className="mt-2 text-gray-700">You made {salesCount} sale{salesCount !== 1 ? 's' : ''} today.</p>
      </div>

      {/* Customer Interactions Chart */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold">Customer Interactions Over Time</h2>
        <div className="mt-4 w-full max-w-xl mx-auto">
          <Line data={chartData} />
        </div>
      </div>
    </div>
  );
}
