import React from 'react';
import PropTypes from 'prop-types';

const Input = ({secretWord}) => {
  const [currentGuess, setCurrentGuess] = React.useState(''); // must not destructure so I can mock it
  return (
    <div data-test='component-Input'>
      <form className='form-inline'>
        <input
          data-test='input-box'
          className='mb-2 mx-sm-3'
          type='text'
          placeholder='Enter your guess'
          value={currentGuess}
          onChange={event => setCurrentGuess(event.target.value)}
        />
        <button
          data-test='submit-button'
          className='btn btn-primary mb-2'
          onClick={e => {
            e.preventDefault();
            setCurrentGuess('');
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

Input.propTypes = {
  secretWord: PropTypes.string.isRequired,
};

export default Input;
