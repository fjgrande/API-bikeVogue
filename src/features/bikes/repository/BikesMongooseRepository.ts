import Bike from "../model/Bike.js";
import { type BikeStructure } from "../types";
import { type BikesRepository } from "./types";

class BikesMongooseRepository implements BikesRepository {
  public async getBikes(): Promise<BikeStructure[]> {
    const bikes = await Bike.find().limit(10);

    return bikes;
  }
}

export default BikesMongooseRepository;
