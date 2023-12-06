import CustomError from "../../../server/CustomError/CustomError.js";
import Bike from "../model/Bike.js";
import { type BikeData, type BikeStructure } from "../types";
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
        throw new Error("Can't get bike");
      }

      return bike;
    } catch (error) {
      throw new CustomError("Error getting the bike", 404);
    }
  }

  public async deleteBike(id: string): Promise<void> {
    try {
      await Bike.findByIdAndDelete(id);
    } catch (error) {
      throw new CustomError("Error deleting bike", 400);
    }
  }

  public async addBike(bike: BikeData): Promise<BikeStructure> {
    try {
      const newBike = await Bike.create(bike);
      return newBike;
    } catch (error) {
      throw new CustomError("Error creating the new bike", 400);
    }
  }
}

export default BikesMongooseRepository;
