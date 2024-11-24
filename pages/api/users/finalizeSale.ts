import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';
import { getServerSession } from 'next-auth/next';
import authOptions from '../auth/[...nextauth]';
import { Session } from 'next-auth'; // Import Session type

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    // Retrieve the session to get the logged-in user's ID
    const session = await getServerSession(req, res, authOptions) as Session;  // Explicitly cast to Session

    // Ensure session and session.user exist and check user.id
    if (!session || !session.user || !session.user.id) {
      return res.status(401).json({ message: 'Unauthorized' }); // User must be authenticated
    }

    const { cart, paymentMethod } = req.body;
    const userId = session.user.id;

    // Create a new sale entry in the activity log
    await prisma.activityLog.create({
      data: {
        action: `SALE - Payment Method: ${paymentMethod}`,
        userId: parseInt(userId, 10), // Ensure the user ID is an integer
        timestamp: new Date(),
      },
    });

    // Decrement inventory for each drug in the cart
    for (const item of cart) {
      await prisma.inventory.update({
        where: { id: item.id },
        data: { quantity: { decrement: item.quantity } },
      });
    }

    // Return response
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error finalizing sale:', error);
    res.status(500).json({ message: 'Failed to finalize sale' });
  }
}
