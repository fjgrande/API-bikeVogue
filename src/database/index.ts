import chalk from "chalk";
import mongoose from "mongoose";
import createDebug from "debug";

const debug = createDebug("bikevogue:conection-database");

export const connectToDatabase = async (mongoUrl: string) => {
  try {
    await mongoose.connect(mongoUrl);
    mongoose.set("debug", true);
    debug(chalk.blue("Connected to databse"));
  } catch (error: unknown) {
    debug(
      `Failed connecting to database: ${chalk.red((error as Error).message)}`,
    );
  }
};
