import { type BikeStructure } from "../types";

export interface BikesRepository {
  getBikes: () => Promise<BikeStructure[]>;
}
