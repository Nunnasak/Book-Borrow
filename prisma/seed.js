const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const books = [
  {
    title: "The Great Gatsby",
    type: "Fiction",
    status: "AVAILABLE",
  },
  {
    title: "To Kill a Mockingbird",
    type: "Fiction",
    status: "AVAILABLE",
  },
  {
    title: "Atomic Habits",
    type: "Self-help",
    status: "AVAILABLE",
  },
  {
    title: "Clean Code",
    type: "Programming",
    status: "AVAILABLE",
  },
  {
    title: "The Pragmatic Programmer",
    type: "Programming",
    status: "AVAILABLE",
  },
];

async function main() {
  for (const book of books) {
    const existingBook = await prisma.books.findFirst({
      where: { title: book.title },
    });

    if (!existingBook) {
      await prisma.books.create({ data: book });
    }
  }

  console.log(`Seeded ${books.length} books`);
}

main()
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
