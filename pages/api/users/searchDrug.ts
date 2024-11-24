import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { name } = req.query;

  try {
    // Searching for drugs by name
    const drugs = await prisma.inventory.findMany({
      where: {
        name: {
          contains: name as string, 
          mode: 'insensitive', 
        },
      },
    });

    res.status(200).json(drugs);
  } catch (error) {
    console.error('Error searching for drug:', error);
    res.status(500).json({ message: 'Failed to search drug' });
  }
}
