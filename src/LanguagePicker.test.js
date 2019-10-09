import React from 'react';
import {shallow} from 'enzyme';
import {findTagsWithTestAttribute, checkProps} from '../test/testUtils';
import LanguagePicker from './LanguagePicker';

const mockSetLanguage = jest.fn();
const setup = (props = {}) => {
  return shallow(<LanguagePicker setLanguage={mockSetLanguage} />);
};

it('renders without errors', () => {
  const wrapper = setup();
  const component = findTagsWithTestAttribute(
    wrapper,
    'component-LanguagePicker'
  );
  expect(component.exists()).toBe(true);
});

it('does not throw warning with expected props', () => {
  checkProps(LanguagePicker, {setLanguage: jest.fn()});
});

it('renders at least one language icon', () => {
  const wrapper = setup();
  expect(findTagsWithTestAttribute(wrapper, 'language-icon').exists()).toBe(
    true
  );
});

it('calls setLanguage prop on click', () => {
  const wrapper = setup();
  const languageIcons = findTagsWithTestAttribute(wrapper, 'language-icon');
  const firstIcon = languageIcons.first();

  firstIcon.simulate('click');

  expect(mockSetLanguage).toHaveBeenCalled();
});
