import axios from "axios";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button, Card, CardGroup, Header, Icon } from "semantic-ui-react";
import { EntryFormValues } from "../AddPatientModal/AddEntryFrom";
import { apiBaseUrl } from "../constants";
import {
  setPatientDetails,
  updatePatientEntries,
  useStateValue,
} from "../state";
import { Diagnosis, Entry, HealthCheckRating, PatientDetails } from "../types";
import { AddEntryModal } from "./AddEntryModal";

const PatientDetailsView: React.FC = () => {
  const [{ diagnoses, patient }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  const openModal = (): void => setModalOpen(true);
  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      values = {
        type: "HealthCheck",
        description: "",
        date: "",
        specialist: "",
      };
      dispatch(updatePatientEntries(newEntry));
      closeModal();
    } catch (e) {
      console.error(e.response.data.error);
      setError(e.response.data.error);
    }
  };

  useEffect(() => {
    axios.get<PatientDetails>(`${apiBaseUrl}/patients/${id}`).then((result) => {
      dispatch(setPatientDetails(result.data));
    });
  }, [dispatch, id]);

  if (!patient) {
    return (
      <>
        <p>Cant render</p>
      </>
    );
  }

  return (
    <div>
      <Header>
        {patient.name}
        {patient.gender ? (
          patient.gender === "male" ? (
            <Icon name="mars" />
          ) : (
            <Icon name="venus" />
          )
        ) : null}
      </Header>
      <div>
        <span>
          <strong>SSN</strong> {patient.ssn}
        </span>
      </div>
      <div>
        <span>
          <strong>Occupation</strong> {patient.gender}
        </span>
      </div>

      <Header>Entries</Header>
      <CardGroup itemsPerRow={1}>
        {patient.entries.map((entry) => (
          <EntryView key={entry.id} entry={entry} diagnoses={diagnoses} />
        ))}
      </CardGroup>

      <Header>New Entry</Header>
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <Button onClick={() => openModal()}>Add New Entry</Button>
      {/* <AddEntryForm onSubmit={submitNewEntry} /> */}
    </div>
  );
};

const DiagnosesList: React.FC<{
  givenDiagnoses: string[];
  diagnoses: {
    [code: string]: Diagnosis;
  };
}> = ({ givenDiagnoses, diagnoses }) => {
  return (
    <ul>
      {givenDiagnoses
        ? givenDiagnoses.map((code) => (
            <li key={code}>
              {code} {diagnoses[code] && diagnoses[code].name}
            </li>
          ))
        : null}
    </ul>
  );
};

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member ${JSON.stringify(value)}`
  );
};

const EntryView: React.FC<{
  entry: Entry;
  diagnoses: {
    [code: string]: Diagnosis;
  };
}> = ({ entry, diagnoses }) => {
  switch (entry.type) {
    case "HealthCheck":
      return <HealthCheckEntryView entry={entry} diagnoses={diagnoses} />;
    case "Hospital":
      return <HospitalEntryView entry={entry} diagnoses={diagnoses} />;
    case "OccupationalHealthcare":
      return <HealthCheckEntryView entry={entry} diagnoses={diagnoses} />;
    default:
      assertNever(entry);
      return <></>;
  }
};

export const HealthCheckEntryView: React.FC<{
  entry: Entry;
  diagnoses: {
    [code: string]: Diagnosis;
  };
}> = ({ entry, diagnoses }) => {
  return (
    <Card>
      <Card.Content>
        <span>
          <Card.Header>
            {entry.date} <Icon name="user md"></Icon>
          </Card.Header>
        </span>
        <Card.Meta>{entry.description}</Card.Meta>

        {entry.diagnosisCodes && (
          <DiagnosesList
            givenDiagnoses={entry.diagnosisCodes ? entry.diagnosisCodes : []}
            diagnoses={diagnoses}
          />
        )}

        {entry.type === "HealthCheck" && (
          <HealthCheckRatingView rating={entry.healthCheckRating} />
        )}
      </Card.Content>
    </Card>
  );
};

export const HospitalEntryView: React.FC<{
  entry: Entry;
  diagnoses: {
    [code: string]: Diagnosis;
  };
}> = ({ entry, diagnoses }) => {
  return (
    <Card>
      <Card.Content>
        <span>
          <Card.Header>
            {entry.date} <Icon name="hospital"></Icon>
          </Card.Header>
        </span>
        <Card.Meta>{entry.description}</Card.Meta>
        <DiagnosesList
          givenDiagnoses={entry.diagnosisCodes ? entry.diagnosisCodes : []}
          diagnoses={diagnoses}
        />
      </Card.Content>
    </Card>
  );
};

export const OccupationalHealthcare: React.FC<{
  entry: Entry;
  diagnoses: {
    [code: string]: Diagnosis;
  };
}> = ({ entry, diagnoses }) => {
  return (
    <Card>
      <Card.Content>
        <Card.Header>
          {entry.date} <Icon name="stethoscope"></Icon>
        </Card.Header>
        <Card.Meta>{entry.description}</Card.Meta>
        <DiagnosesList
          givenDiagnoses={entry.diagnosisCodes ? entry.diagnosisCodes : []}
          diagnoses={diagnoses}
        />
      </Card.Content>
    </Card>
  );
};

export const HealthCheckRatingView: React.FC<{ rating: HealthCheckRating }> = ({
  rating,
}) => {
  switch (rating) {
    case HealthCheckRating.Healthy:
      return <Icon name="heart" color="green" />;
    case HealthCheckRating.LowRisk:
      return <Icon name="heart" color="yellow" />;
    case HealthCheckRating.HighRisk:
      return <Icon name="heart" color="red" />;
    case HealthCheckRating.CriticalRisk:
      return <Icon name="heart" color="black" />;
  }
};

export default PatientDetailsView;
