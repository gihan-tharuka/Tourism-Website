import { vehicles } from '@/data/vehicles'
import type { Vehicle } from '@/types/vehicle'

export const getVehicles = async (): Promise<Vehicle[]> => {
  return vehicles
}

export const estimateVehicleForPassengers = async (passengers: number): Promise<Vehicle | undefined> => {
  return vehicles.find((vehicle) => vehicle.capacity >= passengers)
}
