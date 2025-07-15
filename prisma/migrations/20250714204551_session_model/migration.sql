-- CreateEnum
CREATE TYPE "stats" AS ENUM ('PENDING', 'ACCEPTED');

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sid" TEXT NOT NULL,
    "data" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "bio" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "requests" (
    "senderid" INTEGER NOT NULL,
    "recieverid" INTEGER NOT NULL,
    "status" "stats" NOT NULL DEFAULT 'PENDING',

    CONSTRAINT "requests_pkey" PRIMARY KEY ("senderid","recieverid")
);

-- CreateTable
CREATE TABLE "friendship" (
    "user1id" INTEGER NOT NULL,
    "user2id" INTEGER NOT NULL,

    CONSTRAINT "friendship_pkey" PRIMARY KEY ("user1id","user2id")
);

-- CreateTable
CREATE TABLE "usermessages" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "user1id" INTEGER NOT NULL,
    "user2id" INTEGER NOT NULL,
    "sentAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "usermessages_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Session_sid_key" ON "Session"("sid");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- AddForeignKey
ALTER TABLE "requests" ADD CONSTRAINT "requests_senderid_fkey" FOREIGN KEY ("senderid") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "requests" ADD CONSTRAINT "requests_recieverid_fkey" FOREIGN KEY ("recieverid") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "friendship" ADD CONSTRAINT "friendship_user1id_fkey" FOREIGN KEY ("user1id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "friendship" ADD CONSTRAINT "friendship_user2id_fkey" FOREIGN KEY ("user2id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usermessages" ADD CONSTRAINT "usermessages_user1id_user2id_fkey" FOREIGN KEY ("user1id", "user2id") REFERENCES "friendship"("user1id", "user2id") ON DELETE RESTRICT ON UPDATE CASCADE;
