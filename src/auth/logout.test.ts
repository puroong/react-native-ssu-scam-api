import axios from 'axios';
import logout from './logout';
import login from './login';
import { MAIN_URL, testAuth } from '../config';

test('test logout', () => {
  return login(testAuth)
    .then((cookie) => {
      return logout(cookie).then(() => axios.get(MAIN_URL, { headers: { Cookie: cookie.toString() } }));
    })
    .then((res) => {
      expect(res.data).toContain('LOGIN');
    });
});
