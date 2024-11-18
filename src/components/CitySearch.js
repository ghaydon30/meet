// src/components/CitySearch.js

import { useState, useEffect } from "react";

const CitySearch = ({ allLocations, setCurrentCity, setInfoAlert }) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  
  // Define the handleInputChanged function
  const handleInputChanged = (event) => {
    const value = event.target.value;
    const filteredLocations = allLocations ? allLocations.filter((location) => {
      return location.toUpperCase().indexOf(value.toUpperCase()) > -1;
    }) : [];

    setQuery(value);
    setSuggestions(filteredLocations);

    let infoText;
    if (filteredLocations.length === 0) {
      infoText = "We can not find the city you are looking for. Please try another city"
    } else {
      infoText = ""
    }
    setInfoAlert(infoText);
  };

  const handleItemClicked = (event) => {
    const value = event.target.textContent;
    setQuery(value);
    setShowSuggestions(false);
    setCurrentCity(value);
    setInfoAlert("");
  };

  useEffect(() => {
    setSuggestions(allLocations);
  }, [`${allLocations}`]);
  
  return (
    <div id="city-search">
      <input
        type="text"
        className="city"
                placeholder="Search for a city"
        value={query}
        /*
        setShowSuggestions(true) in the callback function of the 
        onFocus event handler of the <input /> element
         */
        onFocus={() => setShowSuggestions(true)}
        onChange={handleInputChanged} // Use the handleInputChanged function here
      />
      {showSuggestions ?         
        <ul className="suggestions">
          {suggestions.map((suggestion) => {
            return <li onClick={handleItemClicked} key={suggestion}>{suggestion}</li>
          })}
          <li key='See all cities' onClick={handleItemClicked}>
            <b>See all cities</b>
          </li>
        </ul> 
        : null
      }
    </div>
  )
}

export default CitySearch;