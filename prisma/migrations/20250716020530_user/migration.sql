/*
  Warnings:

  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "friendship" DROP CONSTRAINT "friendship_user1id_fkey";

-- DropForeignKey
ALTER TABLE "friendship" DROP CONSTRAINT "friendship_user2id_fkey";

-- DropForeignKey
ALTER TABLE "requests" DROP CONSTRAINT "requests_recieverid_fkey";

-- DropForeignKey
ALTER TABLE "requests" DROP CONSTRAINT "requests_senderid_fkey";

-- DropTable
DROP TABLE "users";

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "bio" TEXT,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- AddForeignKey
ALTER TABLE "requests" ADD CONSTRAINT "requests_senderid_fkey" FOREIGN KEY ("senderid") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "requests" ADD CONSTRAINT "requests_recieverid_fkey" FOREIGN KEY ("recieverid") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "friendship" ADD CONSTRAINT "friendship_user1id_fkey" FOREIGN KEY ("user1id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "friendship" ADD CONSTRAINT "friendship_user2id_fkey" FOREIGN KEY ("user2id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
