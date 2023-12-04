import CustomError from "../../../server/CustomError/CustomError.js";
import Bike from "../model/Bike.js";
import { type BikeStructure } from "../types";
import { type BikesRepository } from "./types";

class BikesMongooseRepository implements BikesRepository {
  public async getBikes(): Promise<BikeStructure[]> {
    const bikes = await Bike.find().limit(10);

    return bikes;
  }

  public async getBikesById(id: string): Promise<BikeStructure> {
    try {
      const bike = await Bike.findById(id);
      if (!bike) {
        throw new CustomError("Can't get bike", 404);
      }

      return bike;
    } catch (error) {
      throw new CustomError("Can't get bike", 404);
    }
  }

  public async deleteBike(id: string): Promise<void> {
    try {
      await Bike.findByIdAndDelete(id);
    } catch (error) {
      throw new CustomError("Error deleting bike", 400);
    }
  }
}

export default BikesMongooseRepository;
