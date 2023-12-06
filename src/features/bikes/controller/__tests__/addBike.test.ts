import { type NextFunction, type Request, type Response } from "express";
import { addBikeMock } from "../../mocks/addBikeMock";
import { type BikesRepository } from "../../repository/types";
import { type CustomRequest } from "../../types";
import BikesController from "../BikesController";
import bikesMocks from "../../mocks/bikesMocks";

describe("Given a addBike controller", () => {
  const bikesRepository: BikesRepository = {
    getBikes: jest.fn(),
    getBikesById: jest.fn(),
    deleteBike: jest.fn(),
    addBike: jest.fn().mockResolvedValue(bikesMocks[0]),
  };

  const bikesController = new BikesController(bikesRepository);

  describe("When it receives a request with a valid bike on its body, a response and a next function", () => {
    const req: Partial<CustomRequest> = {
      body: addBikeMock,
    };
    const res: Pick<Response, "status" | "json"> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    test("Then ist should calls the response's method with status code 201", async () => {
      const expectedStatusCode = 201;

      await bikesController.addBike(
        req as CustomRequest,
        res as Response,
        next as NextFunction,
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call its method json with the message 'The bike has been created' and the bike created", async () => {
      const expectedMessage = "The bike has been created";
      const expectedResult = {
        addedBike: bikesMocks[0],
        message: expectedMessage,
      };

      await bikesController.addBike(
        req as CustomRequest,
        res as Response,
        next as NextFunction,
      );

      expect(res.json).toHaveBeenCalledWith(expectedResult);
    });
  });

  describe("When it receives an invalid bike on its body, a response  and a next function", () => {
    const req: Partial<CustomRequest> = {
      body: addBikeMock,
    };

    const res: Pick<Response, "status" | "json"> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const next = jest.fn();

    test("Then it should call the next function with the message 'Error creating the new bike'", async () => {
      const expectedErrorMessage = "Error creating the new bike";

      const bikesRepository: BikesRepository = {
        getBikes: jest.fn(),
        getBikesById: jest.fn(),
        deleteBike: jest.fn(),
        addBike: jest.fn().mockRejectedValue(expectedErrorMessage),
      };

      const bikesController = new BikesController(bikesRepository);

      await bikesController.addBike(
        req as CustomRequest,
        res as Response,
        next as NextFunction,
      );

      expect(next).toHaveBeenCalledWith(expectedErrorMessage);
    });
  });
});
