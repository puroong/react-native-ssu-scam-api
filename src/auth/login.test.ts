import login from './login';
import axios from 'axios';
import { Cookie } from '../type';

test('test login', () => {
  return login('http://myclass.ssu.ac.kr/login/index.php', { username: '', password: '' })
    .then((cookie: Cookie) => {
      return axios.get('http://myclass.ssu.ac.kr', { headers: { Cookie: cookie.toString() } });
    })
    .then((res) => {
      expect(res.data).not.toContain('LOGIN');
    });
});
