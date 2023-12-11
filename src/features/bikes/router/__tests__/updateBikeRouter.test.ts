import app from "../../../../server/app";
import "../../../../server/index";
import "../../../../setupTests";
import request from "supertest";
import { badUpdateBikeMock, updateBikeMock } from "../../mocks/addBikeMock";
import Bike from "../../model/Bike";
import bikesMocks from "../../mocks/bikesMocks";

describe("Given a PUT method '/bikes' endpoint", () => {
  describe("When it receives a valid bike in the body's request", () => {
    test("Then it should call the response's with status code 200, the message 'The bike has been update' and the bike updated", async () => {
      const path = "/bikes";
      const expectedStatusCode = 200;
      const expectedMessage = "The bike has been update";
      const updateBike = updateBikeMock;

      await Bike.create(updateBike);

      const response = await request(app)
        .put(path)
        .send(updateBike)
        .expect(expectedStatusCode);

      expect(response.body.message).toStrictEqual(expectedMessage);
    });
  });

  describe("When it receives a bad request", () => {
    test("Then it should return status code 400 and 'Error update the new bike' message", async () => {
      const expectedStatus = 400;
      const path = "/bikes";
      const expectedErrorMessage = "Error update the new bike";

      const response = await request(app)
        .put(path)
        .set(badUpdateBikeMock)
        .expect(expectedStatus);

      expect(response.body).toHaveProperty("error", expectedErrorMessage);
    });
  });
});
