import { type NextFunction, type Request, type Response } from "express";
import { type BikesRepository } from "../../repository/types";
import BikesController from "../BikesController";
import CustomError from "../../../../server/CustomError/CustomError";
import {
  createMockBikesRejectedValue,
  createMockBikesResolvedValue,
} from "../../mocks/createMockBikesRepository";
import { type ResponsePick } from "../../types";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given a deleteBike controller", () => {
  const bikesRepository: BikesRepository = createMockBikesResolvedValue();
  const bikesController = new BikesController(bikesRepository);

  describe("When it receives a request of for an existing bike", () => {
    test("Then it should call the response's method status with 200 status code", async () => {
      const expectedStatusCode = 200;
      const idBike = "6564a20f803b820996b50a00";

      const req: Partial<Request> = {
        params: { id: idBike },
      };

      const res: ResponsePick = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const next = jest.fn();

      await bikesController.deleteBike(
        req as Request<{ id: string }>,
        res as Response,
        next as NextFunction,
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call the response method json with message 'The bike has been deleted '", async () => {
      const expectedMessage = "The bike has been deleted";
      const idBike = "6564a20f803b820996b50a00";

      const req: Partial<Request> = {
        params: { id: idBike },
      };

      const res: ResponsePick = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const next = jest.fn();

      await bikesController.deleteBike(
        req as Request<{ id: string }>,
        res as Response,
        next as NextFunction,
      );

      expect(res.json).toHaveBeenCalledWith({
        message: expectedMessage,
      });
    });

    describe("When it receives a request with an incorrect bike id", () => {
      test("Then it should call the next function with the error", async () => {
        const expectedError = new CustomError("Error deleting bike", 400);
        const bikesRepository: BikesRepository =
          createMockBikesRejectedValue(expectedError);
        const bikesController = new BikesController(bikesRepository);
        const idBike = "invalidId";

        const req: Partial<Request> = {
          params: { id: idBike },
        };

        const res: ResponsePick = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn(),
        };

        const next = jest.fn();

        await bikesController.deleteBike(
          req as Request<{ id: string }>,
          res as Response,
          next as NextFunction,
        );

        expect(next).toHaveBeenCalledWith(expectedError);
      });
    });
  });
});
