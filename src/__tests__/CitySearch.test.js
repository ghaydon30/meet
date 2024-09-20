// src/__tests__/CitySearch.test.js

import { render, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CitySearch from '../components/CitySearch';
import App from '../App';
import { extractLocations, getEvents } from '../api';

describe('<CitySearch /> component', () => {
  let CitySearchComponent;
  beforeEach(() => {
    CitySearchComponent = render(<CitySearch allLocations={[]}/>);
  });
  test('renders text input', () => {
    const cityTextBox = CitySearchComponent.queryByRole('textbox');
    expect(cityTextBox).toBeInTheDocument();
    expect(cityTextBox).toHaveClass('city');
  });

  /*
  ensures that no list (i.e., the suggestion list) 
  is shown within the CitySearch component by default
  */
  test('suggestions list is hidden by default', () => {
    const suggestionList = CitySearchComponent.queryByRole('list');
    expect(suggestionList).not.toBeInTheDocument();
  });

  /*
  ensures that the suggestion list appears when 
  the city input field “gains focus” (i.e., when the input field is clicked)
  */
  test('renders a list of suggestions when city textbox gains focus', async () => {
  const cityTextBox = CitySearchComponent.queryByRole('textbox');
  // userEvent.setup() was used in example, but this is redundant 
  // in the recent versions of userEvent
  await userEvent.click(cityTextBox);
  const suggestionList = await CitySearchComponent.findByRole('list');
  expect(suggestionList).toBeInTheDocument();
  expect(suggestionList).toHaveClass('suggestions');
  });

  test('updates list of suggestions correctly when user types in city testbox', async() => {
    const allEvents = await getEvents();
    const allLocations = extractLocations(allEvents);
    CitySearchComponent.rerender(<CitySearch allLocations={allLocations} />);
    
    // user types "Berlin" in city textbox
    const cityTextBox = CitySearchComponent.queryByRole('textbox');
    await userEvent.type(cityTextBox, 'Berlin');
    
    // filter allLocations to locations matching "Berlin"
    const suggestions = allLocations? allLocations.filter((location) => {
      return location.toUpperCase().indexOf(cityTextBox.value.toUpperCase()) > -1;
    }): [];

    // get all <li> elements inside the suggestion list
    const suggestionListItems = await CitySearchComponent.queryAllByRole('listitem');
    expect(suggestionListItems).toHaveLength(suggestions.length + 1);
    for (let i = 0; i < suggestions.length; i += 1) {
      expect(suggestionListItems[i].textContent).toBe(suggestions[i]);
    }
  });

  test('renders the suggestion text in the textbox upon clicking on the suggestion', async () => {
    const allEvents = await getEvents(); 
    const allLocations = extractLocations(allEvents);
    CitySearchComponent.rerender(<CitySearch
      allLocations={allLocations}
      setCurrentCity={() => { }}
    />);
  
    const cityTextBox = CitySearchComponent.queryByRole('textbox');
    await userEvent.type(cityTextBox, "Berlin");
  
    // Wait for the list items to appear
    const BerlinGermanySuggestions = await CitySearchComponent.findAllByRole('listitem');
    
    // Ensure the suggestions list is not empty
    expect(BerlinGermanySuggestions.length).toBeGreaterThan(0);
  
    // Get the first suggestion
    const BerlinGermanySuggestion = BerlinGermanySuggestions[0];
  
    // Ensure the first suggestion is defined
    expect(BerlinGermanySuggestion).toBeDefined();
  
    await userEvent.click(BerlinGermanySuggestion);
  
    expect(cityTextBox).toHaveValue(BerlinGermanySuggestion.textContent);
  });

});

// Integration Testing
describe('<CitySearch /> integration', () => {
  test('renders suggestions list when the app is rendered.', async () => {
    const user = userEvent.setup();
    const AppComponent = render(<App />);
    const AppDOM = AppComponent.container.firstChild;

    const CitySearchDOM = AppDOM.querySelector('#city-search');
    const cityTextBox = within(CitySearchDOM).queryByRole('textbox');
    await user.click(cityTextBox);

    const allEvents = await getEvents();
    const allLocations = extractLocations(allEvents);

    const suggestionListItems = within(CitySearchDOM).queryAllByRole('listitem');
    expect(suggestionListItems.length).toBe(allLocations.length + 1);
 });
});