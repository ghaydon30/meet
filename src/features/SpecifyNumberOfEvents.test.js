import { render } from "@testing-library/react";
import { loadFeature, defineFeature } from "jest-cucumber";
import App from "../App";
import NumberOfEvents from "../components/NumberOfEvents";
import userEvent from "@testing-library/user-event";


const feature = loadFeature("./src/features/SpecifyNumberOfEvents.feature");


defineFeature(feature, (test) => { 
  let AppComponent;
  let NumberOfEventsComponent;
  let AppDOM;

  test('Display default number of events when user hasn’t set a specific number', ({ given, and, when, then }) => { 
    given('the event app is open', () => {
      AppComponent = render(<App />);
    });

    and('the user has not selected how many events to display', () => {
    });

    when('the user views the event list', () => {
      AppDOM = AppComponent.container.firstChild;
      const EventListDOM = AppDOM.querySelector('#event-list');
      NumberOfEventsComponent = render(<NumberOfEvents currentNOE={32} setCurrentNOE={() => { }} />, { container: EventListDOM });
      // NumberOfEventsComponent = render(<NumberOfEvents setCurrentNOE={() => { }} setErrorAlert={() => {}} />, { container: EventListDOM });
      expect(NumberOfEventsComponent).toBeTruthy();

    });

    then('the default number of events displayed should be "32"', () => {
      expect(NumberOfEventsComponent.getByRole('textbox')).toHaveValue('32'); 
    });
  });
  
  test('User can modify the number of events displayed', ({ given, and, when, then }) => {
    given('the event app is open', () => {
      AppComponent = render(<App />).container.firstChild;
    });
 
    and('the user has set the number of events to display as "10"', async () => {
      const EventListDOM = AppComponent.querySelector('#event-list');
      NumberOfEventsComponent = render(<NumberOfEvents setCurrentNOE={() => { }} setErrorAlert={() => { }}/>, { container: EventListDOM }); 
      const user = userEvent.setup();
      const numberOfEvents = NumberOfEventsComponent.getByRole('textbox');
      await user.type(numberOfEvents, '{backspace}{backspace}10'); 
    });  

    when('the user changes the number of events to "10"', async () => {
      const user = userEvent.setup();
      const numberOfEvents = NumberOfEventsComponent.getByRole('textbox');
      await user.type(numberOfEvents, '{backspace}{backspace}10');    
    }); 

    then('the event list should update to show "10" events', async () => {
      expect(NumberOfEventsComponent.getByRole('textbox')).toHaveValue('10'); 
    });   
});
});   