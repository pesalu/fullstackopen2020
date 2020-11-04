import patients from "./data/patients";
import { PublicPatient, Patient } from "../types/Patient";
import { PatientNoSSN } from "../types/PatientNoSSN";
import { NewPatient } from "../types/NewPatient";
import { parseText } from "../utils/parsers";

const patientsEntries: Array<Patient> = patients;

export const getAllPatients = (): Array<PublicPatient> => {
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

export const getPatientById = (id: string): Patient => {
  const patient = patientsEntries.find((patient) => patient.id === id);
  if (patient && parseText(id)) {
    return patient;
  } else {
    throw new Error(`Patient by id ${id} not found!`);
  }
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
