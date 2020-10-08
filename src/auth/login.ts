import { LoginForm, Cookie } from '../type';
import axios from 'axios';
import {LOGIN_URL} from "../config";

function getErrorCode(location: string): number {
  if (location.indexOf('errorcode=') != -1) {
    return parseInt(location.split('errorcode=')[1]);
  }

  return -1;
}

function checkError(errorCode: number) {
  if (errorCode == -1) return;
  else if (errorCode == 4) throw new Error('cookie(MoodleSession) is not set');
  else if (errorCode == 2) throw new Error('invalid character at username or password');
  else if (errorCode == 3) throw new Error('wrong username or password');
  else if (errorCode == 4) throw new Error('session expired');
  else throw new Error('unknown error');
}

export default function login(loginForm: LoginForm): Promise<Cookie> {
  const { username, password } = loginForm;
  return axios
    .post(LOGIN_URL, `username=${username}&password=${password}`, {
      maxRedirects: 0,
    })
    .catch((res) => {
      const location = res.response.headers.location;
      const errorCode = getErrorCode(location);

      checkError(errorCode);

      return res.response.request.res.headers['set-cookie'];
    })
    .then((cookies) => cookies.filter((cookie: string) => cookie.indexOf('MoodleSession') != -1).slice(-1))
    .then((cookie: string[]) => {
      const [key, value] = cookie[0].split('=');
      return new Cookie(key, value);
    });
}
