-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_snip" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "language" TEXT
);
INSERT INTO "new_snip" ("code", "id", "language", "title") SELECT "code", "id", "language", "title" FROM "snip";
DROP TABLE "snip";
ALTER TABLE "new_snip" RENAME TO "snip";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
