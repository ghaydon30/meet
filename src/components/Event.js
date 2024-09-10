// src/components/Event.js

import { useState } from 'react';

const Event = ({event}) => {
  const [showDetails, setShowDetails] = useState(false);
  
  return (
    <li className='event' key={event.id}>
    <h2>{event.summary}</h2>
    <p>{event.location}</p>
    <p>{event.created}</p>
    {showDetails ? (
      <div className="details">
        <h3>Event Details</h3>
        <p>{event.description}</p> 
      </div>) :
      null}

    <button className='button-details' onClick={() => {
        showDetails ? setShowDetails(false) : setShowDetails(true)
      }}>
      {showDetails ? 'hide details' : 'show details'}
    </button>
  </li>
  );
}

export default Event;