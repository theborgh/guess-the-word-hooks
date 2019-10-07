import React from 'react';
import {shallow} from 'enzyme';
import {findTagsWithTestAttribute, checkProps} from '../test/testUtils';
import Input from './Input';

const setup = (secretWord = 'party') => {
  return shallow(<Input secretWord={secretWord} />);
};

it('renders without errors', () => {
  const wrapper = setup();
  expect(findTagsWithTestAttribute(wrapper, 'component-Input').length).toBe(1);
});

it('does not throw warning with expected props', () => {
  checkProps(Input, {secretWord: 'party'});
});

describe('state controlled input field', () => {
  let mockSetCurrentGuess = jest.fn();
  let wrapper;

  beforeEach(() => {
    mockSetCurrentGuess.mockClear();
    React.useState = jest.fn(() => ['', mockSetCurrentGuess]);
    wrapper = setup();
  });

  it('state updates with value of input box upon change', () => {
    const inputBox = findTagsWithTestAttribute(wrapper, 'input-box');

    // Simulate input-box getting a value of "train"
    const mockEvent = {target: {value: 'train'}};
    inputBox.simulate('change', mockEvent);

    expect(mockSetCurrentGuess).toHaveBeenCalledWith('train');
  });

  it('clears currentGuess on submit', () => {
    const submitButton = findTagsWithTestAttribute(wrapper, 'submit-button');

    submitButton.simulate('click', {preventDefault() {}});
    expect(mockSetCurrentGuess).toHaveBeenCalledWith('');
  });
});
