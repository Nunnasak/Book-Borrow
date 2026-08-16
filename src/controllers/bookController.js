const { prisma } = require("../config/db.js");

const borrowBook = async (req, res) => {
    const { bookId } = req.params;
    const { userId } = req.body;

    const book = await prisma.books.findUnique({
        where: {id: bookId},
    });

    if (!book){
        return res.status(404).json({ error: "Book not found"});
    }

    if (book.status !== "AVAILABLE"){
        return res.status(409).json({ error: "Book is not available"});
    }

    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 7);

    const borrowRecord = await prisma.borrowRecords.create({
        data: {
            userId,
            bookId,
            dueDate,
        },
    });

    await prisma.books.update({
        where: { id: bookId },
        data: { status: "BORROWED"}
    });

    return res.status(201).json({
        message: "book borrowed successfully",
        borrowRecord,
    });
};

const returnBook = async (req, res) => {
    const { bookId } = req.params;

    const borrowRecord = await prisma.borrowRecords.findFirst({
        where: {
            bookId,
            returnDate: null,
        },
        orderBy: {
            borrowDate: "desc"
        }
    });

    if (!borrowRecord){
        return res.status(409).json({ error: "This book is not currently borrowed"});
    }

    const returnedRecord = await prisma.borrowRecords.update({
        where: {
            id: borrowRecord.id,
        },
        data: {
            returnDate: new Date(),
        },
    });

    await prisma.books.update({
        where: {id: bookId},
        data: { status: "AVAILABLE" },
    });

    return res.status(200).json({
        message: "Book returned successfully",
        borrowRecord: returnedRecord,
    });
};

module.exports = { borrowBook, returnBook }