import { type NextFunction, type Request, type Response } from "express";
import CustomError from "../../../CustomError/CustomError";
import { generalError } from "../errorMiddlewares";

describe("Given a generalError middleware", () => {
  const errorMessage = "Error";
  const req = {};
  const res: Pick<Response, "status" | "json"> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  const next = jest.fn();

  describe("When it receives a response's status code with 400", () => {
    test("Then it should response a 400 status code", () => {
      const expectedStatusCode = 400;
      const error = new CustomError(errorMessage, expectedStatusCode);

      generalError(
        error,
        req as Request,
        res as Response,
        next as NextFunction,
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    describe("When it receives a response and an error with status code", () => {
      test("Then it should call the response's status code with 500", () => {
        const expectedStatusCode = 500;
        const error = new Error("Error with status code");

        generalError(
          error as CustomError,
          req as Request,
          res as Response,
          next as NextFunction,
        );

        expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
      });
    });

    describe("When it receives a response with a error message 'Error'", () => {
      test("Then it should call the response's json function with 'Private error'", () => {
        const privateErrorMessage = "Private error";
        const error = new CustomError(privateErrorMessage, 400);

        generalError(
          error,
          req as Request,
          res as Response,
          next as NextFunction,
        );

        const errorBodyResponse = {
          error: privateErrorMessage,
        };

        expect(res.json).toHaveBeenCalledWith(errorBodyResponse);
      });
    });
  });
});
