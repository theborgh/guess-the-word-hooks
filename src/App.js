import React from 'react';
import './App.css';
import hookActions from './actions/hookActions';
import languageContext from './contexts/languageContext';
import successContext from './contexts/successContext';

import Input from './Input';
import LanguagePicker from './LanguagePicker';
import Congrats from './Congrats';
import GuessedWords from './GuessedWords';

// run automatically
function reducer(state, action) {
  switch (action.type) {
    case 'setSecretWord':
      return {...state, secretWord: action.payload};
    case 'setLanguage':
      return {...state, language: action.payload};
    default:
      throw new Error('Invalid action type: ' + action.type);
  }
}

function App() {
  const [state, dispatch] = React.useReducer(reducer, {
    secretWord: null,
    language: 'en',
  });

  const setSecretWord = secretWord =>
    dispatch({type: 'setSecretWord', payload: secretWord});

  const setLanguage = language =>
    dispatch({type: 'setLanguage', payload: language});

  React.useEffect(() => hookActions.getSecretWord(setSecretWord), []);

  if (!state.secretWord) {
    return (
      <div className='container' data-test='component-Spinner'>
        <div className='spinner-border' role='status'>
          <span className='sr-only'>Loading...</span>
        </div>
        <p>Loading secretWord...</p>
      </div>
    );
  }

  return (
    <div className='container' data-test='component-App'>
      <h1>Guess the word</h1>
      <languageContext.Provider value={state.language}>
        <LanguagePicker setLanguage={setLanguage} />
        <successContext.SuccessProvider>
          <Congrats />
          <Input secretWord={state.secretWord} />
        </successContext.SuccessProvider>
        {/* <GuessedWords /> */}
      </languageContext.Provider>
    </div>
  );
}

export default App;
