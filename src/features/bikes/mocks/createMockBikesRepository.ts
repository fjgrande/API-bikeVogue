import type CustomError from "../../../server/CustomError/CustomError";
import { type BikesRepository } from "../repository/types";
import { updateBikeMock } from "./addBikeMock";
import bikesMocks from "./bikesMocks";

export const createMockBikesResolvedValue = (): BikesRepository => ({
  getBikes: jest.fn().mockResolvedValue(bikesMocks),
  getBikesById: jest.fn().mockResolvedValue(bikesMocks[0]),
  deleteBike: jest.fn(),
  addBike: jest.fn().mockResolvedValue(bikesMocks[0]),
  updateBike: jest.fn().mockResolvedValue(updateBikeMock),
});

export const createMockBikesRejectedValue = (
  error: CustomError,
): BikesRepository => ({
  getBikes: jest.fn().mockRejectedValue(error),
  getBikesById: jest.fn().mockRejectedValue(error),
  deleteBike: jest.fn().mockRejectedValue(error),
  addBike: jest.fn().mockRejectedValue(error),
  updateBike: jest.fn().mockRejectedValue(error),
});
