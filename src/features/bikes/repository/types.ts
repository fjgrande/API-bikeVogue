import { type BikeData, type BikeStructure } from "../types";

export interface BikesRepository {
  getBikes: () => Promise<BikeStructure[]>;
  getBikesById: (id: string) => Promise<BikeStructure>;
  deleteBike: (id: string) => Promise<void>;
  addBike: (bike: BikeData) => Promise<BikeStructure>;
}
