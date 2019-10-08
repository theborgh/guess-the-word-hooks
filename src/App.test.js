import React from 'react';
import {mount} from 'enzyme';
import {findTagsWithTestAttribute} from '../test/testUtils';
import App from './App';

import hookActions from './actions/hookActions';

// globally scoped so it can be used in setup()
const mockGetSecretWord = jest.fn();

const setup = (secretWord = 'party') => {
  mockGetSecretWord.mockClear(); // so the call count does not accumulate
  hookActions.getSecretWord = mockGetSecretWord;

  const mockUseReducer = jest.fn().mockReturnValue([{secretWord}, jest.fn()]);

  React.useReducer = mockUseReducer;

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

describe('secretWord is not null', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup('party');
  });

  it('renders app', () => {
    const appComponent = findTagsWithTestAttribute(wrapper, 'component-App');
    expect(appComponent.exists()).toBe(true);
  });

  it('does not render spinner', () => {
    const spinnerComponent = findTagsWithTestAttribute(
      wrapper,
      'component-Spinner'
    );
    expect(spinnerComponent.exists()).toBe(false);
  });
});

describe('secretWord is null', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup(null);
  });

  it('does not render app', () => {
    const appComponent = findTagsWithTestAttribute(wrapper, 'component-App');
    expect(appComponent.exists()).toBe(false);
  });

  it('renders spinner', () => {
    const spinnerComponent = findTagsWithTestAttribute(
      wrapper,
      'component-Spinner'
    );
    expect(spinnerComponent.exists()).toBe(true);
  });
});
