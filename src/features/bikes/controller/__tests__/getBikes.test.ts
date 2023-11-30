import { type Request, type Response } from "express";
import bikesMocks from "../../mocks/bikesMocks";
import { type BikesRepository } from "../../repository/types";
import BikesController from "../BikesController";
import { type BikeData } from "../../types";

beforeEach(() => {
  jest.restoreAllMocks();
});

describe("Given a BikesController's getBikes method", () => {
  const bikes: BikeData[] = bikesMocks;

  const bikesRepository: BikesRepository = {
    getBikes: jest.fn().mockResolvedValue(bikes),
  };

  const bikesController = new BikesController(bikesRepository);

  describe("When it receives a request", () => {
    const req = {};
    const res: Pick<Response, "status" | "json"> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };

    test("Then it should call its method status with status code 200", async () => {
      const expectedStatusCode = 200;

      await bikesController.getBikes(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call the method json with collection of two bikes", async () => {
      const expectedCollection = bikesMocks;

      await bikesController.getBikes(req as Request, res as Response);

      expect(res.json).toHaveBeenCalledWith({ bikes: expectedCollection });
    });
  });
});
