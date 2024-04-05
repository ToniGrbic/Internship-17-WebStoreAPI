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

  const product1 = await prisma.product.upsert({
    where: { title: 'Watch' },
    update: {},
    create: {
      title: 'Watch',
      description: 'Description1',
      price: 5.0,
      category: 'Accessories',
      rating: 4.5,
      ratingCount: 10,
      storeId: 1,
    },
  });

  const product2 = await prisma.product.upsert({
    where: { title: 'T-Shirt' },
    update: {},
    create: {
      title: 'T-Shirt',
      description: 'Description2',
      price: 10.0,
      category: 'Clothing',
      rating: 4.0,
      ratingCount: 15,
      storeId: 1,
    },
  });

  const product3 = await prisma.product.upsert({
    where: { title: 'Pants' },
    update: {},
    create: {
      title: 'Pants',
      description: 'Description3',
      price: 15.0,
      category: 'Clothing',
      rating: 4.2,
      ratingCount: 20,
      storeId: 1,
    },
  });

  const user1 = await prisma.user.upsert({
    where: { email: 'tgrbic@gmail.com' },
    update: {},
    create: {
      email: 'tgrbic@gmail.com',
      name: 'Toni',
      password: '1234',
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: 'matematic@gmail.com' },
    update: {},
    create: {
      email: 'matematic@gmail.com',
      name: 'Mate',
      password: '123456',
    },
  });

  const order1 = await prisma.order.upsert({
    where: { id: 1 },
    update: {},
    create: {
      userId: 1,
      productId: 1,
      quantity: 2,
    },
  });

  const order2 = await prisma.order.upsert({
    where: { id: 2 },
    update: {},
    create: {
      userId: 1,
      productId: 2,
      quantity: 4,
    },
  });

  const wishlist1 = await prisma.wishListItem.upsert({
    where: { id: 1 },
    update: {},
    create: {
      userId: 1,
      productId: 1,
    },
  });

  const wishlist2 = await prisma.wishListItem.upsert({
    where: { id: 2 },
    update: {},
    create: {
      userId: 1,
      productId: 2,
    },
  });

  const wishlist3 = await prisma.wishListItem.upsert({
    where: { id: 3 },
    update: {},
    create: {
      userId: 2,
      productId: 2,
    },
  });

  console.log({
    user1,
    user2,
    product1,
    product2,
    product3,
    order1,
    order2,
    wishlist1,
    wishlist2,
    wishlist3,
  });
}

main()
  .catch((error) => {
    console.log(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
