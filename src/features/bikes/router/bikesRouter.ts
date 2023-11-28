import { Router } from "express";
import BikesMongooseRepository from "../repository/BikesMongooseRepository.js";
import BikesController from "../controller/BikesController.js";

const bikesRouter = Router();

const bikesRepository = new BikesMongooseRepository();

const bikesController = new BikesController(bikesRepository);

bikesRouter.get("/", bikesController.getBikes);

export default bikesRouter;
