import { prisma } from "../config/prisma";
import { AppError } from "../utils/api-response";

type EstimateInput = {
  pickup: string;
  dropoff: string;
  passengers: number;
};

const getVehicleRecommendation = (passengers: number) => {
  if (passengers <= 2) {
    return { recommendedVehicle: "Sedan", passengerMultiplier: 1.0 };
  }

  if (passengers <= 5) {
    return { recommendedVehicle: "SUV", passengerMultiplier: 1.15 };
  }

  if (passengers <= 9) {
    return { recommendedVehicle: "Van", passengerMultiplier: 1.25 };
  }

  if (passengers <= 14) {
    return { recommendedVehicle: "Mini Coach", passengerMultiplier: 1.4 };
  }

  return { recommendedVehicle: "Large Coach", passengerMultiplier: 1.5 };
};

export const getTransferLocations = () => {
  return prisma.transferLocation.findMany({
    orderBy: [{ type: "asc" }, { name: "asc" }],
  });
};

export const getTransferRoutes = () => {
  return prisma.transferRoute.findMany({
    include: {
      pickupLocation: true,
      dropoffLocation: true,
    },
    orderBy: [{ pickupLocation: { name: "asc" } }, { dropoffLocation: { name: "asc" } }],
  });
};

export const getTransferEstimate = async ({ pickup, dropoff, passengers }: EstimateInput) => {
  if (pickup === dropoff) {
    throw new AppError("Pickup and dropoff locations must be different", 400);
  }

  const route = await prisma.transferRoute.findFirst({
    where: {
      pickupLocation: { slug: pickup },
      dropoffLocation: { slug: dropoff },
    },
    include: {
      pickupLocation: true,
      dropoffLocation: true,
    },
  });

  if (!route) {
    throw new AppError("Transfer route not found", 404);
  }

  const { passengerMultiplier, recommendedVehicle } = getVehicleRecommendation(passengers);
  const basePrice = Number(route.basePrice);
  const estimatedPrice = Math.round(basePrice * passengerMultiplier);

  return {
    pickup: route.pickupLocation,
    dropoff: route.dropoffLocation,
    distanceKm: route.distanceKm,
    estimatedDuration: route.estimatedDuration,
    basePrice,
    passengerMultiplier,
    estimatedPrice,
    recommendedVehicle,
    recommendedStops: route.recommendedStops,
  };
};
