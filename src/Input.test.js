import React from 'react';
import {mount} from 'enzyme';
import {findTagsWithTestAttribute, checkProps} from '../test/testUtils';
import Input from './Input';
import languageContext from './contexts/languageContext';

const setup = ({language = 'en', secretWord = 'party'}) => {
  return mount(
    <languageContext.Provider value={language}>
      <Input secretWord={secretWord} />
    </languageContext.Provider>
  );
};

it('renders without errors', () => {
  const wrapper = setup({});
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
    wrapper = setup({});
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

describe('languagePicker', () => {
  it('renders submit string in English', () => {
    const wrapper = setup({language: 'en'});
    expect(findTagsWithTestAttribute(wrapper, 'submit-button').text()).toBe(
      'Submit'
    );
  });

  it('renders submit string in Emoji', () => {
    const wrapper = setup({language: 'emoji'});
    expect(findTagsWithTestAttribute(wrapper, 'submit-button').text()).toBe(
      '🚀'
    );
  });
});
