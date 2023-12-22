import { type NextFunction, type Request, type Response } from "express";
import bikesMocks from "../../mocks/bikesMocks";
import { type BikesRepository } from "../../repository/types";
import BikesController from "../BikesController";
import { type ResponsePick, type BikeData } from "../../types";
import Bike from "../../model/Bike";
import CustomError from "../../../../server/CustomError/CustomError";
import {
  createMockBikesRejectedValue,
  createMockBikesResolvedValue,
} from "../../mocks/createMockBikesRepository";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given a getBikesById controller", () => {
  const bikesRepository: BikesRepository = createMockBikesResolvedValue();
  const bikesController = new BikesController(bikesRepository);

  describe("When it receives a request with a valid id on its body, a response and a next function", () => {
    const idBike = "6564a20f803b820996b50a00";

    const req: Partial<Request> = {
      params: { id: idBike },
    };

    const res: ResponsePick = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const next = jest.fn();

    test("Then it should call the response method json with the bike", async () => {
      const expectedBike = bikesMocks[0];

      Bike.findById = jest
        .fn()
        .mockReturnValue(jest.fn().mockResolvedValue(expectedBike));

      await bikesController.getBikesById(
        req as Request<{ id: string }>,
        res as Response,
        next as NextFunction,
      );

      expect(res.json).toHaveBeenCalledWith({ myBike: expectedBike });
    });

    test("Then it should call the response's method status code with 200", async () => {
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
    });

    describe("When it receives a request with ann invalid id on its body, a response and a next function", () => {
      const expectedError = new CustomError("Can't get bike", 404);
      const bikesRepository: BikesRepository =
        createMockBikesRejectedValue(expectedError);
      const bikesController = new BikesController(bikesRepository);

      const idBike = "idInvalid";
      const req: Partial<Request> = {
        params: { id: idBike },
      };

      const res: ResponsePick = {
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
});
