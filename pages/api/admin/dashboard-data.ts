import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    // Count currently active sessions (active users)
    const activeUsers = await prisma.session.count({
      where: { isActive: true },
    });

    // Aggregate logins by day (last 7 days)
    const last7DaysLogins = await prisma.activityLog.groupBy({
      by: ['timestamp'],
      _count: {
        _all: true,
      },
      where: {
        action: 'LOGIN',
        timestamp: {
          gte: new Date(new Date().setDate(new Date().getDate() - 7)), // Last 7 days
        },
      },
      orderBy: {
        timestamp: 'asc',
      },
    });

    // Extract labels (dates) and counts from the aggregated data
    const labels = last7DaysLogins.map((entry) => entry.timestamp.toISOString().split('T')[0]);
    const loginCounts = last7DaysLogins.map((entry) => entry._count._all);

    res.status(200).json({ activeUsers, loginCounts, labels });
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    res.status(500).json({ message: 'Failed to fetch dashboard data' });
  }
}
