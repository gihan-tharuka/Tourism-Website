-- CreateEnum
CREATE TYPE "InquiryStatus" AS ENUM ('NEW', 'CONTACTED', 'CONFIRMED', 'CANCELLED');

-- CreateTable
CREATE TABLE "contact_inquiries" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT,
    "whatsapp" TEXT NOT NULL,
    "country" TEXT,
    "inquiryType" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "status" "InquiryStatus" NOT NULL DEFAULT 'NEW',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "contact_inquiries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tour_inquiries" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT,
    "whatsapp" TEXT NOT NULL,
    "country" TEXT,
    "travelDate" TIMESTAMP(3),
    "passengerCount" INTEGER NOT NULL,
    "message" TEXT,
    "tourId" TEXT,
    "tourTitle" TEXT NOT NULL,
    "tourSlug" TEXT NOT NULL,
    "status" "InquiryStatus" NOT NULL DEFAULT 'NEW',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tour_inquiries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "custom_tour_inquiries" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT,
    "whatsapp" TEXT NOT NULL,
    "country" TEXT,
    "travelDate" TIMESTAMP(3),
    "duration" TEXT NOT NULL,
    "budget" TEXT NOT NULL,
    "passengerCount" INTEGER NOT NULL,
    "destinations" JSONB NOT NULL,
    "interests" JSONB,
    "message" TEXT,
    "status" "InquiryStatus" NOT NULL DEFAULT 'NEW',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "custom_tour_inquiries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transfer_inquiries" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT,
    "whatsapp" TEXT NOT NULL,
    "country" TEXT,
    "travelDate" TIMESTAMP(3),
    "pickupLocation" TEXT NOT NULL,
    "dropoffLocation" TEXT NOT NULL,
    "passengerCount" INTEGER NOT NULL,
    "estimatedVehicle" TEXT,
    "estimatedPrice" DECIMAL(10,2),
    "distanceKm" INTEGER,
    "message" TEXT,
    "status" "InquiryStatus" NOT NULL DEFAULT 'NEW',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "transfer_inquiries_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "contact_inquiries_status_idx" ON "contact_inquiries"("status");

-- CreateIndex
CREATE INDEX "contact_inquiries_createdAt_idx" ON "contact_inquiries"("createdAt");

-- CreateIndex
CREATE INDEX "tour_inquiries_status_idx" ON "tour_inquiries"("status");

-- CreateIndex
CREATE INDEX "tour_inquiries_tourId_idx" ON "tour_inquiries"("tourId");

-- CreateIndex
CREATE INDEX "tour_inquiries_tourSlug_idx" ON "tour_inquiries"("tourSlug");

-- CreateIndex
CREATE INDEX "tour_inquiries_createdAt_idx" ON "tour_inquiries"("createdAt");

-- CreateIndex
CREATE INDEX "custom_tour_inquiries_status_idx" ON "custom_tour_inquiries"("status");

-- CreateIndex
CREATE INDEX "custom_tour_inquiries_createdAt_idx" ON "custom_tour_inquiries"("createdAt");

-- CreateIndex
CREATE INDEX "transfer_inquiries_status_idx" ON "transfer_inquiries"("status");

-- CreateIndex
CREATE INDEX "transfer_inquiries_pickupLocation_idx" ON "transfer_inquiries"("pickupLocation");

-- CreateIndex
CREATE INDEX "transfer_inquiries_dropoffLocation_idx" ON "transfer_inquiries"("dropoffLocation");

-- CreateIndex
CREATE INDEX "transfer_inquiries_createdAt_idx" ON "transfer_inquiries"("createdAt");

-- AddForeignKey
ALTER TABLE "tour_inquiries" ADD CONSTRAINT "tour_inquiries_tourId_fkey" FOREIGN KEY ("tourId") REFERENCES "tours"("id") ON DELETE SET NULL ON UPDATE CASCADE;
