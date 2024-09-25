// src/__tests__/Event.test.js

import { render } from '@testing-library/react';
import Event from '../components/Event';
// For testing that involves user interactions 
import userEvent from '@testing-library/user-event';
import { getEvents } from '../api';

describe('<EventList /> component', () => {
  
  let EventComponent;
  let allEvents;

  beforeEach(async () => {
    allEvents = await getEvents();
    EventComponent = render(<Event event={allEvents[0]} />);
  });

  // Test if there is an element for the event's title using .summary key
  test('has an element for event title with summary key', () => {
    expect(EventComponent.queryByText(allEvents[0].summary)).toBeInTheDocument();
  });

  // Test if there is an element for the event start time
  test('If there is an event element with created key', () => {
    const formattedDate = new Date(allEvents[0].created).toUTCString();
    expect(EventComponent.queryByText(formattedDate)).toBeInTheDocument();
  });

  // Test if there is an element for the event's location
  test('If there is an event element with location key', () => {
    expect(EventComponent.queryByText(allEvents[0].location)).toBeInTheDocument();
  });

  // Test presence of "show details" button
  test('Renders event details button with the title (show details)', () => {
    expect(EventComponent.queryByText('show details')).toBeInTheDocument();
  });

  // Test Event details are hidden by default
  test('Event details are null by default', () => {
    expect(EventComponent.container.querySelector('.details')).not.toBeInTheDocument();
  });

  // Test if show details when user clicks "show details"
  test('Renders event details when (show details) button is clicked', async () => {
    const button = EventComponent.queryByRole('button', { name: /show details/i });
    await userEvent.click(button);
    const details = EventComponent.container.querySelector('.details');
    expect(details).toBeInTheDocument();
  });

  // Test if details are hidden when user clicks "hide details"
  test('Hides event details when user clicks hide details button', async () => {
    const showButton = EventComponent.queryByRole('button', { name: /show details/i });
    await userEvent.click(showButton);
    const shownDetails = EventComponent.container.querySelector('.details');
    expect(shownDetails).toBeInTheDocument();
    const hideButton = EventComponent.queryByRole('button', { name: /hide details/i });
    await userEvent.click(hideButton);
    const hiddenDetails = EventComponent.container.querySelector('.details');
    expect(hiddenDetails).not.toBeInTheDocument();
  });
});