import chalk from "chalk";
import "./server/index.js";
import createDebug from "debug";
import { connectToDatabase } from "./database/index.js";
import { startServer } from "./server/app.js";

const debug = createDebug("bikevogue:startServer");

const port = process.env.PORT ?? 4000;

if (!process.env.MONGODB_URL) {
  debug(chalk.red("Missing conecction database"));
  process.exit();
}

const mongoUrl = process.env.MONGODB_URL;

await connectToDatabase(mongoUrl);
startServer(+port);
