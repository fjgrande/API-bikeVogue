import { type NextFunction, type Request, type Response } from "express";
import { type BikesRepository } from "../repository/types";
import { type BikeData, type CustomRequest } from "../types";

class BikesController {
  constructor(private readonly bikesRepository: BikesRepository) {}

  public getBikes = async (_req: Request, res: Response): Promise<void> => {
    const bikes = await this.bikesRepository.getBikes();

    res.status(200).json({ bikes });
  };

  public getBikesById = async (
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction,
  ) => {
    const { id } = req.params;
    try {
      const bike = await this.bikesRepository.getBikesById(id);

      res.status(200).json(bike);
    } catch (error) {
      next(error);
    }
  };

  public deleteBike = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const { id } = req.params;
    try {
      await this.bikesRepository.deleteBike(id);

      res.status(200).json({ message: "The bike has been deleted" });
    } catch (error) {
      next(error);
    }
  };

  public addBike = async (
    req: CustomRequest,
    res: Response,
    next: NextFunction,
  ) => {
    const newBike: BikeData = req.body;
    try {
      const addedBike = await this.bikesRepository.addBike(newBike);

      res.status(201).json({ message: "The bike has been created", addedBike });
    } catch (error) {
      next(error);
    }
  };
}

export default BikesController;
