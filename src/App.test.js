import React from 'react';
import {shallow} from 'enzyme';
import {findTagsWithTestAttribute} from '../test/testUtils';
import App from './App';

const setup = () => {
  return shallow(<App />);
};

it('renders without errors', () => {
  const wrapper = setup(<App />);
  expect(findTagsWithTestAttribute(wrapper, 'component-App').length).toBe(1);
});
