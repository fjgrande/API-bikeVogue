import "dotenv/config";
import chalk from "chalk";
import express from "express";
import createDebug from "debug";

const debug = createDebug("bikevogue:conection-port");

const app = express();

app.disable("x-powered-by");

export const startServer = (port: number) => {
  app.listen(port, () => {
    debug(chalk.blue(`Listening on http://localhost:${port}`));
  });
};

export default app;
