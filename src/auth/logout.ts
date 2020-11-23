import axios from 'axios';
import { Cookie } from '../type';
import { MAIN_URL } from '../config';

export default async function logout(cookie: Cookie): Promise<void> {
  return axios
    .get(MAIN_URL, { headers: { Cookie: cookie.toString() } })
    .then((res) => {
      const logoutUrlBegIdx = res.data.search(/(http\:\/\/([a-zA-Z\.])+\/login\/logout\.php\?sesskey=.+)/);
      let logoutUrlEndIdx = logoutUrlBegIdx;
      while (res.data[logoutUrlEndIdx] !== '"') logoutUrlEndIdx++;

      return res.data.slice(logoutUrlBegIdx, logoutUrlEndIdx);
    })
    .then((logoutUrl) => axios.get(logoutUrl, { headers: { Cookie: cookie.toString() } }));
}
