import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const article1 = await prisma.product.upsert({
    where: { title: 'Title 1' },
    update: {},
    create: {
      title: 'Title 1',
      description: 'Description1',
      price: 5.0,
  });

  const article2 = await prisma.product.upsert({
    where: { title: 'Title 2' },
    update: {},
    create: {
      title: 'Title 2',
      description: 'Description2',
      price: 10.0,
      
    },
  });

  console.log({ article1, article2 });
}

main()
  .catch((error) => {
    console.log(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
