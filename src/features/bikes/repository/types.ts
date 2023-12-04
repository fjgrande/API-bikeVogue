import { type BikeStructure } from "../types";

export interface BikesRepository {
  getBikes: () => Promise<BikeStructure[]>;
  getBikesById: (id: string) => Promise<BikeStructure>;
  deleteBike: (id: string) => Promise<void>;
}
