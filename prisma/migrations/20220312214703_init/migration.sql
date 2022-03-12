/*
  Warnings:

  - You are about to drop the column `AUTHORITY` on the `certifiedskillwrapper` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `certifiedskillwrapper` DROP COLUMN `AUTHORITY`,
    ADD COLUMN `BUREAUCRACY` BOOLEAN NOT NULL DEFAULT false;
