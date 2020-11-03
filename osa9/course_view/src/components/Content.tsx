import React from "react";
import { CoursePart } from "../types";
import { Part } from "../components/Part";

export const Content: React.FC<{ courses: CoursePart[] }> = ({ courses }) => {
  return (
    <>
      {courses.map((course) => (
        <>
          <Part key={course.name} coursePart={course} />
          <br />
        </>
      ))}
    </>
  );
};

export const CourseCom: React.FC<{ course: CoursePart }> = ({ course }) => {
  return (
    <p>
      {course.name} {course.exerciseCount}
    </p>
  );
};
