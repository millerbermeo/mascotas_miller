/*
  Warnings:

  - Added the required column `name` to the `Mascota` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `mascota` ADD COLUMN `name` VARCHAR(32) NOT NULL;
