import {
  Discharge,
  HealthCheckRating,
  NewEntry,
  sickLeave,
} from "../types/Entry";
import { Gender } from "../types/Gender";
import { NewPatient } from "../types/NewPatient";

import {
  isDate,
  isGender,
  isHealthCheckRating,
  isString,
} from "../utils/typeGuards";

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

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const toNewEntry = (entry: any): NewEntry => {
  const type: string = parseText(entry.type);
  switch (type) {
    case "HealthCheck":
      return {
        type: type,
        description: parseText(entry.description),
        date: parseDate(entry.date),
        specialist: parseText(entry.specialist),
        diagnosisCodes: parseDiagnosisCodes(entry.diagnosisCodes),
        healthCheckRating: parseHealthCheckRating(entry.healthCheckRating),
      } as NewEntry;
    case "Hospital":
      return {
        type: type,
        description: parseText(entry.description),
        date: parseDate(entry.date),
        specialist: parseText(entry.specialist),
        diagnosisCodes: parseDiagnosisCodes(entry.diagnosisCodes),
        discharge: parseDischarge(entry.discharge),
      } as NewEntry;
    case "OccupationalHealthcare":
      return {
        type: type,
        description: parseText(entry.description),
        date: parseDate(entry.date),
        specialist: parseText(entry.specialist),
        diagnosisCodes: parseDiagnosisCodes(entry.diagnosisCodes),
        employerName: parseText(entry.employerName),
        sickLeave: parseSickLeave(entry.sickLeave),
      } as NewEntry;
    default:
      throw new Error(`Given entry type ${type} is not allowed!`);
  }
};

const parseSickLeave = (sickLeave: any): sickLeave => {
  if (
    !sickLeave ||
    !isDate(sickLeave.startDate) ||
    !isDate(sickLeave.endDate)
  ) {
    throw new Error(`Sick-leave data invalid for given value`);
  } else {
    return sickLeave as sickLeave;
  }
};

const parseDischarge = (discharge: any): Discharge => {
  if (
    !discharge ||
    !isDate(discharge.date) ||
    !isString(discharge.description)
  ) {
    throw new Error(`Discharge data invalid for given value ${discharge}`);
  } else {
    return discharge as Discharge;
  }
};

const parseDiagnosisCodes = (diagnoses: any): Array<string> | undefined => {
  if (
    !diagnoses ||
    (diagnoses && Array.isArray(diagnoses) && diagnoses.length === 0)
  ) {
    return undefined;
  } else if (!isArrayOfStrings(diagnoses)) {
    throw new Error(
      `Some or all diagnosis codes are not of valid type! Given diagnosis codes: ${diagnoses}`
    );
  } else {
    return diagnoses as Array<string>;
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isArrayOfStrings = (object: any): boolean => {
  if (object && Array.isArray(object)) {
    let allValuesAreString = true;
    object.forEach((obj) => {
      if (typeof obj !== "string") {
        allValuesAreString = false;
      }
    });
    return allValuesAreString;
  } else {
    return false;
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseText = (text: any): string => {
  if (!text || !isString(text)) {
    throw new Error(`Name is incorrect or missing: ${text as string}`);
  }

  return text;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseDate = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error(
      `Value of date ${date as string} doesn't exist or it's invalid`
    );
  }

  return date;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error(
      `Value of gender ${gender as string} is invalid or missing.`
    );
  }

  return gender;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseHealthCheckRating = (rating: any): HealthCheckRating => {
  if (!rating || !isHealthCheckRating(rating)) {
    throw new Error(
      `Value ${rating as string} is invalid for health check rating. `
    );
  }
  return rating;
};
