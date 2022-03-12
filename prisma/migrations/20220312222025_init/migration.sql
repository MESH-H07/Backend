/*
  Warnings:

  - You are about to drop the column `what3WordsId` on the `location` table. All the data in the column will be lost.
  - You are about to drop the column `orgaDescription` on the `organisationextension` table. All the data in the column will be lost.
  - You are about to drop the `what3words` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `description` to the `OrganisationExtension` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `OrganisationExtension` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `location` DROP FOREIGN KEY `Location_what3WordsId_fkey`;

-- AlterTable
ALTER TABLE `location` DROP COLUMN `what3WordsId`;

-- AlterTable
ALTER TABLE `organisationextension` DROP COLUMN `orgaDescription`,
    ADD COLUMN `description` TEXT NOT NULL,
    ADD COLUMN `name` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `what3words`;

-- CreateIndex
CREATE UNIQUE INDEX `User_username_key` ON `User`(`username`);
