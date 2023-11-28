import { type Types } from "mongoose";

export interface BikeData {
  model: string;
  image: string;
  price: number;
  brand: string;
  material: string;
  modality: string;
  size: string;
  component: string;
}

export interface BikeStructure extends BikeData {
  _id: Types.ObjectId;
}
