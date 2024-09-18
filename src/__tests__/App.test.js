// src/__tests__/App.test.js

// render is a function used to mock the original react component for testing
import { render } from '@testing-library/react';
import App from '../App';

// describe creates a new scope of tests (helps with test management)
describe('<App /> component', () => {

  let AppDOM;
  beforeEach(() => {
    AppDOM = render(<App />).container.firstChild;
  })

  test('renders list of events', () => {
    // .toBeInTheDocument() is a matcher function provided by the @testing-library/jest-dom package
    // Matcher functions are always chained to expect()
    expect(AppDOM.querySelector('#event-list')).toBeInTheDocument();
  });

  test('render CitySearch', () => {
    expect(AppDOM.querySelector('#city-search')).toBeInTheDocument();
    });

    test('render number of events', () => {
      expect(AppDOM.querySelector('#number-of-events')).toBeInTheDocument();
      });
});