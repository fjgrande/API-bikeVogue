import { Types } from "mongoose";
import { type BikeStructure, type BikeData } from "../types";

export const addBikeMock: BikeData = {
  model: "Orbea Orca M31ETEAM 23",
  image: "https://i.ibb.co/j656J8V/8.webp",
  price: 3.299,
  brand: "Orbea",
  material: "Carbono",
  modality: "Road",
  size: "M",
  component: "Sram Rival",
};

export const updateBikeMock: BikeStructure = {
  _id: new Types.ObjectId("6564a20f803b820996b509ff"),
  model: "Orbea Orca M30 24",
  image: "https://i.ibb.co/CKvhpYg/6.webp",
  price: 2.599,
  brand: "Giant",
  material: "Aluminio",
  modality: "Mtb",
  size: "L",
  component: "Shimano 105",
};

export const badUpdateBikeMock: BikeStructure = {
  _id: new Types.ObjectId("6564a20f803b820996b509ff"),
  model: "Orbea Orca M30 24",
  image: "https://i.ibb.co/CKvhpYg/6.webp",
  price: 2.599,
  brand: "Giant",
  material: "Aluminio",
  modality: "Mtb",
  size: "L",
  component: "Shimano 105",
};
