import React from "react";

// import ReactDOM from "react-dom";
// import PropTypes from "prop-types";

interface HeaderProps {
  courseName: string;
}

const Header: React.FC<HeaderProps> = ({ courseName }) => {
  return <h1>{courseName}</h1>;
};

export default Header;
