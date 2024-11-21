/*
  Warnings:

  - Changed the type of `type` on the `Note` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "NoteType" AS ENUM ('TEXTNOTE', 'CHECKLIST');

-- AlterTable
ALTER TABLE "Note" DROP COLUMN "type",
ADD COLUMN     "type" "NoteType" NOT NULL;
