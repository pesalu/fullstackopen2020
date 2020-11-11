/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { HealthCheckRating } from "../types/Entry";
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

export const isHealthCheckRating = (
  rating: any
): rating is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(rating);
};
