/*
  Warnings:

  - A unique constraint covering the columns `[professorName]` on the table `Professor` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Professor_professorName_key" ON "Professor"("professorName");
