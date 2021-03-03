import React from "react";

const Spinner = () => {
  const styleElement = {
    color: "red",
    textAlign: "center",
    fontWeight: 100,
  };
  return (
    <div>
      <h1 style={styleElement}>Loading</h1>
    </div>
  );
};

export default Spinner;
