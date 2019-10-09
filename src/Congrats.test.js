import React from 'react';
import {shallow, mount} from 'enzyme';

import {findByTestAttr, checkProps} from '../test/testUtils';
import Congrats from './Congrats';
import languageContext from './contexts/languageContext';

const defaultProps = {success: false};

const setup = ({success, language}) => {
  success = success || false;
  language = language || 'en';
  return mount(
    <languageContext.Provider value={language}>
      <Congrats success={success} />
    </languageContext.Provider>
  );
};

describe('languagePicker', () => {
  it('renders congrats string in English', () => {
    const wrapper = setup({success: true});
    expect(wrapper.text()).toBe('Congratulations! You guessed the word!');
  });

  it('renders congrats string in emoji', () => {
    const wrapper = setup({success: true, language: 'emoji'});
    expect(wrapper.text()).toBe('🎯🎉');
  });
});
