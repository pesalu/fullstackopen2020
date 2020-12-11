import { Patient } from "./Patient";

export type PatientNoSSN = Omit<Patient, "ssn">;
