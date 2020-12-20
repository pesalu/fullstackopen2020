import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";
import { useStateValue } from "../state";

import { TextField, DiagnosisSelection } from "./FormField";
import { HospitalEntry } from "../types";

/*
 * use type Entry, but omit id,
 * because those are irrelevant for new entry object.
 */
export type EntryFormValues = Omit<HospitalEntry, "id">;

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

export const AddEntryForm: React.FC<Props> = ({ onSubmit }) => {
  const [{ diagnoses }] = useStateValue();

  function dateIsInvalid(date: string) {
    if (!date) {
      return "Field is required";
    } else if (date !== null) {
      // eslint-disable-next-line @typescript-eslint/prefer-regexp-exec
      const match = date.match(
        /^\d{4}[\/\-](0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])$/
      );
      if (!match) {
        return "invalid date";
      }
    }

    return null;
  }

  return (
    <Formik
      initialValues={{
        type: "Hospital",
        description: "",
        date: "",
        specialist: "",
        diagnosisCodes: [],
        discharge: {
          date: "",
          criteria: "",
        },
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string | any } = {};

        if (dateIsInvalid(values.date)) {
          errors.date = dateIsInvalid(values.date);
        }

        const discharge: any = values.discharge;
        if (dateIsInvalid(discharge.date) || !discharge.criteria) {
          errors.discharge = {
            date: dateIsInvalid(discharge.date),
            criteria: discharge.criteria ? null : requiredError,
          };
        }

        if (!values.type) {
          errors.type = requiredError;
        }
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }

        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />

            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />

            <Field
              label="Description"
              placeholder="Give description"
              name="description"
              component={TextField}
            />

            <Field
              label="Specialist"
              placeholder="specialist"
              name="specialist"
              component={TextField}
            />

            <Field
              label="Discharge criteria"
              placeholder="Give discharge criteria"
              name="discharge.criteria"
              component={TextField}
            />
            <Field
              label="Discharge date"
              placeholder="YYYY-MM-DD"
              name="discharge.date"
              component={TextField}
            />

            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button
                  type="button"
                  onClick={() => {
                    console.log("cancel");
                  }}
                  color="red"
                >
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add Entry 2 {dirty} {isValid}
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;
