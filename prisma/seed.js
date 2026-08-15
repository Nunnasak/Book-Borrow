const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const books = [
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    types: ["Fiction", "Classic"],
    status: "AVAILABLE",
  },
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    types: ["Fiction", "Classic"],
    status: "AVAILABLE",
  },
  {
    title: "Atomic Habits",
    author: "James Clear",
    types: ["Self-help", "Productivity"],
    status: "AVAILABLE",
  },
  {
    title: "Clean Code",
    author: "Robert C. Martin",
    types: ["Programming", "Software Engineering"],
    status: "AVAILABLE",
  },
  {
    title: "The Pragmatic Programmer",
    author: "David Thomas and Andrew Hunt",
    types: ["Programming", "Software Engineering"],
    status: "AVAILABLE",
  },
];

async function main() {
  let createdBooks = 0;

  for (const book of books) {
    const existingBook = await prisma.books.findFirst({
      where: {
        title: book.title,
        author: book.author,
      },
    });

    if (!existingBook) {
      await prisma.books.create({ data: book });
      createdBooks += 1;
    }
  }

  console.log(`Created ${createdBooks} new books`);
}

main()
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
