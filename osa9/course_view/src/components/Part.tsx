import React from "react";
import { CoursePart } from "../types";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member ${JSON.stringify(value)}`
  );
};

export const Part: React.FC<{ coursePart: CoursePart }> = ({ coursePart }) => {
  switch (coursePart.name) {
    case "Fundamentals":
      return (
        <>
          <p style={{ fontWeight: "bold" }}>{coursePart.name}</p>
          <p>{coursePart.description}</p>
          <p>{coursePart.exerciseCount}</p>
        </>
      );
    case "Back-end calls":
      return (
        <>
          <p style={{ fontWeight: "bold" }}>{coursePart.name}</p>
          <p>{coursePart.description}</p>
          <p>{coursePart.exerciseCount}</p>
        </>
      );
    case "Using props to pass data":
      return (
        <>
          <p style={{ fontWeight: "bold" }}>{coursePart.name}</p>
          <p>{coursePart.groupProjectCount}</p>
          <p>{coursePart.exerciseCount}</p>
        </>
      );
    case "Deeper type usage":
      return (
        <>
          <p style={{ fontWeight: "bold" }}>{coursePart.name}</p>
          <p>{coursePart.description}</p>
          <p>{coursePart.exerciseSubmissionLink}</p>
          <p>{coursePart.exerciseCount}</p>
        </>
      );
    default:
      assertNever(coursePart);
      return <></>;
      break;
  }
};
