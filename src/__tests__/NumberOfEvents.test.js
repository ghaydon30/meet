import { render } from '@testing-library/react';
import NumberOfEvents from '../components/NumberOfEvents';
// For testing that involves user interactions 
import userEvent from '@testing-library/user-event';
import { getEvents } from '../api';

describe('<NumberOfEvents /> component', () => {
  let NumberOfEventsComponent;
  beforeEach(() => {
      NumberOfEventsComponent = render(<NumberOfEvents setCurrentNOE={() => {}} setErrorAlert={() => {}} />); //no setNumb ...?
  });

  test('renders number of events text input', () => {
      const numberTextBox = NumberOfEventsComponent.queryByRole('spinbutton');
      expect(numberTextBox).toBeInTheDocument();
      expect(numberTextBox).toHaveClass('number-of-events-input');
  });

  test('default value of the input field is 32', () => {
      const numberTextBox = NumberOfEventsComponent.queryByRole('spinbutton');
      expect(numberTextBox).toHaveValue(32);
  });
  
//   test('value changes accordingly when user types', async() => {
//     const user = userEvent.setup();
//     const numberInput = NumberOfEventsComponent.queryByRole('spinbutton');
//     await user.type(numberInput, '{backspace}{backspace}10');
//     expect(numberInput).toHaveValue(10);
// });
  /*
  test('value changes accordingly when user types', async () => {
    const numberInput = NumberOfEventsComponent.queryByRole('spinbutton');
    await userEvent.type(numberInput, '{backspace}{backspace}10');
    expect(numberInput).toHaveValue(10);
  });
  */

})