import moxios from 'moxios';
import {getSecretWord} from './hookActions';

describe('Moxios tests', () => {
  beforeEach(() => {
    moxios.install(); // moxios will receive requests instead of http
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('calls the getSecretWord callback on axios response', async () => {
    const secretWord = 'party';

    // handles axios calls during the test
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: secretWord,
      });
    });

    // create mock just to use as a callback argument
    const mockSetSecretWord = jest.fn();

    await getSecretWord(mockSetSecretWord);

    // see whether getSecretWord was run with the correct argument
    expect(mockSetSecretWord).toHaveBeenCalledWith(secretWord);
  });
});
