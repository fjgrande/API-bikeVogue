import chalk from "chalk";
import mongoose from "mongoose";
import createDebug from "debug";

const debug = createDebug("bikevogue:conection-database");

export const connectToDatabase = async (mongoUrl: string) => {
  try {
    await mongoose.connect(mongoUrl);
    mongoose.set("debug", true);
    debug(chalk.blue("Connected to databse"));
  } catch (error) {
    debug(chalk.red("Falided connecting to database"));
  }
};
