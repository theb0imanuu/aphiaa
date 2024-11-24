import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { name, quantity, price } = req.body;

    // Validate input
    if (!name || !quantity || !price) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    try {
      const drug = await prisma.inventory.create({
        data: {
          name,
          quantity,
          price,
        },
      });

      res.status(200).json(drug);
    } catch (error) {
      console.error('Error adding drug:', error);
      res.status(500).json({ message: 'Failed to add drug' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
