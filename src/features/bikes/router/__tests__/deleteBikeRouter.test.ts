import app from "../../../../server/app";
import "../../../../server/index";
import "../../../../setupTests";
import request from "supertest";

describe("Given DELETE method '/bikes/delete/:id' endpoint", () => {
  describe("When it receives a request with a correct bike id", () => {
    test("Then it should respond with a 200 status code and method json with message 'The bike has been deleted ' ", async () => {
      const path = "/bikes/delete/6564a20f803b820996b50a00";
      const expectedStatusCode = 200;

      const response = await request(app)
        .delete(path)
        .expect(expectedStatusCode);

      expect(response.body).toStrictEqual({
        message: "The bike has been deleted",
      });
    });
  });

  describe("When it receives a request with a non-existent id '5fbd2a81f4b3c9a'", () => {
    test("Then it should return a response with 400 status code and 'Error deleting bike' error message", async () => {
      const expectedStatus = 400;
      const path = "/bikes/delete/5fbd2a81f4b3c9a";
      const expectedErrorMessage = "Error deleting bike";

      const response = await request(app).delete(path).expect(expectedStatus);

      expect(response.body).toHaveProperty("error", expectedErrorMessage);
    });
  });
});
