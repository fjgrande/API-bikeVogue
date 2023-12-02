import { type NextFunction, type Request, type Response } from "express";
import { type BikesRepository } from "../repository/types";
import CustomError from "../../../server/CustomError/CustomError.js";

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
    } catch {
      const bikeError = new CustomError("Can't get bike", 404);

      next(bikeError);
    }
  };
}

export default BikesController;
