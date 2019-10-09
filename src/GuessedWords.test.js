import React from 'react';
import {shallow} from 'enzyme';
import {findTagsWithTestAttribute} from '../test/testUtils';
import GuessedWords from './GuessedWords';

import guessedWordsContext from './contexts/guessedWordsContext';

const setup = (guessedWords = []) => {
  const mockUseGuessedWords = jest
    .fn()
    .mockReturnValue([guessedWords, jest.fn()]);
  guessedWordsContext.useGuessedWords = mockUseGuessedWords;
  return shallow(<GuessedWords />);
};

describe('if there are no words guessed', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup([]);
  });
  it('renders without error', () => {
    const component = findTagsWithTestAttribute(
      wrapper,
      'component-guessed-words'
    );
    expect(component.length).toBe(1);
  });
  it('renders instructions to guess a word', () => {
    const instructions = findTagsWithTestAttribute(
      wrapper,
      'guess-instructions'
    );
    expect(instructions.text().length).not.toBe(0);
  });
});
describe('if there are words guessed', () => {
  let wrapper;
  const guessedWords = [
    {guessedWord: 'train', letterMatchCount: 3},
    {guessedWord: 'agile', letterMatchCount: 1},
    {guessedWord: 'party', letterMatchCount: 5},
  ];
  beforeEach(() => {
    wrapper = setup(guessedWords);
  });
  it('renders without error', () => {
    const component = findTagsWithTestAttribute(
      wrapper,
      'component-guessed-words'
    );
    expect(component.length).toBe(1);
  });
  it('renders "guessed words" section', () => {
    const guessedWordsNode = findTagsWithTestAttribute(
      wrapper,
      'guessed-words'
    );
    expect(guessedWordsNode.length).toBe(1);
  });
  it('correct number of guessed words', () => {
    const guessedWordNodes = findTagsWithTestAttribute(wrapper, 'guessed-word');
    expect(guessedWordNodes.length).toBe(guessedWords.length);
  });
});

describe('languagePicker', () => {
  it('correctly renders guess instructions string in English by default', () => {
    const wrapper = setup([]);
    const guessInstructions = findTagsWithTestAttribute(
      wrapper,
      'guess-instructions'
    );
    expect(guessInstructions.text()).toBe('Try to guess the secret word!');
  });
  it('correctly renders guess instructions string in emoji', () => {
    const mockUseContext = jest.fn().mockReturnValue('emoji');
    React.useContext = mockUseContext;
    const wrapper = setup([]);
    const guessInstructions = findTagsWithTestAttribute(
      wrapper,
      'guess-instructions'
    );
    expect(guessInstructions.text()).toBe('🤔🤫🔤');
  });
});
