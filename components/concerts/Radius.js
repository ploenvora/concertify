import React, { useState, useEffect } from "react";

function Radius({ onRadiusChange }) {
  const [radius, setRadius] = useState("25");

  useEffect(() => {
    const storedRadius =
      typeof window !== "undefined" ? localStorage.getItem("radius") : null;
    // if there is already a radius stored
    if (storedRadius) {
      setRadius(storedRadius);
      onRadiusChange(storedRadius);
    } else {
      // if a radius has not been stored (page is loaded for the first time - <25 miles)
      onRadiusChange(radius);
    }
  }, []);

  const handleChange = (e) => {
    const selectedRadius = e.target.value;
    setRadius(selectedRadius);
    onRadiusChange(selectedRadius);
  };

  return (
    <div>
      <label htmlFor="radius">Select Radius: </label>
      <select id="radius" value={radius} onChange={handleChange}>
        <option value="25">{"<25 miles"}</option>
        <option value="50">{"<50 miles"}</option>
        <option value="75">{"<75 miles"}</option>
        <option value="100">{"<100 miles"}</option>
      </select>
    </div>
  );
}

export default Radius;
