-- CreateTable
CREATE TABLE "coordinates" (
    "id" SERIAL NOT NULL,
    "startX" INTEGER NOT NULL,
    "startY" INTEGER NOT NULL,
    "minX" INTEGER NOT NULL,
    "maxX" INTEGER NOT NULL,
    "maxY" INTEGER NOT NULL,
    "characterId" INTEGER NOT NULL,
    "illustrationId" INTEGER NOT NULL,

    CONSTRAINT "coordinates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Leaderboard" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "time" INTEGER NOT NULL,

    CONSTRAINT "Leaderboard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "illustrations" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "imgPath" TEXT NOT NULL,

    CONSTRAINT "illustrations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CharacterToIllustration" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_CharacterToIllustration_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_CharacterToIllustration_B_index" ON "_CharacterToIllustration"("B");

-- AddForeignKey
ALTER TABLE "coordinates" ADD CONSTRAINT "coordinates_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "characters"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "coordinates" ADD CONSTRAINT "coordinates_illustrationId_fkey" FOREIGN KEY ("illustrationId") REFERENCES "illustrations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CharacterToIllustration" ADD CONSTRAINT "_CharacterToIllustration_A_fkey" FOREIGN KEY ("A") REFERENCES "characters"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CharacterToIllustration" ADD CONSTRAINT "_CharacterToIllustration_B_fkey" FOREIGN KEY ("B") REFERENCES "illustrations"("id") ON DELETE CASCADE ON UPDATE CASCADE;
