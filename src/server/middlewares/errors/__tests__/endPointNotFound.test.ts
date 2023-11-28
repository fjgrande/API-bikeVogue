import { type NextFunction, type Request, type Response } from "express";
import { endpointNotFound } from "../errorMiddlewares";
import type CustomError from "../../../CustomError/CustomError";

describe("Given a notFoundError middleware", () => {
  describe("When it receives a next function", () => {
    test("Then it should call the next function with a status 404 and an error 'Endpoint not found", () => {
      const req = {};
      const res = {};
      const next = jest.fn();

      const expectedError: Pick<CustomError, "statusCode" | "message"> = {
        statusCode: 404,
        message: "Endpoint not found",
      };

      endpointNotFound(req as Request, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalledWith(expect.objectContaining(expectedError));
    });
  });
});
