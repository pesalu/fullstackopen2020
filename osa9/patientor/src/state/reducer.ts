import { State } from "./state";
import { Diagnosis, Entry, Patient, PatientDetails } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "PATIENT_DETAILS_FETCHED";
      payload: PatientDetails;
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "ADD_ENTRY";
      payload: Entry;
    }
  | {
      type: "SET_DIAGNOSES";
      payload: Diagnosis[];
    };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients,
        },
      };
    case "PATIENT_DETAILS_FETCHED":
      return {
        ...state,
        patient: action.payload,
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload,
        },
      };
    case "ADD_ENTRY":
      console.log("HERE!!! ", action.payload);
      return {
        ...state,
        patient: {
          ...state.patient,
          entries: state.patient.entries.concat(action.payload),
        },
      };
    case "SET_DIAGNOSES":
      return {
        ...state,
        diagnoses: {
          ...action.payload.reduce(
            (prevDiagnoses, diagnosis) => ({
              ...prevDiagnoses,
              [diagnosis.code]: diagnosis,
            }),
            {}
          ),
        },
      };
    default:
      return state;
  }
};

export const setPatientList = (data: Patient[]): Action => {
  return {
    type: "SET_PATIENT_LIST",
    payload: data,
  };
};

export const setPatientDetails = (data: PatientDetails): Action => {
  return {
    type: "PATIENT_DETAILS_FETCHED",
    payload: data,
  };
};

export const updatePatientEntries = (data: Entry): Action => {
  return {
    type: "ADD_ENTRY",
    payload: data,
  };
};

export const setDiagnoses = (data: Diagnosis[]): Action => {
  return {
    type: "SET_DIAGNOSES",
    payload: data,
  };
};
