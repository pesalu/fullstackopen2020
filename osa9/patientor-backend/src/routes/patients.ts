import express from "express";
const patientRouter = express.Router();
import { getAllPatients } from "../services/patientService";

patientRouter.get("/", (_req, res) => {
  res.send(getAllPatients());
});

export default patientRouter;
