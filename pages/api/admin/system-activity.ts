import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const logs = await prisma.activityLog.findMany({
      include: {
        user: true, // Include user information for context
      },
      orderBy: { timestamp: 'desc' },
    });

    const formattedLogs = logs.map((log) => ({
      id: log.id,
      action: log.action,
      timestamp: log.timestamp,
      userId: log.userId,
      userEmail: log.user?.email || 'Unknown',
    }));

    res.status(200).json(formattedLogs);
  } catch (error) {
    console.error('Error fetching system activity logs:', error);
    res.status(500).json({ message: 'Failed to fetch system activity logs' });
  }
}
