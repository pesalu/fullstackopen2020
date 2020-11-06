import axios from "axios";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Header, Icon } from "semantic-ui-react";
import { apiBaseUrl } from "../constants";
import { setPatientDetails, useStateValue } from "../state";
import { Entry, PatientDetails } from "../types";

const PatientDetailsView: React.FC = () => {
  const [{ patient }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();

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
        {patient.name}{" "}
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
          <strong>SSN</strong> 1222{patient.ssn}
        </span>
      </div>
      <div>
        <span>
          <strong>Occupation</strong> {patient.gender}
        </span>
      </div>

      <Header>Entries</Header>
      <div>
        {patient.entries.map((entry) => (
          <div key={entry.id}>
            <EntryView entry={entry} />
          </div>
        ))}
      </div>
    </div>
  );
};

const EntryView: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type) {
    case "HealthCheck":
      return (
        <>
          <p>
            {entry.date} {entry.description}
          </p>
          <ul>
            {entry.diagnosisCodes
              ? entry.diagnosisCodes.map((code) => <li key={code}>{code}</li>)
              : null}
          </ul>
        </>
      );
    case "Hospital":
      return (
        <>
          {entry.date} {entry.description}
          <ul>
            {entry.diagnosisCodes
              ? entry.diagnosisCodes.map((code) => <li key={code}>{code}</li>)
              : null}
          </ul>
        </>
      );
    case "OccupationalHealthcare":
      return (
        <>
          {entry.date} {entry.description}
          <ul>
            {entry.diagnosisCodes
              ? entry.diagnosisCodes.map((code) => <li key={code}>{code}</li>)
              : null}
          </ul>
        </>
      );
  }
};

export default PatientDetailsView;
