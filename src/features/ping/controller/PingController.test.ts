import { type Request, type Response } from "express";
import PingController from "./PingController";

describe("Given a PingController's controller", () => {
  describe("When it receives a response", () => {
    const pingController = new PingController();
    const req = {};
    const res: Pick<Response, "status" | "json"> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    pingController.getPong(req as Request, res as Response);

    test("Then it should call its method status with 200 status code", () => {
      const expectedStatus = 200;

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });

    test("Then it should call its method json with message '🏓'", () => {
      const expectedMessage = { message: "🏓" };

      expect(res.json).toHaveBeenCalledWith(expectedMessage);
    });
  });
});
