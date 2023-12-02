import app from "../../../../server/app";
import "../../../../server/index";
import "../../../../setupTests";
import request from "supertest";
import bikesMocks from "../../mocks/bikesMocks";
import Bike from "../../model/Bike";
import bikesMockById from "../../mocks/bikesMockById";

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
});
