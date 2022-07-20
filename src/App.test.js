import { render, screen, fireEvent } from '@testing-library/react';
import App, { replaceCamelWithSpaces } from './App';

test('button has correct initial color', () => {
  render(<App />);

  // find an element with a role of button and text of 'Change to blue'
  const colorButton = screen.getByRole('button', { name: 'Change to blue' });

  // expect the background color to be red
  expect(colorButton).toHaveStyle({ backgroundColor: 'red' });

  // click button
  fireEvent.click(colorButton);

  // expect the background color to be blue
  expect(colorButton).toHaveStyle({ backgroundColor: 'blue' });

  // expect the button text to be 'Change to red'
  expect(colorButton.textContent).toBe('Change to red');
});

test('initial conditions', () => {
  render(<App />);

  // check that the button starts out enabled
  const colorButton = screen.getByRole('button', { name: 'Change to blue' });
  expect(colorButton).toBeEnabled();

  // check that the checkbox starts out unchecked
  const checkbox = screen.getByRole('checkbox', { name: 'Disable button' });
  expect(checkbox).not.toBeChecked();
});

test('button is disabled when checkbox is checked and vice versa', () => {
  render(<App />);

  const colorButton = screen.getByRole('button', { name: 'Change to blue' });
  const checkbox = screen.getByRole('checkbox', { name: 'Disable button' });

  fireEvent.click(checkbox);

  // check that checkbox is checked after click
  expect(checkbox).toBeChecked();

  // check that button is disabled when checkbox is checked
  expect(colorButton).toBeDisabled();

  fireEvent.click(checkbox);

  // check that button is enabled when checkbox is unchecked
  expect(colorButton).not.toBeDisabled();
});

test('button changes color to gray when disabled, reverts to red when enabled', () => {
  render(<App />);

  const colorButton = screen.getByRole('button', { name: 'Change to blue' });
  const checkbox = screen.getByRole('checkbox', { name: 'Disable button' });

  fireEvent.click(checkbox);

  // check that button is gray after checkbox is checked
  expect(colorButton).toHaveStyle({ backgroundColor: 'gray' });

  fireEvent.click(checkbox);

  // check that button is red after checkbox is unchecked
  expect(colorButton).toHaveStyle({ backgroundColor: 'red' });
});

test('button changes color to gray when disabled, reverts to blue when enabled', () => {
  render(<App />);

  const colorButton = screen.getByRole('button', { name: 'Change to blue' });
  const checkbox = screen.getByRole('checkbox', { name: 'Disable button' });

  // Change button to blue
  fireEvent.click(colorButton);
  fireEvent.click(checkbox);

  // check that button is gray after checkbox is checked
  expect(colorButton).toHaveStyle({ backgroundColor: 'gray' });

  fireEvent.click(checkbox);

  // check that button is blue after checkbox is unchecked
  expect(colorButton).toHaveStyle({ backgroundColor: 'blue' });
});

describe('spaces before camel case capital letters', () => {
  test('works for no inner capital letters', () => {
    expect(replaceCamelWithSpaces('Red')).toBe('Red');
  });
  test('works for one inner capital letters', () => {
    expect(replaceCamelWithSpaces('MidnightBlue')).toBe('Midnight Blue');
  });
  test('works for multiple inner capital letters', () => {
    expect(replaceCamelWithSpaces('MediumVioletRed')).toBe('Medium Violet Red');
  });
});
