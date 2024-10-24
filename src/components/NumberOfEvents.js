// src/components/NumberOfEvents.js

import { useState } from "react";

const NumberOfEvents = ({ currentNOE, setCurrentNOE }) => {

  const [number, setNumber] = useState(currentNOE);

  const handleInputChanged = (event) => {
    const value = event.target.value;
    setNumber(value);
    setCurrentNOE(value);
  }

//   const handleInputChanged = (event) => {
//     const value = event.target.value;
//     setNumber(value)
//     if(isNaN(value) || value <= 0) {
//         setErrorAlert('Enter a valid number');
//     } else if (value > 32) {
//         setErrorAlert('Only maximum of 32 is allowed');
//     } else {
//         setErrorAlert('');
//         setCurrentNOE(value);
//     }
// };

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