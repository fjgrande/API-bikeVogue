import { type Request, type Response } from "express";
import { type BikesRepository } from "../repository/types";

class BikesController {
  constructor(private readonly bikesRepository: BikesRepository) {}

  public getBikes = async (req: Request, res: Response): Promise<void> => {
    const bikes = await this.bikesRepository.getBikes();

    res.status(200).json({ bikes });
  };
}

export default BikesController;
