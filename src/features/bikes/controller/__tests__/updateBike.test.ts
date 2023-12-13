import { type NextFunction, type Request, type Response } from "express";
import { updateBikeMock } from "../../mocks/addBikeMock";
import bikesMocks from "../../mocks/bikesMocks";
import { type BikesRepository } from "../../repository/types";
import { type CustomUpdateRequest } from "../../types";
import BikesController from "../BikesController";
import Bike from "../../model/Bike";
import CustomError from "../../../../server/CustomError/CustomError";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given a updateBike controller", () => {
  const bikesRepository: BikesRepository = {
    getBikes: jest.fn(),
    getBikesById: jest.fn(),
    deleteBike: jest.fn(),
    addBike: jest.fn(),
    updateBike: jest.fn().mockResolvedValue(updateBikeMock),
  };

  const bikesController = new BikesController(bikesRepository);

  describe("When it receives a request with valid bike, a response and a next function", () => {
    const req: Partial<CustomUpdateRequest> = {
      body: bikesMocks[1],
    };
    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    test("Then it should  calls the response's method with status code 200", async () => {
      const expectStatusCode = 200;

      Bike.findByIdAndUpdate = jest
        .fn()
        .mockResolvedValue(jest.fn().mockResolvedValue(updateBikeMock));

      await bikesController.updateBike(
        req as CustomUpdateRequest,
        res as Response,
        next as NextFunction,
      );

      expect(res.status).toHaveBeenCalledWith(expectStatusCode);
    });

    test("Then it should call its method json with the message 'The bike has been update'", async () => {
      const expectedMessage = "The bike has been update";
      const expectedResult = {
        message: expectedMessage,
        modifyBike: updateBikeMock,
      };

      Bike.findByIdAndUpdate = jest
        .fn()
        .mockResolvedValue(jest.fn().mockResolvedValue(updateBikeMock));

      await bikesController.updateBike(
        req as CustomUpdateRequest,
        res as Response,
        next as NextFunction,
      );

      expect(res.json).toHaveBeenCalledWith(expectedResult);
    });
  });

  describe("When it receives invalid bike on its body, a response and a next function", () => {
    const req: Partial<CustomUpdateRequest> = {
      body: bikesMocks[1],
    };
    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();
    test("Then it should call the next function with the error message 'Can't update this bike' and status code '400'", async () => {
      const expectedError = new CustomError("Can't update this bike", 400);
      const bikesRepository: BikesRepository = {
        getBikes: jest.fn(),
        getBikesById: jest.fn(),
        deleteBike: jest.fn(),
        addBike: jest.fn(),
        updateBike: jest.fn().mockRejectedValue(expectedError),
      };

      const bikesController = new BikesController(bikesRepository);

      Bike.findByIdAndUpdate = jest
        .fn()
        .mockReturnValue(jest.fn().mockRejectedValue(expectedError));

      await bikesController.updateBike(
        req as CustomUpdateRequest,
        res as Response,
        next as NextFunction,
      );

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});
