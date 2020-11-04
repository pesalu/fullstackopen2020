import React from "react";
import { useParams } from "react-router-dom";
import { Header, Icon } from "semantic-ui-react";
import { useStateValue } from "../state";

type TParams = {
  id: string;
};

const PatientDetails: React.FC = () => {
  const [{ patients }] = useStateValue();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // const match = useRouteMatch("/patients/:id") as any;

  // const id = match && match.params ? match.params.id : null;
  const { id } = useParams<{ id: string }>();

  const patient = patients[id];

  console.log("PATS ", patients);
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
    </div>
  );
};

export default PatientDetails;
