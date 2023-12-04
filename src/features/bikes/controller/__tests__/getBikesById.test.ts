import { type NextFunction, type Request, type Response } from "express";
import bikesMocks from "../../mocks/bikesMocks";
import { type BikesRepository } from "../../repository/types";
import BikesController from "../BikesController";
import { type BikeData } from "../../types";
import Bike from "../../model/Bike";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given a getBikesById controller", () => {
  const bikes: BikeData[] = bikesMocks;

  const bikesRepository: BikesRepository = {
    getBikes: jest.fn().mockResolvedValue(bikes),
    getBikesById: jest.fn().mockResolvedValue(bikes[0]),
    deleteBike: jest.fn(),
  };

  const bikesController = new BikesController(bikesRepository);

  describe("When it receives a request with a valid id on its body, a response and a next function", () => {
    const idBike = "6564a20f803b820996b50a00";

    const req: Partial<Request> = {
      params: { id: idBike },
    };

    const res: Pick<Response, "status" | "json"> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const next = jest.fn();

    test("Then it should call the response's method status with 200 and the bike that corresponds to that id", async () => {
      const expectedBike = bikesMocks[0];
      const expectedStatusCode = 200;

      Bike.findById = jest
        .fn()
        .mockReturnValue(jest.fn().mockResolvedValue(expectedBike));

      await bikesController.getBikesById(
        req as Request<{ id: string }>,
        res as Response,
        next as NextFunction,
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
      expect(res.json).toHaveBeenCalledWith(expectedBike);
    });
  });
});
