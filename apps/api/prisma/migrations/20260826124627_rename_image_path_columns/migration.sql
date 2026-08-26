/*
  Warnings:

  - You are about to drop the column `imgPath` on the `characters` table. All the data in the column will be lost.
  - You are about to drop the column `imgPath` on the `illustrations` table. All the data in the column will be lost.
  - Added the required column `imageToken` to the `characters` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageToken` to the `illustrations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "characters" DROP COLUMN "imgPath",
ADD COLUMN     "imageToken" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "illustrations" DROP COLUMN "imgPath",
ADD COLUMN     "imageToken" TEXT NOT NULL;
