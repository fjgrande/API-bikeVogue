import app from "../../../../server/app";
import "../../../../server/index";
import "../../../../setupTests";
import request from "supertest";
import bikesMocks from "../../mocks/bikesMocks";
import Bike from "../../model/Bike";

describe("Given a GET '/bikes/ :id' endpoint", () => {
  describe("When it receives a valid id in the body's request", () => {
    test("Then it should responds with the bike that corresponds to that id", async () => {
      const expectedStatus = 200;
      const path = `/bikes/${bikesMocks[0]._id.toString()}`;

      await Bike.create(bikesMocks);
      const response = await request(app).get(path).expect(expectedStatus);

      expect(response.body).toHaveProperty("model");
    });
  });

  describe("When it receives a request with a non-existent id '5fbd2a81f4b3c96d58d32c9a'", () => {
    test("Then it should return a response with 404 status code and 'Can't get bike' error message", async () => {
      const expectedStatus = 404;
      const path = `/bikes/5fbd2a81f4b3c96d58d32c9a`;
      const expectedErrorMessage = "Can't get bike";

      const response = await request(app).get(path).expect(expectedStatus);

      expect(response.body).toHaveProperty("error", expectedErrorMessage);
    });
  });
});
