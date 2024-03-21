import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const store = await prisma.store.upsert({
    where: { name: 'WebStore1' },
    update: {},
    create: {
      name: 'WebStore1',
    },
  });

  const rating1 = await prisma.rating.upsert({
    where: { id: 1 },
    update: {},
    create: {
      rating: 4.5,
      count: 10,
    },
  });

  const rating2 = await prisma.rating.upsert({
    where: { id: 2 },
    update: {},
    create: {
      rating: 4.3,
      count: 15,
    },
  });

  const rating3 = await prisma.rating.upsert({
    where: { id: 3 },
    update: {},
    create: {
      rating: 4.3,
      count: 15,
    },
  });

  const rating4 = await prisma.rating.upsert({
    where: { id: 4 },
    update: {},
    create: {
      rating: 4.3,
      count: 15,
    },
  });

  const rating5 = await prisma.rating.upsert({
    where: { id: 5 },
    update: {},
    create: {
      rating: 4.3,
      count: 15,
    },
  });

  const article1 = await prisma.product.upsert({
    where: { title: 'Title 1' },
    update: {},
    create: {
      title: 'Title 1',
      description: 'Description1',
      price: 5.0,
      storeId: 1,
      ratingId: 1,
    },
  });

  const article2 = await prisma.product.upsert({
    where: { title: 'Title 2' },
    update: {},
    create: {
      title: 'Title 2',
      description: 'Description2',
      price: 10.0,
      storeId: 1,
      ratingId: 2,
    },
  });

  console.log({ store, article1, article2 });
}

main()
  .catch((error) => {
    console.log(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
