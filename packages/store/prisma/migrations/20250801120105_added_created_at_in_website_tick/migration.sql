/*
  Warnings:

  - Made the column `userId` on table `Website` required. This step will fail if there are existing NULL values in that column.
  - Made the column `regionId` on table `WebsiteTick` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Website" DROP CONSTRAINT "Website_userId_fkey";

-- DropForeignKey
ALTER TABLE "WebsiteTick" DROP CONSTRAINT "WebsiteTick_regionId_fkey";

-- AlterTable
ALTER TABLE "Website" ALTER COLUMN "userId" SET NOT NULL;

-- AlterTable
ALTER TABLE "WebsiteTick" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "regionId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Website" ADD CONSTRAINT "Website_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WebsiteTick" ADD CONSTRAINT "WebsiteTick_regionId_fkey" FOREIGN KEY ("regionId") REFERENCES "Region"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
