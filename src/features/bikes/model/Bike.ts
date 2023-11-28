import { Schema, model } from "mongoose";
import { type BikeStructure } from "../types";

const bikeSchema = new Schema<BikeStructure>({
  model: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  material: {
    type: String,
    required: true,
  },
  modality: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  component: {
    type: String,
    required: true,
  },
});

const Bike = model("Bike", bikeSchema, "bikes");

export default Bike;
