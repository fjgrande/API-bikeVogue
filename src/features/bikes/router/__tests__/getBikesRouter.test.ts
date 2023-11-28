import app from "../../../../server/app";
import "../../../../server/index";
import "../../../../setupTests";
import bikesMocks from "../../mocks/bikesMocks";
import Bike from "../../model/Bike";
import request from "supertest";
import { type BikeStructure } from "../../types";

describe("Given a Get '/bikes' endpoint", () => {
  describe("When it receives a request", () => {
    test("Then it should respond with status code 200 and list of bikes", async () => {
      const expectedStatusCode = 200;
      const path = "/bikes";

      await Bike.create(bikesMocks[0]);
      await Bike.create(bikesMocks[1]);

      const response = await request(app).get(path).expect(expectedStatusCode);

      const responseBody = (await response.body) as { bikes: BikeStructure[] };

      responseBody.bikes.forEach((bike, bikePosition) => {
        expect(bike).toHaveProperty("model", bikesMocks[bikePosition].model);
      });
    });
  });
});
