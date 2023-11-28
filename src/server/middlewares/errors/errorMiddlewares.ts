import { type NextFunction, type Request, type Response } from "express";
import CustomError from "../../CustomError/CustomError.js";
import debugCreator from "debug";
import chalk from "chalk";

const debug = debugCreator("bikevogue:middleware:errors");

export const generalError = (
  error: CustomError,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const statusCode = error.statusCode ?? 500;
  const privateMessage = error.publicMessage ?? error.message;
  debug(chalk.redBright("Error: ", privateMessage));
  res.status(statusCode).json({ error: privateMessage });
};

export const endpointNotFound = (
  _req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const customError = new CustomError("Endpoint not found", 404);
  next(customError);
};
