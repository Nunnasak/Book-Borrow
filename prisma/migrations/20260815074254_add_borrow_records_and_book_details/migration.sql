/*
  Warnings:

  - You are about to drop the column `borrowbyID` on the `Books` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Books` table. All the data in the column will be lost.
  - You are about to drop the column `creatAt` on the `Users` table. All the data in the column will be lost.
  - Added the required column `author` to the `Books` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Books" DROP CONSTRAINT "Books_borrowbyID_fkey";

-- AlterTable
ALTER TABLE "Books" DROP COLUMN "borrowbyID",
DROP COLUMN "type",
ADD COLUMN     "author" TEXT NOT NULL,
ADD COLUMN     "types" TEXT[],
ALTER COLUMN "status" SET DEFAULT 'AVAILABLE';

-- AlterTable
ALTER TABLE "Users" DROP COLUMN "creatAt",
ADD COLUMN     "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "BorrowRecords" (
    "id" TEXT NOT NULL,
    "borrowData" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "return" TIMESTAMP(3),
    "userId" TEXT NOT NULL,
    "bookId" TEXT NOT NULL,

    CONSTRAINT "BorrowRecords_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BorrowRecords" ADD CONSTRAINT "BorrowRecords_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BorrowRecords" ADD CONSTRAINT "BorrowRecords_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Books"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
