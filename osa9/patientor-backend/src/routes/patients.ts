/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from "express";
const patientRouter = express.Router();
import {
  getAllPatients,
  addPatient,
  getPatientById,
} from "../services/patientService";

import { toNewPatient } from "../utils/toNewPatient";

patientRouter.get("/", (_req, res) => {
  res.send(getAllPatients());
});

patientRouter.get("/:id", (req, res) => {
  try {
    res.json(getPatientById(req.params.id));
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    res.status(400).json({ error: error.message });
  }
});

patientRouter.post("/", (req, res) => {
  try {
    res.json(addPatient(toNewPatient(req.body)));
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    res.status(400).json({ error: error.message });
  }
});

export default patientRouter;
