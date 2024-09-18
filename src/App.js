import CitySearch from './components/CitySearch';
import EventList from './components/EventList';
import NumberOfEvents from './components/NumberOfEvents';
import './App.css';
import { useState } from 'react';

const App = () => {
  
  const [currentNumberOfEvents, setNumberOfEvents] = useState();
  
  return (
    <div className="App">
      <CitySearch />
      <EventList />
      <NumberOfEvents setNumberOfEvents={setNumberOfEvents}/>
    </div>
  );
 }
 
 export default App;