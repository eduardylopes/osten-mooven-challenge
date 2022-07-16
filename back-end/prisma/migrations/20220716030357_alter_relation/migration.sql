/*
  Warnings:

  - Made the column `companyId` on table `Address` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `addressId` to the `Company` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Address" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "street" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "complement" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "telephone" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "companyId" TEXT NOT NULL
);
INSERT INTO "new_Address" ("city", "companyId", "complement", "created_at", "district", "id", "number", "state", "street", "telephone") SELECT "city", "companyId", "complement", "created_at", "district", "id", "number", "state", "street", "telephone" FROM "Address";
DROP TABLE "Address";
ALTER TABLE "new_Address" RENAME TO "Address";
CREATE TABLE "new_Company" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "corporate_name" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "addressId" TEXT NOT NULL,
    CONSTRAINT "Company_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Company" ("cnpj", "corporate_name", "created_at", "id", "name") SELECT "cnpj", "corporate_name", "created_at", "id", "name" FROM "Company";
DROP TABLE "Company";
ALTER TABLE "new_Company" RENAME TO "Company";
CREATE UNIQUE INDEX "Company_cnpj_key" ON "Company"("cnpj");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
