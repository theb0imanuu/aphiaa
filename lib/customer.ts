import prisma from './prisma';

export async function getCustomerInteractionsByTime() {
  try {
    const interactions = await prisma.customerInteraction.findMany({
      orderBy: {
        time: 'asc', 
      },
    });

    return interactions; 
  } catch (error) {
    console.error('Error fetching customer interactions:', error);
    throw new Error('Unable to fetch customer interactions');
  }
}
