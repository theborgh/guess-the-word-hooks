import React from 'react';
import {mount} from 'enzyme';

import {findTagsWithTestAttribute} from '../test/testUtils';
import Congrats from './Congrats';
import languageContext from './contexts/languageContext';
import successContext from './contexts/successContext';

const setup = ({success, language}) => {
  language = language || 'en';
  success = success || false;

  return mount(
    <languageContext.Provider value={language}>
      <successContext.SuccessProvider value={[success, jest.fn()]}>
        <Congrats />
      </successContext.SuccessProvider>
    </languageContext.Provider>
  );
};

describe('language picker', () => {
  it('correctly renders congrats string in English by default', () => {
    const wrapper = setup({success: true});
    expect(wrapper.text()).toBe('Congratulations! You guessed the word!');
  });
  it('correctly renders congrats string in emoji', () => {
    const wrapper = setup({success: true, language: 'emoji'});
    expect(wrapper.text()).toBe('🎯🎉');
  });
});

it('renders without error', () => {
  const wrapper = setup({});
  const component = findTagsWithTestAttribute(wrapper, 'component-congrats');
  expect(component.length).toBe(1);
});
it('renders no text when `success` is false', () => {
  const wrapper = setup({success: false});
  const component = findTagsWithTestAttribute(wrapper, 'component-congrats');
  expect(component.text()).toBe('');
});
it('renders non-empty congrats message when `success` is true', () => {
  const wrapper = setup({success: true});
  const message = findTagsWithTestAttribute(wrapper, 'congrats-message');
  expect(message.text().length).not.toBe(0);
});
