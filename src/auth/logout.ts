import axios from 'axios';
import { Cookie } from '../type';

export default async function logout(mainUrl: string, cookie: Cookie): Promise<void> {
  return axios
    .get(mainUrl, { headers: { Cookie: cookie.toString() } })
    .then((res) => {
        const logoutUrlBegIdx = res.data.search(/(http\:\/\/([a-zA-Z\.])+\/login\/logout\.php\?sesskey=.+)/);
        let logoutUrlEndIdx = logoutUrlBegIdx;
        while(res.data[logoutUrlEndIdx] != '"') logoutUrlEndIdx++;

        return res.data.slice(logoutUrlBegIdx, logoutUrlEndIdx);
    })
    .then(logoutUrl => axios.get(logoutUrl, { headers: { Cookie: cookie.toString() } }));
}
