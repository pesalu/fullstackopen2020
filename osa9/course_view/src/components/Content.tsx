import React from "react";
import { Course } from "../types";

export const Content: React.FC<{ courses: Course[] }> = ({ courses }) => {
  return (
    <>
      {courses.map((course) => (
        <CourseCom key={course.name} course={course} />
      ))}
    </>
  );
};

export const CourseCom: React.FC<{ course: Course }> = ({ course }) => {
  return (
    <p>
      {course.name} {course.exerciseCount}
    </p>
  );
};
