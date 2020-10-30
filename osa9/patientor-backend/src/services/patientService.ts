import patients from "./data/patients";
import Patient from "../types/Patient";
import { PatientNoSSN } from "../types/PatientNoSSN";

const patientsEntries: Array<Patient> = patients;

export const getAllPatients = (): Array<PatientNoSSN> => {
  return patientsEntries.map(
    ({ id, name, dateOfBirth, gender, occupation }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
    })
  );
};
