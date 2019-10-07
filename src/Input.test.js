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
