/*
  Warnings:

  - A unique constraint covering the columns `[user]` on the table `Admin` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Admin_user_key" ON "Admin"("user");
