-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `role` ENUM('MENTOR', 'IMMIGRANT', 'ORGANISATION') NOT NULL DEFAULT 'IMMIGRANT',
    `city` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    UNIQUE INDEX `User_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MentorExtension` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `birthdate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `bio` VARCHAR(191) NOT NULL,
    `arrival` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `professional` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `MentorExtension_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ImmigrantExtension` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NULL,
    `birthdate` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `bio` VARCHAR(191) NULL,
    `userId` INTEGER NULL,

    UNIQUE INDEX `ImmigrantExtension_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `OrganisationExtension` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` TEXT NOT NULL,
    `userId` INTEGER NULL,

    UNIQUE INDEX `OrganisationExtension_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CertifiedSkillWrapper` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `mentorId` INTEGER NOT NULL,
    `BUREAUCRACY` BOOLEAN NOT NULL DEFAULT false,
    `LIVING` BOOLEAN NOT NULL DEFAULT false,
    `LEGAL` BOOLEAN NOT NULL DEFAULT false,
    `HEALTH` BOOLEAN NOT NULL DEFAULT false,
    `DRIVING` BOOLEAN NOT NULL DEFAULT false,
    `EDUCATION` BOOLEAN NOT NULL DEFAULT false,
    `WORKING` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `CertifiedSkillWrapper_mentorId_key`(`mentorId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SkillWrapper` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `mentorId` INTEGER NOT NULL,
    `LANGUAGE` BOOLEAN NOT NULL DEFAULT false,
    `PUBLIC_TRANSPORT` BOOLEAN NOT NULL DEFAULT false,
    `CULTURE` BOOLEAN NOT NULL DEFAULT false,
    `CULINARY` BOOLEAN NOT NULL DEFAULT false,
    `SPARE_TIME` BOOLEAN NOT NULL DEFAULT false,
    `RELIGION` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `SkillWrapper_mentorId_key`(`mentorId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Event` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `temporary` BOOLEAN NOT NULL DEFAULT true,
    `description` TEXT NULL,
    `start` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `end` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `organizerId` INTEGER NULL,
    `locationId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Location` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `street` VARCHAR(191) NOT NULL,
    `number` INTEGER NULL,
    `supplement` VARCHAR(191) NULL,
    `city` VARCHAR(191) NOT NULL,
    `zip` INTEGER NOT NULL,
    `description` TEXT NULL,
    `note` VARCHAR(191) NULL,
    `coordinatesId` INTEGER NULL,
    `organisationExtensionId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Coordinates` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `latitude` DOUBLE NOT NULL,
    `longitude` DOUBLE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Chat` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId1` INTEGER NULL,
    `userId2` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `MentorExtension` ADD CONSTRAINT `MentorExtension_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ImmigrantExtension` ADD CONSTRAINT `ImmigrantExtension_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrganisationExtension` ADD CONSTRAINT `OrganisationExtension_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CertifiedSkillWrapper` ADD CONSTRAINT `CertifiedSkillWrapper_mentorId_fkey` FOREIGN KEY (`mentorId`) REFERENCES `MentorExtension`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SkillWrapper` ADD CONSTRAINT `SkillWrapper_mentorId_fkey` FOREIGN KEY (`mentorId`) REFERENCES `MentorExtension`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Event` ADD CONSTRAINT `Event_organizerId_fkey` FOREIGN KEY (`organizerId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Event` ADD CONSTRAINT `Event_locationId_fkey` FOREIGN KEY (`locationId`) REFERENCES `Location`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Location` ADD CONSTRAINT `Location_organisationExtensionId_fkey` FOREIGN KEY (`organisationExtensionId`) REFERENCES `OrganisationExtension`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Location` ADD CONSTRAINT `Location_coordinatesId_fkey` FOREIGN KEY (`coordinatesId`) REFERENCES `Coordinates`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Chat` ADD CONSTRAINT `Chat_userId1_fkey` FOREIGN KEY (`userId1`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Chat` ADD CONSTRAINT `Chat_userId2_fkey` FOREIGN KEY (`userId2`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
