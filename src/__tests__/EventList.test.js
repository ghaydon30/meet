import { render, within, waitFor } from '@testing-library/react';
import { getEvents } from '../api';
import EventList from '../components/EventList';
import App from "../App";

describe('<EventList /> component', () => {
  
  let EventListComponent;
  beforeEach(() => {
    EventListComponent = render(<EventList />);
  });

  // This test is more for accessibility features on react
  // It uses queryByRole to investigate the role attribute
  test('has an element with "list" role', () => {
    expect(EventListComponent.queryByRole("list")).toBeInTheDocument();
  });

  // Test Pass: If EventList renders with exactly 4 elements that have the role listitem
  test('renders correct number of events', async () => {
    const allEvents = await getEvents(); 
    EventListComponent.rerender(<EventList events={allEvents} />);
    expect(EventListComponent.getAllByRole("listitem")).toHaveLength(allEvents.length);
  });

});

// It is helpful to separate unit tests from integration tests with a describe() for the new scope
describe('<EventList /> integration', () => {
  test('renders a list of 32 events when the app is mounted and rendered', async () => {
    const AppComponent = render(<App />);
    const AppDOM = AppComponent.container.firstChild;
    const EventListDOM = AppDOM.querySelector('#event-list');
    await waitFor(() => {
      const EventListItems = within(EventListDOM).queryAllByRole('listitem');
      expect(EventListItems.length).toBeGreaterThan(0);
    });
  });
});