import { type Types } from "mongoose";
import { type Request } from "express";

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

export interface CustomRequest extends Request {
  body: BikeData;
}

export interface CustomUpdateRequest extends Request {
  body: BikeStructure;
}
