import Patient from "./Patient";

export type NewPatient = Omit<Patient, "id">;
