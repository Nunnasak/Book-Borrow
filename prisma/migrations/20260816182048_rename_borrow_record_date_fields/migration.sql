/*
  Warnings:

  - You are about to drop the column `borrowData` on the `BorrowRecords` table. All the data in the column will be lost.
  - You are about to drop the column `return` on the `BorrowRecords` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "BorrowRecords" DROP COLUMN "borrowData",
DROP COLUMN "return",
ADD COLUMN     "borrowDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "returnDate" TIMESTAMP(3);
