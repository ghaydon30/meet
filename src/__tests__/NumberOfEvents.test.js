import { render } from '@testing-library/react';
import NumberOfEvents from '../components/NumberOfEvents';
// For testing that involves user interactions
import userEvent from '@testing-library/user-event';

describe('<NumberOfEvents /> component', () => {
  let NumberOfEventsComponent;
  beforeEach(() => {
    NumberOfEventsComponent = render(
      <NumberOfEvents setCurrentNOE={() => {}} setErrorAlert={() => {}} />
    );
  });

  test('component contains input textbox', () => {
    const input = NumberOfEventsComponent.queryByRole('textbox');
    expect(input).toBeInTheDocument();
  });

  test('ensures the default value of textbox is 32', () => {
    const input = NumberOfEventsComponent.queryByRole('textbox');
    expect(input).toHaveValue('32');
  });

  test('textbox value changes when user updates input', async () => {
    const input = NumberOfEventsComponent.queryByRole('textbox');
    const user = userEvent.setup();
    await user.type(input, '{backspace}{backspace}10');
    expect(input).toHaveValue('10');
  });
});