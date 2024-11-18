// src/components/NumberOfEvents.js

import { useState } from "react";

const NumberOfEvents = ({ currentNOE, setCurrentNOE, setErrorAlert }) => {

  const [number, setNumber] = useState(currentNOE || 32);
  
  // const handleInputChanged = (event) => {
  //   const value = event.target.value;
  //   setNumber(value);
  //   setCurrentNOE(value);
  // }

  const handleInputChanged = (event) => {
    const value = event.target.value;
    const numValue = Number(value);
    setNumber(value);
    let errorText = "";
    if (isNaN(numValue) || numValue <= 0) {
      errorText = "Please enter a valid number";
    } else if (numValue > 32) {
      errorText = "Only a maximum of 32 is allowed";
    }
    setErrorAlert(errorText);
    if (!errorText) {
      setCurrentNOE(numValue);
    }
  };

  return (
    <div id="number-of-events">
      <label htmlFor="number-of-events-input">Number of Events: </label>
      <input
        type="text"
        id="number-of-events-input"
        data-testid="numberOfEventsInput"
        className="number-of-events-input"
        value={number}
        onChange={handleInputChanged}
      />
    </div>
  );
}

export default NumberOfEvents;