import { render, waitFor, within } from '@testing-library/react';
import { loadFeature, defineFeature } from 'jest-cucumber';
import App from '../App';
import Event from '../components/Event';
import userEvent from '@testing-library/user-event';
import { getEvents } from '../api';

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, test => {
  test('An event element is collapsed by default', ({ given, when, then }) => {    
    let AppDOM;
    given('the user is on the application', () => {                                                                   
      AppDOM = render(<App />).container.firstChild;                                                                                            
    });                                                                                                   
                                                                                                          
    when('the app displays a list of events', async () => {
      const EventListDOM = AppDOM.querySelector('#event-list');
      await waitFor(() => {
        const EventListItem = within(EventListDOM).getAllByRole('listitem');
        expect(EventListItem).toHaveLength(32); // Assumed number of events
      });
    });

    then('the user should see that the event element is collapsed by default.', () => {
      const eventDetails = AppDOM.querySelector('.details');
      expect(eventDetails).not.toBeInTheDocument();
    });
  });

  test('User can expand an event to see details', ({ given, when, then }) => {
    let EventComponent;
    let allEvents;
    
    given('the app is open and the event details are hidden', async () => {
      allEvents = await getEvents();
      EventComponent = render(<Event event={allEvents[0]} />);
      expect(EventComponent.container.querySelector('.details')).not.toBeInTheDocument();
    });

    when('the user clicks the "show event" button', async () => {
      const user = userEvent.setup();
      const showDetails = EventComponent.queryByText('show details');
      await user.click(showDetails);
    });

    then('the user should see the hidden event expand to display its details.', () => {
      const eventDetails = EventComponent.container.querySelector('.details');
      expect(eventDetails).toBeInTheDocument();
    });
  });

  // Scenario: User can collapse an event to hide details
  test('User can collapse an event to hide details', ({ given, when, then }) => {
    let EventComponent;
    let allEvents;
    
    given('the event is expanded and visible', async () => {
      allEvents = await getEvents();
      EventComponent = render(<Event event={allEvents[0]} />);
      const user = userEvent.setup();
      const showDetails = EventComponent.queryByText('Show Details');
      await user.click(showDetails); // Expand the event first
    });

    when('the user clicks the "hide event" button', async () => {
      const user = userEvent.setup();
      const hideDetails = EventComponent.queryByText('Hide Details');
      await user.click(hideDetails);
    });

    then('the user should see the event collapse and become hidden.', () => {
      const eventDetails = EventComponent.container.querySelector('.details');
      expect(eventDetails).not.toBeInTheDocument();
    });
  });
});