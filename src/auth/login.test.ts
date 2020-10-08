import login from './login';
import axios from 'axios';
import { Cookie } from '../type';
import {MAIN_URL, testAuth} from "../config";

test('test login', () => {
  return login(testAuth)
    .then((cookie: Cookie) => {
      return axios.get(MAIN_URL, { headers: { Cookie: cookie.toString() } });
    })
    .then((res) => {
      expect(res.data).not.toContain('LOGIN');
    });
});
