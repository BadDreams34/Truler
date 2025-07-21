/*
  Warnings:

  - Added the required column `sendername` to the `usermessages` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "usermessages" ADD COLUMN     "sendername" TEXT NOT NULL;
