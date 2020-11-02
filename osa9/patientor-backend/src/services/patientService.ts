import patients from "./data/patients";
import Patient from "../types/Patient";
import { PatientNoSSN } from "../types/PatientNoSSN";
import { NewPatient } from "../types/NewPatient";

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

export const addPatient = (entry: NewPatient): PatientNoSSN => {
  const newPatient = {
    id: makeId(),
    ...entry,
  };
  patientsEntries.push(newPatient);
  return newPatient;
};

const makeId = (): string => {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < charactersLength; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};
