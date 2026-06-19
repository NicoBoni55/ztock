/*
  Warnings:

  - You are about to drop the column `user_name` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "user_name",
ADD COLUMN     "name" TEXT;
