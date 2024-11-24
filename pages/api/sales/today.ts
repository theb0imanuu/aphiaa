import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const salesCount = await getSalesToday();
    res.status(200).json({ count: salesCount });
  } catch (error) {
    console.error('Error fetching sales data:', error);
    res.status(500).json({ message: 'Error fetching sales data' });
  }
}

async function getSalesToday() {
  const today = new Date();
  const startOfDay = new Date(today.setHours(0, 0, 0, 0)); // Start of today
  const endOfDay = new Date(today.setHours(23, 59, 59, 999)); // End of today

  const sales = await prisma.sale.findMany({
    where: {
      timestamp: {
        gte: startOfDay,
        lte: endOfDay,
      },
    },
  });

  return sales.length;
}
