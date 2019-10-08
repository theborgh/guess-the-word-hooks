import stringsModule from './strings';

const {getStringByLanguage} = stringsModule;

const strings = {
  en: {submit: 'submit'},
  emoji: {submit: '🚀️'},
  piglatin: {},
};

describe('', () => {
  const mockWarn = jest.fn(); // to avoid seeing warnings in tests
  let originalWarn;

  beforeEach(() => {
    originalWarn = console.warn;
    console.warn = mockWarn;
  });

  afterEach(() => {
    console.warn = originalWarn;
  });

  it('returns correct submit string for English', () => {
    const string = getStringByLanguage('en', 'submit', strings);
    expect(string).toBe('submit');
    expect(mockWarn).not.toHaveBeenCalled();
  });

  it('returns the correct submit string for Emoji', () => {
    const string = getStringByLanguage('emoji', 'submit', strings);
    expect(string).toBe('🚀️');
    expect(mockWarn).not.toHaveBeenCalled();
  });

  it('returns English submit string if language cannot be found', () => {
    const string = getStringByLanguage('notALang', 'submit', strings);
    expect(string).toBe('submit');
    expect(mockWarn).toHaveBeenCalledWith(
      'Could not get string [submit] for language [notALang]'
    );
  });

  it('returns English if submit key does not exist', () => {
    const string = getStringByLanguage('piglatin', 'submit', strings);
    expect(string).toBe('submit');
    expect(mockWarn).toHaveBeenCalledWith(
      'Could not get string [submit] for language [piglatin]'
    );
  });
});
