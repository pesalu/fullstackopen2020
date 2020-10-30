import express from "express";
const diagnoseRouter = express.Router();
import { getEntries } from "../services/diagnoseService";

diagnoseRouter.get("/", (_req, res) => {
  const diagnoses = getEntries();
  res.send(diagnoses);
});

export default diagnoseRouter;
