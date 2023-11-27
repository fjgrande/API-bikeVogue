import morgan from "morgan";
import app from "./app.js";
import express from "express";
import cors from "cors";

const allowedOrigins = [
  "http://localhost:5173",
  "https://francisco-grande-202309-bcn-front.netlify.app/",
];

const options: cors.CorsOptions = {
  origin: allowedOrigins,
};

app.use(morgan("dev"));

app.use(cors(options));

app.use(express.json());
