-- AlterTable
ALTER TABLE "Note" ADD COLUMN     "checklist" JSONB NOT NULL DEFAULT '[]';
