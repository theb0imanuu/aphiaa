import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

interface ActivityLog {
  timestamp: Date;
}

interface GroupedLog {
  time: string;
  count: number;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const activityLogs = await prisma.activityLog.findMany({
      orderBy: {
        timestamp: 'asc',
      },
    });

    const groupedLogs = groupLogsByTime(activityLogs);

    res.status(200).json(groupedLogs);
  } catch (error) {
    console.error('Error fetching customer interactions:', error);
    res.status(500).json({ message: 'Error fetching customer interactions data' });
  }
}

function groupLogsByTime(logs: ActivityLog[]): GroupedLog[] {
  const grouped = logs.reduce((acc: Record<number, number>, log: ActivityLog) => {
    const hour = log.timestamp.getHours();
    if (!acc[hour]) {
      acc[hour] = 0;
    }
    acc[hour]++;
    return acc;
  }, {});

  const formattedData = Object.keys(grouped).map((hour) => ({
    time: `${hour}:00`,
    count: grouped[parseInt(hour)],
  }));

  return formattedData;
}
