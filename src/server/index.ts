import morgan from "morgan";
import app from "./app.js";
import express from "express";
import cors from "cors";
import pingRouter from "../features/ping/router/pingRouter.js";
import {
  endpointNotFound,
  generalError,
} from "./middlewares/errors/errorMiddlewares.js";
import bikesRouter from "../features/bikes/router/bikesRouter.js";

const allowedOrigins = [
  process.env.ALLOWED_ORIGIN_DEV!,
  process.env.ALLOWED_ORIGIN_PROD!,
];

const options: cors.CorsOptions = {
  origin: allowedOrigins,
};

app.use(morgan("dev"));

app.use(cors(options));

app.use(express.json());

app.use("/bikes", bikesRouter);

app.use("/", pingRouter);

app.use(endpointNotFound);

app.use(generalError);
