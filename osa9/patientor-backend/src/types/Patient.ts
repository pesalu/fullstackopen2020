import { Gender } from "./Gender";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {}

export default interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries: Entry[];
}

export type PublicPatient = Omit<Patient, "ssn" | "entries">;
