import React from "react";
import { Course as CoursePart } from "../types";

const Total: React.FC<{ courses: CoursePart[] }> = ({ courses }) => {
  return (
    <p>
      Number of exercises{" "}
      {courses.reduce((carry: number, course: CoursePart) => {
        return carry + course.exerciseCount;
      }, 0)}
    </p>
  );
};

export default Total;
