/*
  Warnings:

  - A unique constraint covering the columns `[path]` on the table `Project` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Project_path_key` ON `Project`(`path`);
