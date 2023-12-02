import { Types } from "mongoose";
import { type BikeStructure } from "../types";

const bikesMockById: BikeStructure[] = [
  {
    _id: new Types.ObjectId("6564a20f803b820996b50a00"),
    model: "Orbea Orca M31ETEAM 23",
    image: "https://i.ibb.co/j656J8V/8.webp",
    price: 3.299,
    brand: "Orbea",
    material: "Carbono",
    modality: "Road",
    size: "M",
    component: "Sram Rival",
  },
  {
    _id: new Types.ObjectId("6564a20f803b820996b509ff"),
    model: "Orbea Orca M30 24",
    image: "https://i.ibb.co/CKvhpYg/6.webp",
    price: 2.599,
    brand: "Orbea",
    material: "Carbono",
    modality: "Road",
    size: "L",
    component: "Shimano 105",
  },
];

export default bikesMockById;
