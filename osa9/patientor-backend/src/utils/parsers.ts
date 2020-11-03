import { Gender } from "../types/Gender";
import { isDate, isGender, isString } from "./typeGuards";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const parseText = (text: any): string => {
  if (!text || !isString(text)) {
    throw new Error("Name is incorrect or missing: " + text);
  }

  return text;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const parseDate = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error(`Value of date ${date} doesn't exist or it's invalid`);
  }

  return date;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error(`Value of gender ${gender} is invalid or missing.`);
  }

  return gender;
};
