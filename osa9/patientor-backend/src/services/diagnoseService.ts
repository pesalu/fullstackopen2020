import diagnoseData from "./data/diagnoses";
import { DiagnoseEntry } from "../types/Diagnose";

const diagnoses: Array<DiagnoseEntry> = diagnoseData;

export const getEntries = (): Array<DiagnoseEntry> => {
  return diagnoses;
};
