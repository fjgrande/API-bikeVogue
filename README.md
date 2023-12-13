# BikeVogue Backend

BikeVogue Backend is a robust API developed with **Node.js**, **Express**, and **MongoDB**. This API serves as the backend for the BikeVogue Single Page Application, providing endpoints for managing a collection of bicycles. The API supports essential CRUD operations (Create, Read, Update, Delete) through well-defined endpoints.

For those interested in exploring the frontend code of the application, it is available at the following link: https://github.com/isdi-coders-2023/Francisco-Grande-Final-Project-front-202309-bcn

## Endpoints

1. **Get All Bikes**

   - Endpoint: "/bikes"
   - Method: GET
   - Description: Retrieves an array with all the bikes.

2. **Get Bike by ID**

   - Endpoint: "bikes/:id"
   - Method: GET
   - Description: Retrieves a specific bike based on its ID.

3. **Delete Bike**

   - Endpoint: "/bikes/delete/:id"
   - Method: DELETE
   - Description: Deletes a bike based on its ID.

4. **Add Bike**

   - Endpoint: "/bikes/add"
   - Method: POST
   - Description: Creates a new bike.

5. **Update Bike**
   - Endpoint: "/bikes"
   - Method: PUT
   - Description: Modifies an existing bike based on its ID.

## Technologies Used

- **jest**
- **typescript**
- **debug**
- **express**
- **mongoose**

## Testing

- Use Postman for manual testing of endpoints.
- Automated testing using Jest and Supertest is configured for maintaining code quality.

---

For more details on the frontend of BikeVogue, please visit: [BikeVogue Frontend](https://github.com/isdi-coders-2023/Francisco-Grande-Final-Project-front-202309-bcn)
