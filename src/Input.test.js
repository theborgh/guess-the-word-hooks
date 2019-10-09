import React from 'react';
import {mount} from 'enzyme';

import {findTagsWithTestAttribute, checkProps} from '../test/testUtils';
import Input from './Input';
import languageContext from './contexts/languageContext';
import successContext from './contexts/successContext';
import guessedWordsContext from './contexts/guessedWordsContext';

const setup = ({language, secretWord, success}) => {
  language = language || 'en';
  secretWord = secretWord || 'party';
  success = success || false;

  return mount(
    <languageContext.Provider value={language}>
      <successContext.SuccessProvider value={[success, jest.fn()]}>
        <guessedWordsContext.GuessedWordsProvider>
          <Input secretWord={secretWord} />
        </guessedWordsContext.GuessedWordsProvider>
      </successContext.SuccessProvider>
    </languageContext.Provider>
  );
};

it('Input renders without error', () => {
  const wrapper = setup({});
  const inputComponent = findTagsWithTestAttribute(wrapper, 'component-input');
  expect(inputComponent.length).toBe(1);
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

    const mockEvent = {target: {value: 'train'}};
    inputBox.simulate('change', mockEvent);

    expect(mockSetCurrentGuess).toHaveBeenCalledWith('train');
  });
  it('field is cleared upon submit button click', () => {
    const submitButton = findTagsWithTestAttribute(wrapper, 'submit-button');

    submitButton.simulate('click', {preventDefault() {}});
    expect(mockSetCurrentGuess).toHaveBeenCalledWith('');
  });
});

describe('languagePicker', () => {
  it('correctly renders submit string in english', () => {
    const wrapper = setup({language: 'en'});
    const submitButton = findTagsWithTestAttribute(wrapper, 'submit-button');
    expect(submitButton.text()).toBe('Submit');
  });
  it('correctly renders congrats string in emoji', () => {
    const wrapper = setup({language: 'emoji'});
    const submitButton = findTagsWithTestAttribute(wrapper, 'submit-button');
    expect(submitButton.text()).toBe('🚀');
  });
});

it('input component does not show when success is true', () => {
  const wrapper = setup({secretWord: 'party', success: true});
  expect(wrapper.isEmptyRender()).toBe(true);
});
