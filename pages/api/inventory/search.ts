import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { name } = req.query;

  if (typeof name !== 'string') {
    return res.status(400).json({ message: 'Name query parameter must be a string' });
  }

  try {
    const drugs = await prisma.inventory.findMany({
      where: {
        name: {
          contains: name,
          mode: 'insensitive',
        },
      },
    });

    res.status(200).json(drugs);
  } catch (error) {
    console.error('Error fetching drugs:', error);
    res.status(500).json({ message: 'Error fetching drugs' });
  }
}
