import express from "express";
import {
  getPlacementTest,
  savePlacementTest,
} from "../controllers/placementTestController.js";

const Testrouter = express.Router();

Testrouter.get("/", getPlacementTest);
Testrouter.post("/", savePlacementTest);

export default Testrouter;