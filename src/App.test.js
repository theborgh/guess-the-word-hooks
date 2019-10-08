import React from 'react';
import {mount} from 'enzyme';
import {findTagsWithTestAttribute} from '../test/testUtils';
import App from './App';

import hookActions from './actions/hookActions';

// globally scoped so it can be used in setup()
const mockGetSecretWord = jest.fn();

const setup = () => {
  mockGetSecretWord.mockClear(); // so the call count does not accumulate
  hookActions.getSecretWord = mockGetSecretWord;

  // useEffect not currently called on shallow(). Issue: https://github.com/airbnb/enzyme/issues/2086
  return mount(<App />);
};

it('renders without errors', () => {
  const wrapper = setup(<App />);
  expect(findTagsWithTestAttribute(wrapper, 'component-App').length).toBe(1);
});

describe('getSecretWord calls', () => {
  it('getSecretWord gets called on App mount', () => {
    setup();
    expect(mockGetSecretWord).toHaveBeenCalled();
  });

  it('getSecretWord does not get called on App update', () => {
    const wrapper = setup();

    mockGetSecretWord.mockClear();
    wrapper.setProps();

    expect(mockGetSecretWord).not.toHaveBeenCalled();
  });
});
