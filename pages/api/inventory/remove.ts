import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id, quantity } = req.body;

  try {
    const drug = await prisma.inventory.update({
      where: { id: id },
      data: { quantity: { decrement: quantity } },
    });

    res.status(200).json(drug);
  } catch (error) {
    console.error('Error removing drug:', error);
    res.status(500).json({ message: 'Error removing drug' });
  }
}
