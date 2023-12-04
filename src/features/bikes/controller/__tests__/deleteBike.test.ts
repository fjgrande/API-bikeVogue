import { type NextFunction, type Request, type Response } from "express";
import { type BikesRepository } from "../../repository/types";
import BikesController from "../BikesController";
import type CustomError from "../../../../server/CustomError/CustomError";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given a deleteBike controller", () => {
  const bikesRepository: BikesRepository = {
    getBikes: jest.fn(),
    getBikesById: jest.fn(),
    deleteBike: jest.fn(),
  };

  const bikesController = new BikesController(bikesRepository);

  describe("When it receives a request of for an existing bike", () => {
    test("Then it should call the response's method status with 200 status code and method json with message 'The bike has been deleted '", async () => {
      const expectedStatusCode = 200;
      const idBike = "6564a20f803b820996b50a00";

      const req: Partial<Request> = {
        params: { id: idBike },
      };

      const res: Pick<Response, "status" | "json"> = {
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
      expect(res.json).toHaveBeenCalledWith({
        message: "The bike has been deleted",
      });
    });
    describe("When it receives a request with an incorrect bike id", () => {
      test("Then it should call the next function with the error", async () => {
        const idBike = "invalidId";
        const expectedError: Partial<CustomError> = {
          message: "Error deleting bike",
          statusCode: 400,
        };

        const bikesRepository: BikesRepository = {
          getBikes: jest.fn(),
          getBikesById: jest.fn(),
          deleteBike: jest.fn().mockRejectedValue(expectedError),
        };

        const bikesController = new BikesController(bikesRepository);
        const req: Partial<Request> = {
          params: { id: idBike },
        };

        const res: Pick<Response, "status" | "json"> = {
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
