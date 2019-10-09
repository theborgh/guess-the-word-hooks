import React from 'react';
import propTypes from 'prop-types';

const LanguagePicker = ({setLanguage}) => {
  const languages = [{code: 'en', symbol: '🇺🇸'}, {code: 'emoji', symbol: '😊'}];

  const languageIcons = languages.map(lang => (
    <span
      key={lang.code}
      data-test='language-icon'
      onClick={() => setLanguage(lang.code)}
    >
      {lang.symbol}
    </span>
  ));

  return <div data-test='component-LanguagePicker'>{languageIcons}</div>;
};

LanguagePicker.propTypes = {
  setLanguage: propTypes.func.isRequired,
};

export default LanguagePicker;
