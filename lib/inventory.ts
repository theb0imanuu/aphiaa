import prisma from './prisma';

export async function getLowInventoryItems() {
  try {
    const lowStockThreshold = 10;

    const lowInventory = await prisma.inventory.findMany({
      where: {
        quantity: {
          lte: lowStockThreshold,
        },
      },
    });

    return lowInventory; 
  } catch (error) {
    console.error('Error fetching low inventory:', error);
    throw new Error('Unable to fetch low inventory data');
  }
}
