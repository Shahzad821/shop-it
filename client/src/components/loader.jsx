import React from "react";

const Loader = ({ w, h, color }) => {
  return (
    <div
      className={`animate-spin rounded-full w-${w} h-${h} border-t-4 border-${color} `}
    ></div>
  );
};

export default Loader;
