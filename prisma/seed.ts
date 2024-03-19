import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const article1 = await prisma.article.upsert({
    where: { title: 'Title 1' },
    update: {},
    create: {
      title: 'Title 1',
      body: 'Body1',
      description: 'Description1',
      published: false,
    },
  });

  const article2 = await prisma.article.upsert({
    where: { title: 'Title 2' },
    update: {},
    create: {
      title: 'Title 2',
      body: 'Body2',
      description: 'Description2',
      published: false,
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
