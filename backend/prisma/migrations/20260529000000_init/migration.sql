-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateTable
CREATE TABLE "tours" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "durationDays" INTEGER NOT NULL,
    "shortDescription" TEXT NOT NULL,
    "overview" TEXT NOT NULL,
    "startingPrice" DECIMAL(10,2) NOT NULL,
    "priceMin" DECIMAL(10,2) NOT NULL,
    "priceMax" DECIMAL(10,2) NOT NULL,
    "bestSeason" TEXT NOT NULL,
    "groupSize" TEXT NOT NULL,
    "featuredImage" TEXT NOT NULL,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tours_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tour_images" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "alt" TEXT NOT NULL,
    "tourId" TEXT NOT NULL,

    CONSTRAINT "tour_images_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "itinerary_days" (
    "id" TEXT NOT NULL,
    "dayNumber" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "highlights" TEXT[],
    "tourId" TEXT NOT NULL,

    CONSTRAINT "itinerary_days_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "activities" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "estimatedPrice" DECIMAL(10,2),
    "tourId" TEXT,

    CONSTRAINT "activities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "destinations" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "highlights" TEXT[],
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "destinations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "testimonials" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "avatar" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "testimonials_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transfer_locations" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "transfer_locations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transfer_routes" (
    "id" TEXT NOT NULL,
    "pickupLocationId" TEXT NOT NULL,
    "dropoffLocationId" TEXT NOT NULL,
    "distanceKm" INTEGER NOT NULL,
    "basePrice" DECIMAL(10,2) NOT NULL,
    "estimatedDuration" TEXT NOT NULL,
    "recommendedStops" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "transfer_routes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_DestinationToTour" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_DestinationToTour_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "tours_slug_key" ON "tours"("slug");

-- CreateIndex
CREATE INDEX "tours_country_idx" ON "tours"("country");

-- CreateIndex
CREATE INDEX "tours_durationDays_idx" ON "tours"("durationDays");

-- CreateIndex
CREATE INDEX "tours_isFeatured_idx" ON "tours"("isFeatured");

-- CreateIndex
CREATE INDEX "tour_images_tourId_idx" ON "tour_images"("tourId");

-- CreateIndex
CREATE INDEX "itinerary_days_tourId_idx" ON "itinerary_days"("tourId");

-- CreateIndex
CREATE UNIQUE INDEX "itinerary_days_tourId_dayNumber_key" ON "itinerary_days"("tourId", "dayNumber");

-- CreateIndex
CREATE INDEX "activities_tourId_idx" ON "activities"("tourId");

-- CreateIndex
CREATE UNIQUE INDEX "destinations_slug_key" ON "destinations"("slug");

-- CreateIndex
CREATE INDEX "destinations_country_idx" ON "destinations"("country");

-- CreateIndex
CREATE INDEX "destinations_isFeatured_idx" ON "destinations"("isFeatured");

-- CreateIndex
CREATE INDEX "testimonials_isFeatured_idx" ON "testimonials"("isFeatured");

-- CreateIndex
CREATE UNIQUE INDEX "transfer_locations_slug_key" ON "transfer_locations"("slug");

-- CreateIndex
CREATE INDEX "transfer_locations_type_idx" ON "transfer_locations"("type");

-- CreateIndex
CREATE INDEX "transfer_routes_pickupLocationId_idx" ON "transfer_routes"("pickupLocationId");

-- CreateIndex
CREATE INDEX "transfer_routes_dropoffLocationId_idx" ON "transfer_routes"("dropoffLocationId");

-- CreateIndex
CREATE UNIQUE INDEX "transfer_routes_pickupLocationId_dropoffLocationId_key" ON "transfer_routes"("pickupLocationId", "dropoffLocationId");

-- CreateIndex
CREATE INDEX "_DestinationToTour_B_index" ON "_DestinationToTour"("B");

-- AddForeignKey
ALTER TABLE "tour_images" ADD CONSTRAINT "tour_images_tourId_fkey" FOREIGN KEY ("tourId") REFERENCES "tours"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "itinerary_days" ADD CONSTRAINT "itinerary_days_tourId_fkey" FOREIGN KEY ("tourId") REFERENCES "tours"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activities" ADD CONSTRAINT "activities_tourId_fkey" FOREIGN KEY ("tourId") REFERENCES "tours"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transfer_routes" ADD CONSTRAINT "transfer_routes_pickupLocationId_fkey" FOREIGN KEY ("pickupLocationId") REFERENCES "transfer_locations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transfer_routes" ADD CONSTRAINT "transfer_routes_dropoffLocationId_fkey" FOREIGN KEY ("dropoffLocationId") REFERENCES "transfer_locations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DestinationToTour" ADD CONSTRAINT "_DestinationToTour_A_fkey" FOREIGN KEY ("A") REFERENCES "destinations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DestinationToTour" ADD CONSTRAINT "_DestinationToTour_B_fkey" FOREIGN KEY ("B") REFERENCES "tours"("id") ON DELETE CASCADE ON UPDATE CASCADE;
