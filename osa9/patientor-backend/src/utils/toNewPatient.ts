import { Gender } from "../types/Gender";
import { NewPatient } from "../types/NewPatient";

import { isDate, isGender, isString } from "../utils/typeGuards";

// eslint-disable @typescript-eslint/no-explicit-any
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toNewPatient = (object: any): NewPatient => {
  return {
    name: parseText(object.name),
    dateOfBirth: parseDate(object.dateOfBirth),
    ssn: parseText(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseText(object.occupation),
    entries: [],
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseText = (text: any): string => {
  if (!text || !isString(text)) {
    throw new Error("Name is incorrect or missing: " + text);
  }

  return text;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseDate = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error(`Value of date ${date} doesn't exist or it's invalid`);
  }

  return date;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error(`Value of gender ${gender} is invalid or missing.`);
  }

  return gender;
};
