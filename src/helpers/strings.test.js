import stringsModule from './strings';

const {getStringByLanguage} = stringsModule;

const strings = {
  en: {submit: 'submit'},
  emoji: {submit: '🚀️'},
  piglatin: {},
};

it('returns correct submit string for English', () => {
  const string = getStringByLanguage('en', 'submit', strings);
  expect(string).toBe('submit');
});

it('returns the correct submit string for Emoji', () => {
  const string = getStringByLanguage('emoji', 'submit', strings);
  expect(string).toBe('🚀️');
});

it('returns English submit string if language cannot be found', () => {
  const string = getStringByLanguage('notALang', 'submit', strings);
  expect(string).toBe('submit');
});

it('returns English if submit key does not exist', () => {
  const string = getStringByLanguage('piglatin', 'submit', strings);
  expect(string).toBe('submit');
});
