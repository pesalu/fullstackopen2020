/* eslint-disable @typescript-eslint/no-explicit-any */
import { Gender } from "../types/Gender";

export const isString = (text: any): text is string => {
  return typeof text === "string" || text instanceof String;
};

export const isDate = (date: any): boolean => {
  return Boolean(Date.parse(date));
};

export const isGender = (gender: any): gender is Gender => {
  return Object.values(Gender).includes(gender);
};
