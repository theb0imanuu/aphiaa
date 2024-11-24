import { NextApiRequest, NextApiResponse } from 'next';
import { getLowInventoryItems } from '@/lib/inventory'; 


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const lowInventoryItems = await getLowInventoryItems();

    if (lowInventoryItems.length > 0) {
      res.status(200).json({ isLow: true, items: lowInventoryItems });
    } else {
      res.status(200).json({ isLow: false });
    }
  } catch (error) {
    console.error('Error fetching low inventory:', error);
    res.status(500).json({ message: 'Error fetching low inventory data' });
  }
}
