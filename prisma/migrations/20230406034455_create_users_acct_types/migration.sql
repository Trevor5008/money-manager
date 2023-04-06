/*
  Warnings:

  - You are about to drop the column `iconId` on the `transaction_type` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `ledger_account` MODIFY `closedDate` DATETIME(3) NULL,
    MODIFY `description` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `transaction_type` DROP COLUMN `iconId`;
