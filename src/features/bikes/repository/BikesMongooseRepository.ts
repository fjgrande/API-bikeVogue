import Bike from "../model/Bike.js";
import { type BikeStructure } from "../types";
import { type BikesRepository } from "./types";

class BikesMongooseRepository implements BikesRepository {
  public async getBikes(): Promise<BikeStructure[]> {
    const bikes = await Bike.find().limit(10);

    return bikes;
  }

  public async getBikesById(id: string): Promise<BikeStructure> {
    const bike = await Bike.findById(id);

    if (!bike) {
      throw new Error("Can't get bike");
    }

    return bike;
  }
}

export default BikesMongooseRepository;
