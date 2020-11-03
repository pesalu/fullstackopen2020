import React from "react";
import ReactDOM from "react-dom";
import { Content } from "./components/Content";
import Header from "./components/Header";
import Total from "./components/Total";
import { Course } from "./types";

const App: React.FC = () => {
  const courseName = "Half Stack application development";
  const courseParts: Array<Course> = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
    },
  ];

  return (
    <div>
      <Header courseName={courseName} />
      <Content courses={courseParts} />
      <Total courses={courseParts} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
