import app from "../../../../server/app";
import "../../../../server/index";
import "../../../../setupTests";
import request from "supertest";
import { addBikeMock } from "../../mocks/addBikeMock";

describe("Given a POST method '/bikes/add' endpoint", () => {
  describe("When it receives a valid bike in the body's request", () => {
    test("Then it should call the response's method status code with 201 and the 'The bike has been created' message", async () => {
      const path = "/bikes/add";
      const expectedStatus = 201;
      const expectedMessage = "The bike has been created";

      const response = await request(app)
        .post(path)
        .send(addBikeMock)
        .expect(expectedStatus);

      expect(response.body.message).toStrictEqual(expectedMessage);
    });

    test("Then it should the response method status code 201 and the new bike created", async () => {
      const path = "/bikes/add";
      const expectedStatus = 201;
      const expectedNewBikeProperty = "addedBike";

      const response = await request(app)
        .post(path)
        .send(addBikeMock)
        .expect(expectedStatus);

      expect(response.body).toHaveProperty(expectedNewBikeProperty);
    });
  });

  describe("When it receives an invalid bike in the body's request", () => {
    test("Then it should call the response's method 400 and the message 'Error creating the new bike'", async () => {
      const path = "/bikes/add";
      const expectedStatus = 400;
      const expectedMessage = "Error creating the new bike";
      const invalidBike = {};

      const response = await request(app)
        .post(path)
        .send(invalidBike)
        .expect(expectedStatus);

      expect(response.body).toHaveProperty("error", expectedMessage);
    });
  });
});
