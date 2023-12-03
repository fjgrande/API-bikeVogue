import { type NextFunction, type Request, type Response } from "express";
import bikesMocks from "../../mocks/bikesMocks";
import { type BikesRepository } from "../../repository/types";
import BikesController from "../BikesController";
import { type BikeData } from "../../types";
import Bike from "../../model/Bike";
import CustomError from "../../../../server/CustomError/CustomError";

describe("Given a getBikesById controller", () => {
  const bikes: BikeData[] = bikesMocks;

  const bikesRepository: BikesRepository = {
    getBikes: jest.fn().mockResolvedValue(bikes),
    getBikesById: jest
      .fn()
      .mockRejectedValue(new CustomError("Can't get bike", 404)),
  };

  const bikesController = new BikesController(bikesRepository);

  describe("When it receives a request with ann invalid id on its body, a response and a next function", () => {
    const idBike = "idInvalid";
    const req: Partial<Request> = {
      params: { id: idBike },
    };

    const res: Pick<Response, "status" | "json"> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const next = jest.fn();

    test("Then it should call the next function with the error message 'Can't get bike' ", async () => {
      const expectedError = new CustomError("Can't get bike", 404);

      Bike.findById = jest
        .fn()
        .mockReturnValue(jest.fn().mockRejectedValue(expectedError));

      await bikesController.getBikesById(
        req as Request<{ id: string }>,
        res as Response,
        next as NextFunction,
      );

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});
