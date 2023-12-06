import { Router } from "express";
import BikesMongooseRepository from "../repository/BikesMongooseRepository.js";
import BikesController from "../controller/BikesController.js";

const bikesRouter = Router();
const bikesRepository = new BikesMongooseRepository();
const bikesController = new BikesController(bikesRepository);

bikesRouter.get("/", bikesController.getBikes);
bikesRouter.get("/:id", bikesController.getBikesById);
bikesRouter.delete("/delete/:id", bikesController.deleteBike);
bikesRouter.post("/add", bikesController.addBike);

export default bikesRouter;
