// src/__tests__/EventList.test.js

import { render } from '@testing-library/react';
import EventList from '../components/EventList';
import { getEvents } from '../api';

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
