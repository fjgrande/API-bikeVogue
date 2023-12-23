import { type Request, type Response } from "express";
import bikesMocks from "../../mocks/bikesMocks";
import { type BikesRepository } from "../../repository/types";
import BikesController from "../BikesController";
import { createMockBikesResolvedValue } from "../../mocks/createMockBikesRepository";
import { type ResponsePick } from "../../types";

beforeEach(() => {
  jest.restoreAllMocks();
});

const bikesRepository: BikesRepository = createMockBikesResolvedValue();
const bikesController = new BikesController(bikesRepository);

describe("Given a BikesController's getBikes method", () => {
  describe("When it receives a request", () => {
    const req = {};
    const res: ResponsePick = {
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
